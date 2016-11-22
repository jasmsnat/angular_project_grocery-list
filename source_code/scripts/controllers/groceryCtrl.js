'use strict';
angular.module("appGrocery")
    .controller("groceryCtrl",["$scope", "groceryService", function($scope, groceryService){
    
    $scope.groceryListModel = {
        itemId: "",
        shopDate: "",
        itemName: "",
        unitPrice: "",
        itemQuantity: ""
    };
    
    $scope.groceryListModelEdit = {
        itemId: "",
        shopDate: "",
        itemName: "",
        unitPrice: "",
        itemQuantity: ""
    };
        
    groceryService.groceryListObj = $scope.groceryListModel;
    $scope.groceryListArray = [];
    updateGroceryList();

    $scope.resetGroceryListModel = {};
    function resetInput() {
        $scope.groceryListModel = angular.copy($scope.resetGroceryListModel);
        groceryService.groceryListObj = $scope.groceryListModel;
    };
        
    $scope.resetGroceryListModelEdit = {};
    function resetInputEdit() {
        $scope.groceryListModelEdit = angular.copy($scope.resetGroceryListModelEdit);
        groceryService.groceryListObj = $scope.groceryListModelEdit;
    };
        
    $scope.groceryListSort = {
        sortBy: 'itemname',
        sortOrder: false,
        toggleColumn: function(columnName) {
            if($scope.groceryListSort.sortBy != columnName) {
                $scope.groceryListSort.sortBy = columnName;
                $scope.groceryListSort.sortOrder = false;
            } else {
                $scope.groceryListSort.sortOrder = !$scope.groceryListSort.sortOrder;
            }
        }
    };
        
    $scope.groceryListFunctions = {
        addItemEntry: function() {
                groceryService.addItemEntry().then(function() {
                    updateGroceryList();
                    resetInput();
                });
        },
        deleteItemEntry: function(id) {
            groceryService.deleteGroceryTable(id).then(function() {
                updateGroceryList();
            })
        },
        editItemEntry: function(editItemObj) {
            console.log(editItemObj);
            $scope.groceryListModelEdit = editItemObj;
            
        },
        updateItemEntry: function(updateItemObj) {
            console.log(updateItemObj);
            groceryService.putGroceryTable(updateItemObj).then(function() {
                updateGroceryList();
                resetInputEdit();
            });
        }
    };
    
    function updateGroceryList() {
        var groceryListPromise = groceryService.getGroceryTable();
        groceryListPromise.then(function(response) {
            $scope.groceryListArray = response;
        });
    };
        
}]);