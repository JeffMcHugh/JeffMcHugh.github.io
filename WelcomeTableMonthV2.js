
var topCtyTable=["08","09","10","11","12"];

function myJsFunction(){
	$("#regions_div").hide();
	$("#commTable").show();
    var codeEntered=(document.getElementById('myInput2').value).substring(0,10);
    console.log(codeEntered);
    // Put the object into storage
    localStorage.setItem('enteredCode', codeEntered);
    // Retrieve the object from storage
    var passvar = localStorage.getItem('enteredCode');	
    console.log(passvar);
	retrieveData(passvar);
 }

  function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }


function retrieveData(passvar,iteration){
	if(!iteration) {iteration = 0;}
	if(iteration >= 5) {
		// Abort when more than 12 months checked and still no results
	return;
	}
  	var monthNum=["08","09","10","11","12"];
  	var mm=monthNum[iteration].toLocaleString();
  	var url="https://api.census.gov/data/timeseries/intltrade/exports";
  	var expdata = {
	  	get:"E_COMMODITY_SDESC,CTY_CODE,CTY_NAME,ALL_VAL_MO,QTY_1_MO",
	  	E_COMMODITY: passvar,
	  	//ALL_VAL_YR,
	  	MONTH:mm,
	  	YEAR:"2016",
	  	SUMMARY_LVL:"DET",
	  	COMM_LVL:"HS10",
		CTY_CODE:"",
	  	key: "63550916d57e686361cb2c21a3634dd765e01e28",
	};
	var callback= function(data){
      	/* This next section sorts API call results by value */
      	if(!data) {
         	console.log("Array Not set");
      	} else {
        	var byValue = data.slice(0,10);
        	numcodes=byValue.length;	
        	function compareNumbers(a, b) {
           		return b[3] - a[3];
        	}
		byValue.sort(compareNumbers);
		console.log("Before topCty set to by Value");
        topCtyTable[mm]= byValue;
		console.log("after topCty set");
        topCtyTable[mm][0][9]="Unit Price";      
        var i;
        for (i=1;i<=5;i++){
          	topCtyTable[mm][i][9]=topCtyTable[mm][i][3]/topCtyTable[mm][i][4];
        }
		if(iteration === 4) {    
	       	console.log("It's about to end.  Here's top country.");
  	       	console.log(topCtyTable);
     		console.log("Did it print?");
		for (i=1;i<=5;i++){
		
		    if(topCtyTable["12"][1][3]>1000000000) {
          		var valIndicator="Millions";			 
	  			val1=commaSeparateNumber(Math.round((Number(topCtyTable["08"][i][3]/1000000)),1));
			    	val2=commaSeparateNumber(Math.round((Number(topCtyTable["09"][i][3]/1000000)),1));
			    	val3=commaSeparateNumber(Math.round((Number(topCtyTable["10"][i][3]/1000000)),1));
			    	val4=commaSeparateNumber(Math.round((Number(topCtyTable["11"][i][3]/1000000)),1));
			    	val5=commaSeparateNumber(Math.round((Number(topCtyTable["12"][i][3]/1000000)),1));
			    	grow1="-";
				grow2=commaSeparateNumber(Math.round((Number((topCtyTable["09"][i][3]-topCtyTable["08"][i][3])/1000000)),1));
			    	grow3=commaSeparateNumber(Math.round((Number((topCtyTable["10"][i][3]-topCtyTable["09"][i][3])/1000000)),1));
			    	grow4=commaSeparateNumber(Math.round((Number((topCtyTable["11"][i][3]-topCtyTable["10"][i][3])/1000000)),1));
			    	grow5=commaSeparateNumber(Math.round((Number((topCtyTable["12"][i][3]-topCtyTable["11"][i][3])/1000000)),1));
				up1=commaSeparateNumber((Number(topCtyTable["08"][i][9]/1000000).toFixed(2)));
				up2=commaSeparateNumber((Number(topCtyTable["09"][i][9]/1000000).toFixed(2)));
				up3=commaSeparateNumber((Number(topCtyTable["10"][i][9]/1000000).toFixed(2)));
				up4=commaSeparateNumber((Number(topCtyTable["11"][i][9]/1000000).toFixed(2)));
				up5=commaSeparateNumber((Number(topCtyTable["12"][i][9]/1000000).toFixed(2)));
			    	up1growth="-";
			        up2growth=commaSeparateNumber((Number((topCtyTable["09"][i][9]-topCtyTable["08"][i][9])/1000000).toFixed(2)));
			  	up3growth=commaSeparateNumber((Number((topCtyTable["10"][i][9]-topCtyTable["09"][i][9])/1000000).toFixed(2)));
			    	up4growth=commaSeparateNumber((Number((topCtyTable["11"][i][9]-topCtyTable["10"][i][9])/1000000).toFixed(2)));
			    	up5growth=commaSeparateNumber((Number((topCtyTable["12"][i][9]-topCtyTable["11"][i][9])/1000000).toFixed(2)));
        	}else if(topCtyTable["12"][1][3]>1000000){
	  			var valIndicator="Thousands";
	  			val1=commaSeparateNumber(Math.round((Number(topCtyTable["08"][i][3]/1000)),1));
			    	val2=commaSeparateNumber(Math.round((Number(topCtyTable["09"][i][3]/1000)),1));
			    	val3=commaSeparateNumber(Math.round((Number(topCtyTable["10"][i][3]/1000)),1));
			    	val4=commaSeparateNumber(Math.round((Number(topCtyTable["11"][i][3]/1000)),1));
			    	val5=commaSeparateNumber(Math.round((Number(topCtyTable["12"][i][3]/1000)),1));
			    	grow1="-"
				grow2=commaSeparateNumber(Math.round((Number((topCtyTable["09"][i][3]-topCtyTable["08"][i][3])/1000)),1));
				grow3=commaSeparateNumber(Math.round((Number((topCtyTable["10"][i][3]-topCtyTable["09"][i][3])/1000)),1));
			    	grow4=commaSeparateNumber(Math.round((Number((topCtyTable["11"][i][3]-topCtyTable["10"][i][3])/1000)),1));
			    	grow5=commaSeparateNumber(Math.round((Number((topCtyTable["12"][i][3]-topCtyTable["11"][i][3])/1000)),1));
				up1=commaSeparateNumber((Number(topCtyTable["08"][i][9]/1000).toFixed(2)));
				up2=commaSeparateNumber((Number(topCtyTable["09"][i][9]/1000).toFixed(2)));
				up3=commaSeparateNumber((Number(topCtyTable["10"][i][9]/1000).toFixed(2)));
				up4=commaSeparateNumber((Number(topCtyTable["11"][i][9]/1000).toFixed(2)));
				up5=commaSeparateNumber((Number(topCtyTable["12"][i][9]/1000).toFixed(2)));
				up1growth="-";
			        up2growth=commaSeparateNumber((Number((topCtyTable["09"][i][9]-topCtyTable["08"][i][9])/1000).toFixed(2)));
			  	up3growth=commaSeparateNumber((Number((topCtyTable["10"][i][9]-topCtyTable["09"][i][9])/1000).toFixed(2)));
			    	up4growth=commaSeparateNumber((Number((topCtyTable["11"][i][9]-topCtyTable["10"][i][9])/1000).toFixed(2)));
			    	up5growth=commaSeparateNumber((Number((topCtyTable["12"][i][9]-topCtyTable["11"][i][9])/1000).toFixed(2)));
			}else{
	  			var valIndicator="Nominal";
	  			val1=commaSeparateNumber(Math.round((Number(topCtyTable["08"][i][3])),1));
			    	val2=commaSeparateNumber(Math.round((Number(topCtyTable["09"][i][3])),1));
			    	val3=commaSeparateNumber(Math.round((Number(topCtyTable["10"][i][3])),1));
			    	val4=commaSeparateNumber(Math.round((Number(topCtyTable["11"][i][3])),1));
			    	val5=commaSeparateNumber(Math.round((Number(topCtyTable["12"][i][3])),1));
			    	grow1="-"
				grow2=commaSeparateNumber(Math.round((Number((topCtyTable["09"][i][3]-topCtyTable["08"][i][3]))),1));
				grow3=commaSeparateNumber(Math.round((Number((topCtyTable["10"][i][3]-topCtyTable["09"][i][3]))),1));
			    	grow4=commaSeparateNumber(Math.round((Number((topCtyTable["11"][i][3]-topCtyTable["10"][i][3]))),1));
			    	grow5=commaSeparateNumber(Math.round((Number((topCtyTable["12"][i][3]-topCtyTable["11"][i][3]))),1));
				up1=commaSeparateNumber((Number(topCtyTable["08"][i][9]).toFixed(2)));
				up2=commaSeparateNumber((Number(topCtyTable["09"][i][9]).toFixed(2)));
				up3=commaSeparateNumber((Number(topCtyTable["10"][i][9]).toFixed(2)));
				up4=commaSeparateNumber((Number(topCtyTable["11"][i][9]).toFixed(2)));
				up5=commaSeparateNumber((Number(topCtyTable["12"][i][9]).toFixed(2)));
				up1growth="-";
			        up2growth=commaSeparateNumber((Number((topCtyTable["09"][i][9]-topCtyTable["08"][i][9])).toFixed(2)));
			  	up3growth=commaSeparateNumber((Number((topCtyTable["10"][i][9]-topCtyTable["09"][i][9])).toFixed(2)));
			    	up4growth=commaSeparateNumber((Number((topCtyTable["11"][i][9]-topCtyTable["10"][i][9])).toFixed(2)));
			    	up5growth=commaSeparateNumber((Number((topCtyTable["12"][i][9]-topCtyTable["11"][i][9])).toFixed(2)));
			}
			country=topCtyTable[mm][i][2];
			if (Number(topCtyTable["09"][i][3]-topCtyTable["08"][i][3])>0){grow2color="green"}else{grow2color="red"};
			if (Number(topCtyTable["10"][i][3]-topCtyTable["09"][i][3])>0){grow3color="green"}else{grow3color="red"};
			if (Number(topCtyTable["11"][i][3]-topCtyTable["10"][i][3])>0){grow4color="green"}else{grow4color="red"};
			if (Number(topCtyTable["12"][i][3]-topCtyTable["11"][i][3])>0){grow5color="green"}else{grow5color="red"};
			if (Number(topCtyTable["09"][i][9]-topCtyTable["08"][i][9])>0){upgrow2color="green"}else{upgrow2color="red"};
			if (Number(topCtyTable["10"][i][9]-topCtyTable["09"][i][9])>0){upgrow3color="green"}else{upgrow3color="red"};
			if (Number(topCtyTable["11"][i][9]-topCtyTable["10"][i][9])>0){upgrow4color="green"}else{upgrow4color="red"};
			if (Number(topCtyTable["12"][i][9]-topCtyTable["11"][i][9])>0){upgrow5color="green"}else{upgrow5color="red"};
          	$( "#commname" ).text(topCtyTable[mm][i][0]).toLocaleString();
		
		$("#denom").text("Value in " + valIndicator + " of Dollars");
          	var markup = "<tr><td class=col1>" + country + "</td><td class=midcol>" + val1 +"</td><td class=midcol>" + val2 + 
	        		"</td><td class=midcol>" + val3 + "</td><td class=midcol>" + val4 + "</td><td class=midcol>" + val5 +
		    	"</td></tr>";
	  		var markup2= "<tr><td class=col1>Growth of Value</td><td class=midcol>" + grow1 + "</td><td class=\"midcol "+
			             grow2color +"\">" + grow2 + 
	            		"</td><td class=\"midcol "+grow3color+"\">" + grow3 + "</td><td class=\"midcol "+ grow4color+"\">" + grow4 + 
			    "</td><td class=\"midcol " + grow5color + "\">" +grow5 + "</td></tr>";
	  		var markup3= "<tr><td class=col1>Average Unit Price</td><td class=midcol>" + up1 + "</td><td class=midcol>" + up2 +
	            		"</td><td class=midcol>" + up3 + "</td><td class=midcol>" + up4 + "</td><td class=midcol>" + up5 +
		       	"</td></tr>";
	  		var markup4= "<tr><td class=\"col1 botrow\">Growth of Unit Price Since Aug</td><td class=\"midcol botrow\">" + up1growth 
			+ "</td><td class=\"midcol "+upgrow2color+" botrow\">" + up2growth + "</td><td class=\"midcol botrow "+upgrow3color+"\">" + up3growth + 
			"</td><td class=\"midcol botrow "+upgrow4color+"\">" + up4growth + "</td><td class=\"midcol botrow "+upgrow5color+"\">" + up5growth + "</td></tr>";
          		$("table tbody").append(markup);
	  		$("table tbody").append(markup2);
	  		$("table tbody").append(markup3);
	  		$("table tbody").append(markup4);
			}
			return;
		} else {
	    		retrieveData(passvar, iteration + 1);
	    	}
		} /*end of else */
	} /*end of callback */
  	$.get(url,expdata,callback);	
} /*end of retrieveData function */     

