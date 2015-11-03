'use strict';

/**
 * @ngdoc function
 * @name sportzflixApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the sportzflixApp
 */
angular.module('sportzflixApp')
  .controller('ProfileCtrl', function ($scope, profilemanagement, user, $modal, $window) {

    $("body").css('background', 'none');
      $("body").css('background-color', '#212121');

    $scope.currentUser = user.current


    profilemanagement.getProfile(user.current.user_id).success(function(d){
      $scope.profile = d
      console.log('profile', $scope.profile)
    });


      //update email modal stuff
       $scope.updateEmail = function () {

         var emailModalInstance = $modal.open({
           animation: true,
           templateUrl: 'views/changeEmail.html',
           controller: 'ChangeemailCtrl',
           backdropClass: 'modal-background',
           resolve: {
             user: function () {
               return user.current;
             }
           }


         })

         emailModalInstance.result.then(function (result) {
          $scope.currentUser.email = result
          console.log(result)

          }, function () {

          });



       }

    // change password modal stuff
      $scope.changePassword = function () {

         var passwordModalInstance = $modal.open({
           animation: true,
           templateUrl: 'views/changePassword.html',
           controller: 'ChangepasswordCtrl',
           resolve: {
             user: function () {
               return user.current;
             }
           }


         })

         passwordModalInstance.result.then(function (result) {
          $scope.currentUser.email = result
          console.log(result)

          }, function () {

          });



       }


    //update email preferences modal

        $scope.emailPreferences = function () {

         var emailPreferenceModalInstance = $modal.open({
           animation: true,
           scope: $scope,
           templateUrl: 'views/emailPreferences.html',
           controller: 'EmailpreferencesCtrl',
           resolve: {
             profile: function () {
               return $scope.profile;
             }
           }


         })

         emailPreferenceModalInstance.result.then(function (result) {
             profilemanagement.getProfile(user.current.user_id).success(function(d){
            $scope.profile = d
            console.log('profile', $scope.profile)
            });


          }, function () {

          });



       }


  //update billing modal

        $scope.updateBilling = function () {

         var updateBillingModalInstance = $modal.open({
           animation: true,
           scope: $scope,
           templateUrl: 'views/updateBillingMethod.html',
           controller: 'UpdatebillingmethodCtrl',
           resolve: {
             profile: function () {
               return $scope.profile;
             }
           }


         })

         updateBillingModalInstance.result.then(function (result) {
              profilemanagement.getProfile(user.current.user_id).success(function(d){
            $scope.profile = d
            console.log('profile', $scope.profile)
            });



          }, function () {

          });



       }


        //update billing modal

        $scope.cancelMembership = function () {

         var cancelMembershipModalInstance = $modal.open({
           animation: true,
           scope: $scope,
           templateUrl: 'views/cancelMembership.html',
           controller: 'CancelmembershipCtrl',
           resolve: {
             profile: function () {
               return $scope.profile;
             }
           }


         })

         cancelMembershipModalInstance.result.then(function (result) {
              profilemanagement.getProfile(user.current.user_id).success(function(d){
            $scope.profile = d



            });


             $scope.profile.billing_method = 'no billing method/membership canceled';


          }, function () {


          });



       }


      $scope.billingHistory = function(){

          var billingHistoryModalInstance = $modal.open({
           animation: true,
           scope: $scope,
           templateUrl: 'views/billingHistory.html',
           controller: 'BillinghistoryCtrl',
           resolve: {
             profile: function () {
               return $scope.profile;
             }
           }


         })





      }



  });
