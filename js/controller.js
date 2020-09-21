var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {

    $scope.works = null;

    $scope.cleanStr = function (str) {
        return str.replace(/ /g, '-');
    };

    $scope.getAuthors = authors => {
        if (!authors) return [];
        let items = []
        authors.forEach((item, pos) => {
            if (items.filter(author => author.name === item.name).length <= 0) {
                items.push(item)
            }
        })
        return items;
    }

    var xmlTransform = function (data) {
        console.log("transform data");
        var x2js = new X2JS();
        var json = x2js.xml_str2json(data);
        return json;
    };

    $http.get("https://raw.githubusercontent.com/otimizes/OPLA-Tool/master/works.xml")
        .then(function (response) {
            $scope.works = xmlTransform(response.data)["works"]["work"].sort(function (a, b) {
                return b.year - a.year;
            });
            $scope.authors = $scope.works.map(function (wk) {
                return {
                    name: wk.author,
                    git: wk.git
                }
            }).filter(function (value, index, self) {
                return self.indexOf(value) === index;
            }).sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            console.log($scope.authors)
        });
});