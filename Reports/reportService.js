var reportModule;
(function (reportModule) {
    "use strict";
    var ReportService = (function () {
        // static $inject = ['$http', 'reportSetup'];
        function ReportService($http, reportSetup) {
            this.$http = $http;
            this.reportSetup = reportSetup;
            this.apiURL = Api;
            console.log("ReportService constructor");
        }
        ReportService.prototype.getReport = function (URL) {
            var rs = this;
            this.$http.get(URL).success(function (data) {
                var blob = new Blob([data]);
                var link = document.createElement("a");
                link.href = rs.apiURL + "pdf/" + data;
                link.setAttribute("download", data + "");
                link.click();
            });
        };
        ReportService.prototype.getSelectedReports = function () {
            var selected = "";
            $.each(this.model, function (i, m) {
                selected += "\"" + m.id + "\",";
            });
            selected = selected.replace(/,\s*$/, "");
            return selected;
        };
        ReportService.prototype.getSelectedReport = function () {
            var selected = "";
            var x = null;
            $.each(this.model, function (i, m) {
                if (x == null) {
                    x = m;
                }
            });
            selected += "\"" + x.id + "\"";
            selected = selected.replace(/,\s*$/, "");
            return selected;
        };
        ReportService.prototype.GetReport = function () {
            var criteria;
            switch (this.reportSetup.currentInUse) {
                case "Ring":
                    criteria = this.reportSetup.criteria();
                    this.GetReportByRadius(criteria.Lat, criteria.Lon, criteria.Units, criteria.AreaName);
                    break;
                case "DriveTime":
                    criteria = this.reportSetup.criteria();
                    this.GetReportByDriveTime(criteria.Lat, criteria.Lon, criteria.Units, criteria.AreaName);
                    break;
                case "Address":
                    criteria = this.reportSetup.criteria();
                    //  this.GetReportByAddress(address);
                    this.GetReportByRadius(criteria.lat, criteria.lon, criteria.units, criteria.areaname);
                    break;
                case "Geography":
                    criteria = this.reportSetup.criteria();
                    this.GetReportByGeography(criteria.GeoType, criteria.GeoID);
                    break;
            }
        };
        ReportService.prototype.GetReportByRadius = function (lat, lon, units, areaname) {
            var URL = this.apiURL + "api/neustar/GetReportByRadius?lat=" + lat + "&lon=" + lon + "&reportID=" + this.getSelectedReport() + "&circles=" + units + "&AreaName=" + areaname;
            this.getReport(URL);
        };
        ReportService.prototype.GetReportByDriveTime = function (lat, lon, units, areaname) {
            var URL = this.apiURL + "api/neustar/GetReportByDriveTime?lat=" + lat + "&lon=" + lon + "&reportID=" + this.getSelectedReport() + "&units=" + units + "&AreaName=" + areaname;
            this.getReport(URL);
        };
        ReportService.prototype.GetReportByGeography = function (GeoType, GeoID) {
            var URL = this.apiURL + "api/neustar/GetReportByGeography?geoid=[" + "\"" + GeoID + "\"]" + "&geolevel=" + GeoType + "&reportIDS=" + "[" + this.getSelectedReports() + "]";
            this.getReport(URL);
        };
        ReportService.prototype.GetReportByCircle = function (lat, lon, radius) {
            radius = (radius / 1609.34);
            var URL = this.apiURL + "api/neustar/GetReportByCircle?lat=" + lat + "&lon=" + lon + "&radius=" + radius + "&reportIDS=" + "[" + this.getSelectedReports() + "]";
            this.getReport(URL);
        };
        ReportService.prototype.GetReportByAddress = function (address) {
            var URL = this.apiURL + "api/neustar/GetReportByAddress?address=" + address + "&reportIDS=" + "[" + this.getSelectedReports() + "]";
            this.getReport(URL);
        };
        ReportService.prototype.GetReportByPolyAPI = function (poly) {
            var URL = this.apiURL + "api/neustar/GetReportByPolygon?poly=" + poly + "&reportIDS=" + "[" + this.getSelectedReports() + "]";
            this.getReport(URL);
        };
        ReportService.prototype.GetCBSAData = function (geoid) {
            var URL = this.apiURL + "api/neustar/GetReportByGeography?geoid=" + "[\"" + geoid + "\"]" + "&geolevel=CBS&reportIDs=" + "[" + this.getSelectedReports() + "]";
            this.getReport(URL);
        };
        return ReportService;
    })();
    reportModule.ReportService = ReportService;
})(reportModule || (reportModule = {}));
angular.module("lba.reportModule").factory("reportService", function ($http, reportSetup) {
    return new reportModule.ReportService($http, reportSetup);
});
//# sourceMappingURL=reportService.js.map