"use strict";
var albumControllers = angular.module("albumControllers", ["ui.bootstrap"]);

albumControllers.controller("albumController",
    function ($localStorage, $interval,$scope, $routeParams, $location, $modal, appRoot, albumService, editorService, categoryService) {

        $scope.album = {};
        $scope.isEdit = !angular.isUndefined($routeParams.id);
        $scope.$storage = $localStorage;
        $scope.album.images = [];
        $scope.album.createdOn = Date.now();
        $scope.editorList = [];
        $scope.categoryList = [];
        $scope.majorList = [];
        $scope.album.keywords = [];
        $scope.clear = function clear() {
            if (!$scope.isEdit) {
                $scope.album = {};
                $scope.success = false;
            } else {
                $location.path("/album/create");
            }
        }
        $scope.autoSave = $interval(function () {
            if (!$scope.isEdit && $scope.album.title) {
                $scope.$storage.album = $scope.album;
            }
        }, 10000);
        $scope.save = function () {
            $scope.success = "جاري الحفظ ...";
            if (!$scope.album.id) {
                albumService.create({}, $scope.album)
                    .$promise.then(function (data) {
                        $interval.cancel($scope.autoSave);
                        delete $localStorage.album;
                        $scope.album.id = data.id;
                        $scope.success = "تم حفظ  الألبوم بنجاح";
                    }, function (error) {
                        $scope.error = "حدث خطأ أثناء عملية الحفظ ! " + error;
                    });
            } else {
                albumService.update({ id: $scope.album.id }, $scope.album)
                    .$promise.then(function () {
                        $interval.cancel($scope.autoSave);
                        delete $localStorage.album;
                        $scope.success = "تم حفظ تعديلات الألبوم بنجاح";
                    }, function (error) {
                        $scope.error = "حدث خطأ أثناء عملية الحفظ ! " + error;
                    });
            }
        };
        $scope.get = function () {
            if ($scope.isEdit) {
                albumService.get({ id: $routeParams.id }).$promise.then(function(data) {
                    $scope.album = data;
                    $scope.album.keywords = $scope.album.keywords || [];
                });
            } 
        };
        $scope.publishItem = function publishItem() {
            var now = new Date();
            $scope.album.publishedOn = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
            $scope.save();
        }
        $scope.getEditors = function () {
            editorService.getEditors().$promise.then(function (data) {
                $scope.editorList = data;
            });
        };
        $scope.getCategories = function () {
            categoryService.getCategories().$promise.then(function (data) {
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
        $scope.bindData = function () {
            $scope.getEditors();
            $scope.getCategories();
            $scope.get();
        };
    });

albumControllers.controller("albumListController",
    function($scope, $routeParams, $location, infrastructure, albumService) {

        $scope.delete = function(id) {
            albumService.delete({ id: id })
                .$promise.then(function() {
                        $scope.tableParams.reload();
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
                );
        };
        $scope.filters = {};
        $scope.getalbums = function($defer, params) {
            var checker = params.filter().title + '';
            if (checker.length > 3 || checker.length === 0) {
                albumService.search(params.filter().title, params.filter().newsItemId, params.filter().publishedOn, params.page(), params.count())
                    .$promise.then(function(result) {
                        params.total(result.count);
                        $defer.resolve(result.data);
                    });
            }
        };
        $scope.tableParams = infrastructure.tableParams($scope.getalbums, $scope.filters, 20);
    });

albumControllers.controller("relatedAlbumsModalController",
    function($scope, $modalInstance, relatedAlbums, infrastructure, albumService) {

        $scope.filters = {};
        $scope.relatedAlbums = relatedAlbums;

        $scope.ok = function() {
            $modalInstance.close($scope.relatedAlbums);
        }
        $scope.cancel = function() {
            $modalInstance.dismiss($scope.relatedAlbums);
        };

        $scope.search = function($defer, params) {
            albumService.search(params.filter().title, params.filter().newsItemId, params.filter().publishedOn, params.page(), params.count(), true)
                .$promise.then(function(result) {
                    params.total(result.count);
                    $defer.resolve(result.data);
                });
        }
        $scope.addRelatedItem = function(item) {
            if ($scope.isNewRelatedItem(item.id)) {
                $scope.relatedAlbums.unshift(item);
            }
        };
        $scope.isNewRelatedItem = function (id) {
            return !$scope.relatedAlbums.isElementExistById(id);
        };
        $scope.tableParams = infrastructure.tableParams($scope.search, $scope.filters, 10);

    });