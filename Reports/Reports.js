/// <reference path="../../scripts/global.ts" />
angular.module("lib/Reports/Reports.html", []).run(["$templateCache", function (a) { a.put("lib/Reports/Reports.html", "<div style=float:left><div ng-dropdown-multiselect=\"\" class=mselect options=Reports extra-settings=settings selected-model=model translation-texts=Texts events=events></div><button id=printESR class=\"btn mybtn\" title=\"Print Reports\" ng-click=GetESR()><i id=dIcon class=\"fa fa-print x\"></i> <i id=spinner style=display:none class=\"fa fa-spinner fa-pulse\"></i></button></div>") }]);

var reportModule;
(function (reportModule) {
    "use strict";
    var Reports = (function () {
        function Reports() {
            this.restrict = "E";
            this.scope = {
                xcGeotype: "@",
                xcGeomid: "@"
            };
            this.templateUrl = "lib/Reports/Reports.html";
            this.controller = ["$scope", "reportService", "$attrs", "reportSetup", function ($scope, reportService, $attrs, reportSetup) {
                $scope.Reports = [];
                $scope.Reports.push({ value: "R$000000001", text: "Executive Summary", active: false });
                $scope.Reports.push({ value: "R$000000003", text: "Executive Summary (1,3,5)", active: false });
                $scope.Reports.push({ value: "1", text: "ElementOne Group", active: false });
                $scope.Reports.push({ value: "2", text: "ElementOne Segment", active: false });
                $scope.Reports.push({ value: "3", text: "Demographic Fast Facts", active: false });
                $scope.Reports.push({ value: "4", text: "Demographic Snapshot", active: false });
                $scope.Reports.push({ value: "5", text: "Demographic Overview", active: false });
                $scope.Reports.push({ value: "6", text: "Business Location", active: false });
                $scope.Reports.push({ value: "7", text: "Business Sic", active: false });
                $scope.Reports.push({ value: "8", text: "Business NAICS", active: false });
                $scope.Reports.push({ value: "9", text: "Popluation Trend", active: false });
                $scope.Reports.push({ value: "10", text: "Households Trend", active: false });
                $scope.Texts = { buttonDefaultText: "Select Reports", dynamicButtonTextSuffix: " Reports" };
                $scope.settings = { displayProp: "text", idProp: "value", buttonClasses: "btn mybtn multiselect", scrollable: true };
                $scope.model = [];
                $scope.events = { onItemSelect: Select };
                function Select(item) {
                    console.log(item);
                }
                var rpt = this;
                $scope.GetESR = function () {
                    console.log($scope.model);
                    reportService.model = $scope.model;
                    reportService.reports = $scope.Reports;
                    if ($scope.xcGeomid !== "") {
                        reportSetup.currentInUse = "Geography";
                        reportSetup.criteria = function () {
                            var gt = $scope.xcGeotype;
                            switch ($scope.xcGeotype) {
                                case "State":
                                    gt = "STE";
                                    break;
                                case "County":
                                    gt = "CTY";
                                    break;
                                case "Zip code":
                                    gt = "ZIP";
                                    break;
                                case "Block groups":
                                    gt = "BLG";
                                    break;
                            }
                            return {
                                GeoType: gt,
                                GeoID: $scope.xcGeomid
                            };
                        };
                    }
                    reportService.GetReport();
                };
            }];
            console.log("Report constructor");
        }
        Reports.getInstance = function () {
            return new Reports();
        };
        return Reports;
    })();
    angular.module("lba.reportModule").directive("reports", function () { return Reports.getInstance(); });
})(reportModule || (reportModule = {}));
//# sourceMappingURL=Reports.js.map