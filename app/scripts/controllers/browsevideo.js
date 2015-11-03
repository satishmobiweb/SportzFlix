'use strict';

/**
 * @ngdoc function
 * @name sportzflixApp.controller:BrowsevideoCtrl
 * @description
 * # BrowsevideoCtrl
 * Controller of the sportzflixApp
 */
angular.module('sportzflixApp')
  .controller('BrowsevideoCtrl', function (limelightService, $scope, $modal, user, $location, $interval) {

        //set body background styles away from front page functions
        $("body").css('background', 'none');
      $("body").css('background-color', '#212121');

        $scope.index = 0;
        //a selection of channels to display in the header carousel
        $scope.headerChannels = []

        //data binding for the currently broswed item;
        $scope.currentFocus = {}


        var rotateImage = function(item){

            var count = 0;
            $interval(function(){
                if(count == 2){
                    $('.image-holder').css('background-image', 'url("images/Gradientprv.png"), url("' + item.thumbs[count] + '")')
                    count = 0;
                }
                else{
                    $('.image-holder').css('background-image', 'url("images/Gradientprv.png"), url("' + item.thumbs[count] + '")')
                    count = count + 1;
                }
                    console.log('count', count)
            }, 4000, [3])

        }

        //clears all the netflix title cards of their selected white border status
        var clearSelections = function(){
            var result = document.getElementsByClassName("netflix-title-card");
            console.log(result);
            angular.forEach(result, function(value, key){
                $('#'+value.id).css('border', '2px solid black')
            })
        }



        //set current foucs
        $scope.setFocus = function(item, channel){
            console.log(item)
            console.log('set focus')
            $scope.currentFocus = item;
            //set all other channel displays to none
            angular.forEach($scope.channels, function(value,key){

                $('#'+value.id).css('display', 'none')
            });
            //set the channels background image

            $('.image-holder').css('background-image', 'url("images/Gradientprv.png"),url("' + item.thumbs[0] + '")');
            rotateImage(item)
            //set the correct channels subdescription to display
            $('#'+channel).css('display', 'block');

            //make sure we unset the white border for any previously selected items.
            clearSelections();

            //set a white border on the selected item
            $('#'+item.media_id).css('border', '4px solid white')

        }

        $scope.closeFocus = function(channelId) {
            $('#'+channelId).css('display', 'none');
            clearSelections()
        }


        //check auth and redirect
        if (!user.hasPermission('access')){
            console.log('goaway')
            $location.path('/addpayment')
        }




        //grab the channel groups and channels from limelight1
        limelightService.getChannels().success(function(data){
            $scope.channels = data;
            console.log($scope.channels);

        })

        //grab the header carousel images
        limelightService.getCarousels().success(function(data){
            $scope.carousels = data;
            console.log($scope.carousels)
        })


        /*
        Send user to channel page when they click on an item carousel
        * */
        $scope.goToChannelPage = function(channel){
            $location.path('/channel/'+ channel.channel_id);

        }

        //play the video in a pop up modal when the user clicks on the image
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
