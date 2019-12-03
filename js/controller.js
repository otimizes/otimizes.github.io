var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {

    $scope.works = null;

    var xmlTransform = function (data) {
        console.log("transform data");
        var x2js = new X2JS();
        var json = x2js.xml_str2json(data);
        return json;
    };

    $http.get("https://raw.githubusercontent.com/SBSE-UEM/OPLA-Tool/master/works.xml")
        .then(function (response) {
            $scope.works = xmlTransform(response.data)["works"]["work"];
            console.log($scope.works)
        });
});