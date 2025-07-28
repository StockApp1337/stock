window.addEventListener("load", main);

function main() {
  console.log("doneFive");
  var picker = document.getElementById("picker");
  console.log(picker);
  picker.addEventListener("change", (e)=> {
    console.log(e);
    console.log("inside function");
    console.log(window.location.origin);
  }
  )

  }
}
