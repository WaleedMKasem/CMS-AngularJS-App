'use strict';

/* Directives */

var directives = angular.module('directives', []);

directives.directive('competitionsSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            competitions: '=',
            title: '=',
            current: '='
        },
        link: function (scope, element, attr) {
        },
        templateUrl: appRoot + 'shared/templates/competitions-selector.html',
        controller: function ($scope, $modal) {
            $scope.openRelatedCompetitions = function () {
                $scope.competitions = $scope.competitions || [];
                var modalInstance = $modal.open({
                    templateUrl: appRoot + "competition/relatedCompetitionModal.html",
                    backdrop: true,
                    windowClass: "modal",
                    size: "lg",
                    controller: "relatedCompetitionsController",
                    resolve: {
                        relatedCompetitions: function () {
                            return $scope.competitions || [];
                        },
                        current: function () {
                            return $scope.current;
                        }
                    }
                });
                modalInstance.result.then(function (competitions) {
                    $scope.competitions = competitions;
                });
            };

        }
    };
});
directives.directive('soonSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            competitions: '=',
            title: '='
        },
        link: function (scope, element, attr) {
        },
        templateUrl: appRoot + 'shared/templates/competitions-selector.html',
        controller: function ($scope, $modal) {
            $scope.openRelatedCompetitions = function () {
                $scope.competitions = $scope.competitions || [];
                var modalInstance = $modal.open({
                    templateUrl: appRoot + "competition/relatedCompetitionModal.html",
                    backdrop: true,
                    windowClass: "modal",
                    size: "lg",
                    controller: "soonCompetitionsController",
                    resolve: {
                        relatedCompetitions: function () {
                            return $scope.competitions || [];
                        }
                    }
                });
                modalInstance.result.then(function (competitions) {
                    $scope.competitions = competitions;
                });
            };

        }
    };
});
directives.directive('imagesSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            images: '=',
            title: '=',
            single: '='
        },
        link: function (scope, element, attr) {
        },
        templateUrl: appRoot + 'shared/templates/images-selector.html',
        controller: function ($scope, $modal, infrastructure) {
            //console.log($scope.single);
            //console.log($scope.title);
            $scope.getImageUrl = function (imageId, encryptedImageId) {
                return infrastructure.getImageUrl(imageId, encryptedImageId);
            };
            $scope.openRelatedImages = function () {
                $scope.images = $scope.images || [];
                var modalInstance = $modal.open({
                    templateUrl: appRoot + "image/relatedImagesModal.html",
                    backdrop: true,
                    windowClass: "modal",
                    size: "lg",
                    controller: "relatedImagesModalController",
                    resolve: {
                        images: function () {
                            return $scope.images || [];
                        }, single: function () {
                            return $scope.single || false;
                        }
                    }
                });
                modalInstance.result.then(function (images) {
                    $scope.images = images;
                });
            };

        }
    };
});

directives.directive('videosSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            videos: '=',
            title: '=',
        },
        link: function (scope, element, attr) {
        },
        templateUrl: appRoot + 'shared/templates/videos-selector.html',
        controller: function ($scope, $modal,tvImgPath) {
            $scope.tvImgPath = tvImgPath;

            $scope.openRelatedVideos = function () {
                $scope.videos = $scope.videos || [];
                var modalInstance = $modal.open({
                    templateUrl: appRoot + "video/relatedVideosModal.html",
                    backdrop: true,
                    windowClass: "modal",
                    size: "lg",
                    controller: "relatedVideosModalController",
                    resolve: {
                        videos: function () {
                            return $scope.videos || [];
                        }
                    }
                });
                modalInstance.result.then(function (videos) {
                    $scope.videos = videos;
                });
            };

        }
    };
});

