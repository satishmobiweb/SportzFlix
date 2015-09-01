'use strict';

/**
 * @ngdoc service
 * @name sportzflixApp.limelight.service
 * @description
 * # limelight.service
 * Factory in the sportzflixApp.
 */
angular.module('sportzflixApp')
  .service('limelightService', function ($http) {
    // Service logic
    // ...


    var orgainizationId  = '5c892c67bc7d4f84840a764b636d6c24';
    var apiUrl =  'http://api.video.limelight.com/rest/organizations/' + orgainizationId + '/';
    var accessKey = 'KPlI6GJoSub9tchJcI7pgw2LUk0=.player';
    var secret = 'u715FblWOlaAb5lKBxpT9t0ZQ3s'

    this.getChannels = function(){
        return $http.get(apiUrl + 'channels.json?access_key=' + accessKey);
    }

    this.getVideosInChannel= function(channel){
        return $http.get(apiUrl + 'channels/' + channel.channel_id + '/media.json?access_key=' + accessKey);

    }




    // Public API here
  });
