(function() {
    'use strict'; 

    angular.module('app').config(AppConfig); 

    AppConfig.$inject = ['$locationProvider', '$urlRouterProvider'];
    function AppConfig($locationProvider, $urlRouterProvider) {        
        $locationProvider.html5Mode(true); 

        $urlRouterProvider.otherwise(function($injector, $location){
            var state = $injector.get('$state');
            state.go('404');
            return $location.path();
        });
    }
})();
