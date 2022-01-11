var api1t;

function add() {
  //If you assign a value to a variable that has not been declared, it will automatically become a GLOBAL variable.
  api1text = document.getElementById('api1').value;

  window.localStorage.setItem("api1",api1text);
  api1t=window.localStorage.getItem('api1');

  //Above: in this case, the `grade` is the key while `One` is the value.

  //document.getElementById("demo").innerHTML = api1text;
  console.log("test console log")
  console.log(api1t)
  document.getElementById("demo").innerHTML = api1text;
  // api url

  // Defining async function
  async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    for (var i = 0, len = data[0].length-1; i < len; i++) {
      var param="param"+i.toString();
      window.localStorage.setItem(param,data[0][i]);
      var paramtype=param+"type"
      if (data[0][i]="Emp") {window.localStorage.setItem(paramtype,"string")}
    }
  }
  // Calling that async function
  getapi(api1t);
}




(function() {
    // Create the connector object
    console.log('testing this too');
    var myConnector = tableau.makeConnector();


    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: window.localStorage.getItem('param1'),
            dataType: tableau.dataTypeEnum.string
            //dataType: window.localStorage.getItem('param1type')
        }, {
            id: "year",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "quarter",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "sex",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "agegrp",
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
        console.log(cols);

        var tableSchema = {
            id: "QWIFeed",
            alias: "QWI Data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON(api1t, function(resp) {
            //var feat = resp.features,
            let apicall = prompt("Enter the API call", api1t);
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
