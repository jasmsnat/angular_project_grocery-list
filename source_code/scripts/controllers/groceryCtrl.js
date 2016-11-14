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
    
    $scope.groceryListFunctions = {
        addItemEntry: function() {
//            alert("testing submit");
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
        
    $scope.resetGroceryListModel = {};
    function resetInput() {
        $scope.groceryListModel = angular.copy($scope.resetGroceryInput);
        groceryService.groceryListObj = $scope.groceryListModel;
    };
        
    $scope.resetGroceryListModelEdit = {};
    function resetInputEdit() {
        $scope.groceryListModelEdit = angular.copy($scope.resetGroceryListModelEdit);
        groceryService.groceryListObj = $scope.groceryListModelEdit;
    };
    
}]);