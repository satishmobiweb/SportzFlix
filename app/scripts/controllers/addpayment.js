'use strict';

/**
 * @ngdoc function
 * @name sportzflixApp.controller:AddpaymentCtrl
 * @description
 * # AddpaymentCtrl
 * Controller of the sportzflixApp
 */
angular.module('sportzflixApp')
  .controller('AddpaymentCtrl', function ($scope, $http, paymentmethodservice, user, $location, $route) {
    //used to log cc data before tokeniztion by stripe
  $scope.card = {}
  $scope.cardHasError = false
  $scope.paymentSuccess = false;
  $scope.paypalSuccess = false;
  $scope.showPaypalError = false;

  $scope.navigateToVideo = function(){
        $location.path('/browsevideo')
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
                $scope.paymentSuccess = true;
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
                        $scope.paypalSuccess = true;
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
