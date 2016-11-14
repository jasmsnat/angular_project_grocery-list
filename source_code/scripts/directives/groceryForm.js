'use strict';
angular.module("appGrocery").directive("groceryForm", function() {
    return {
        restrict: "EAC",
        controller: "groceryCtrl",
        templateUrl: "/source_code/views/groceryForm.html"
    };
});