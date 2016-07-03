
"use strict";

var newsItemServices = angular.module("newsItemServices", ["ngResource"]);

newsItemServices.factory("newsItemService",
    function ($resource, $http, apiUrl) {

        var newsItemService = $resource(apiUrl + "newsItem/:id", {}, {
            get: { method: "GET", cache: false, isArray: false },
            create: { method: "POST", cache: false, isArray: false },
            update: { method: "PUT", cache: false, isArray: false },
            delete: { method: "DELETE", cache: false, isArray: false }
        });

        newsItemService.getNewsItems = function (pageIndex, pageSize) {
            return $resource(apiUrl + "newsItem/getNewsToBeRelated", { pageIndex: pageIndex, pageSize: pageSize }, { get: { method: "GET", cache: false, isArray: false } }).get();
        };

        newsItemService.search = function (title, newsItemId, publishedOn, pageIndex, pageSize, isPublished) {
            title = title || undefined;
            isPublished = isPublished || undefined;
            return $resource(apiUrl + "newsItem/getBySpec", { title: title, newsItemId: newsItemId, publishedOn: publishedOn, isPublished: isPublished, pageIndex: pageIndex, pageSize: pageSize }, { get: { method: "GET", cache: false, isArray: false } }).get();
        };

        newsItemService.searchInfograph = function (title, newsItemId, publishedOn, pageIndex, pageSize, isPublished) {
            title = title || undefined;
            isPublished = isPublished || undefined;
            return $resource(apiUrl + "newsItem/GetInfographBySpec", { title: title, newsItemId: newsItemId, publishedOn: publishedOn, isPublished: isPublished, pageIndex: pageIndex, pageSize: pageSize }, { get: { method: "GET", cache: false, isArray: false } }).get();
        };
        return newsItemService;
    }
);