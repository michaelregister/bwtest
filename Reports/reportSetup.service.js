var reportModule;
(function (reportModule) {
    "use strict";
    var reportSetup = (function () {
        function reportSetup($rootScope) {
            this.$rootScope = $rootScope;
            this.CurrentInUse = "";
            //constructor() {
            var vm = this;
        }
        reportSetup.prototype.CanIBeSelected = function (controllerID) {
            var rtValue = false;
            if (this.CurrentInUse == "Address") {
                this.CurrentInUse = controllerID;
                rtValue = true;
            }
            else if (this.CurrentInUse == controllerID) {
                this.CurrentInUse = controllerID;
                rtValue = true;
            }
            this.$rootScope.$broadcast('ReportDisable');
            return rtValue;
        };
        reportSetup.prototype.ResetCurrent = function () {
            this.CurrentInUse = "";
            this.$rootScope.$broadcast('ReportEnable');
        };
        reportSetup.$inject = ['$rootScope'];
        return reportSetup;
    })();
    reportModule.reportSetup = reportSetup;
    //angular.module('app').service("reportSetup", reportSetup);
    angular.module('app').factory('reportSetup', function ($rootScope) {
        return new reportModule.reportSetup($rootScope);
    });
})(reportModule || (reportModule = {}));
//# sourceMappingURL=reportSetup.service.js.map