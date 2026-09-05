import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";

const runButton = document.querySelector("#runButton");
const clrButton = document.querySelector("#clrButton");
const preview = document.querySelector("#preview");

const editor = new EditorView({
    doc: "<h1>Hello VertIDE</h1>",

    extensions: [
        basicSetup,
        html()
    ],

    parent: document.querySelector("#editor")
});

runButton.addEventListener("click", function () {
    const code = editor.state.doc.toString();
    preview.srcdoc = code;
});

clrButton.addEventListener("click", function () {
    editor.dispatch({
        changes: {
            from: 0,
            to: editor.state.doc.length,// give the length of editor (total no of char in it )
            insert: ""
        }
    })
    // console.log("Clr button clicked"); 
});