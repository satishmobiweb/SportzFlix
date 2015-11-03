'use strict';

/**
 * @ngdoc function
 * @name sportzflixApp.controller:BillinghistoryCtrl
 * @description
 * # BillinghistoryCtrl
 * Controller of the sportzflixApp
 */
angular.module('sportzflixApp')
  .controller('BillinghistoryCtrl', function (profileUpdateService, user, $scope) {
    profileUpdateService.getBillingHistory(user.current.user_id).success(function(data){
        $scope.billingHistory = data
        console.log($scope.billingHistory)
      })
  });
