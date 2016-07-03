
"use strict";

var albumServices = angular.module("albumServices", ["ngResource"]);

albumServices.factory("albumService",
    function ($resource, $http, apiUrl) {

        var albumService = $resource(apiUrl + "album/:id", {}, {
            get: { method: "GET", cache: false, isArray: false },
            create: { method: "POST", cache: false, isArray: false },
            update: { method: "PUT", cache: false, isArray: false },
            delete: { method: "DELETE", cache: false, isArray: false }
        });

        albumService.getalbums = function (pageIndex, pageSize) {
            return $resource(apiUrl + "album", { pageIndex: pageIndex, pageSize: pageSize }, { get: { method: "GET", cache: false, isArray: false } }).get();
        };

        albumService.SearchAlbums = function ()
        {
            return $resource(apiUrl + "album/GetBySpec?title=:title", {}, {
                get: { method: 'GET', params: { title: '0' }, cache: false, isArray: true }
            });
        }

        albumService.search = function (title, newsItemId, publishedOn, pageIndex, pageSize, isPublished) {
            title = title || undefined;
            isPublished = isPublished || undefined;
            return $resource(apiUrl + "album/getBySpec", { title: title, newsItemId: newsItemId, publishedOn: publishedOn,isPublished:isPublished, pageIndex: pageIndex, pageSize: pageSize }, { get: { method: "GET", cache: false, isArray: false } }).get();
        };
        return albumService;
    }
);