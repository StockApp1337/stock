window.addEventListener("load", main());

function main() {
  console.log("doneTwo");
  var picker = document.getElementById("picker");
  picker.addEventListener("change", (element)=> {
    console.log(element);
    console.log("inside function");
  }
  )
}
