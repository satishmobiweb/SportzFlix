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
      'formlyBootstrap',
        'angular-flexslider',
        'angular-carousel',
        'slick'



  ])

    .constant('API_URL', 'https://calm-falls-3900.herokuapp.com/')
    .constant('clientTokenPath', 'https://calm-falls-3900.herokuapp.com/' + 'braintree_token')

    .config(function($windowProvider, $httpProvider) {
      $windowProvider.$get().Stripe.setPublishableKey('pk_test_b7DNvcW0ILbXaqffYQNo2DWU');
     // $httpProvider.defaults.useXDomain = true;
     // $httpProvider.defaults.withCredentials = true;
     // delete $httpProvider.defaults.headers.common["X-Requested-With"];
      $httpProvider.defaults.headers.common["Accept"] = "application/json";
      $httpProvider.defaults.headers.common["Content-Type"] = "application/json";


})


    .constant("limelightAccessKey", 'hEG/dm1MZMV1wOQTw0uMfhbQJyw=')
    .constant("limelightSecret", "X0jdkailbL62oFocu93ys2LiCv8=")


 .run(function(user, $location, $http) {
	user.init({ appId: '55e601b79556a' });
    user.onAccessDenied(function(user, route, stateParams) {
    $location.path('/addpayment');
      $("body").css('background', 'transparent url("../images/background-u2587-fr.png")  center center no-repeat');

})
    user.onAuthenticationRequired(function(route, stateParams) {
    $location.path('/about');
});

    ;


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
        public:true,
          login: true

      })
      .when('/browsevideo', {
        templateUrl: 'views/browsevideo.html',
        controller: 'BrowsevideoCtrl',
        controllerAs: 'browsevideo',
        hasPermission: ['access']
      })


      .when('/login', {templateUrl: 'views/login.html',login: true} )
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
      .when('/channel/:channelId', {
        templateUrl: 'views/channel.html',
        controller: 'ChannelCtrl',
        controllerAs: 'channel'
      })
      .otherwise({
        redirectTo: '/browsevideo',

      });
  });
