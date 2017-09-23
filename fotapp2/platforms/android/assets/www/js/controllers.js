angular.module('starter.controllers', ["starter.services"])

.controller('DashCtrl', function($scope, filterFactory, $http, API_ENDPOINT, $cordovaLocalNotification, $ionicPlatform) {
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
     $scope.filter ={};
     $scope.search ={};
     filterFactory.getFilters().then(function(data) {
         $scope.filter = data;
               $scope.refresh();
      })

      $scope.refresh = function(){

               var now = new Date();
               var date = formatDate(now);
               if($scope.filter.startHostFrom != "")
                   $scope.temp = '';
               jsonStr = '{';
               jsonStr +=   '"date" : '
               jsonStr +=      '"'+ date + '"'
               //start
                if($scope.filter.startHostFrom != "" && $scope.filter.startHostTo != "")
                    jsonStr += ',"details.startHost": { "$gte": "' + $scope.filter.startHostFrom + '" , "$lte": "' + $scope.filter.startHostTo + '" }'
                else if($scope.filter.startHostFrom != "")
                  {
                    jsonStr += ','
                    jsonStr += '"details.startHost": { "$gte":  "' + $scope.filter.startHostFrom + '" }';
                  }
                else if($scope.filter.startHostTo != "")
                {
                    jsonStr += ','
                    jsonStr += '"details.startHost": { "$lte":  "' + $scope.filter.startHostTo + '" }';
                }

                if($scope.filter.startPanko !="")
                {
                    jsonStr += ', "details.startPanko":"' + $scope.filter.startPanko + '"';
                }


                if($scope.filter.startGuestFrom != "" && $scope.filter.startGuestTo != "")
                    jsonStr += ',"details.startGuest": { "$gte": "' + $scope.filter.startGuestFrom + '" , "$lte": "' + $scope.filter.startGuestTo + '" }'
                else if($scope.filter.startGuestFrom != "")
                  {
                    jsonStr += ','
                    jsonStr += '"details.startGuest": { "$gte":  "' + $scope.filter.startGuestFrom + '" }';
                  }
                else if($scope.filter.startGuestTo != "")
                {
                    jsonStr += ','
                    jsonStr += '"details.startGuest": { "$lte":  "' + $scope.filter.startGuestTo + '" }';
                }

                //end
                if($scope.filter.endHostFrom != "" && $scope.filter.endHostTo != "")
                    jsonStr += ',"details.endHost": { "$gte": "' + $scope.filter.endHostFrom + '" , "$lte": "' + $scope.filter.endHostTo + '" }'
                else if($scope.filter.endHostFrom != "")
                  {
                    jsonStr += ','
                    jsonStr += '"details.endHost": { "$gte":  "' + $scope.filter.endHostFrom + '" }';
                  }
                else if($scope.filter.endHostTo != "")
                {
                    jsonStr += ','
                    jsonStr += '"details.endHost": { "$lte":  "' + $scope.filter.endHostTo + '" }';
                }

                if($scope.filter.endPanko !="")
                {
                    jsonStr += ', "details.endPanko":"' + $scope.filter.endPanko + '"';
                }


                if($scope.filter.endGuestFrom != "" && $scope.filter.endGuestTo != "")
                    jsonStr += ',"details.endGuest": { "$gte": "' + $scope.filter.endGuestFrom + '" , "$lte": "' + $scope.filter.endGuestTo + '" }'
                else if($scope.filter.endGuestFrom != "")
                  {
                    jsonStr += ','
                    jsonStr += '"details.endGuest": { "$gte":  "' + $scope.filter.endGuestFrom + '" }';
                  }
                else if($scope.filter.endGuestTo != "")
                {
                    jsonStr += ','
                    jsonStr += '"details.endGuest": { "$lte":  "' + $scope.filter.endGuestTo + '" }';
                }

                //now
                if($scope.filter.nowHostFrom != "" && $scope.filter.nowHostTo != "")
                    jsonStr += ',"details.nowHost": { "$gte": "' + $scope.filter.nowHostFrom + '" , "$lte": "' + $scope.filter.nowHostTo + '" }'
                else if($scope.filter.nowHostFrom != "")
                  {
                    jsonStr += ','
                    jsonStr += '"details.nowHost": { "$gte":  "' + $scope.filter.nowHostFrom + '" }';
                  }
                else if($scope.filter.nowHostTo != "")
                {
                    jsonStr += ','
                    jsonStr += '"details.nowHost": { "$lte":  "' + $scope.filter.nowHostTo + '" }';
                }

                if($scope.filter.nowPanko !="")
                {
                    jsonStr += ', "details.nowPanko":"' + $scope.filter.nowPanko + '"';
                }


                if($scope.filter.nowGuestFrom != "" && $scope.filter.nowGuestTo != "")
                    jsonStr += ',"details.nowGuest": { "$gte": "' + $scope.filter.nowGuestFrom + '" , "$lte": "' + $scope.filter.nowGuestTo + '" }'
                else if($scope.filter.nowGuestFrom != "")
                  {
                    jsonStr += ','
                    jsonStr += '"details.nowGuest": { "$gte":  "' + $scope.filter.nowGuestFrom + '" }';
                  }
                else if($scope.filter.nowGuestTo != "")
                {
                    jsonStr += ','
                    jsonStr += '"details.nowGuest": { "$lte":  "' + $scope.filter.nowGuestTo + '" }';
                }

                //EuroAsia
                if($scope.filter.euroAsiaHostFrom != "" && $scope.filter.euroAsiaHostTo != "")
                    jsonStr += ',"details.euroAsiaHost": { "$gte": "' + $scope.filter.euroAsiaHostFrom + '" , "$lte": "' + $scope.filter.euroAsiaHostTo + '" }'
                else if($scope.filter.euroAsiaHostFrom != "")
                  {
                    jsonStr += ','
                    jsonStr += '"details.euroAsiaHost": { "$gte":  "' + $scope.filter.euroAsiaHostFrom + '" }';
                  }
                else if($scope.filter.euroAsiaHostTo != "")
                {
                    jsonStr += ','
                    jsonStr += '"details.euroAsiaHost": { "$lte":  "' + $scope.filter.euroAsiaHostTo + '" }';
                }

                if($scope.filter.euroAsiaPanko !="")
                {
                    jsonStr += ', "details.euroAsiaPanko":"' + $scope.filter.euroAsiaPanko + '"';
                }


                if($scope.filter.euroAsiaGuestFrom != "" && $scope.filter.euroAsiaGuestTo != "")
                    jsonStr += ',"details.euroAsiaGuest": { "$gte": "' + $scope.filter.euroAsiaGuestFrom + '" , "$lte": "' + $scope.filter.euroAsiaGuestTo + '" }'
                else if($scope.filter.euroAsiaGuestFrom != "")
                  {
                    jsonStr += ','
                    jsonStr += '"details.euroAsiaGuest": { "$gte":  "' + $scope.filter.euroAsiaGuestFrom + '" }';
                  }
                else if($scope.filter.euroAsiaGuestTo != "")
                {
                    jsonStr += ','
                    jsonStr += '"details.euroAsiaGuest": { "$lte":  "' + $scope.filter.euroAsiaGuestTo + '" }';
                }


                jsonStr += '}';
            $http({
                    method: 'POST',
                    url: 'http://112.74.57.41:8080/api/games/search',
                    data: jsonStr
                  }).then(function successCallback(response) {
                       $scope.games = response.data;
                       $scope.$broadcast('scroll.refreshComplete');
                       $scope.scheduleInstantNotification();
                    }, function errorCallback(response) {
                      console.log(response.data);
                  });


      }
      function formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          return [year, month, day].join('-');
      }


})


