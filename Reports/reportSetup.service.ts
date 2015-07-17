module reportModule{
    "use strict";

   export interface IreportSetup {
        CurrentInUse: string;
        CanIBeSelected(controllerID: string): boolean;
        ResetCurrent(): void;
        Criteria: any;
    }

   export class reportSetup implements IreportSetup {
       static $inject = ['$rootScope'];
       constructor(private $rootScope: ng.IRootScopeService){
        //constructor() {
            var vm = this;
       }
       Criteria: any;
        CurrentInUse: string="";
        public CanIBeSelected(controllerID): boolean {
            var rtValue = false;
            if (this.CurrentInUse == "Address") {
                this.CurrentInUse = controllerID;
                rtValue = true;
            } else 
                if (this.CurrentInUse == controllerID) {
                    this.CurrentInUse = controllerID;
                    rtValue = true;
                }
            
            this.$rootScope.$broadcast('ReportDisable');
            return rtValue;
        }
        public ResetCurrent()
        {
            this.CurrentInUse = "";
            this.$rootScope.$broadcast('ReportEnable');

        }
    }
    //angular.module('app').service("reportSetup", reportSetup);
    angular.module('app').factory('reportSetup',($rootScope)
        => { return new reportModule.reportSetup($rootScope); });
} 