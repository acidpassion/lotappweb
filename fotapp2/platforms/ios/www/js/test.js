angular.module('starter', ['ionic', 'ngCordova'])
  .run(function ($ionicPlatform, $rootScope) {
	$ionicPlatform.ready(function () {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
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
  .controller('SampleController',
	function ($scope, $cordovaLocalNotification, $ionicPlatform) {
		$ionicPlatform.ready(function () {

			$scope.scheduleInstantNotification = function () {
				$cordovaLocalNotification.schedule({
					id: 1,
					text: 'Instant Notification',
					title: 'Instant'
				}).then(function () {
					alert("Instant Notification set");
				});;
			};
		});
	});
