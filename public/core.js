// public/core.js

'use strict';

var gordonzMeetups = angular.module('gordonzMeetups', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/meetups')
        .success(function(data) {
            $scope.meetups = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
	
	// when submitting the add form, send the text to the node API
    $scope.createMeetups = function() {
        $http.post('/api/meetups', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.meetups = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteMeetups = function(id) {
        $http.delete('/api/meetups/' + id)
            .success(function(data) {
                $scope.meetups = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
