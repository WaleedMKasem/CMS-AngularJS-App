/// <reference path="Interviews/Edit.html" />
"use strict";

/* App Module */

var app = angular.module("app", [
    "ngRoute", "directives", "ngTable", "ngCookies", "ngStorage", "ngSanitize", "angular-img-cropper",
    "ui.select", "angular-sortable-view", "ngFileUpload", "textAngular","infrastructures", "newsItemServices",
    "newsItemControllers", "interviewControllers", "interviewServices", "questionControllers", "questionServices", "quizControllers",
    "quizServices", "albumControllers", "albumServices", "fileControllers", "fileServices", "articleControllers", "articleServices",
    "editorServices", "editorControllers", "newsItemServices", "locationServices", "locationControllers", "intervieweeServices",
    "intervieweeControllers", "imageServices", "imageControllers", "loginControllers", "loginServices", "fixedmediaControllers", "fixedmediaServices",
    "categoryControllers", "categoryServices", "galleryControllers", "galleryServices", "videoServices", "videoControllers", "competitionServices", "competitionControllers",
    "matchServices", "matchControllers"
]);


app.run(['$rootScope', '$location', '$cookieStore', '$http', 'checkRolesService',
    function ($rootScope, $location, $cookieStore, $http, checkRolesService) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
      
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
          
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
            if ($rootScope.globals.currentUser)
            {
                var check = checkRolesService.checkRoles($location.path(), $rootScope.globals.currentUser.permissions);
                if (check === false)
                    $location.path('/error');
            }
        });
    }]);

app.config(function ($routeProvider, $locationProvider) {
        $routeProvider.
           when("/", {
               templateUrl: "home/main"
           });
        $routeProvider.when("/error", {
            templateUrl: "home/error"
        });
        $routeProvider.when("/login", {
            templateUrl: "app/login/index.html",
            controller: "loginController"
        });
        $routeProvider.when("/interviews", {
            templateUrl: "app/interview/list.html",
            controller: "interviewListController"
        });
        $routeProvider.when("/interview/create", {
            templateUrl: "app/interview/edit.html",
            controller: "interviewController"
        });
        $routeProvider.when("/interview/edit/:id", {
            templateUrl: "app/interview/edit.html",
            controller: "interviewController"
        });
        $routeProvider.when("/questions", {
            templateUrl: "app/question/list.html",
            controller: "questionListController"
        });
        $routeProvider.when("/question/create", {
            templateUrl: "app/question/edit.html",
            controller: "questionController"
        });
        $routeProvider.when("/question/edit/:id", {
            templateUrl: "app/question/edit.html",
            controller: "questionController"
        });

        $routeProvider.when("/quizs", {
            templateUrl: "app/quiz/list.html",
            controller: "quizListController"
        });
        $routeProvider.when("/quiz/create", {
            templateUrl: "app/quiz/edit.html",
            controller: "quizController"
        });
        $routeProvider.when("/quiz/edit/:id", {
            templateUrl: "app/quiz/edit.html",
            controller: "quizController"
        });
        $routeProvider.when("/news", {
            templateUrl: "app/newsItem/list.html",
            controller: "newsItemListController"
        });
        $routeProvider.when("/newsItem/create", {
            templateUrl: "app/newsItem/edit.html",
            controller: "newsItemController"
        });
        $routeProvider.when("/newsItem/edit/:id", {
            templateUrl: "app/newsItem/edit.html",
            controller: "newsItemController"
        });
        $routeProvider.when("/album/uploadImage", {
            templateUrl: "app/album/uploadImage.html",
            controller: "uploadImageController"
        });


        $routeProvider.when("/albums", {
            templateUrl: "app/album/list.html",
            controller: "albumListController"
        });
        $routeProvider.when("/album/create", {
            templateUrl: "app/album/edit.html",
            controller: "albumController"
        });
        $routeProvider.when("/album/edit/:id", {
            templateUrl: "app/album/edit.html",
            controller: "albumController"
        });

        $routeProvider.when("/files", {
            templateUrl: "app/file/list.html",
            controller: "fileListController"
        });
        $routeProvider.when("/file/create", {
            templateUrl: "app/file/edit.html",
            controller: "fileController"
        });
        $routeProvider.when("/file/edit/:id", {
            templateUrl: "app/file/edit.html",
            controller: "fileController"
        });


        $routeProvider.when("/articles", {
            templateUrl: "app/article/list.html",
            controller: "articleListController"
        });
        $routeProvider.when("/article/create", {
            templateUrl: "app/article/edit.html",
            controller: "articleController"
        });
        $routeProvider.when("/article/edit/:id", {
            templateUrl: "app/article/edit.html",
            controller: "articleController"
        });
        // image
        $routeProvider.when("/images", {
            templateUrl: "app/image/list.html",
            controller: "imageListController"
        });
        $routeProvider.when("/image/create", {
            templateUrl: "app/image/create.html",
            controller: "imageCreateController"
        });
        $routeProvider.when("/image/edit/:id", {
            templateUrl: "app/image/edit.html",
            controller: "imageEditController"
        });
        $routeProvider.when("/editors", {
            templateUrl: "app/editor/list.html",
            controller: "editorListController"
        });
        $routeProvider.when("/editor/create", {
            templateUrl: "app/editor/edit.html",
            controller: "editorController"
        });
        $routeProvider.when("/editor/edit/:id", {
            templateUrl: "app/editor/edit.html",
            controller: "editorController"
        });

        $routeProvider.when("/interviewees", {
            templateUrl: "app/interviewee/list.html",
            controller: "intervieweeListController"
        });
        $routeProvider.when("/interviewee/create", {
            templateUrl: "app/interviewee/edit.html",
            controller: "intervieweeController"
        });
        $routeProvider.when("/interviewee/edit/:id", {
            templateUrl: "app/interviewee/edit.html",
            controller: "intervieweeController"
        });

        $routeProvider.when("/locations", {
            templateUrl: "app/location/list.html",
            controller: "locationListController"
        });
        $routeProvider.when("/location/create", {
            templateUrl: "app/location/edit.html",
            controller: "locationController"
        });
        $routeProvider.when("/location/edit/:id", {
            templateUrl: "app/location/edit.html",
            controller: "locationController"
        });

        $routeProvider.when("/fixedmedias", {
            templateUrl: "app/fixedmedia/list.html",
            controller: "fixedmediaListController"
        });
        $routeProvider.when("/fixedmedia/create", {
            templateUrl: "app/fixedmedia/edit.html",
            controller: "fixedmediaController"
        });
        $routeProvider.when("/fixedmedia/edit/:id", {
            templateUrl: "app/fixedmedia/edit.html",
            controller: "fixedmediaController"
        });
        
        $routeProvider.when("/categories", {
            templateUrl: "app/category/list.html",
            controller: "categoryListController"
        });
        $routeProvider.when("/category/create", {
            templateUrl: "app/category/edit.html",
            controller: "categoryController"
        });
        $routeProvider.when("/category/edit/:id", {
            templateUrl: "app/category/edit.html",
            controller: "categoryController"
        });

        $routeProvider.when("/galleries", {
            templateUrl: "app/gallery/list.html",
            controller: "galleryListController"
        });
        $routeProvider.when("/gallery/create", {
            templateUrl: "app/gallery/edit.html",
            controller: "galleryController"
        });
        $routeProvider.when("/gallery/edit/:id", {
            templateUrl: "app/gallery/edit.html",
            controller: "galleryController"
        });

        $routeProvider.when("/live", {
            templateUrl: "app/match/match.html",
            controller: "matchController"
        });
        $routeProvider.otherwise({ redirectTo: '/login' });

        $locationProvider.html5Mode(false).hashPrefix("!");
    });

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $rootScope) {
        return {
            'request': function (config) {
                $rootScope.$broadcast("loading-started");
                return config || $q.when(config);
            },
            'response': function (response) {
                $rootScope.$broadcast("loading-complete");
                return response || $q.when(response);
            }
        };
    });

});

