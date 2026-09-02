const runButton = document.querySelector("#runButton");
const clrButton = document.querySelector("#clrButton");
const editor = document.querySelector("#editor");


runButton.addEventListener("click" ,  function () {
    editor.textContent = "VertIDE is working fine ! \nwe are good to go "; 

    // console.log("Run button clicked");
});

clrButton.addEventListener("click" , function () {
    editor.textContent = "";

    // console.log("Clr button clicked"); 
});