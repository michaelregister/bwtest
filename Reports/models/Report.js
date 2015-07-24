var reportModule;
(function (reportModule) {
    "use strict";
    var Report = (function () {
        function Report() {
            this.value = "";
            this.text = "";
            this.active = false;
        }
        return Report;
    })();
    reportModule.Report = Report;
})(reportModule || (reportModule = {}));
//# sourceMappingURL=Report.js.map