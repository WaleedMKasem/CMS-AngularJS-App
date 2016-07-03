"use strict";
var interviewControllers = angular.module("interviewControllers", ["ui.bootstrap"]);

interviewControllers.controller("interviewController",
    function ($localStorage, $interval, $scope, $routeParams, $location, $modal, appRoot, interviewService, intervieweeService, editorService, newsItemService, categoryService) {

        $scope.interview = {};
        $scope.isEdit = !angular.isUndefined($routeParams.id);
        $scope.$storage = $localStorage;
        $scope.interview.createdOn = Date.now();
        $scope.editorList = [];
        $scope.intervieweeList = [];
        $scope.categoryList = [];
        $scope.majorList = [];
        $scope.open = function(idx) {
            idx = idx || 0;

            var modalInstance = $modal.open({
                templateUrl: appRoot+"interview/pointModal.html",
                backdrop: true,
                windowClass: "modal",
                controller: function($scope, $modalInstance, point) {
                    $scope.point = point;
                    $scope.ok = function() {
                        $modalInstance.close($scope.point);
                    }
                    $scope.cancel = function() {
                        $modalInstance.dismiss($scope.point);
                    };
                },
                resolve: {
                    point: function() {
                        $scope.interview.points = $scope.interview.points || [];
                        return $scope.interview.points[idx] || {};
                    }
                }
            });

            modalInstance.result.then(function(point) {
                $scope.interview.points = $scope.interview.points || [];
                $scope.interview.points[idx] = point;
            });
        };
        $scope.deletePoint = function(idx) {
            $scope.interview.points.splice(idx, 1);
        };
        $scope.clear = function clear() {
            if (!$scope.isEdit) {
                $scope.interview = {};
                $scope.success = false;
            } else {
                $location.path("/interview/create");
            }
        }
        $scope.autoSave = $interval(function () {
            if (!$scope.isEdit && $scope.interview.title) {
                $scope.$storage.interview = $scope.interview;
            }
        }, 10000);
        $scope.save = function() {
            $scope.success = "جاري الحفظ ...";
            if (!$scope.interview.id) {
                interviewService.create({}, $scope.interview)
                    .$promise.then(function (data) {
                        $interval.cancel($scope.autoSave);
                        delete $localStorage.interview;
                        $scope.interview.id = data.id;
                        $scope.success = "تم حفظ  اللقاء بنجاح";
                    }, function(error) {
                        $scope.error = "حدث خطأ أثناء عملية الحفظ ! " + error;
                    });
            } else {
                interviewService.update({ id: $scope.interview.id }, $scope.interview)
                    .$promise.then(function () {
                        $scope.success = "تم حفظ تعديلات اللقاء بنجاح";
                    }, function(error) {
                        $scope.error = "حدث خطأ أثناء عملية الحفظ ! " + error;
                    });
            }
        };
        $scope.get = function() {
            if ($scope.isEdit) {
                interviewService.get({ id: $routeParams.id }).$promise.then(function(data) {
                    $scope.interview = data;
                });
            } 
        };
        $scope.getEditors = function () {
            editorService.getEditors().$promise.then(function (data) {
                $scope.editorList = data;
            });
        };
        $scope.getInterviewees = function () {
            intervieweeService.getInterviewees().$promise.then(function (data) {
                $scope.intervieweeList = data;
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
            $scope.getInterviewees();
            $scope.get();
            $scope.getCategories();
        };
    });

interviewControllers.controller("interviewListController",
    function ($scope, $routeParams, $location, $modal, infrastructure, interviewService) {

        $scope.delete = function (id) {
            interviewService.delete({ id: id })
                .$promise.then(function () {
                    $scope.tableParams.reload();
                },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
                );
        };
        $scope.filters = {};

        $scope.getInterviews = function($defer, params) {
            var checker = params.filter().title + '';
            if (checker.length > 3 || checker.length === 0) {
                interviewService.search(params.filter().title, params.filter().newsItemId, params.filter().publishedOn, params.page(), params.count())
                    .$promise.then(function(result) {
                        params.total(result.count);
                        $defer.resolve(result.data);
                    });
            }
        };
        $scope.tableParams = infrastructure.tableParams($scope.getInterviews, $scope.filters,20);
    });


interviewControllers.controller("relatedInterviewsModalController",
    function ($scope, $modalInstance, relatedInterviews, infrastructure, interviewService) {

        $scope.filters = {};
        $scope.relatedInterviews = relatedInterviews;
        $scope.ok = function () {
            $modalInstance.close($scope.relatedInterviews);
        }
        $scope.cancel = function () {
            $modalInstance.dismiss($scope.relatedInterviews);
        };

        $scope.search = function ($defer, params) {
            interviewService.search(params.filter().title, params.filter().newsItemId, params.filter().publishedOn, params.page(), params.count())
                .$promise.then(function (result) {
                    params.total(result.count);
                    $defer.resolve(result.data);
                });
        }
        $scope.addRelatedItem = function (item) {
            if ($scope.isNewRelatedItem(item.id)) {
                $scope.relatedInterviews.unshift(item);
            }
        };
        $scope.isNewRelatedItem = function (id) {
            return !$scope.relatedInterviews.isElementExistById(id);
        };
        $scope.tableParams = infrastructure.tableParams($scope.search, $scope.filters, 10);


    });