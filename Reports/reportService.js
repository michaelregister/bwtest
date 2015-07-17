var reportModule;
(function (reportModule) {
    var report = (function () {
        function report() {
        }
        return report;
    })();
    reportModule.report = report;
    var reportService = (function () {
        function reportService($http, reportSetup) {
            this.$http = $http;
            this.reportSetup = reportSetup;
            this.apiURL = Api;
        }
        reportService.prototype.getReport = function (URL) {
            var rs = this;
            this.$http.get(URL).success(function (data) {
                var blob = new Blob([data]);
                var link = document.createElement('a');
                link.href = rs.apiURL + "pdf/" + data;
                link.setAttribute("download", data + "");
                link.click();
            });
        };
        reportService.prototype.getSelectedReports = function () {
            var selected = "";
            $.each(this.model, function (i, m) {
                selected += '"' + m.id + '",';
            });
            selected = selected.replace(/,\s*$/, "");
            return selected;
        };
        reportService.prototype.getSelectedReport = function () {
            var selected = "";
            var x = null;
            $.each(this.model, function (i, m) {
                if (x == null)
                    x = m;
            });
            selected += '"' + x.id + '"';
            selected = selected.replace(/,\s*$/, "");
            return selected;
        };
        reportService.prototype.GetReport = function () {
            switch (this.reportSetup.CurrentInUse) {
                case "Ring":
                    var Criteria = this.reportSetup.Criteria();
                    this.GetReportByRadius(Criteria.Lat, Criteria.Lon, Criteria.Units, Criteria.AreaName);
                    break;
                case "DriveTime":
                    var Criteria = this.reportSetup.Criteria();
                    this.GetReportByDriveTime(Criteria.Lat, Criteria.Lon, Criteria.Units, Criteria.AreaName);
                    break;
                case "Address":
                    var address = this.reportSetup.Criteria();
                    //  this.GetReportByAddress(address);
                    this.GetReportByRadius(address.lat, address.lon, address.units, address.areaname);
                    break;
                case "Geography":
                    var Geography = this.reportSetup.Criteria();
                    this.GetReportByGeography(Geography.GeoType, Geography.GeoID);
                    break;
            }
        };
        reportService.prototype.GetReportByRadius = function (lat, lon, units, areaname) {
            var URL = this.apiURL + "api/neustar/GetReportByRadius?lat=" + lat + "&lon=" + lon + "&reportID=" + this.getSelectedReport() + "&circles=" + units + "&AreaName=" + areaname;
            this.getReport(URL);
        };
        reportService.prototype.GetReportByDriveTime = function (lat, lon, units, areaname) {
            var URL = this.apiURL + "api/neustar/GetReportByDriveTime?lat=" + lat + "&lon=" + lon + "&reportID=" + this.getSelectedReport() + "&units=" + units + "&AreaName=" + areaname;
            this.getReport(URL);
        };
        reportService.prototype.GetReportByGeography = function (GeoType, GeoID) {
            var URL = this.apiURL + "api/neustar/GetReportByGeography?geoid=[" + '"' + +GeoID + '"]' + "&geolevel=" + GeoType + "&reportIDS=" + '[' + this.getSelectedReports() + ']';
            this.getReport(URL);
        };
        reportService.prototype.GetReportByCircle = function (lat, lon, radius) {
            radius = (radius / 1609.34);
            var URL = this.apiURL + "api/neustar/GetReportByCircle?lat=" + lat + "&lon=" + lon + "&radius=" + radius + "&reportIDS=" + '[' + this.getSelectedReports() + ']';
            this.getReport(URL);
        };
        reportService.prototype.GetReportByAddress = function (address) {
            var URL = this.apiURL + "api/neustar/GetReportByAddress?address=" + address + "&reportIDS=" + '[' + this.getSelectedReports() + ']';
            this.getReport(URL);
        };
        reportService.prototype.GetReportByPolyAPI = function (poly) {
            var URL = this.apiURL + "api/neustar/GetReportByPolygon?poly=" + poly + "&reportIDS=" + '[' + this.getSelectedReports() + ']';
            this.getReport(URL);
        };
        reportService.prototype.GetCBSAData = function (geoid) {
            var URL = this.apiURL + "api/neustar/GetReportByGeography?geoid=" + '["' + geoid + '"]' + "&geolevel=CBS&reportIDs=" + '[' + this.getSelectedReports() + ']';
            this.getReport(URL);
        };
        reportService.$inject = ['$http', 'reportSetup'];
        return reportService;
    })();
    reportModule.reportService = reportService;
})(reportModule || (reportModule = {}));
angular.module('app').factory('reportService', function ($http, reportSetup) {
    return new reportModule.reportService($http, reportSetup);
});
//# sourceMappingURL=reportService.js.map