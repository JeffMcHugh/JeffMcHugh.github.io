(function () {
	// the Tableau object below is not defined locally in our code. It's defined globally in the WDC library.
    var myConnector = tableau.makeConnector();  

    myConnector.getSchema = function (schemaCallback) {
      var cols = [
	  { id : "time", alias : "Year-Month", dataType : tableau.dataTypeEnum.string },
          { id : "hs", alias : "hs", dataType : tableau.dataTypeEnum.string },
          { id : "desc", alias : "desc", dataType : tableau.dataTypeEnum.string },
          { id : "value", alias : "value", dataType : tableau.dataTypeEnum.float},
          { id : "country", alias : "Country", dataType : tableau.dataTypeEnum.string},
          { id : "qty1", alias : "qty1", dataType: tableau.dataTypeEnum.float},
     ];

    var tableInfo = {
        id : "ExportsFeed",
        alias : "Exports",
        columns : cols
    };

    schemaCallback([tableInfo]);
};


myConnector.getData = function(table, doneCallback) {
    var url="https://api.census.gov/data/timeseries/intltrade/exports";
    var expdata = {
		get:"E_COMMODITY,E_COMMODITY_SDESC,CTY_CODE,CTY_NAME,ALL_VAL_YR,QTY_1_YR",
		time:"2016-12",
	  	SUMMARY_LVL:"DET",
	  	COMM_LVL:"HS10",
	  	E_COMMODITY:"8517120080",
  	};  
  	var callback= function(data2){
        var hsdata = data2;
        var tableData = [];
        console.log(hsdata);
        // Iterate over the JSON object
        for (var i = 1, len = hsdata.length-1; i < len; i++) {
            tableData.push({
                "hs": hsdata[i][0],
                "desc": hsdata[i][1],
                "country": hsdata[i][3],
                "value": Number(hsdata[i][4]),
                "qty1": Number(hsdata[i][5]),
		"time": hsdata[i][6];
            });
        }
        table.appendRows(tableData);
        doneCallback();
    };
    $.get(url,expdata,callback);
};



    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Census Exports Feed";
        tableau.submit();
    });
});
})();
