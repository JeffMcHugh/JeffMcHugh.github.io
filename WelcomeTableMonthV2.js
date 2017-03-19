function myJsFunction(){
    var codeEntered=document.getElementById('input1').value;
    console.log(codeEntered);
    // Put the object into storage
    localStorage.setItem('enteredCode', codeEntered);
    // Retrieve the object from storage
    var passvar = localStorage.getItem('enteredCode');	
    console.log(passvar);
    retrieveData(passvar,"12","Dec");
    retrieveData(passvar,"11","Nov");
    retrieveData(passvar,"10","Oct");
    retrieveData(passvar,"09","Sep");
    retrieveData(passvar,"08","Aug");
 }

var topCtyTable=["Dec","Nov","Oct","Sep","Aug"];
	
function retrieveData(passvar,mm,mon){
  var url="https://api.census.gov/data/timeseries/intltrade/exports";
  var expdata = {
	  get:"E_COMMODITY_SDESC,CTY_CODE,CTY_NAME,ALL_VAL_MO,QTY_1_MO",
	  E_COMMODITY: passvar,
	  //ALL_VAL_YR,
	  MONTH:mm,
	  YEAR:"2016",
	  SUMMARY_LVL:"DET",
	  COMM_LVL:"HS10",
	  //key: "63550916d57e686361cb2c21a3634dd765e01e28"
  };
  var callback= function(data){
      console.log(data);
      /* This next section sorts API call results by value */
      if(!data) {
         console.log("Array Not set");
      } else {
      var byValue = data.slice(0,5);
      numcodes=byValue.length;
      byValue.sort(compareNumbers);
      function compareNumbers(a, b) {
         return b[3] - a[3];
      }
      topCtyTable[mon] = byValue;
      topCtyTable[mon][0][9]="Unit Price";      
      var i;
      for (i=1;i<=5;i++){
        topCtyTable[mon][1][9]=topCtyTable[mon][1][3]/topCtyTable[mon][1][4];
      }
      console.log(topCtyTable);
      if (mon=="Aug"){
	console.log(topCtyTable);
        if(topCtyTable["Dec"][1][3]>1000000000) {
          var valIndicator="B";
	  val1=topCtyTable["Aug"][1][3]/1000000000;
	  val2=topCtyTable["Sep"][1][3]/1000000000;
	  val3=topCtyTable["Oct"][1][3]/1000000000;
	  val4=topCtyTable["Nov"][1][3]/1000000000;
	  val5=topCtyTable["Dec"][1][3]/1000000000;
        }else if(topCtyTable["Dec"][1][3]>1000000){
	  var valIndicator="M";
	  val1=topCtyTable["Aug"][1][3]/1000000;
	 // val2=topCtyTable["Sep"][1][3]/1000000;
	  val3=topCtyTable["Oct"][1][3]/1000000;
	  val4=topCtyTable["Nov"][1][3]/1000000;
	  val5=topCtyTable["Dec"][1][3]/1000000;
	}else{
	  var valIndicator="T";
	  val1=topCtyTable["Aug"][1][3]/1000;
	  val2=topCtyTable["Sep"][1][3]/1000;
	  val3=topCtyTable["Oct"][1][3]/1000;
	  val4=topCtyTable["Nov"][1][3]/1000;
	  val5=topCtyTable["Dec"][1][3]/1000;
	}
	country=topCtyTable[mon][1][2];
	 
        $(document).ready(function(){
          $( "#commname" ).text(topCtyTable[mon][1][0]).toLocaleString();
          var markup = "<tr><td class=col1>" + country + "</td><td class=midcol>$" + val1 + valIndicator + "</td><td class=midcol>$" + val2 + valIndicator +
	               "</td><td class=midcol>$" + val3 + valIndicator + "</td><td class=midcol>$" + val4 + valIndicator + "</td><td class=midcol>$" + val5 +
		       valIndicator + "</td></tr>";
	  var markup2= "<tr><td class=col1>Growth of Value</td><td class=midcol>$" + val1 + valIndicator + "</td><td class=midcol>$" + val2 + valIndicator +
	               "</td><td class=midcol>$" + val3 + valIndicator + "</td><td class=midcol>$" + val4 + valIndicator + "</td><td class=midcol>$" +val5+
		       valIndicator + "</td></tr>";
	  var markup3= "<tr><td class=col1>Average Unit Price</td><td class=midcol>$" + val1 + valIndicator + "</td><td class=midcol>$" + val2 + valIndicator +
	               "</td><td class=midcol>$" + val3 + valIndicator + "</td><td class=midcol>$" + val4 + valIndicator + "</td><td class=midcol>$" +val5+
		       valIndicator + "</td></tr>";
	  var markup4= "<tr><td class=col1>Growth of UP since Aug</td><td class=midcol>$" + val1 + valIndicator + "</td><td class=midcol>$" + val2 + valIndicator +
	               "</td><td class=midcol>$" + val3 + valIndicator + "</td><td class=midcol>$" + val4 + valIndicator + "</td><td class=midcol>$" +val5+
		       valIndicator + "</td></tr>";
          $("table tbody").append(markup);
	  $("table tbody").append(markup2);
	  $("table tbody").append(markup3);
	  $("table tbody").append(markup4);
        });  
      }
	      
	      
      }
  };
  $.get(url,expdata,callback);
	

}
 
     
     /* var CalcValue = byValue.slice();
      CalcValue[[0][5]]="Unit Price";
      CalcValue[[0][6]]="Growth of Value";
      CalcValue[[0][6]]="Growth of Unit Price";
      /*the following sets the value of the unit price */
  //    for (i=1;i<=numcodes;i++){ 
