'use strict';

/**
 * @ngdoc overview
 * @name sportzflixApp
 * @description
 * # sportzflixApp
 *
 * Main module of the application.
 */
angular
  .module('sportzflixApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-owl-carousel',
    'ui.bootstrap',
    'UserApp',
    'angularPayments'
  ])

    .constant('API_URL', 'http://127.0.0.1/api/v1/')

    .config(function($windowProvider) {
      $windowProvider.$get().Stripe.setPublishableKey('pk_test_b7DNvcW0ILbXaqffYQNo2DWU');

})

 .run(function(user) {
	user.init({ appId: '55e601b79556a' });

})

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
       templateUrl: 'views/browsevideo.html',
        controller: 'BrowsevideoCtrl',
        controllerAs: 'browsevideo'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/browsevideo', {
        templateUrl: 'views/browsevideo.html',
        controller: 'BrowsevideoCtrl',
        controllerAs: 'browsevideo'
      })
      .when('/login', {templateUrl: 'views/login.html', login: true})
      .when('/signup', {templateUrl: 'views/signup.html', public: true})

      .when('/reset-password', {templateUrl: 'views/reset-password.html', public:true})


        .when('/set-password', {templateUrl: 'views/set-password.html', set_password: true})
      .when('/addpayment', {
        templateUrl: 'views/addpayment.html',
        controller: 'AddpaymentCtrl',
        controllerAs: 'addpayment',
        public: true
      })
      .otherwise({
        redirectTo: '/browsevideo'
      });
  });
