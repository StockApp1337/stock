window.addEventListener("load", main);
var databaseArray = [];
function main() {
  var database = {};

  var { pdfjsLib } = globalThis;
  console.log(pdfjsLib, "pdfjsLib");
  console.log("doneEight");
  var picker = document.getElementById("picker");
  console.log(picker);
  picker.addEventListener("change", (e)=> {
    console.log("inside function");
    //Define reader object
    let reader = new FileReader();
    //Encode PDF data into Base64
    reader.readAsDataURL(e.target.files[0]);
    let base64data;
    //Store Base64
    reader.onload =() => {
      base64data = reader.result.slice(28);
      console.log(base64data);
      //Start PDFJS
      var pdfData = atob(base64data);

      pdfjsLib.GlobalWorkerOptions.workerSrc = "pdfjs-5-2/build/pdf.worker.mjs";
      console.log(pdfjsLib.GlobalWorkerOptions.workerSrc, "worker");
      var loadingTask = pdfjsLib.getDocument({data: pdfData});
      console.log(loadingTask, "loadingTask");
      loadingTask.promise.then(function(pdf) {
        console.log("PDF Loaded");
        //console.log(pdf);
        for(var i = 1; i <= pdf.numPages; i++){
          pdf.getPage(i).then(function(page){
            console.log(page);
            page.getTextContent().then(function(text){
              //console.log("db",text.items);
              //Remove common items from array
              var cleanedArray = text.items.splice(48);
              databaseArray.push(cleanedArray);
              //console.log(databaseArray, "databaseArray inside for");
              /*

              console.log("cleanedArray", cleanedArray);

            } */
              //console.log(databaseArray, "databaseArrayOutsideLoop");

        })

      })
      }
      //console.log(databaseArray, "databaseArray");
      for(let x = 0; x < databaseArray.length; x++){
      for(let q = 0; q < databaseArray[x].length; q+=3){
      if(databaseArray[x][q].str == "Purchase Name" || databaseArray[x][q].str == "Unit" || databaseArray[x][q].str == "Theoretical" || databaseArray[x][q].str == "Close Qty" || databaseArray[x][q].str == "Closing Quantity" || databaseArray[x][q].str == "TOTAL" || databaseArray[x][q].str == " " || databaseArray[x][q].str == "11 Bottled Cider" || databaseArray[x][q].str == "12 Bottled Lager" || databaseArray[x][q].str == "12A NA Bottled Lager" || databaseArray[x][q].str == "13 Bottled Spirit" || databaseArray[x][q].str == "14 Shots" || databaseArray[x][q].str == "15 Fortified" || databaseArray[x][q].str == "17 Spirits" || databaseArray[x][q].str == "17A NA Spirits" || databaseArray[x][q].str == "19 Cocktail Glasses" || databaseArray[x][q].str == "24 Wines" || databaseArray[x][q].str == "25 Sparkling" || databaseArray[x][q].str == "26 Mins - Energy" || databaseArray[x][q].str == "27 Mins - Mixers" || databaseArray[x][q].str == "28 Mins - Packaged" || databaseArray[x][q].str == "29 Mins - Non Pack" || databaseArray[x][q].str == "33 Bar Garnish" || databaseArray[x][q].str == "Dry Recipe Line" || databaseArray[x][q].str == "Notes:") {
        q++;
        continue;
      }
      console.log(databaseArray[x][q]);
      let tempEntry = {"Unit" : databaseArray[x][q+1].str,
                       "Theoretical Close Quantity" : databaseArray[x][q+2].str,
                       "Closing Quantity" : databaseArray[x][q+3].str,
                       "Total" : 0};
      database[databaseArray[x][q].str] = tempEntry;
      //console.log("database", database);
    }
  }
  console.log(database, "DATABASE");
    })
  }


})
}
