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
        console.log(pdf);
        for(var i = 1; i <= pdf.numPages; i++){
          pdf.getPage(i).then(function(page){
            console.log(page);
            page.getTextContent().then(function(text){
              console.log("db",text.items);
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
      console.log(databaseArray, "databaseArray");
      for(let x = 0; x < databaseArray.length; x++){
      for(let q = 0; q < databaseArray[x].length; q+=3){
      if(databaseArray[q].str == "Purchase Name" || databaseArray[q].str == "Unit" || databaseArray[q].str == "Theoretical" || databaseArray[q].str == "Close Qty" || databaseArray[q].str == "Closing Quantity" || databaseArray[q].str == "TOTAL" || databaseArray[q].str == " " || databaseArray[q].str == "11 Bottled Cider" || databaseArray[q].str == "12 Bottled Lager" || databaseArray[q].str == "12A NA Bottled Lager" || databaseArray[q].str == "13 Bottled Spirit" || databaseArray[q].str == "14 Shots" || databaseArray[q].str == "15 Fortified" || databaseArray[q].str == "17 Spirits" || databaseArray[q].str == "17A NA Spirits" || databaseArray[q].str == "19 Cocktail Glasses" || databaseArray[q].str == "24 Wines" || databaseArray[q].str == "25 Sparkling" || databaseArray[q].str == "26 Mins - Energy" || databaseArray[q].str == "27 Mins - Mixers" || databaseArray[q].str == "28 Mins - Packaged" || databaseArray[q].str == "29 Mins - Non Pack" || databaseArray[q].str == "33 Bar Garnish" || databaseArray[q].str == "Dry Recipe Line" || databaseArray[q].str == "Notes:") {
        q++;
        continue;
      }
      let tempEntry = {"Unit" : databaseArray[q+1].str,
                       "Theoretical Close Quantity" : databaseArray[q+2].str,
                       "Closing Quantity" : databaseArray[q+3].str,
                       "Total" : 0};
      database[databaseArray[q].str] = tempEntry;
      //console.log("database", database);
    }
  }
  console.log(database, "DATABASE");
    })
  }


})
}
