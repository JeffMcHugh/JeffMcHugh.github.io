(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "Emp",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "year",
            alias: "year",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "quarter",
            alias: "quarter",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "sex",
            alias: "sex",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "agegrp",
            alias: "agegrp",
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
        $.getJSON("https://api.census.gov/data/timeseries/qwi/sa?get=Emp&for=county:198&in=state:02&year=2012&quarter=1&sex=1&sex=2&agegrp=A02&agegrp=A07&ownercode=A05&firmsize=1&seasonadj=U&industry=11", function(resp) {
            //var feat = resp.features,
            let apicall = prompt("Enter the API call", "https://api.census.gov/data/timeseries/qwi/sa?get=Emp&for=county:198&in=state:02&year=2012&quarter=1&sex=1&sex=2&agegrp=A02&agegrp=A07&ownercode=A05&firmsize=1&seasonadj=U&industry=11");
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
                    "sex": resp[i+1][3],
                    "agegrp": resp[i+1][4],
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
