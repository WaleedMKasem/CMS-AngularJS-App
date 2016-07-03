"use strict";
var newsItemControllers = angular.module("newsItemControllers", ["ui.bootstrap"]);
newsItemControllers.controller("newsItemController",
    function($localStorage, $interval, $scope, $routeParams, $modal, $location, appRoot, newsItemService, editorService, categoryService, fileUploadService) {

        $scope.isEdit = !angular.isUndefined($routeParams.id);
    
        $scope.entities = [
            {
                module: {
                    "moduleId": "0",
                    "title": "خبر عادي"
                },
                checked: true
            }, {
                module: {
                    "moduleId": "1",
                    "title": "إنفوجراف"
                },
                checked: false
            },
            {
                module: {
                    "moduleId": "2",
                    "title": "تقارير"
                },
                checked: false
            },
            {
                module: {
                    "moduleId": "3",
                    "title": "كوميكس"
                },
                checked: false
            }
        ];
        $scope.labels = ["عادي", "كاريكتير", "إنفوجرافيك", "تقرير", "فيديو", "خاص", "عاجل", "بريك", "حوار", "صور"];
       
        $scope.updateSelection = function(position, entities) {
            angular.forEach(entities, function(subscription, index) {
                if (position != index)
                    subscription.checked = false;
            });
            angular.forEach(entities, function(subscription, index) {
                if (position == index) {
                    if (subscription.module.title === "تقارير") {
                        $scope.newsItem.isReport = true;
                        $scope.newsItem.isCartoons = false;
                        $scope.newsItem.isInfographic = false;
                    } else if (subscription.module.title === "إنفوجراف") {
                        $scope.newsItem.isInfographic = true;
                        $scope.newsItem.isCartoons = false;
                        $scope.newsItem.isReport = false;
                    } else if (subscription.module.title === "كوميكس") {
                        $scope.newsItem.isCartoons = true;
                        $scope.newsItem.isReport = false;
                        $scope.newsItem.isInfographic = false;
                    } else {
                        $scope.newsItem.isCartoons = false;
                        $scope.newsItem.isReport = false;
                        $scope.newsItem.isInfographic = false;

                    }
                }
            });
        };
        $scope.newsItem = {};
        $scope.editorList = [];
        $scope.categoryList = [];
        $scope.sourceList = [];
        $scope.newsItem.keywords = [];
        $scope.majorList = [];
        $scope.$storage = $localStorage;
        $scope.autoSave = $interval(function () {
            if (!$scope.isEdit && $scope.newsItem.title) {
                $scope.$storage.news = $scope.newsItem;
            }
        }, 10000);
        $scope.open = function(idx) {
            idx = idx || 0;

            var modalInstance = $modal.open({
                templateUrl: appRoot + "newsItem/pointModal.html",
                backdrop: true,
                windowClass: "modal",
                controller: function($scope, $modalInstance, point) {
                    $scope.point = point;
                    $scope.ok = function() {
                        $modalInstance.close($scope.point);
                    };
                    $scope.cancel = function() {
                        $modalInstance.dismiss($scope.point);
                    };
                },
                resolve: {
                    point: function() {
                        $scope.newsItem.points = $scope.newsItem.points || [];
                        return $scope.newsItem.points[idx] || {};
                    }
                }
            });

            modalInstance.result.then(function(point) {
                $scope.newsItem.points = $scope.newsItem.points || [];
                $scope.newsItem.points[idx] = point;
            });
        };
        $scope.deletePoint = function(idx) {
            $scope.newsItem.points.splice(idx, 1);
        };
        $scope.openRelatedNews = function(relatedNews) {
            relatedNews = relatedNews || [];

            var modalInstance = $modal.open({
                templateUrl: appRoot + "newsItem/relatedNewsModal.html",
                backdrop: true,
                windowClass: "modal",
                size: "lg",
                controller: "relatedNewsModalController",
                resolve: {
                    relatedNews: function() {
                        return $scope.newsItem.relatedNews || [];
                    }
                }
            });

            modalInstance.result.then(function(relatedNews) {
                $scope.newsItem.relatedNews = relatedNews;
            });
        };
        $scope.addKeyword = function addKeyword(keyword) {
            if (keyword.length > 0) {
                $scope.newsItem.keywords.push(keyword);
                $scope.keyword = {};
                console.log($scope.keyword);
            }
        };
        $scope.publishItem = function publishItem() {
            var now = new Date();
            $scope.newsItem.publishedOn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
            $scope.save();
        };
        $scope.clear = function clear() {
            if (!$scope.isEdit) {
                $scope.newsItem = {};
                $scope.success = false;
                $scope.entities = [
                    {
                        module: {
                            "moduleId": "0",
                            "title": "خبر عادي"
                        },
                        checked: true
                    }, {
                        module: {
                            "moduleId": "1",
                            "title": "إنفوجراف"
                        },
                        checked: false
                    },
                    {
                        module: {
                            "moduleId": "2",
                            "title": "تقارير"
                        },
                        checked: false
                    },
                    {
                        module: {
                            "moduleId": "3",
                            "title": "كوميكس"
                        },
                        checked: false
                    }
                ];
            } else {
                $location.path("/newsItem/create");
            }
        };
        $scope.save = function () {
            var fileName = fileUploadService.getFile();
            $scope.newsItem.imageId = $scope.newsItem.imageId || {};
            $scope.newsItem.imageId = fileName;
            $scope.newsItem.fullSourceImage = $scope.sourceList[0];
            $scope.success = "جاري الحفظ ...";
            console.log('first id: ' + $scope.newsItem.id);
            if (!$scope.newsItem.id) {
                newsItemService.create({}, $scope.newsItem)
                    .$promise.then(function(data) {
                            $interval.cancel($scope.autoSave);
                            delete $scope.$storage.news;
                            console.log('id: ' + data.id);
                            $scope.newsItem.id = data.id;
                            $scope.success = "تم حفظ  الخبر بنجاح";
                        },
                        function(error) {
                            $scope.error = "حدث خطأ أثناء عملية الحفظ ! " + error;
                        });
            } else {
                newsItemService.update({ id: $scope.newsItem.id }, $scope.newsItem)
                    .$promise.then(function () {
                        $interval.cancel($scope.autoSave);
                        delete $scope.$storage.news;
                            $scope.success = "تم حفظ تعديلات الخبر بنجاح";
                        },
                        function(error) {
                            $scope.error = "حدث خطأ أثناء عملية الحفظ ! " + error;
                        });
            }
        };
        $scope.get = function() {
            if ($scope.isEdit) {
                newsItemService.get({ id: $routeParams.id }).$promise.then(function(data) {
                    $scope.newsItem = data;
                    if ($scope.newsItem.fullSourceImage)
                        $scope.sourceList.push($scope.newsItem.fullSourceImage);
                    
                    angular.forEach($scope.entities, function(subscription, index) {

                        if ($scope.newsItem.isReport) {
                            if (subscription.module.title === "تقارير") {
                                subscription.checked = true;
                            }
                            if (subscription.module.title === "خبر عادي") {
                                subscription.checked = false;
                            }
                        } else if ($scope.newsItem.isInfographic) {
                            if (subscription.module.title === "إنفوجراف") {
                                subscription.checked = true;
                            }
                            if (subscription.module.title === "خبر عادي") {
                                subscription.checked = false;
                            }
                        } else if ($scope.newsItem.isCartoons) {
                            if (subscription.module.title === "كوميكس") {
                                subscription.checked = true;
                            }
                            if (subscription.module.title === "خبر عادي") {
                                subscription.checked = false;
                            }
                        } else {
                            if (subscription.module.title === "خبر عادي") {
                                subscription.checked = true;
                            }
                        }
                    });
                });
            }
        };
        $scope.getEditors = function() {
            editorService.getEditors().$promise.then(function(data) {
                $scope.editorList = data;
            });
        };
        $scope.getCategories = function() {
            categoryService.getCategories().$promise.then(function(data) {
                $scope.categoryList = data;
                for (var i = 0; i < $scope.categoryList.length; i++) {
                    var check = {};
                    check = $scope.categoryList[i];
                    if (check.isMajor) {
                        $scope.majorList.push($scope.categoryList[i]);
                    }
                }

            });
        };
        $scope.bindData = function() {
            $scope.getEditors();
            $scope.getCategories();
            $scope.get();

        };
    });

