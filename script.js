import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";

const runButton = document.querySelector("#runButton");
const clrButton = document.querySelector("#clrButton");
const preview = document.querySelector("#preview");
const consoleOutput = document.querySelector("#consoleOutput");
const consoleInput = document.querySelector("#consoleInput");
const fileTabs = document.querySelectorAll(".file-tab");

const files = {
    "index.html": "<h1>Hello coder</h1>",
    "style.css": "h1 { color: red; }",
    "script.js": `(async () => {\n    const name = await input("Enter your name: ");\n    console.log("Hello, " + name + "!");\n})();`
};

let currentFile = "index.html";
let running = false;

const editor = new EditorView({
    doc: files[currentFile],
    extensions: [basicSetup, html()],
    parent: document.querySelector("#editor")
});

function saveCurrentFile() {
    files[currentFile] = editor.state.doc.toString();
}

function appendConsole(text, className = "text-zinc-300") {
    const line = document.createElement("div");
    line.className = className;
    line.textContent = text;
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function clearConsole() {
    consoleOutput.innerHTML = "";
}

function buildPreview() {
    const htmlCode = files["index.html"];
    const cssCode = files["style.css"];
    const jsCode = files["script.js"];

    return `
        <style>
            ${cssCode}
        </style>

        ${htmlCode}

        <script>
            const originalLog = console.log;

            console.log = function (...messages) {
                window.parent.postMessage({
                    type: "console",
                    message: messages.map(String).join(" ")
                }, "*");

                originalLog(...messages);
            };

            function input(promptText = "") {
                return new Promise((resolve) => {
                    window.parent.postMessage({
                        type: "input-request",
                        prompt: promptText
                    }, "*");

                    window.addEventListener("message", function handler(event) {
                        if (event.data?.type === "input-response") {
                            window.removeEventListener("message", handler);
                            resolve(event.data.value);
                        }
                    });
                });
            }

            ${jsCode}
        <\/script>
    `;
}

fileTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        saveCurrentFile();

        currentFile = tab.dataset.file;

        editor.dispatch({
            changes: {
                from: 0,
                to: editor.state.doc.length,
                insert: files[currentFile]
            }
        });
    });
});

runButton.addEventListener("click", () => {
    saveCurrentFile();
    clearConsole();
    running = true;

    const finalCode = buildPreview();
    preview.srcdoc = finalCode;

    appendConsole("[Program started]", "text-zinc-500");
});

clrButton.addEventListener("click", () => {
    editor.dispatch({
        changes: {
            from: 0,
            to: editor.state.doc.length,
            insert: ""
        }
    });

    files[currentFile] = "";
});

consoleInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (!running) {
        appendConsole("> " + consoleInput.value, "text-zinc-500");
        appendConsole("[Run the program first]", "text-red-400");
        consoleInput.value = "";
        return;
    }

    const value = consoleInput.value;
    consoleInput.value = "";

    appendConsole("> " + value, "text-zinc-200");

    preview.contentWindow.postMessage({
        type: "input-response",
        value
    }, "*");
});

window.addEventListener("message", (event) => {
    if (event.data?.type === "console") {
        appendConsole(event.data.message, "text-green-300");
    }

    if (event.data?.type === "input-request") {
        appendConsole(event.data.prompt || "Input requested:", "text-yellow-300");
        consoleInput.focus();
    }
});