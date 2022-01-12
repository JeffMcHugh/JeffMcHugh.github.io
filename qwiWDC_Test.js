var api1t;

function add() {
  //If you assign a value to a variable that has not been declared, it will automatically become a GLOBAL variable.
  api1text = document.getElementById('api1').value;

  window.localStorage.setItem("api1",api1text);
  api1t=window.localStorage.getItem('api1');

  //Above: in this case, the `grade` is the key while `One` is the value.

  //document.getElementById("demo").innerHTML = api1text;
  console.log("test console log")
  console.log(api1t)
  document.getElementById("demo").innerHTML = api1text;
  // api url

  // Defining async function
  async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    numparms=data[0].length;
    window.localStorage.setItem("numparameters",numparms);
    for (var i = 0, len = numparms; i < len; i++) {
      var param="param"+i.toString();
      window.localStorage.setItem(param,data[0][i]);
    }
    /*
    var cols2test=[];
    for (var i = 0, len = numparms-1; i < numparms; i++) {
      var col=[{id: window.localStorage.getItem('param0'),
      dataType: tableau.dataTypeEnum.string}];
      cols2test.push(col);
    }
    */
  }
  // Calling that async function
  getapi(api1t);
}