.controller('SettingsCtrl', function($scope, $http, API_ENDPOINT,  filters, $ionicLoading) {
    $scope.positionList =[
                                         { id: '半/一', name: '半/一'},
                                      { id: '半球', name: '半球'},
                                      { id: '两/两球半', name: '两/两球半'},
                                      { id: '两球', name: '两球'},
                                      { id: '两球半', name: '两球半'},
                                      { id: '两球半/三', name: '两球半/三'},
                                      { id: '平手/半球', name: '平手/半球'},
                                      { id: '平手', name: '平手'},
                                      { id: '球半', name: '球半'},
                                      { id: '球半/两', name: '球半/两'},
                                      { id: '三球', name: '三球'},
                                      { id: '受半/一', name: '受半/一'},
                                      { id: '受半球', name: '受半球'},
                                      { id: '受两/两球半', name: '受两/两球半'},
                                      { id: '受两球', name: '受两球'},
                                      { id: '受两球半', name: '受两球半'},
                                      { id: '受平/半', name: '受平/半'},
                                      { id: '受平手', name: '受平手'},
                                      { id: '受球半', name: '受球半'},
                                      { id: '受球半/两', name: '受球半/两'},
                                      { id: '受三球', name: '受三球'},
                                      { id: '受一/球半', name: '受一/球半'},
                                      { id: '受一球', name: '受一球'},
                                      { id: '一/球半', name: '一/球半'},
                                      { id: '一球', name: '一球'}];
  $scope.submit = function(){
    $scope.show();
     $http({
          method: 'PUT',
          url: API_ENDPOINT.host + ':' + API_ENDPOINT.port + '/api/filters/59c267830613370db00e40ca',
          data: $scope.data,
          headers: {'Content-Type': 'application/json'}
      })
      .success(function(response) {
          // handle success things
          $scope.hide();
          console.log(response);
      })
      .error(function(data, status, headers, config) {
          $scope.hide();
          console.log(response);
          // handle error things
      })



  }
  $scope.data = filters;
  $scope.show = function() {
      $ionicLoading.show({
        template: 'Loading...'
      });
    };
  $scope.hide = function(){
      $ionicLoading.hide();
    };

});

