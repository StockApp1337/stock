window.addEventListener("load", main());

function main() {
  console.log("doneThree");
  var picker = document.getElementById("picker");
  picker.addEventListener("change", ()=> {
    console.log();
    console.log("inside function");
  }
  )
}
