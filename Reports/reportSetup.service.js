var reportModule;
(function (reportModule) {
    "use strict";
    var ReportSetup = (function () {
        function ReportSetup($rootScope) {
            this.$rootScope = $rootScope;
            this.currentInUse = "";
            var vm = this;
        }
        ReportSetup.prototype.canIBeSelected = function (controllerID) {
            var rtValue = false;
            if (this.currentInUse === "Address") {
                this.currentInUse = controllerID;
                rtValue = true;
            }
            else if (this.currentInUse === controllerID) {
                this.currentInUse = controllerID;
                rtValue = true;
            }
            this.$rootScope.$broadcast("ReportDisable");
            return rtValue;
        };
        ReportSetup.prototype.resetCurrent = function () {
            this.currentInUse = "";
            this.$rootScope.$broadcast("ReportEnable");
        };
        return ReportSetup;
    })();
    reportModule.ReportSetup = ReportSetup;
    angular.module("lba.reportModule").factory("reportSetup", function ($rootScope) {
        return new reportModule.ReportSetup($rootScope);
    });
})(reportModule || (reportModule = {}));
//# sourceMappingURL=reportSetup.service.js.map