'use strict';

/**
 * @ngdoc function
 * @name sportzflixApp.controller:BrowsevideoCtrl
 * @description
 * # BrowsevideoCtrl
 * Controller of the sportzflixApp
 */
angular.module('sportzflixApp')
  .controller('BrowsevideoCtrl', function (limelightService, $scope, $modal, $location, $interval, auth) {

        //make sure user has access granted in profile
        auth.getProfile().then(function(p){

            if(p.user_metadata == undefined){
                $location.path('/addpayment');
            }
            else if (p.user_metadata.access == undefined || p.user_metadata.access == false){
                $location.path('/addpayment');
            }
            else{

            }

        })

        //set body background styles away from front page functions


        $scope.index = 0;
        //a selection of channels to display in the header carousel
        $scope.headerChannels = []

        //data binding for the currently broswed item;
        $scope.currentFocus = {}

        //events loaded var
        $scope.eventLoaded = false;


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

            }, 4000, [3])

        }

        //clears all the netflix title cards of their selected white border status
        var clearSelections = function(){
            var result = document.getElementsByClassName("netflix-title-card");
            angular.forEach(result, function(value, key){
                $('#'+value.id).css('border', '2px solid black')
            })
        }



        //set current foucs
        $scope.setFocus = function(item, channel){
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



        //grab the channel groups and channels from limelight1
        $scope.getTheChannels = limelightService.getChannels()
            $scope.getTheChannels.success(function(data){
            $scope.channels = data;


        })

        //grab the header carousel images
        limelightService.getCarousels().success(function(data){
            $scope.carousels = data;
        });

        //grab the events from the server
        limelightService.getLiveEvents().success(function(data){
            $scope.events = data;
            $scope.eventsLoaded = true;
        })


        /*
        Send user to channel page when they click on an item carousel
        * */
        $scope.goToChannelPage = function(channel){
            $location.path('/channel/'+ channel.channel_id);

        }


    //send person to the player episode page and passes the episode id.

        $scope.goToPlayer = function(item, channel){
           $location.path('/channel/'+ channel.id + '/' + item.id);
        }

    //navigate to the clicked on carousel item
    $scope.goToCarousel = function(cr){
        console.log('carouselldata', cr.link)
        $location.path(cr.link)
    }


  });
