  var todoApp = angular.module('todosApp',[]);
        
        todoApp.factory('todoFactory',function($http){
          var factory = [];
          
          factory.getTodos = function(){
              return $http.get("http://api.mozenda.com/rest?WebServiceKey=541A27BE-3AC7-4A9E-8CAB-6522C7D987EE&Service=Mozenda10&Operation=Agent.GetList");  
          }

          return factory;
      });
        
        todoApp.controller('todos',['$scope', 'todoFactory', function($scope,todoFactory){

          $scope.todos = [];
          loadTodos();
          
          function loadTodos(){
            todoFactory.getTodos().success(function(data){
                agents  = x2js.xml_str2json(data).AgentGetListResponse.AgentList.Agent;
                $scope.todos = agents;
            });
        }
    }]);
//------------------------------------------------------------------
          var moduleB = angular.module("MyModuleB", []);

          moduleB.factory('infoFactory',function($http){
          var factory = [];
          
          factory.getInfo = function(){

             var url = "http://api.mozenda.com/rest?WebServiceKey=541A27BE-3AC7-4A9E-8CAB-6522C7D987EE&Service=Mozenda10&Operation=Agent.Get&AgentID=";
             url += document.getElementById('agentID').value;
             console.log(url);
              return $http.get(url);  
          }

          return factory;
       });

    moduleB.controller('MyControllerB',['$scope', 'infoFactory', function($scope,infoFactory){

      $scope.MyControllerB = [];
            loadInfo();
            
            $scope.toggle = function() {
            console.log("click");
          };
            
          function loadInfo(){
            infoFactory.getInfo().success(function(data){
                info  = x2js.xml_str2json(data).AgentGetResponse;
                console.log(info)
                $scope.MyControllerB = info;
            });
        }
    }]);
//---------------Extra Functions-------------------------------------
    

    function check(p1) {
      console.log("click");
      console.log(p1);
      document.getElementById('agentID').value=p1;
      document.getElementById('agentID').focus();
      document.getElementById('agentID').blur();
}

function checkView(p1) {
      console.log("click");
      console.log(p1);
      document.getElementById('viewID').value=p1;
      document.getElementById('viewID').focus();
      document.getElementById('viewID').blur();
}

//----------------Onchange-----------------------------------
var app2=angular.module('myApp2', []);

app2.factory('infoFactory',function($http){
          var factory = [];
          
          factory.getInfo = function(){

             var url = "http://api.mozenda.com/rest?WebServiceKey=541A27BE-3AC7-4A9E-8CAB-6522C7D987EE&Service=Mozenda10&Operation=Agent.Get&AgentID=";
             url += document.getElementById('agentID').value;
             console.log(url);
              return $http.get(url);  
          }

          return factory;
       });

app2.directive('onChange', function() {    
    return {
        restrict: 'A',
        scope:{'onChange':'=' },
        link: function(scope, elm, attrs) {            
            scope.$watch('onChange', function(nVal) { elm.val(nVal); });            
            elm.bind('blur', function() {
                var currentValue = elm.val();                
                if( scope.onChange !== currentValue ) {
                    scope.$apply(function() {
                        scope.onChange = currentValue;
                    });
                }
            });
        }
    };        
});

app2.controller('MyCtrl', ['$scope', 'infoFactory', function($scope,infoFactory) { 
    $scope.strText = document.getElementById('agentID').value;
            
            $scope.test = function() {
            $scope.MyCtrl = [];
              loadInfo();
              console.log("done");
          };


        
            
          function loadInfo(){
            infoFactory.getInfo().success(function(data){
                info  = x2js.xml_str2json(data).AgentGetResponse;
                console.log(info)
                $scope.MyCtrl = info; 
              });
          } 
    }]);

//-------------------------------------
var appViews=angular.module('myAppViews', []);
appViews.factory('viewFactory',function($http){
          var factory = [];
          
          factory.getInfo = function(){

             var url = "https://api.mozenda.com/rest?WebServiceKey=541A27BE-3AC7-4A9E-8CAB-6522C7D987EE&Service=Mozenda10&Operation=Collection.GetViews&CollectionID=";
             url += document.getElementById('viewButton').value;
             console.log(url);
              return $http.get(url);  
          }

          return factory;
       });

appViews.controller('showViews', ['$scope', 'viewFactory', function($scope,viewFactory) { 
            
            $scope.getViews = function() {
            $scope.showViews = [];
              loadViews();
              console.log("done");
          };
        
            
          function loadViews(){
            viewFactory.getInfo().success(function(data){
              console.log(data);
                info  = x2js.xml_str2json(data).CollectionGetViewsResponse.ViewList.View;
                console.log(info);
                $scope.showViews = info; 
              });
          } 
    }]);

//---------------------Get Items in a view---------------------------------------
var appViewFields=angular.module('myAppViewFields', []);

appViewFields.factory('fieldFactory',function($http){
          var factory = [];
          
          factory.getInfo = function(){

             var url = "https://api.mozenda.com/rest?WebServiceKey=541A27BE-3AC7-4A9E-8CAB-6522C7D987EE&Service=Mozenda10&Operation=Collection.GetFields&CollectionID=";
             url += document.getElementById('viewID').value;
             console.log(url);
              return $http.get(url);  
          }

          return factory;
       });

appViewFields.directive('onChangeView', function() {    
    return {
        restrict: 'A',
        scope:{'onChangeView':'=' },
        link: function(scope, elm, attrs) {            
            scope.$watch('onChangeView', function(nVal) { elm.val(nVal); });            
            elm.bind('blur', function() {
                var currentValue = elm.val();                
                if( scope.onChangeView !== currentValue ) {
                    scope.$apply(function() {
                        scope.onChangeView = currentValue;
                    });
                }
            });
        }
    };        
});

appViewFields.controller('showViewFields', ['$scope', 'fieldFactory', function($scope,fieldFactory) { 
         $scope.strView = document.getElementById('viewID').value;  
            $scope.getFields = function() {
            $scope.showViewFields = [];
              loadViewFields();
              console.log("done");
          };
        
            
          function loadViewFields(){
            fieldFactory.getInfo().success(function(data){
              console.log(data);
                info  = x2js.xml_str2json(data).CollectionGetFieldsResponse.FieldList;
                console.log("This is here");
                $scope.showViewFields = info; 

               

              });
          } 
    }]);

//------------------------------------------------------------