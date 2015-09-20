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
    'angularPayments',
    'braintree-angular',
    'cgBusy',
    'angularMoment',
    'formly',
      'formlyBootstrap'


  ])

    .constant('API_URL', 'http://127.0.0.1:8000/')
    .constant('clientTokenPath', 'http://127.0.0.1:8000/' + 'braintree_token')

    .config(function($windowProvider, $httpProvider) {
      $windowProvider.$get().Stripe.setPublishableKey('pk_test_b7DNvcW0ILbXaqffYQNo2DWU');
     // $httpProvider.defaults.useXDomain = true;
     // $httpProvider.defaults.withCredentials = true;
     // delete $httpProvider.defaults.headers.common["X-Requested-With"];
      $httpProvider.defaults.headers.common["Accept"] = "application/json";
      $httpProvider.defaults.headers.common["Content-Type"] = "application/json";


})



 .run(function(user, $location, $http) {
	user.init({ appId: '55e601b79556a' });
    user.onAccessDenied(function(user, route, stateParams) {
    $location.path('/addpayment');

});

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
        controllerAs: 'about',

      })
      .when('/browsevideo', {
        templateUrl: 'views/browsevideo.html',
        controller: 'BrowsevideoCtrl',
        controllerAs: 'browsevideo',
        hasPermission: ['access']
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
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .otherwise({
        redirectTo: '/browsevideo',

      });
  });
