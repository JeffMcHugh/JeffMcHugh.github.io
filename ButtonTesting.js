




/*

<div align="center" class="menu-options">	
	<form>
 	 	<select id="menuc" name="cars">
   	 		<option value="default">Select your HS code</option>
 	 	</select>
 		<input type="Submit">
	</form>
</div>  */

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
			var AllHS = data.slice(0);
			var numcodes = AllHS.length;
			var hscodelist = Array(numcodes);
			var i;
    			for (i=1;i<=numcodes;i++){
      				hscodelist[[i-1][0]] = AllHS[[i][0]];
      				hscodelist[[i-1][1]] = AllHS[[i][1]];
				var addop = "<option value=\"Subaru\">" + hscodelist[1][0]+ "</option>";
    				$("#menuc").append(addop);	
    			}	
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


