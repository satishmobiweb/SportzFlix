'use strict';

/**
 * @ngdoc function
 * @name sportzflixApp.controller:CancelmembershipCtrl
 * @description
 * # CancelmembershipCtrl
 * Controller of the sportzflixApp
 */
angular.module('sportzflixApp')
  .controller('CancelmembershipCtrl', function ($scope, profileUpdateService, user) {
      $scope.cancellation = false
    console.log('inner profile', $scope.profile)
      $scope.cancelMembership = function(){
        $scope.cancel = profileUpdateService.cancelMembership(user.current.user_id).success(function(){
          $scope.cancellation = true;

        }).error(function(){

        })
      }
  });
