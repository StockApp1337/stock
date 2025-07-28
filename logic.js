window.addEventListener("load", main);

function main() {
  console.log("doneFive");
  var picker = document.getElementById("picker");
  console.log(picker);
  picker.addEventListener("change", (e)=> {
    console.log(e.target.files[0]);
    console.log("inside function");
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload =() => {
      console.log(reader.result);
    }
  }
  )

  }
