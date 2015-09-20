'use strict';

/**
 * @ngdoc function
 * @name sportzflixApp.controller:ChangeemailCtrl
 * @description
 * # ChangeemailCtrl
 * Controller of the sportzflixApp
 */
angular.module('sportzflixApp')
  .controller('ChangeemailCtrl', function ($scope, profileUpdateService, user, UserApp) {
    $scope.form = {};
    $scope.fields = [
      {
        type: 'input',
        key: 'email',
        templateOptions:{
          type: 'email',
          label: 'New Email',
          required: true
        }
      }
    ]

    $scope.changeEmail = function (){
      UserApp.User.save({
          user_id: user.current.user_id,
          email: $scope.form.email
    });
      user.getCurrent().then(function(result){
        $scope.$close($scope.form.email)
      });


    }


  });
