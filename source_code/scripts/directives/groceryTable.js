'use strict';
angular.module("appGrocery").directive("groceryTable", function() {
    return {
        restrict: "EAC",
        controller: "groceryCtrl",
        templateUrl: "/source_code/views/groceryTable.html"
    };
});