// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
      StatusBar.hide();
    }

		$rootScope.$on('$cordovaLocalNotification:schedule',
			function (event, notification, state) {
				console.log("SCHEDULE");
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});

		$rootScope.$on('$cordovaLocalNotification:trigger',
			function (event, notification, state) {
				console.log("TRIGGER");
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});

		$rootScope.$on('$cordovaLocalNotification:update',
			function (event, notification, state) {
				console.log('UPDATE');
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});

		$rootScope.$on('$cordovaLocalNotification:cancel',
			function (event, notification, state) {
				console.log('CANCEL');
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});
  });
})

.constant('API_ENDPOINT', {
    host: 'http://112.74.57.41',
    port: 8080,
    path: '',
    needsAuth: false
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    },
    resolve: {
      filters: function(filterFactory) {
          return filterFactory.getFilters();
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
