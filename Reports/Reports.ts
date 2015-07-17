/// <reference path="../../../scripts/global.ts" />


module app {

    export interface IReportScope extends ng.IScope
    {
        Reports: Array<Report>;
        Texts: any;
        settings: any;
        model: any;
        events: any;
        GetESR(): void;
        selectedMarker: any;
        xcGeotype: any;
        xcGeomid: any;
        
    }
 

    class Reports implements ng.IDirective {
        public restrict: string = "E";
        public scope= {
            xcGeotype:'@',
        xcGeomid:'@'
    };
        constructor() {
        }
        templateUrl: string = '~/../bower_components/mrtest/Reports/Reports.html';

        controller = ['$scope', 'reportService', '$attrs', 'reportSetup', function ($scope: IReportScope, reportService,
            $attrs, reportSetup: reportModule.IreportSetup) {
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
            $scope.Texts = { buttonDefaultText: 'Select Reports', dynamicButtonTextSuffix: ' Reports' };
            $scope.settings = { displayProp: 'text', idProp: 'value', buttonClasses: 'btn mybtn multiselect', scrollable: true };
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
                
                if ($scope.xcGeomid!="")
                {
                    reportSetup.CurrentInUse = "Geography";
                    reportSetup.Criteria = function ()
                    {
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
                           
                            GeoType:  gt,
                            GeoID: $scope.xcGeomid
                        };
                    }
                }
                reportService.GetReport();
            }
        }];

        public static getInstance(): Reports {
            return new Reports();
        }
    }

    angular.module(NameSpace).directive("reports",() => Reports.getInstance());
}