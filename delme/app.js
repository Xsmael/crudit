
angular.module("!<app-name>!", ['faye','ui.router','ngBootbox',])

   .config( function($stateProvider, $urlRouterProvider) {
       $stateProvider
       .state('home', {
           url: '/',
           controller: 'HomeController',
           templateUrl: 'templates/home.html'
        })
        
        !!>multiply
            .state('!<model>!', {
                url: '/!<model>!',
                controller: "!<model>!Controller",
            })
        <!!
            ;
            $urlRouterProvider.otherwise('/');
        })
        
        /*
        .config(function(NotificationProvider) {
            NotificationProvider.setOptions({
                delay: 5000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'bottom'
            });
        })*/ 
    .factory('FayeFactory', function($faye, $rootScope) {
            return $faye("http://localhost:!<faye-port>!/");
    })
      
    .service('SoundNotif', function () {
        this.play= function(which) {
            var primary = new Audio('sounds/primary.mp3');
            var info = new Audio('sounds/info.mp3');
            var success = new Audio('sounds/success.mp3');
            var warning = new Audio('sounds/warning.mp3');
            var danger = new Audio('sounds/danger.mp3');
            switch (which) {
                case 'critical':
                critical.play();
                break;
                case 'warning':
                warning.play();
                break;
                case 'error':
                error.play();
                break;
                case 'success':
                success.play();
                break;
                
            }
        };
    })
    
!!>multiply
.controller("!<model>!Controller",function($scope, $rootScope, FayeFactory){
    $scope.!<smodel>!= [];

    $scope.create= function(o) {
        FayeFactory.publish('/create/!<model>!', o);    
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/!<model>!', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/!<model>!', o);        
    }

    FayeFactory.subscribe('/list/!<model>!', function(objs) {
        $scope.vehicles= objs;
        console.log(objs);
    });
    
    FayeFactory.publish('/list-req/!<model>!', {});
    console.warn("!<model>!Controller");
})
<!!