function mapIt(){
	$(document).ready(function(){  
		$("#regions_div").show();
      		$("#commTable").hide();
		
		
		
		google.charts.load('current', {'packages':['geochart']});
      		google.charts.setOnLoadCallback(drawRegionsMap);
      		function drawRegionsMap() {
        		var data = google.visualization.arrayToDataTable([
          		['Country', 'Popularity'],
          		['Germany', 200],
          		['United States', 300],
         		 ['Brazil', 400],
          		['Canada', 500],
          		['France', 600],
          		['RU', 700]
        	]);
        	var options = {};
		var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        	chart.draw(data, options);
      		}	
	});
}


/*
Asyncronous or Syncronis
http://stackoverflow.com/questions/5187968/how-should-i-call-3-functions-in-order-to-execute-them-one-after-the-other

$(document).ready(function(){      
	      
      if (mon==="Aug"){
	      console.log(topCtyTable["Dec"][1][3]);
	      console.log(topCtyTable["Nov"][1][3]);
	      console.log(topCtyTable["Oct"][1][3]);
	      console.log(topCtyTable["Sep"][1][3]);
        if(topCtyTable[0][1][3]>1000000000) {
          var valIndicator="B";
	  val1=topCtyTable[4][1][3]/1000000000;
	  val2=topCtyTable[3][1][3]/1000000000;
	  val3=topCtyTable[2][1][3]/1000000000;
	  val4=topCtyTable[1][1][3]/1000000000;
	  val5=topCtyTable[0][1][3]/1000000000;
        }else if(topCtyTable[0][1][3]>1000000){
	  var valIndicator="M";
	  val1=topCtyTable[4][1][3]/1000000;
	  val2=topCtyTable[3][1][3]/1000000;
	  val3=topCtyTable[2][1][3]/1000000;
	  val4=topCtyTable[1][1][3]/1000000;
	  val5=topCtyTable[0][1][3]/1000000;
	}else{
	  var valIndicator="T";
	  val1=topCtyTable[4][1][3]/1000;
	  val2=topCtyTable[3][1][3]/1000;
	  val3=topCtyTable[2][1][3]/1000;
	  val4=topCtyTable[1][1][3]/1000;
	  val5=topCtyTable[0][1][3]/1000;
	}
	country=topCtyTable[mon][1][2];

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
)};    */
     
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
