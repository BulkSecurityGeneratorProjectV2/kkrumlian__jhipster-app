'use strict';

define([
        'angular',
        'angular-translate',
        'angular-translate-storage-cookie',
        'angular-translate-loader-static-files',
        'tmhDinamicLocale',
        'app-constants'
    ], function( angular ) {

        return angular.module('PP-language', [
            'pascalprecht.translate',
            'tmh.dynamicLocale',
            'jhipsterAppConstants'
        ])

        .config(function($translateProvider, tmhDynamicLocaleProvider) {
            // Initialize angular-translate
            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('en');

            $translateProvider.useCookieStorage();

            tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js')
            tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');
        })

        .factory('LanguageService', function ($http, $translate, LANGUAGES) {
            return {
                getBy: function(language) {
                    if (language == undefined) {
                        language = $translate.storage().get('NG_TRANSLATE_LANG_KEY');
                    }

                    var promise =  $http.get('/i18n/' + language + '.json').then(function(response) {
                        return LANGUAGES;
                    });
                    return promise;
                }
            };
        })

        .controller('LanguageController', function ($scope, $translate, LanguageService) {
            $scope.changeLanguage = function (languageKey) {
                $translate.use(languageKey);

                LanguageService.getBy(languageKey).then(function(languages) {
                    $scope.languages = languages;
                });
            };

            LanguageService.getBy().then(function (languages) {
                $scope.languages = languages;
            });
        });
});