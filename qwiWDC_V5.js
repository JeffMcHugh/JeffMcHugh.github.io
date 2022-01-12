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
    numparms=data[0].length;
    window.localStorage.setItem("numparameters",numparms);
    for (var i = 0, len = numparms-1; i < len; i++) {
      var param="param"+i.toString();
      window.localStorage.setItem(param,data[0][i]);
    }
    /*
    var cols2test=[];
    for (var i = 0, len = numparms-1; i < numparms; i++) {
      var col=[{id: window.localStorage.getItem('param0'),
      dataType: tableau.dataTypeEnum.string}];
      cols2test.push(col);
    }
    */
  }
  // Calling that async function
  getapi(api1t);
}




(function() {
    // Create the connector object
    console.log('testing this too');
    var myConnector = tableau.makeConnector();

    // window.localStorage.getItem('param0')
    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        numparms=window.localStorage.getItem('numparameters');
        var parameters=[];
        for (var p = 0, len = numparms-1; p < numparms; p++){
          var parameter = "param"+p.toString();
          parameters.push(window.localStorage.getItem(parameter));
        }
        var typeNumbers=['Emp'];
        var typeStrings=['year','quarter','sex','agegrp','ownercode','firmsize','seasonadj','industry','state','county'];
        var cols2=[];
        for (var i = 0, len = numparms-1; i < numparms; i++) {
          if typeStrings.includes(parameters[i]){
            var col=[{id: parameters[i],
            dataType: tableau.dataTypeEnum.string}];
          }
          if typeNumbers.includes(parameters[i]){
            var col=[{id: parameters[i],
            dataType: tableau.dataTypeEnum.int}];
          }
          cols2.push(col);
        }

        var cols = [{
            id: window.localStorage.getItem('param0'),
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "year",
            alias: "year",
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
            description: window.localStorage.getItem('api1'),
            alias: "QWI Data",
            columns: cols2
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        api1t=window.localStorage.getItem('api1');
        $.getJSON(api1t, function(resp) {
            //var feat = resp.features,
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
            tableau.connectionName = "QWI Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
