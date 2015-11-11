'use strict';

/**
 * @ngdoc function
 * @name sportzflixApp.controller:ChannelCtrl
 * @description
 * # ChannelCtrl
 * Controller of the sportzflixApp
 */
angular.module('sportzflixApp')
  .controller('ChannelCtrl', function ($routeParams, limelightService, $scope, _, $filter, $window, $compile, $location) {



      //set body background styles away from the stupid front page stuff
      $("body").css('background', 'none');
      $("body").css('background-color', '#212121');

        //current episode and season vars
        $scope.currentSeason;
        $scope.currentEpisode;


       //var used in rerenderingEpisodes on the carousel
        $scope.rerenderEpisodes = false;
        $scope.rerenderPlayer = false;

      // retrieve the episode ID from the url with route params
      var episodeId = $routeParams.episodeId;
      var channelId = $routeParams.channelId;


      //grab current episode from url var and assign appropriate season
      var grabEpisode = function(myArray, episodeNumber){
          var obj = _.find(myArray, function(obj) { return obj.id == episodeNumber })
          return obj
      }

      //filter through the episodes and grab only the one in the current season
      $scope.grabEpisodesInSeason = function(myArray, season) {
          var episodes = []
          angular.forEach(myArray, function(key,value){
              console.log(key,value.season)
              if(key.season.id == season.id){
                   episodes.push(key)
              }
          })
          console.log('episodes',episodes)
          $scope.episodesInCurrentSeason = episodes
          $scope.rerenderEpisodes = true;
          $scope.rerenderEpisodes = false;
      }

      // fetch the channel and episode information from the server and set it to a scope variable
      limelightService.getChannelData(channelId).success(function(data){

            $scope.channel = data;
            $scope.currentEpisode = grabEpisode($scope.channel.episodes, episodeId);
           $scope.currentSeason = $scope.currentEpisode.season;
          $scope.grabEpisodesInSeason($scope.channel.episodes, $scope.currentSeason)
          $scope.rerenderPlayer = true;
          $scope.rerenderPlayer = false;


      })




    //overwrite the go to channel page to play a video
    $scope.goToPlayer = function(episode, channel) {

        $scope.currentEpisode = episode;
        $location.path("/channel/" + $scope.channel.id + '/' + $scope.currentEpisode.id)


    }








  });
