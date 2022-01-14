
var api1t;
var apicallinfo = {
  url:"placeholder",
  numberof:0,
  param1:"",
  param1type:""
};
var url="";


function add() {
  //If you assign a value to a variable that has not been declared, it will automatically become a GLOBAL variable.
  apicallinfo.url=document.getElementById('api1').value;
  api1t=apicallinfo.url;
  url=apicallinfo.url;
  //Above: in this case, the `grade` is the key while `One` is the value.
  document.getElementById("demo").innerHTML = apicallinfo.url;

  // Defining async function
  async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    numparms=data[0].length;
    window.localStorage.setItem("numparameters",numparms);
    for (var i = 0, len = numparms; i < len; i++) {
      var param="param"+i.toString();
      window.localStorage.setItem(param,data[0][i]);
    }

  }
  getapi(apicallinfo.url);
}


(function() {
  var myConnector = tableau.makeConnector();

  // Define the schema
  myConnector.getSchema = function(schemaCallback) {
    // Create the connector object
    numparms=window.localStorage.getItem('numparameters');
    var parameters=[];
    for (var p = 0, len = numparms-1; p < numparms; p++){
      var parameter = "param"+p.toString();
      parameters.push(window.localStorage.getItem(parameter));
    }
    var numbers=['Emp'];
    var strings=['year','quarter','sex','agegrp','ownercode','firmsize','seasonadj','industry','state','county'];
    var cols2=[];
    for (var i = 0, len = numparms-1; i < numparms; i++) {
      if (strings.includes(parameters[i])){
        var col={id: parameters[i], dataType: tableau.dataTypeEnum.string};
      }
      else if (numbers.includes(parameters[i])){
        var col={id: parameters[i], dataType: tableau.dataTypeEnum.int};
      }
      cols2.push(col);
    }
    console.log("cols2: ",cols2);
    console.log("api call info before change: ",apicallinfo.url);

      var tableSchema = {
            id: "QWIFeed",
            alias: "QWI Data",
            columns: cols2
      };
      console.log("tableSchema: ",tableSchema)

      schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        api1t=window.localStorage.getItem('api1');
        //apicallinfo.url=document.getElementById('api1').value;
        console.log("url: ",url);
        console.log("apicallinfo.url: ",apicallinfo.url)
        $.getJSON(url, function(resp) {
            //var feat = resp.features,
            tableData = [];
            // Iterate over the JSON object

            //Eventually find a way to replace all instances of null with 0 or "". but for now this is okay.
            for (var i = 0, len = resp.length; i < resp.length-1; i++) {
              if (resp[i+1][0] == null) {resp[i+1][0]=0;}
              if (resp[i+1][1] == null) {resp[i+1][1]="";}
              if (resp[i+1][2] == null) {resp[i+1][2]="";}
              if (resp[i+1][3] == null) {resp[i+1][3]="";}
              if (resp[i+1][4] == null) {resp[i+1][4]="";}
              if (resp[i+1][5] == null) {resp[i+1][5]="";}
              if (resp[i+1][6] == null) {resp[i+1][6]="";}
              if (resp[i+1][7] == null) {resp[i+1][7]="";}
              if (resp[i+1][8] == null) {resp[i+1][8]="";}
              if (resp[i+1][9] == null) {resp[i+1][9]="";}
              if (resp[i+1][10] == null) {resp[i+1][10]="";}
            }



            for (var i = 0, rows = resp.length; i < rows-1; i++) {
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
            console.log("tableData: ",tableData)
            console.log("api call info after ", apicallinfo.url);
            console.log("Is this thing on?");
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
