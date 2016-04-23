angular.module('meetupService', [])

    .factory('Meetups', ['$http', function ($http) {
        return {
            get : function () {
                return $http.get('/api/meetups');
            },
            create : function (meetupData) {
                return $http.post('/api/meetups', meetupData);
            },
            delete : function (id) {
                return $http.delete('/api/meetups/' + id);
            }
        }
    }]);


