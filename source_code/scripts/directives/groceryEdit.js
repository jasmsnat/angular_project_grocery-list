'use strict';
angular.module("appGrocery").directive("groceryEdit", function() {
    return {
        restrict: "EAC",
        controller: "groceryCtrl",
        templateUrl: "/source_code/views/groceryEdit.html"
        }
});