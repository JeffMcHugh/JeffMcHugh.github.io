/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    var selected = document.getElementById("myInput").value;
}

$(document).ready(function() {
var data2 = {};
$("#hscodes2 option").each(function(i,el) {  
   data[$(el).data2("value")] = $(el).val();
});


$('#submit').click(function()
    {
        var value = $('#myInput2').val();
        //alert($('#hscodes2 [value="' + value + '"]').data2('value'));
    });
});

function gethsnumbers(year,monthStr){
	var url2="https://api.census.gov/data/timeseries/intltrade/exports";
  	var expdata2 = {
	  	get:"E_COMMODITY,E_COMMODITY_SDESC",
	  	MONTH:monthStr,
	  	YEAR:year,
	  	COMM_LVL:"HS10",
	  	key: "63550916d57e686361cb2c21a3634dd765e01e28",
	};
	var callback2= function(data){
		if(!data) {
		// Nothing found, try again with previous month
		console.log("No HS numbers found");
		}
		else {
			var numcodes = data.length;
			var i;
			$(document).ready(function(){
    			for (i=1;i<numcodes-1;i++){
				data[i][5]= data[i][0].toLocaleString()+data[i][1].toLocaleString();
				var addop = "<option value=\"" + data[i][0] + "\">" + data[i][5] + "</option>";
    				$("#hscodes").append(addop);
				var addop2 ="<option data-value=\""+data[i][0]+"\" value=\""+data[i][0]+" "+data[i][1]+"\"></option>";
				$("#hscodes2").append(addop2);
    			}});	
		}
	};
	$.get(url2,expdata2,callback2);
};

function addOption(){
  $(document).ready(function(){
	gethsnumbers("2016","12");
  });
}
addOption();

