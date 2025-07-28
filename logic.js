window.addEventListener("load", main());

function main() {
  console.log("doneTwo");
  var picker = document.getElementById("picker");
  picker.addEventListener("onchange", (element)=> {
    console.log(element);
    console.log("inside function");
  }
  )
}
