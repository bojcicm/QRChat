(function () {
    'use strict';

    angular.module('app').config(HomeStateConfig);

    HomeStateConfig.$inject = ['$stateProvider'];
    function HomeStateConfig($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            views: {
                'header@': {
                    templateUrl:  '/scripts/app/shared/header.template.html'
                },
                'content@': {
                    templateUrl:  '/scripts/app/home/home.template.html',
                    controller:   'homeController',
                    controllerAs: 'vm'
                },
                'footer@': {
                    templateUrl:  '/scripts/app/shared/footer.template.html'
                }
            }
        });
    }
})();