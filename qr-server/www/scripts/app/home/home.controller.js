(function () {
    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['$http'];

    function HomeController($http) {
        var vm = this;

        vm.guid = '';

        getGuid();
        function getGuid(){
            if(isGuidActiveInLocalStorage()){
                vm.guid = 'localStorage.guid';
                return;
            }
            $http.get('http://localhost:3000/api/users')
            .success(function(data){
                vm.guid = data;
            });
        }

        function isGuidActiveInLocalStorage(){
            return false;
        }
    }
})();