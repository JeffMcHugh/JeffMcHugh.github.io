var year="2016";
var monthStr="12";
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    $("<option>Extra Tools<option>").appendTo(".dropdown-content");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("input1");
    filter = input.value.toUpperCase();
    codes = document.getElementById("myDropdown");
    a = codes.getElementsByTagName("option");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function goFunction(hslabel){
				document.getElementById("myDropdown").classList.toggle("show");
				var newlab = "Is this working";
				$(".dropbtn").text(hslabel);
				var hscode = document.getElementById("about");
				var hsstring = hslabel;
				gethsdata(hsstring);	
}
function gethsnumbers(){
				$.get("https://api.census.gov/data/timeseries/intltrade/exports", {
					get: "E_COMMODITY,E_COMMODITY_SDESC",
					YEAR: year,
					MONTH: monthStr,
					COMM_LVL: "HS10",  	
					key: "63550916d57e686361cb2c21a3634dd765e01e28",
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
gethsnumbers();



