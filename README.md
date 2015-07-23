# bwtest
this is a test of creating a bower package
* Objects Included
  * reportSetup
    * service to allow for communication between different geometry/geography report providers
  * reportService
    * service that makes the api calls and retrireves the PDF reports
  * Reports
    * directive
  * models/Report
  * components/ngDropdownMultiselect
    * this is the basic dropdown control used by the reports component.

* Properties
  * xc-geomid
    * the geographyID you wish to retrieve reports for.
  * xc-geotype
    * the specific geography type of the selected object
      * Block groups
      * County
      * State
      * Zip code
      
**Usage**

To set up using Latitude and Longitude you must use the ReportSetup service and set the currentInUse Property to "Address"
and xc-geotype and xc-geomid must be null values;
```javascript
  reportSetup.currentInUse = "Address";
                reportSetup.criteria = function () {
                    var address = {
                        lat: $scope.selectedMarker.Lat,
                        lon: $scope.selectedMarker.Lon,
                        units: 3,
                        areaname: $scope.selectedMarker.Address
                    };
                    return address;
                };
```

or you can set the xc-geomid and xc-geotype to the values of a specific geography.
```html
<reports xc-geomid="64701" xc-geotype="Zip code"></reports>
```
**SetUp**
Currently the Reports component is relient on a Global.js file specifically looking for the following variables
```javascript
var Geoserver = "http://xceligentmaps.gistemp.com";
var Api = "http://apilba.xceligent.org/";
var NameSpace = "main";
```
