import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";

const runButton = document.querySelector("#runButton");
const clrButton = document.querySelector("#clrButton");
const preview = document.querySelector("#preview");
const consoleBox = document.querySelector("#console");
const fileTabs = document.querySelectorAll(".file-tab");

const files = {
    "index.html" : "<h1>Hello coder</h1>",
    "style.css" : "h1 {color :red; }",
    "script.js" : 'console.log("Code working ");'
}

let currentFile = "index.html";


const editor = new EditorView({
    doc: files[currentFile],

    extensions: [
        basicSetup,
        html()
    ],

    parent: document.querySelector("#editor")
});

fileTabs.forEach(function(tab){
    tab.addEventListener("click" , function(){

        //save the file
        files[currentFile] = editor.state.doc.toString();
        const fileName = tab.dataset.file;

        currentFile = fileName;

        editor.dispatch({
            changes :{
                from :0 ,
                to :editor.state.doc.length,
                insert : files[currentFile]
            }
        });
    });
});

runButton.addEventListener("click", function () {
    const code = editor.state.doc.toString();

    const consoleCode = `
        <script>
            const originalLog = console.log;
            
            //overriding/intercepting we are taking any console log and storing it to our object 
            console.log = function (message) {
                window.parent.postMessage({
                    type : "console" ,
                    message : message
                } , "*");
                originalLog(message);
            }
        <\/script>

    `;
    preview.srcdoc = consoleCode + code;
});

clrButton.addEventListener("click", function () {
    editor.dispatch({
        changes: {
            from: 0,
            to: editor.state.doc.length,// give the length of editor (total no of char in it )
            insert: ""
        }
    });
    files[currentFile] = "";
    // console.log("Clr button clicked"); 
});

window.addEventListener("message", function (event) {
    if (event.data.type === "console") {
        consoleBox.textContent += `${event.data.message} \n`;
    }
})