//	 CalcValue[[i][3]] = Math.round((Number(byValue[[i][3]]/byValue[[i][3]])),1)
 //        CalcValue[[i][4]] = Math.round((Number(byValue[[i][3]]/1000000)),1)
  //       CalcValue[[i][5]] = Math.round((Number(byValue[[i][3]]/1000000)),1);
  //    }
 /*     if (month=="08"){
         $( "#commname" ).text(byValue[1][0]).toLocaleString();
         $( "#row1col1" ).text(byValue[[1][3]].toLocaleString());
         $( "#row3col1" ).text((byValue[1][2]).toLocaleString());	
         var r1c1=byValue[[1][3]];
	 var r3c1=byValue[[][]];
	 var r1c1=byValue[[1][3]];
	 var r3c1=byValue[[][]];
	 var r1c1=byValue[[1][3]];
	 var r3c1=byValue[[][]];
	 var r1c1=byValue[[1][3]];
	 var r3c1=byValue[[][]];
	 var r1c1=byValue[[1][3]];
	 var r3c1=byValue[[][]];
 
	      
      } else if (month=="09"){
	      
      } else if (month=="10){
		 
      } else if (month=="11){
		 
      } else {
         var r1c6=Math.round((Number(byValue[1][3]/1000000)),1);
         var r2c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r3c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r4c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r5c6=Math.round((Number(byValue[1][3]/1000000)),1);
         var r6c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r7c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r8c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r9c6=Math.round((Number(byValue[1][3]/1000000)),1);
         var r10c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r11c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r12c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r13c6=Math.round((Number(byValue[1][3]/1000000)),1);
         var r14c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r15c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r16c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r17c6=Math.round((Number(byValue[1][3]/1000000)),1);
         var r18c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r19c6=Math.round((Number(byValue[1][3]/1000000)),1);
	 var r20c6=Math.round((Number(byValue[1][3]/1000000)),1); 
      }		 
      		 
      var r3c6=Math.round((Number((byValue[1][3]/1000000)/byValue[1][4])),1);
      var r1c6=Math.round((Number(byValue[1][3]/1000000)),1);
      var r1c6=Math.round((Number(byValue[1][3]/1000000)),1);
      //$( "#row3col6" ).text(r3c6.toLocaleString());
      //$( "#row5col6" ).text(round(Number(byValue[2][3]/1000000)),1).toLocaleString();  
      //$( "#row7col6" ).text(round(Number((byValue[2][3]/1000000)/byValue[2][4])),1).toLocaleString();
  };
  $.get(url,expdata,callback);
}
*/
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
