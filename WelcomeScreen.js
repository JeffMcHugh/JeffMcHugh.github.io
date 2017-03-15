function myJsFunction(){
    var codeEntered=document.getElementById('input1').value;
    console.log(codeEntered);
    // Put the object into storage
    localStorage.setItem('enteredCode', codeEntered);
 }
// Retrieve the object from storage
var passvar = localStorage.getItem('enteredCode');	
console.log(passvar);
	



	

  var url="https://api.census.gov/data/timeseries/intltrade/exports";
  var expdata = {
	  get:"E_COMMODITY_LDESC,CTY_CODE,CTY_NAME,ALL_VAL_YR,QTY_1_YR",
	  E_COMMODITY: passvar,
	  //ALL_VAL_YR,
	  //QTY_1_YR,
	  MONTH:"12",
	  YEAR:"2016",
	  SUMMARY_LVL:"DET"
  };
	  
	  
  var callback= function(data){


      /* This next section sorts API call results by value */
      var byValue = data.slice();
      byValue.sort(compareNumbers);
      function compareNumbers(a, b) {
         return b[3] - a[3];
      }
      console.log(byValue);
      $( "#row1col1" ).replaceWith(byValue[[2][2]]);
  
  };
  $.get(url,expdata,callback);


	
				
					//	var AllHS = data.slice(0);
					//	var numcodes = AllHS.length;
					//	var hscodelist = Array(numcodes);
					//	var i;
    			//	for (i=1;i<=numcodes;i++){
      			//	hscodelist[[i-1][0]] = AllHS[[i][0]];
      			//	hscodelist[[i-1][1]] = AllHS[[i][1]];
    			//	}





	
	
 

