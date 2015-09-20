'use strict';

/**
 * @ngdoc function
 * @name sportzflixApp.controller:UpdatebillingmethodCtrl
 * @description
 * # UpdatebillingmethodCtrl
 * Controller of the sportzflixApp
 */
angular.module('sportzflixApp')
  .controller('UpdatebillingmethodCtrl', function ($scope, $http, paymentmethodservice, user, $location, $route) {
    //used to log cc data before tokeniztion by stripe
  $scope.card = {}
  $scope.cardHasError = false
  $scope.paymentSuccess = false;
  $scope.paypalSuccess = false;
  $scope.showPaypalError = false;
  console.log($scope.profile)

  if ($scope.profile.billing_method == "PayPal"){
    $scope.currentBillingMethod = 'PayPal account ' + $scope.profile.billing_hint;

  }

  if ($scope.profile.billing_method == "Credit Card"){
    $scope.currentBillingMethod = 'Credit Card ending in ' + $scope.profile.billing_hint;

  }

 $scope.handleStripe = function (code, result) {
    if (result.error) {
        $scope.cardHasError = true;
        window.alert('it failed! error: ' + result.error.message);
    } else {
        //call to serveryo
        console.log(result)
        console.log(user)
        $scope.chargeCard = paymentmethodservice.handleCreditCard(result.id,user.current.user_id).then(function(response){

            $scope.paymentSuccessData = response.data;
            console.log($scope.paymentSuccessData);
            user.getCurrent().then(function(currentUser){
                $scope.$close();

            })

        }, function(result){
                console.log(result.data)

            }


        )


    }
};


$scope.paypalOptions = {
               onPaymentMethodReceived: function(payload) {
                 console.log('Yay, payload with nonce:', payload);
                 $scope.callPaypal = paymentmethodservice.handlePayPal(payload.nonce, user.current.user_id, payload.details.email)

                 .then(function(response){

                     $scope.paymentSuccessData = response.data;
                     console.log($scope.paymentSuccessData);
                    user.getCurrent().then(function(currentUser){
                        $scope.$close();
                    })
                 } , function(response){
                     if(response.status == 400){
                         $scope.errorMessage = response.data;
                         $scope.showPaypalError = true;

                     }
                 }

                 )
               }
             };

  });