window.addEventListener("load", main());

function main() {
  console.log("done");
  var picker = document.getElementById("picker");
  picker.addEventListener("change", (element)=> {
    console.log(element);
  }
  )
}
