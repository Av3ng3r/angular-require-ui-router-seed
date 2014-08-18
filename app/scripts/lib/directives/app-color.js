app.lazy.directive('appColor', [function() {
    return function(scope, $element, attrs) {
        $element.css({'color': attrs.appColor});
    }
}]);