newsItemControllers.controller("newsItemListController",
    function($scope, $routeParams, $location, $modal, infrastructure, newsItemService) {

        $scope.delete = function(id) {
            newsItemService.delete({ id: id })
                .$promise.then(function() {
                        $scope.tableParams.reload();
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
                );
        };
        $scope.filters = {};
        $scope.getNews = function ($defer, params) {
            var checker = params.filter().title + '';
            if (checker.length > 3 || checker.length === 0) {
                newsItemService.search(params.filter().title, params.filter().newsItemId, params.filter().publishedOn, params.page(), params.count())
                    .$promise.then(function(result) {
                        params.total(result.count);
                        $defer.resolve(result.data);
                    });
            }
        };
        $scope.tableParams = infrastructure.tableParams($scope.getNews, $scope.filters, 20);
    });

newsItemControllers.controller("relatedNewsModalController",
    function($scope, $modalInstance, relatedNews, infrastructure, newsItemService) {
        $scope.filters = {};
        $scope.relatedNews = relatedNews;
        $scope.keywords = [];

        $scope.ok = function() {
            $modalInstance.close($scope.relatedNews);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss($scope.relatedNews);
        };

        $scope.search = function($defer, params) {
            newsItemService.search(params.filter().title, params.filter().newsItemId, params.filter().publishedOn, params.page(), params.count(), true)
                .$promise.then(function(result) {
                    params.total(result.count);
                    $defer.resolve(result.data);
                });
        };
        $scope.addRelatedItem = function(item) {
            if ($scope.isNewRelatedItem(item.id)) {
                $scope.relatedNews.unshift(item);
            }
        };
        $scope.isNewRelatedItem = function(id) {
            return !$scope.relatedNews.isElementExistById(id);
        };
        $scope.tableParams = infrastructure.tableParams($scope.search, $scope.filters, 10);


    });

newsItemControllers.controller("relatedInfographicsModalController",
    function($scope, $modalInstance, relatedInfographics, infrastructure, newsItemService) {
        $scope.filters = {};
        $scope.relatedInfographics = relatedInfographics;

        $scope.ok = function() {
            $modalInstance.close($scope.relatedInfographics);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss($scope.relatedInfographics);
        };

        $scope.search = function($defer, params) {
            newsItemService.searchInfograph(params.filter().title, params.filter().newsItemId, params.filter().publishedOn, params.page(), params.count(), true)
                .$promise.then(function(result) {
                    params.total(result.count);
                    $defer.resolve(result.data);
                });
        };
        $scope.addRelatedItem = function(item) {
            if ($scope.isNewRelatedItem(item.id)) {
                $scope.relatedInfographics.unshift(item);
            }
        };
        $scope.isNewRelatedItem = function(id) {
            return !$scope.relatedInfographics.isElementExistById(id);
        };
        $scope.tableParams = infrastructure.tableParams($scope.search, $scope.filters, 10);


    });