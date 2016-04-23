angular.module('meetupController', [])

    .controller('mainController', ['$scope', '$http', 'Meetups', function ($scope, $http, Meetups) {
        $scope.formData = {};
        $scope.loading = true;

    // GET - when landing on the page, get all meetups, use the service to get them
    Meetups.get()
        .success( function (data) {
            $scope.meetups = data;
            $scope.loading = false;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // CREATE - send the text to the node API
    $scope.createMeetup = function () {
        if ($scope.formData.name != undefined) {
            $scope.loading = true;
        
            Meetups.create($scope.formData)
                .success(function (data) {
                    $scope.loading = false;
                    $scope.formData = {};
                    $scope.meetups = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('ERROR ' + data); 
                }); 
        }
    };

    // DELETE - delete a meetup after schecking it
    $scope.deleteMeetup = function (id) {
        $scope.loading = true;

        Meetups.delete(id)
            .success(function (data) {
                $scope.loading = false;
                $scope.meetups = data;
            })
            .error(function (data) {
                console.log('ERROR ' + data); 
            }); 
        };
    }]);



