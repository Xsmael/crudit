
angular.module("!<appname>!", ['faye','ui.router','ngBootbox',])

   .config( function($stateProvider, $urlRouterProvider) {
       $stateProvider
       .state('home', {
           url: '/',
           controller: 'HomeController',
           templateUrl: 'templates/home.html'
        })
        
        
            .state('Ticket', {
                url: '/Ticket',
                controller: "TicketController",
            })
        
            .state('Parcel', {
                url: '/Parcel',
                controller: "ParcelController",
            })
        
            .state('Trip', {
                url: '/Trip',
                controller: "TripController",
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
    

.controller("TicketController",function($scope, $rootScope, FayeFactory){
    $scope.Tickets= [];

    $scope.create= function(o) {
        FayeFactory.publish('/create/Ticket', o);    
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/Ticket', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/Ticket', o);        
    }

    FayeFactory.subscribe('/list/Ticket', function(objs) {
        $scope.vehicles= objs;
        console.log(objs);
    });
    
    FayeFactory.publish('/list-req/Ticket', {});
    console.warn("TicketController");
})

.controller("ParcelController",function($scope, $rootScope, FayeFactory){
    $scope.Parcels= [];

    $scope.create= function(o) {
        FayeFactory.publish('/create/Parcel', o);    
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/Parcel', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/Parcel', o);        
    }

    FayeFactory.subscribe('/list/Parcel', function(objs) {
        $scope.vehicles= objs;
        console.log(objs);
    });
    
    FayeFactory.publish('/list-req/Parcel', {});
    console.warn("ParcelController");
})

.controller("TripController",function($scope, $rootScope, FayeFactory){
    $scope.Trips= [];

    $scope.create= function(o) {
        FayeFactory.publish('/create/Trip', o);    
    }
    $scope.update= function(o) {
        FayeFactory.publish('/update/Trip', o);        
    }
    $scope.delete= function(o) {
        FayeFactory.publish('/delete/Trip', o);        
    }

    FayeFactory.subscribe('/list/Trip', function(objs) {
        $scope.vehicles= objs;
        console.log(objs);
    });
    
    FayeFactory.publish('/list-req/Trip', {});
    console.warn("TripController");
})

