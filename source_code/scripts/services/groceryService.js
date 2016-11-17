'use strict';
angular.module("appGrocery")
    .service("groceryService", ["$http", function($http){
    
    this.groceryListObj = {
        itemId: "",
        shopDate: "",
        itemName: "",
        unitPrice: "",
        itemQuantity: ""
//        itemTotal: ""
    }
    
    this.addItemEntry = addItemEntry;
    var that = this;
    
    this.getGroceryTable = function() {
        return $http({
            method: "GET",
            url: "/service/grocery"
        }).then(function(result) {
            return result.data;
        });
    }
    
    this.postGroceryTable = function(dataParam) {
        return $http({
            method: "POST",
            url: "/service/grocery",
            data: dataParam
        }).then(function(result) {
           return result.status; 
        });
    }
    
    this.deleteGroceryTable = function(id) {
        return $http({
            method: "DELETE",
            url: "/service/grocery/" + id
        }).then(function(result) {
            return result.data;
        });
    }
    
    this.putGroceryTable = function(dataParam) {
        return $http({
            method: "PUT",
            url: "/service/grocery/" + dataParam.itemid,
            data: dataParam
        }).then(function(result) {
            return result.data;
        });
    }
        
    function addItemEntry() {
        var newGroceryListObj = {
            shopdate: that.groceryListObj.shopDate,
            itemname: that.groceryListObj.itemName,
            unitprice: that.groceryListObj.unitPrice,
            itemquantity: that.groceryListObj.itemQuantity
        }
        return that.postGroceryTable(newGroceryListObj);
    }

}]);