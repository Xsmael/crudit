


angular.module("!<app-name>!", ['faye','ui.router','ngBootbox',])

   .config( function($stateProvider, $urlRouterProvider) {
       $stateProvider
       .state('home', {
           url: '/',
           controller: 'HomeController',
           templateUrl: 'templates/home.html'
        })
        
        
            .state('user', {
                url: '/user',
                controller: "userController",
            })
        
            .state('account', {
                url: '/account',
                controller: "accountController",
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
    

.controller("userController",function($scope, $rootScope, FayeFactory){
    $scope.users= [];

    $scope.create= function(o) {
        FayeFactory.publish('/create/user', o);    
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/user', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/user', o);        
    }

    FayeFactory.subscribe('/list/user', function(objs) {
        $scope.vehicles= objs;
        console.log(objs);
    });
    
    FayeFactory.publish('/list-req/user', {});
    console.warn("userController");
})

.controller("accountController",function($scope, $rootScope, FayeFactory){
    $scope.account= [];

    $scope.create= function(o) {
        FayeFactory.publish('/create/account', o);    
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/account', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/account', o);        
    }

    FayeFactory.subscribe('/list/account', function(objs) {
        $scope.vehicles= objs;
        console.log(objs);
    });
    
    FayeFactory.publish('/list-req/account', {});
    console.warn("accountController");
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
})

