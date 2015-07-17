 
module reportModule
{
    export class report
    {
        isApplied: boolean;
        text: string;
        value: string;
    }
   export interface IreportService
    {
        apiURL: string;
        reports:  Array<report>;
    }
    export class reportService implements IreportService
    {
        apiURL: string = Api;
        reports: Array<report>;
        model: Array<Object>;
        static $inject = ['$http','reportSetup'];  
        constructor(private $http: ng.IHttpService,private reportSetup:reportModule.reportSetup)
        {

        }
        getReport(URL): void
        {
            var rs = this;
            this.$http.get(URL)
                .success(function (data) {
                var blob = new Blob([data]);
                var link = document.createElement('a');
                link.href = rs.apiURL + "pdf/" + data; 
                link.setAttribute("download",data+"");
                link.click();
            });
        }
        getSelectedReports(): string {
            var selected = "";
            $.each(this.model, function (i, m:any) {
                    selected += '"' + m.id + '",';
            });
            selected = selected.replace(/,\s*$/, "");
            return selected;
        }
        getSelectedReport(): string {
            var selected = "";
            var x = null;
            $.each(this.model, function (i, m: any) {
                if (x == null)
                    x = m;
            });
            selected += '"' + x.id + '"';
            selected = selected.replace(/,\s*$/, "");
            return selected;
        }
       

        public GetReport()
        {
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
        }
        public GetReportByRadius(lat, lon, units, areaname) {
            var URL = this.apiURL + "api/neustar/GetReportByRadius?lat=" + lat +
                "&lon=" + lon + "&reportID=" + this.getSelectedReport() + "&circles=" + units + "&AreaName=" + areaname;
            this.getReport(URL);
        }
        public GetReportByDriveTime(lat, lon, units, areaname)
        {
            var URL = this.apiURL + "api/neustar/GetReportByDriveTime?lat="
                + lat + "&lon=" + lon + "&reportID=" + this.getSelectedReport()
                + "&units=" + units + "&AreaName=" + areaname;
            this.getReport(URL);
        }

        public GetReportByGeography(GeoType,GeoID)
        {
            var URL = this.apiURL + "api/neustar/GetReportByGeography?geoid=["+'"'+
                + GeoID +'"]'+ "&geolevel=" + GeoType +
                "&reportIDS=" + '[' + this.getSelectedReports() + ']';
            this.getReport(URL);
        }
        public GetReportByCircle(lat, lon, radius):void {
            radius = (radius / 1609.34);
            var URL = this.apiURL + "api/neustar/GetReportByCircle?lat="
                + lat + "&lon=" + lon + "&radius=" + radius +
                "&reportIDS=" + '[' + this.getSelectedReports() + ']';
            this.getReport(URL);
        
        }
        public GetReportByAddress(address: string)
        {
            var URL = this.apiURL + "api/neustar/GetReportByAddress?address="
                + address + "&reportIDS=" + '[' + this.getSelectedReports() + ']';
            this.getReport(URL);
        }
        public GetReportByPolyAPI(poly) {
            
           var URL = this.apiURL + "api/neustar/GetReportByPolygon?poly="
               + poly + "&reportIDS=" + '[' + this.getSelectedReports() + ']';
            this.getReport(URL);
        }

        public GetCBSAData(geoid) {
           var URL = this.apiURL + "api/neustar/GetReportByGeography?geoid=" + '["' + geoid + '"]' + "&geolevel=CBS&reportIDs="
               + '[' + this.getSelectedReports() + ']';
           this.getReport(URL);
        }
    }

   
}

angular.module(NameSpace).factory('reportService',($http, reportSetup)
    => { return new reportModule.reportService($http, reportSetup); });