app.config(function ($provide) {
    $provide.decorator('$q', ['$delegate', '$rootScope', function ($delegate, $rootScope) {
        var pendingPromisses = 0;
        $rootScope.$watch(
          function () { return pendingPromisses > 0; },
          function (loading) { $rootScope.loading = loading; }
        );
        var $q = $delegate;
        var origDefer = $q.defer;
        $q.defer = function () {
            var defer = origDefer();
            pendingPromisses++;
            defer.promise.finally(function () {
                pendingPromisses--;
            });
            return defer;
        };
        return $q;
    }]);
});

app.filter("unique", function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});

//app.filter("chunk", function() {
//    return function chunk(arr, size) {
//        var newArr = [];
//        arr.then(function(result) {
//            for (var i = 0; i < result.length; i += size) {
//                newArr.push(result.slice(i, i + size));
//            }
//            return newArr;
//        });
//    };
//});

app.service('fileUploadService', function () {
    var fileName = [];

    var addFile = function (newObj) {
        fileName = newObj;
    };

    var getFile = function () {
        return fileName;
    };

    return {
        addFile: addFile,
        getFile: getFile
    };

});

Array.prototype.grep = function (key, value) {
    var that = this, ret = [];
    this.forEach(function (elem, index) {
        if (elem[key] === value) {
            ret.push(that[index]);
        }
    });
    return ret.length < 2 ? ret[0] : ret;
};

Array.prototype.isElementExistById = function (id) {
    return this.some(function (elm) { return elm.id === id; });
};

Array.prototype.isElementExistByCompId = function (compId) {
    return this.some(function (elm) { return elm.competitionId === compId; });
};




