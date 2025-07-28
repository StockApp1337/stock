window.addEventListener("load", main);

function main() {
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
        for(var i = 1; i <= pdf.numPages; i++){
          pdf.getPage(i).then(function(page){
            console.log(page);
            page.getTextContent().then(function(text){
              console.log("text", text);
            })
        })

        }
      })
    }
  })

  }
