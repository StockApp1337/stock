window.addEventListener("load", main);

function main() {
  console.log("doneSix");
  var picker = document.getElementById("picker");
  console.log(picker);
  picker.addEventListener("change", (e)=> {
    console.log("inside function");
    //Define reader object
    let reader = new FileReader();
    //Encode PDF data into Base64
    reader.readAsDataURL(e.target.files[0]);
    let base64text;
    //Store Base64
    reader.onload =() => {
      console.log(reader.result);
    }
  }
  )

  }