directives.directive('newsSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace:true,
        scope: {
            news: '=',
            title: '='
        },
        link: function (scope, element, attr) {
        },
        templateUrl:  appRoot +'shared/templates/news-selector.html',
        controller: function ($scope, $modal) {
            $scope.openRelatedNews = function () {
                $scope.news = $scope.news || [];
                var modalInstance = $modal.open({
                    templateUrl: appRoot + "newsItem/relatedNewsModal.html",
                    backdrop: true,
                    windowClass: "modal",
                    size: "lg",
                    controller: "relatedNewsModalController",
                    resolve: {
                        relatedNews: function () {
                            return $scope.news || [];
                        }
                    }
                });
                modalInstance.result.then(function (news) {
                    $scope.news = news;
                });
            };

        }
    };
});

directives.directive('keywordsSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            keywords: '='
        },
        link: function (scope, element, attr) {
        },
        templateUrl: appRoot + 'shared/templates/keywords-selector.html',
        controller: function ($scope) {
            $scope.keyword = {};
            $scope.check = true;
            $scope.keywords = $scope.keywords || [];
            $scope.addKeyword = function addKeyword(keyword) {
                if (keyword.length > 0) {
                    $scope.keywords.push(keyword);
                    $scope.keyword = {};
                }
            };
        }
    };
});

directives.directive('articlesSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            articles: '=',
            title: '='
        },
        link: function (scope, element, attr) {
        },
        templateUrl: appRoot + 'shared/templates/articles-selector.html',
        controller: function ($scope, $modal) {
            $scope.openRelatedArticles = function () {
                $scope.articles = $scope.articles || [];
                var modalInstance = $modal.open({
                    templateUrl: appRoot + "article/relatedArticleModal.html",
                    backdrop: true,
                    windowClass: "modal",
                    size: "lg",
                    controller: "relatedArticlesModalController",
                    resolve: {
                        relatedArticles: function () {
                            return $scope.articles || [];
                        }
                    }
                });
                modalInstance.result.then(function (articles) {
                    $scope.articles = articles;
                });
            };

        }
    };
});


directives.directive('interviewsSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            interviews: '=',
            title: '='
        },
        link: function (scope, element, attr) {
        },
        templateUrl: appRoot + 'shared/templates/interviews-selector.html',
        controller: function ($scope, $modal) {
            $scope.openRelatedInterviews = function () {
                $scope.interviews = $scope.interviews || [];
                var modalInstance = $modal.open({
                    templateUrl: appRoot + "interview/relatedInterviewModal.html",
                    backdrop: true,
                    windowClass: "modal",
                    size: "lg",
                    controller: "relatedInterviewsModalController",
                    resolve: {
                        relatedInterviews: function () {
                            return $scope.interviews || [];
                        }
                    }
                });
                modalInstance.result.then(function (interviews) {
                    $scope.interviews = interviews;
                });
            };

        }
    };
});

directives.directive('albumsSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            albums: '=',
            title: '='
        },
        link: function (scope, element, attr) {
        },
        templateUrl: appRoot + 'shared/templates/albums-selector.html',
        controller: function ($scope, $modal) {
            $scope.openRelatedAlbums = function () {
                $scope.albums = $scope.albums || [];
                var modalInstance = $modal.open({
                    templateUrl: appRoot + "album/relatedAlbumModal.html",
                    backdrop: true,
                    windowClass: "modal",
                    size: "lg",
                    controller: "relatedAlbumsModalController",
                    resolve: {
                        relatedAlbums: function () {
                            return $scope.albums || [];
                        }
                    }
                });
                modalInstance.result.then(function (albums) {
                    $scope.albums = albums;
                });
            };

        }
    };
});

directives.directive('questionsSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            questions: '=',
            title: '='
        },
        link: function (scope, element, attr) {
        },
        templateUrl: appRoot + 'shared/templates/questions-selector.html',
        controller: function ($scope, $modal) {
            $scope.openRelatedQuestions = function () {
                $scope.questions = $scope.questions || [];
                var modalInstance = $modal.open({
                    templateUrl: appRoot + "question/relatedQuestionModal.html",
                    backdrop: true,
                    windowClass: "modal",
                    size: "lg",
                    controller: "relatedQuestionsModalController",
                    resolve: {
                        relatedQuestions: function () {
                            return $scope.questions || [];
                        }
                    }
                });
                modalInstance.result.then(function (questions) {
                    $scope.questions = questions;
                });
            };

        }
    };
});

