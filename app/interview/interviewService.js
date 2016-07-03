
"use strict";

var interviewServices = angular.module("interviewServices", ["ngResource"]);

interviewServices.factory("interviewService",
    function ($resource, $http, apiUrl) {

        var interviewService = $resource(apiUrl + "interview/:id", {}, {
            get: { method: "GET", cache: false, isArray: false },
            create: { method: "POST", cache: false, isArray: false },
            update: { method: "PUT", cache: false, isArray: false },
            delete: { method: "DELETE", cache: false, isArray: false }
        });

        interviewService.getInterviews = function (pageIndex, pageSize) {
            return $resource(apiUrl + "interview", { pageIndex: pageIndex, pageSize: pageSize }, { get: { method: "GET", cache: false, isArray: false } }).get();
        };

        interviewService.search = function (title, newsItemId, publishedOn, pageIndex, pageSize) {
            title = title || undefined;
            return $resource(apiUrl + "interview/getBySpec", { title: title, newsItemId: newsItemId, publishedOn: publishedOn, pageIndex: pageIndex, pageSize: pageSize }, { get: { method: "GET", cache: false, isArray: false } }).get();
        };
        return interviewService;
    }
);