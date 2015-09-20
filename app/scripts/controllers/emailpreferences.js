'use strict';

/**
 * @ngdoc function
 * @name sportzflixApp.controller:EmailpreferencesCtrl
 * @description
 * # EmailpreferencesCtrl
 * Controller of the sportzflixApp
 */
angular.module('sportzflixApp')
  .controller('EmailpreferencesCtrl', function ($scope, profileUpdateService, user) {

    $scope.form ={}
      $scope.fields = [
      {
        type: 'checkbox',
        key: 'newsletter',
        defaultValue: $scope.profile.newsletter,
        templateOptions:{
          type: 'checkbox',
          label: 'SportzFilx Monthly Newsletter',

        }
      },

      {
        type: 'checkbox',
        key: 'whats_new',
        defaultValue: $scope.profile.whats_new,
        templateOptions:{
          type: 'checkbox',
          label: 'Weekly "What\'s New" Announcements',

        }
      },
      {
        type: 'checkbox',
        key: 'event_updates',
        defaultValue: $scope.profile.event_updates,
        templateOptions:{
          type: 'checkbox',
          label: 'Live Event Updates',

        }
      },


    ]
      $scope.submitPreferences = function(){
        profileUpdateService.changeEmailPreferences($scope.form, user.current.user_id)
        $scope.$close();

      }

  });
