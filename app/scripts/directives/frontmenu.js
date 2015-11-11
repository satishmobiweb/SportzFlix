'use strict';

/**
 * @ngdoc directive
 * @name sportzflixApp.directive:frontmenu
 * @description
 * # frontmenu
 */
angular.module('sportzflixApp')
  .directive('frontmenu', function () {
    return {
      templateUrl: 'views/frontmenu.html',
      restrict: 'EA'

    }
  });
