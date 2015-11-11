'use strict';

/**
 * @ngdoc directive
 * @name sportzflixApp.directive:menu
 * @description
 * # menu
 */
angular.module('sportzflixApp')
  .directive('menu', function () {
    return {

      templateUrl: 'views/menu.html' ,
      restrict: 'EA'

    }
  });
