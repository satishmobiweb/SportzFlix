'use strict';

/**
 * @ngdoc directive
 * @name sportzflixApp.directive:limelightplayer
 * @description
 * # limelightplayer
 */




angular.module('sportzflixApp')
  .directive('limelightplayer', function ($timeout) {



    return {
      templateUrl: 'views/limelightplayer.html',
      restrict: 'E',
      scope: {
          media: '@'
      },

      link: function (scope, elem, attrs) {

          console.log('media id in attrs',attrs.media)
          //console.log(LimelightPlayerUtil)

          function limelightPlayerCallback(playerId, eventName, data) {
            var id = "limelight_player_406354";
            if (eventName == 'onPlayerLoad' && (LimelightPlayer.getPlayers() == null || LimelightPlayer.getPlayers().length == 0)) {
                LimelightPlayer.registerPlayer(id);
            }
        }
             $timeout(function() {
      LimelightPlayerUtil.initEmbed('limelight_player_406354');

      }, 1000)





      }
    };
  });
