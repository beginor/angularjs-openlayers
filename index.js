/**
 * Created by zhang on 4/9/16.
 */
/// <reference path="typings/index.d.ts" />

requirejs.config({
    paths: {
        angular: 'bower_components/angular/angular',
        ol: 'bower_components/ol3/ol-debug'
    },
    shim: {
        'angular': { exports: 'angular' }
    }
});

require(['angular', 'build/app'], function() {
    angular.bootstrap(document, ['app']);
});