'use strict';

/**
 * @ngdoc overview
 * @name sportzflixApp
 * @description
 * # sportzflixApp
 *
 * Main module of the application.
 */
angular
  .module('sportzflixApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-owl-carousel',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
       templateUrl: 'views/browsevideo.html',
        controller: 'BrowsevideoCtrl',
        controllerAs: 'browsevideo'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/browsevideo', {
        templateUrl: 'views/browsevideo.html',
        controller: 'BrowsevideoCtrl',
        controllerAs: 'browsevideo'
      })
      .otherwise({
        redirectTo: '/browsevideo'
      });
  });
