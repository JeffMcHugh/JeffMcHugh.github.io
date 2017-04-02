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
		get:"time,E_COMMODITY,E_COMMODITY_SDESC,CTY_CODE,CTY_NAME,ALL_VAL_YR,QTY_1_YR",
		time:"from+2016-01+to+2017-01",
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
		"time": hsdata[i][0],
                "hs": hsdata[i][1],
                "desc": hsdata[i][2],
                "country": hsdata[i][4],
                "value": Number(hsdata[i][5]),
                "qty1": Number(hsdata[i][6]),
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
