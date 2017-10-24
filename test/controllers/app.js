


angular.module("!<app-name>!", ['faye','ui.router','ngBootbox',])

   .config( function($stateProvider, $urlRouterProvider) {
       $stateProvider
       .state('home', {
           url: '/',
           controller: 'HomeController',
           templateUrl: 'templates/home.html'
        })
        
        
            .state('User', {
                url: '/User',
                controller: "UserController",
            })
        
            .state('Account', {
                url: '/Account',
                controller: "AccountController",
            })
        
            .state('Vehicle', {
                url: '/Vehicle',
                controller: "VehicleController",
            })
        
            
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
    

.controller("UserController",function($scope, $rootScope, FayeFactory){
    $scope.Users= [];

    $scope.create= function(o) {
        FayeFactory.publish('/create/User', o);    
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/User', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/User', o);        
    }

    FayeFactory.subscribe('/list/User', function(objs) {
        $scope.vehicles= objs;
        console.log(objs);
    });
    
    FayeFactory.publish('/list-req/User', {});
    console.warn("UserController");
})

.controller("AccountController",function($scope, $rootScope, FayeFactory){
    $scope.Account= [];

    $scope.create= function(o) {
        FayeFactory.publish('/create/Account', o);    
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/Account', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/Account', o);        
    }

    FayeFactory.subscribe('/list/Account', function(objs) {
        $scope.vehicles= objs;
        console.log(objs);
    });
    
    FayeFactory.publish('/list-req/Account', {});
    console.warn("AccountController");
})

.controller("VehicleController",function($scope, $rootScope, FayeFactory){
    $scope.Vehicle= [];

    $scope.create= function(o) {
        FayeFactory.publish('/create/Vehicle', o);    
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/Vehicle', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/Vehicle', o);        
    }

    FayeFactory.subscribe('/list/Vehicle', function(objs) {
        $scope.vehicles= objs;
        console.log(objs);
    });
    
    FayeFactory.publish('/list-req/Vehicle', {});
    console.warn("VehicleController");
});




