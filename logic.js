window.addEventListener("load", main);

function main() {
  var { pdfjsLib } = globalThis;
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

      pdfjsLib.GlobalWorkerOptions.workerSrc = "//mozilla.github.io/pdf.js/build/pdf.worker.mjs"
      var loadingTask = pdfjsLib.getDocument({data : pdfData});
      loadingTask.promise.then(function(pdf) {
        console.log("PDF Loaded");
        console.log(pdf);
      })
    }
  }
  )

  }
