




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
				$.get("https://api.census.gov/data/timeseries/intltrade/exports", {
					get: "E_COMMODITY,E_COMMODITY_SDESC",
					YEAR: year,
					MONTH: monthStr,
					COMM_LVL: "HS10",
				}, function(data) {
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
    				}
						
						
						
					}
				});
}

function addOption(){
  $(document).ready(function(){
	gethsnumbers("2016","12");
    var addop = "<option value=\"Subaru\">Subaru</option>";
    $("#menuc").append(addop);	
  });
}
addOption();


