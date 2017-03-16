function myJsFunction(){
    var codeEntered=document.getElementById('input1').value;
    console.log(codeEntered);
    // Put the object into storage
    localStorage.setItem('enteredCode', codeEntered);
    // Retrieve the object from storage
    var passvar = localStorage.getItem('enteredCode');	
    console.log(passvar);
    retrieveData(passvar);
 }
	
function retrieveData(passvar){
  var url="https://api.census.gov/data/timeseries/intltrade/exports";
  var expdata = {
	  get:"E_COMMODITY_SDESC,CTY_CODE,CTY_NAME,ALL_VAL_YR,QTY_1_YR",
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
      var r1c6=Math.round((Number(byValue[1][3]/1000000)),1);
      var r3c6=Math.round((Number(byValue[1][3]/1000000*byValue[1][4])),1);
      var r1c6=Math.round((Number(byValue[1][3]/1000000)),1);
      var r1c6=Math.round((Number(byValue[1][3]/1000000)),1);
	console.log(r1c6);
      console.log(byValue);
      $( "#commname" ).text(byValue[1][0]).toLocaleString();
      $( "#row1col6" ).text(r1c6.toLocaleString());
      //$( "#row3col6" ).text(round(Number((byValue[1][3]/1000000)/byValue[1][4])),1).toLocaleString();
      //$( "#row5col6" ).text(round(Number(byValue[2][3]/1000000)),1).toLocaleString();  
      //$( "#row7col6" ).text(round(Number((byValue[2][3]/1000000)/byValue[2][4])),1).toLocaleString();
  };
  $.get(url,expdata,callback);
}

						//$("#row1col1").text(byValue[1][1].toLocaleString());
						//$("#row1col2").text(Number(byValue[1][2]).toLocaleString());
						//$("#row2col1").text(byValue[2][1].toLocaleString());
						//$("#row2col2").text(Number(byValue[2][2]).toLocaleString());
						//$("#row3col1").text(byValue[3][1].toLocaleString());
						//$("#row3col2").text(Number(byValue[3][2]).toLocaleString());

	
				
					//	var AllHS = data.slice(0);
					//	var numcodes = AllHS.length;
					//	var hscodelist = Array(numcodes);
					//	var i;
    			//	for (i=1;i<=numcodes;i++){
      			//	hscodelist[[i-1][0]] = AllHS[[i][0]];
      			//	hscodelist[[i-1][1]] = AllHS[[i][1]];
    			//	}





	
	
 

