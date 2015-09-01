'use strict';

/**
 * @ngdoc function
 * @name sportzflixApp.controller:BrowsevideoCtrl
 * @description
 * # BrowsevideoCtrl
 * Controller of the sportzflixApp
 */
angular.module('sportzflixApp')
  .controller('BrowsevideoCtrl', function (limelightService, $scope, $modal) {
        $scope.currentVideo = ''
        $scope.channelList = []

        function getChannels() {
            limelightService.getChannels().success(function (data) {
                angular.forEach(data.channel_list, function(value, key){
                    limelightService.getVideosInChannel(value).success(function(data){
                        console.log(value.title, data.media_list);
                        $scope.channelList.push(

                            {
                                title:value.title,
                                videos: data.media_list

                        })

                    })

                })

            })

        }
        getChannels()

    $scope.playVideo = function(videoId){
        console.log('playVideo')
        $scope.currentVideo = videoId


        var modalInstance = $modal.open({
      templateUrl: 'views/modalplayer.html',
      controller: 'ModalplayerCtrl',
             resolve: {
      currentVideo: function () {
        return $scope.currentVideo;
      },
      backdrop: false

    }


      })

    }



  });
