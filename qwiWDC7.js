function add() {
  //If you assign a value to a variable that has not been declared, it will automatically become a GLOBAL variable.
  api1text = document.getElementById('api1').value;
  api2text = document.getElementById('api2').value;

  window.localStorage.setItem("api1",api1text);
  window.localStorage.setItem("api2",api2text);
  //Above: in this case, the `grade` is the key while `One` is the value.

  //document.getElementById("demo").innerHTML = api1text;
  console.log("test console log")
  console.log(api1text)
  document.getElementById("demo").innerHTML = api1text;

}

//The next part should be global
var apicallresults = {};
  $.ajax({
    url: window.localStorage.getItem('api1'),
    async: false,
    dataType: 'json',
    success: function(data){
      apicallresults=data;
    }

  });
//end of api call that sets global variable

(function() {
    // Create the connector object
    console.log('testing this too')
    var myConnector = tableau.makeConnector();



    // Use API call results to retrieve info for defining schema
    //myConnector.getData = function(table, doneCallback) {
        //$.getJSON("https://api.census.gov/data/timeseries/qwi/sa?get=Emp&for=county:198&in=state:02&year=2012&quarter=1&sex=1&sex=2&agegrp=A02&agegrp=A07&ownercode=A05&firmsize=1&seasonadj=U&industry=11&key=fb52f59fa656edc68e1a96839776f5493e3317c0", function(resp2) {
            //var feat = resp.features,

            //let apicall = prompt("Enter the API call right now", "https://api.census.gov/data/timeseries/qwi/sa?get=Emp&for=county:198&in=state:02&year=2012&quarter=1&sex=1&sex=2&agegrp=A02&agegrp=A07&ownercode=A05&firmsize=1&seasonadj=U&industry=11");
            //let text;
            //if (apicall == null || apicall == "") {
              //text = "User cancelled the prompt.";
            //} else {
              //text = "You entered: " + apicall;
            //}
/*
            let text;
            if (api1 == null || api1 == "") {
              text = "User cancelled the prompt.";
            } else {
              text = "You entered: " + api1;
            }
            doneCallback();
*/
        //});
    //};





    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: apicallresults[0][0],
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "year",
            alias: "year",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "quarter",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: apicallresults[0][3],
            dataType: tableau.dataTypeEnum.string
        }, {
            id: apicallresults[0][4],
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ownercode",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "firmsize",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "seasonadj",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "industry",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "state",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "county",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "QWIFeed",
            alias: "QWI Data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON(window.localStorage.getItem('api1'), function(resp) {
            //var feat = resp.features,
            let apicall = prompt("Enter the API call", window.localStorage.getItem('api1'));
            let text;
            if (apicall == null || apicall == "") {
              text = "User cancelled the prompt.";
            } else {
              text = "You entered: " + apicall;
            }
            tableData = [];
            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < resp.length-1; i++) {
                tableData.push({
                    "Emp": resp[i+1][0],
                    "year": resp[i+1][1],
                    "quarter": resp[i+1][2],
                    "agegrp": resp[i+1][3],
                    "sex": resp[i+1][4],
                    "ownercode": resp[i+1][5],
                    "firmsize": resp[i+1][6],
                    "seasonadj": resp[i+1][7],
                    "industry": resp[i+1][8],
                    "state": resp[i+1][9],
                    "county": resp[i+1][10]
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "USGS Earthquake Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
