(function () {
    'use strict';

    angular.module('app').config(errorPageConfig);

    errorPageConfig.$inject = ['$stateProvider'];
    function errorPageConfig($stateProvider) {
        $stateProvider.state('404', {
            views: {
                'header@': {
                    templateUrl:  '/scripts/app/hr/shared/header.template.html'
                },
                'content@': {
                    templateUrl:  '/scripts/app/hr/error-pages/error.template.html'
                },
                'footer@': {
                    templateUrl:  '/scripts/app/hr/shared/footer.template.html'
                }
            }
        });
    }
})();