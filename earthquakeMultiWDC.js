(function () {
	$(document).ready(function(){	
	
	// the Tableau object below is not defined locally in our code. It's defined globally in the WDC library.
    var myConnector = tableau.makeConnector();  

myConnector.getSchema = function(schemaCallback) {
	// Schema for magnitude and place data
	var mag_place_cols = [{
		id: "id",
		dataType: tableau.dataTypeEnum.string
	}, {
		id: "mag",
		alias: "magnitude",
		dataType: tableau.dataTypeEnum.float
	}, {
		id: "title",
		alias: "title",
		dataType: tableau.dataTypeEnum.string
	}, {
		id: "lat",
		alias: "latitude",
		columnRole: "dimension",
		dataType: tableau.dataTypeEnum.float
	}, {
		id: "lon",
		alias: "longitude",
		columnRole: "dimension",
		dataType: tableau.dataTypeEnum.float
	}];

	var magPlaceTable = {
		id: "magPlace",
		alias: "Magnitude and Place Data",
		columns: mag_place_cols
	};

	// Schema for time and URL data
	var time_url_cols = [{
		id: "id",
		dataType: tableau.dataTypeEnum.string
	}, {
		id: "time",
		alias: "time",
		dataType: tableau.dataTypeEnum.date
	}, {
		id: "url",
		alias: "url",
		dataType: tableau.dataTypeEnum.string
	}];

	var timeUrlTable = {
		id: "timeUrl",
		alias: "Time and URL Data",
		columns: time_url_cols
	};
	schemaCallback([magPlaceTable, timeUrlTable]);
};

myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": feat[i].id,
                "mag": feat[i].properties.mag,
                "title": feat[i].properties.title,
                "lon": feat[i].geometry.coordinates[0],
                "lat": feat[i].geometry.coordinates[1]
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);
$(document).ready(function() {
    $("#submitButton").click(function() {
        var dateObj = {
            startDate: $('#start-date-one').val().trim(),
            endDate: $('#end-date-one').val().trim(),
        };

        function isValidDate(dateStr) {
            var d = new Date(dateStr);
            return !isNaN(d.getDate());
        }

        if (isValidDate(dateObj.startDate) && isValidDate(dateObj.endDate)) {
            tableau.connectionData = JSON.stringify(dateObj);
            tableau.connectionName = "USGS Earthquake Feed";
            tableau.submit();
        } else {
            $('#errorMsg').html("Enter valid dates. For example, 2016-05-08.");
        }
    });
});
	})})();
