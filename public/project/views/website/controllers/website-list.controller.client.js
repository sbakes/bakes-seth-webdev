(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService, userService, $scope, filterFilter, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        //model.resetPreferences = resetPreferences();
        //model.updateChecked = updateChecked();
        //model.websites = websites;
        //model.updatePreferences = updatePreferences();

        function init() {
            console.log(model.userId);
            model.updatePreferences = updatePreferences;
            model.updateChecked = updateChecked;
            model.resetPreferences = resetPreferences;
            model.checked = checked;
            model.collectArticles = collectArticles;
            model.createCommentPage = createCommentPage;
            userService
                .findAllCountries()
                .then(function(countries){
                 //   console.log(countries);
                    model.countries = countries.data;
                    //console.log(model.countries);
                    $scope.countries = model.countries;
                    //console.log(model.countries[1]);
                    console.log("done grabbing countries")
                }, function(error) {
                    console.log(error);
                    console.log("error grabbing countries");
                    model.error = "error grabbing countries"
                });

            userService
                .findAllCategories()
                .then(function(categories){
                    //   console.log(categories);
                    model.categories = categories.data;
                    //console.log(model.countries);
                    $scope.categories = model.categories;
                    //console.log(model.countries[1]);
                   // console.log("done grabbing categories")
                }, function(error) {
                    console.log(error);
                    console.log("error grabbing categories");
                    model.error = "error grabbing categories"
                });

            userService
                .findAllLanguages()
                .then(function(languages){
                    model.languages = languages.data;
                    //console.log(model.countries);
                    $scope.languages = model.languages;
                    //console.log(model.countries[1]);
                    //console.log("done grabbing languages")
                }, function(error) {
                    console.log(error);
                    console.log("error grabbing languages");
                    model.error = "error grabbing languages"
                });

            userService
                .findUserById(model.userId)
                .then(function(user){
                    console.log(user.data);
                    var preferences = {
                        language: user.data.languages,
                        category: user.data.categories,
                        country: user.data.countries
                    };
                    $scope.preferences = preferences;
                    $scope.CountrySelection = $scope.preferences.country;
                    $scope.LanguageSelection = $scope.preferences.language;
                    $scope.CategorySelection = $scope.preferences.category;
                    //console.log($scope.preferences);
                    collectCategories();

                }, function(error) {
                    console.log("Error grabbing preferences");
                });
            // websiteService
            //     .findAllWebsitesForUser(model.userId)
            //     .then(function(websites){
            //         console.log("found websites");
            //         model.websites = websites.data;
            //         console.log(websites);
            //     }, function(error){
            //         console.log("error retrieving websites");
            //         console.log(error);
            //         model.message = "error retrieving websites";
            //     });
                //websites = websiteService.findAllWebsitesForUser(model.userId);

            //console.log(model.websites);
        }
        init();

        function collectArticles(){
            var sources = $scope.news;
            //console.log(sources);
            //console.log(sources.length);
            var articles = [];
            //console.log("right before for loop... why wont it go????");
            for(var s=0; s < sources.length; s++) {
                //console.log("for loop worked....");
                var source = sources[s];
                //console.log(source);
                websiteService
                    .findAllArticles(source.id)
                    .then(function(articlesReturn){
                        for(var a=0; a < articlesReturn.data.articles.length; a++){
                            //console.log(a);
                            // if(a >= 20){
                            //     console.log('breaking');
                            //     break;
                            // }
                            var art = articlesReturn.data.articles[a];
                            //console.log(art);
                            art.source = articlesReturn.data.source;
                            var str = art.title + art.source;
                            var replace = str.replace(/ +?/g, "");
                            replace = replace.replace('%', "");
                            //console.log(replace);
                            art._id = replace;
                            //console.log(art.source);
                            articles.push(art);
                        }

                    }, function(error){
                        model.error = "error grabbing articles";
                    });
            }
            model.articles = articles;
            $scope.articles = articles;
            console.log(articles);
        }

        function createCommentPage(newsId, newsName, url){
            console.log("news Name: " + newsName);
            console.log("news Id: " + newsId);
            websiteService
                .findWebsiteById(newsId)
                .then(function(success){
                    //console.log(success);
                    console.log("comment page already exists");
                    $location.url('/user/'+model.userId+'/website/'+newsId+'/page');

                }, function(error){
                    //console.log(error);

                    n = new Date().getTime(); //so every website has a unique id
                    var websiteNew = {
                        name: newsName,
                        //description: description,
                        developerId: model.userId,
                        _id: newsId,
                        url: url
                    };

                    console.log(websiteNew);

                    websiteService
                        .createWebsite(model.userId, websiteNew)
                        .then(function(success){
                            model.message = "Comment Page Created";
                            //console.log(success);
                            $location.url('/user/'+model.userId+'/website/'+newsId+'/page');
                        },function(error){
                            model.error = "Unable to fetch comment page";
                            //console.log(error);
                        });
                    //websiteService.createWebsite(website);
                });
        }

        function languageMatch(language){
            //console.log(language);
            //console.log($scope.LanguageSelection);
            var english = ($scope.LanguageSelection.includes("English"));
            //console.log(english);
            var french = ($scope.LanguageSelection.includes("French"));
            //console.log(french);
            var german = ($scope.LanguageSelection.includes("German"));
            //console.log(german);

            if(language === "en"){
                return english;
            }
            else if(language === "fr"){
                return french;
            }
            else if(language === "de"){
                return german;
            }
            else {
                return false;
            }
        }

        function countryMatch(country){
            //console.log(country);
            //console.log($scope.CountrySelection);
            //$scope.CountrySelection
            var australia= ($scope.CountrySelection.includes("Australia"));
            //console.log(australia);
            var greatBrittan = ($scope.CountrySelection.includes("United Kingdom" ));
            //console.log(greatBrittan);
            var german = ($scope.CountrySelection.includes("Germany"));
            //console.log(german);
            var india = ($scope.CountrySelection.includes("India"));
            var italy = ($scope.CountrySelection.includes("Italy"));
            var unitedStates = ($scope.CountrySelection.includes("United States"));

            if(country === "au"){
                return australia;
            }
            else if(country === "gb"){
                return greatBrittan;
            }
            else if(country === "de"){
                return german;
            }
            else if(country === "in"){
                return india;
            }
            else if(country === "it"){
                return italy;
            }
            else if(country === "us"){
                return unitedStates;
            }
            else {
                return false;
            }
        }

        function collectCategories(){
            console.log($scope.CountrySelection);
            for(var c=0; c < $scope.CategorySelection.length; c++){
                var sources = [];
                var category = $scope.CategorySelection[c];
                console.log(category);
                websiteService
                    .findAllSourcesForUser(model.userId, category)
                    .then(function (news) {
                        checked(news.data.sources);
                        for(var d=0; d < news.data.sources.length; d++){
                            var outlet = news.data.sources[d];
                            //console.log(outlet);
                            var lMatch = languageMatch(outlet.language);
                            //console.log(lMatch);
                            var cMatch = countryMatch(outlet.country);
                            //console.log(cMatch);
                            if(lMatch && cMatch) {
                               // console.log("found a matching article");
                                sources.push(outlet);
                            }
                        }
                        //sources.push(news.data.sources);
                        //console.log(arr);
                        //model.news = arr;
                        //console.log(model.news);
                        //console.log(model.news[1]);
                        //console.log("checked = " + model.news);
                    }, function (error) {
                        console.log("error grabbing news");
                        model.error = "error retrieving news";
                    });
            }
            model.news = sources;
            $scope.news = model.news;
            console.log($scope.news);
        }

        function checked(newsSources) {
            //console.log("checking user preferences");
            userService
                .findUserById(model.userId)
                .then(function(success){
                    //console.log(success.data);
                    model.userChecks = success.data.sources;
                    //console.log(model.userChecks);
                    var checksUpdate = updateChecks(newsSources, model.userChecks);
                    //console.log(checksUpdate);
                    //console.log(checksUpdate[0]);
                   // return checksUpdate;
                    newsSources = checksUpdate;
                }, function(error){
                    model.message = error;
                });
        }

        function updateChecks(news, checked) {
            //console.log(checked);
            //console.log(news);
            for(var s=0; s < news.length; s++) {
                //console.log(news[s]);
                if(inChecked(news[s].id, checked)){
                    console.log("doesn't like " + news[s]);
                    news[s].checked = "UNCHECKED"
                }else {
                    news[s].checked = "CHECKED"
                }
            }
            //console.log("done checking news");
            //console.log(news);
            return news;
        }

        function inChecked(newsObject, checked) {
            var inChecked = false;
            if(checked = null) {
                for (var c = 0; c < checked.length; c++) {
                    if (newsObject === checked[c]) {
                        inChecked = true;
                    }
                }
            }
            return inChecked;
        }

        function resetPreferences(){
            console.log('resetting');
            userService
                .resetChecked(model.userId)
                .then(function(success){
                    model.message = "News Preferences Reset"
                }, function(error){
                    model.error = "Error resetting preferences"
                });

        }

        function updateChecked(checks){
            //console.log(checks);
            userService
                .updateChecks(model.userId, checks)
                .then(function(success){
                    model.message = "News Preferences Updated"
                }, function(error){
                    model.error = "Error updating preferences"
                });


        }

        function updatePreferences(){
            //console.log($scope.LanguageSelection);
            //console.log($scope.CategorySelection);
            //console.log($scope.CountrySelection);
            userService
                .updatePreferences(model.userId, $scope.LanguageSelection, $scope.CategorySelection, $scope.CountrySelection)
                .then(function(success){
                    model.message = "Preferences Updated";
                }, function(error){
                    model.error = "error updating preferences";
                });
            console.log("updatePreferences worked");
        }

        $scope.sortType     = 'name'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchNews   = '';     // set the default search/filter term
        $scope.searchArticles   = '';

        console.log("preferences");
        console.log($scope.preferences);
        // toggle selection for a given selection by name
        $scope.toggleSelection = function toggleSelection(name, checklist) {
            //console.log(name);
            function checkInput(checklist){
                //console.log(checklist);
                if(checklist === 'country'){
                   return $scope.CountrySelection.indexOf(name);
                } else if(checklist === 'language'){
                    return $scope.LanguageSelection.indexOf(name);
                } else if(checklist === 'category'){
                    return $scope.CategorySelection.indexOf(name);
                } else {
                    model.error = "error in scope";
                }
            }
            function checkIndex(checklist){
                //console.log(checklist);
                if(checklist === 'country'){
                    $scope.CountrySelection.splice(idx, 1);
                } else if(checklist === 'language'){
                    $scope.LanguageSelection.splice(idx, 1);
                } else if(checklist === 'category'){
                    $scope.CategorySelection.splice(idx, 1);
                } else {
                    model.error = "error in scope";
                }
            }

            function checkPush(checklist){
                //console.log(checklist);
                if(checklist === 'country'){
                    $scope.CountrySelection.push(name);
                } else if(checklist === 'language'){
                    $scope.LanguageSelection.push(name);
                } else if(checklist === 'category'){
                    $scope.CategorySelection.push(name);
                } else {
                    model.error = "error in scope";
                }
            }
            var idx = checkInput(checklist);
            //console.log(idx);
            // is currently selected
            if (idx > -1) {
                checkIndex(checklist);
            }

            // is newly selected
            else {
                checkPush(checklist);
            }
        };

        // watch checkboxes for changes
        $scope.$watch('language|filter:{selected:true}', function (nv, name) {
            $scope.LanguageSelection = nv.map(function (select) {
                return select.name;
            });
        }, true);
        $scope.$watch('category|filter:{selected:true}', function (nv, name) {
            $scope.CategorySelection = nv.map(function (select) {
                return select.name;
            });
        }, true);
        $scope.$watch('country|filter:{selected:true}', function (nv, name) {
            $scope.CountrySelection = nv.map(function (select) {
                return select.name;
            });
        }, true);

    }

})();