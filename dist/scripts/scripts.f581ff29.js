"use strict";angular.module("bcApp",["ngCookies","ngSanitize","ngResource","ngRoute"]).config(["$routeProvider","$locationProvider","$httpProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/user",{templateUrl:"views/user.html",controller:"UserCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location",function(a,b){a.currentUser={auth:!1},b.path("/")}]),angular.module("bcApp").controller("LoginCtrl",["$scope","$http","apiurl","$location","$rootScope",function(a,b,c,d,e){a.user={email:"test@odesk2.com",password:"password"},a.errors={},a.login=function(){a.submitted=!0;var f=JSON.stringify({username:a.user.email,password:a.user.password});b({method:"POST",withCredentials:!0,url:c+"auth",headers:{"Content-Type":"application/json; charset=utf-8"},data:f}).success(function(a){e.currentUser={auth:!0,id:a.id,email:a.username},d.path("/")}).error(function(){e.currentUser={auth:!1}})}}]),angular.module("bcApp").controller("MainCtrl",["$scope",function(){}]),angular.module("bcApp").controller("NavbarCtrl",["$scope","$location","$http","$rootScope","apiurl","$timeout","$log",function(a,b,c,d,e,f){a.logout=function(){c({method:"GET",withCredentials:!0,url:e+"logout",headers:{"Content-Type":"application/json; charset=utf-8"}}),d.currentUser={auth:!1},f(function(){console.log("http://104.236.35.119/api/logout response 302 Moved Temporarily"),b.path("/")},1e3)}}]),angular.module("bcApp").controller("UserCtrl",["$scope","$http","apiurl","$rootScope",function(a,b,c,d){a.userdata={},d.currentUser.auth||$location.path("/");var e=d.currentUser;b({method:"GET",withCredentials:!0,url:c+"org/"+e.id+"/user/"+e.email+".json",headers:{"Content-Type":"application/json; charset=utf-8"}}).success(function(b){a.userdata=b}).error(function(){})}]),angular.module("bcApp").constant("apiurl","http://104.236.35.119/api/"),angular.module("bcApp").service("user",function(){});