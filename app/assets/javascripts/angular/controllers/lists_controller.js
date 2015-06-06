
app.factory('Lists', ['$resource',function($resource){
    return $resource('/lists.json', {},{
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}]);

app.factory('List', ['$resource', function($resource){
    return $resource('/lists/:id.json', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} }
    });
}]);

app.factory('Item', function($resource) {
    return $resource('/lists/:listId/items/:id.json', {listId: '@listId', id: '@id'});
});

app.controller("ListCtr", ['$scope', '$resource', 'Lists', 'List', '$location', function($scope, $resource, Lists, List, $location) {
    $scope.lists = Lists.query();
    $scope.deleteList = function (listId) {
        if (confirm("Are you sure you want to delete this List?")){
            List.delete({ id: listId }, function(){
                $scope.lists = Lists.query();
                $location.path('/');
            });
        }
    };
    $scope.save = function () {
//        if ($scope.listForm.$valid){
        Lists.create({list: $scope.list}, function(list){
            $location.path('/');
        }, function(error){
            console.log(error)
        });
//        }
    }
}]);

app.controller('ListShowCtr',function($scope, $resource, List, Item, $location, $routeParams) {
    $scope.list = List.get({id: $routeParams.id})
});

app.controller('ItemsCtrl', function($scope, $http, List, Item, $routeParams) {
    $scope.list = List.get({id: $routeParams.id});
    $scope.items = Item.query({listId: $routeParams.id});
     $scope.updateList = function(data) {
        return $http.patch('/lists/' + $scope.list.id, {id: $scope.list.id, name: data});
      };
      $scope.updateItem = function(data,obj) {
        return $http.patch('/lists/' + $scope.list.id + '/items/' + obj.id, { name: data});
      };
    $scope.save = function() {
        var obj = new Item({name: $scope.name, listId: $routeParams.id});
        obj.$save(function(response) {
            $scope.items.unshift(response);
            $scope.name = ""
        }, function(response) {
            $scope.errors = response.data.errors;
        });
    };

    $scope.destroy = function(index) {
     Item.remove({listId: $scope.items[index].list_id,id: $scope.items[index].id}, function() {
      $scope.items.splice(index, 1);
      });
     }
});
