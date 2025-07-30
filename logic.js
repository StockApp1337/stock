window.addEventListener("load", main);

function main() {
  var database = {};
  var { pdfjsLib } = globalThis;
  console.log(pdfjsLib, "pdfjsLib");
  console.log("doneSix");
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
        let databaseArray = [];
        for(var i = 1; i <= pdf.numPages; i++){
          pdf.getPage(i).then(function(page){
            console.log(page);
            page.getTextContent().then(function(text){
              console.log("db",text.items);
              //Remove common items from array
              var cleanedArray = text.items.splice(48);
              databaseArray.push(cleanedArray);
              console.log(databaseArray, "databaseArray inside for");
              /*

              console.log("cleanedArray", cleanedArray);

            } */
              console.log(databaseArray, "databaseArrayOutsideLoop");
              for(let q = 0; q < databaseArray.length; q+=3){
              if(cleanedArray[q].str == "Purchase Name" || cleanedArray[q].str == "Unit" || cleanedArray[q].str == "Theoretical" || cleanedArray[q].str == "Close Qty" || cleanedArray[q].str == "Closing Quantity" || cleanedArray[q].str == "TOTAL" || cleanedArray[q].str == " " || cleanedArray[q].str == "11 Bottled Cider" || cleanedArray[q].str == "12 Bottled Lager" || cleanedArray[q].str == "12A NA Bottled Lager" || cleanedArray[q].str == "13 Bottled Spirit" || cleanedArray[q].str == "14 Shots" || cleanedArray[q].str == "15 Fortified" || cleanedArray[q].str == "17 Spirits" || cleanedArray[q].str == "17A NA Spirits" || cleanedArray[q].str == "19 Cocktail Glasses" || cleanedArray[q].str == "24 Wines" || cleanedArray[q].str == "25 Sparkling" || cleanedArray[q].str == "26 Mins - Energy" || cleanedArray[q].str == "27 Mins - Mixers" || cleanedArray[q].str == "28 Mins - Packaged" || cleanedArray[q].str == "29 Mins - Non Pack" || cleanedArray[q].str == "33 Bar Garnish" || cleanedArray[q].str == "Dry Recipe Line") {
                q++;
                continue;
              }
              let tempEntry = {"Unit" : databaseArray[q+1].str,
                               "Theoretical Close Quantity" : databaseArray[q+2].str,
                               "Closing Quantity" : databaseArray[q+3].str,
                               "Total" : 0};
              database[cleanedArray[q].str] = tempEntry;
              //console.log("database", database);
            })
        })

        }
      })
    }
  })

  }
