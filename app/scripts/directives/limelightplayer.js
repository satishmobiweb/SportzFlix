'use strict';

/**
 * @ngdoc directive
 * @name sportzflixApp.directive:limelightplayer
 * @description
 * # limelightplayer
 */

angular.module('sportzflixApp')
  .directive('limelightplayer', function () {
    return {
      templateUrl: 'views/limelightplayer.html',
      restrict: 'E',
      scope: {
          media: '@'
      },

      link: function (scope, elem, attrs) {

          console.log(attrs.media)
          //console.log(LimelightPlayerUtil)

          
          LimelightPlayerUtil.initEmbed('limelight_player_95243');


      }
    };
  });