directives.directive('infographicsSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            infographics: '=',
            title: '='
        },
        link: function (scope, element, attr) {
        },
        templateUrl: appRoot + 'shared/templates/infographics-selector.html',
        controller: function ($scope, $modal) {
            $scope.openRelatedInfographics = function () {
                $scope.infographics = $scope.infographics || [];
                var modalInstance = $modal.open({
                    templateUrl: appRoot + "newsItem/relatedInforgaphicsModal.html",
                    backdrop: true,
                    windowClass: "modal",
                    size: "lg",
                    controller: "relatedInfographicsModalController",
                    resolve: {
                        relatedInfographics: function () {
                            return $scope.infographics || [];
                        }
                    }
                });
                modalInstance.result.then(function (infographics) {
                    $scope.infographics = infographics;
                });
            };

        }
    };
});

directives.directive('filesSelector', function (appRoot) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            files: '=',
            title: '='
        },
        link: function (scope, element, attr) {
        },
        templateUrl: appRoot + 'shared/templates/files-selector.html',
        controller: function ($scope, $modal) {
            $scope.openRelatedFiles = function () {
                $scope.files = $scope.files || [];
                var modalInstance = $modal.open({
                    templateUrl: appRoot + "file/relatedFileModal.html",
                    backdrop: true,
                    windowClass: "modal",
                    size: "lg",
                    controller: "relatedFilesModalController",
                    resolve: {
                        relatedFiles: function () {
                            return $scope.files || [];
                        }
                    }
                });
                modalInstance.result.then(function (files) {
                    $scope.files = files;
                });
            };

        }
    };
});

directives.directive('fileInput', ['$parse',
  function ($parse) {
      return {
          restrict: 'A',
          link: function (scope, elm, attrs) {
              elm.bind('change', function () {
                  $parse(attrs.fileInput).assign(scope, elm[0].files);
                  scope.$apply();
              });
          }
      }
  }
]);
directives.directive('ngConfirmClick', [
  function () {
      return {
          priority: -1,
          restrict: 'A',
          link: function (scope, element, attrs) {
              element.bind('click', function (e) {
                  var message = attrs.ngConfirmClick;
                  if (message && !confirm(message)) {
                      e.stopImmediatePropagation();
                      e.preventDefault();
                  }
              });
          }
      }
  }
]);

var compareTo = function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
};

directives.directive("compareTo", compareTo);
 
//directives.directive('routeLoadingIndicator', function ($rootScope) {
//    return {
//        restrict: 'E',
//        template: "<div ng-show='isRouteLoading' class='loading-indicator'>" +
//        "<div class='loading-indicator-body'>" +
//        "<h3 class='loading-title'>Loading...</h3>" +
//        "<div class='spinner'><rotating-plane-spinner></rotating-plane-spinner></div>" +
//        "</div>" +
//        "</div>",
//        replace: true,
//        link: function (scope, elem, attrs) {
//            scope.isRouteLoading = false;

//            $rootScope.$on('$routeChangeStart', function () {
//                scope.isRouteLoading = true;
//            });
//            $rootScope.$on('$routeChangeSuccess', function () {
//                scope.isRouteLoading = false;
//            });
//        }
//    };
//});
//directives.directive("loadingIndicator", function() {
//    return {
//        restrict: "A",
//        template: "<div ng-show='isStateLoading'>Loading...</div>",
//        link: function(scope, element, attrs) {

//            scope.isStateLoading = false;
//            //element.css({ "display": "none" });
//            scope.$on("loading-started", function(e) {
//                scope.isStateLoading = true;
//                element.css({ "display": "" });
//            });

//            scope.$on("loading-complete", function(e) {
//                scope.isStateLoading = false;
//                element.css({ "display": "none" });
//            });

//        }
//    };
//});

