# Day 02
- Fetched the CodeMirror API and built a working real-time editor.
- Integrated the code terminal.

# Day 03
- Created an iframe where the code is compiled and its output is displayed.
- By pressing the Run button, the code output appears in that frame.

# Day 04
- Implemented the console.
- Problem: when we use `console.log()`, it goes to the browser console instead of our app console.
- Solution: override the console function so that whenever the user logs something, it is replaced with our custom function.
- We modify the code before sending it to the iframe, create a temporary replacement, store the original console function, and replace `console.log` with a custom message handler.
- We then post this message and listen for it.

# Day 05
- Implemented the file system.
- click a file show code it contains 
- each time a file tab is clicked it clears previous code and show the code the tab contains 

# Day 06
- Problem : when I switch tabs its flashes the old code with template written in code 
- Solution : I made it save each time foreach loop been used `files[currentFile] = editor.state.doc.toString();`
it get stored to the variable 

- Problem : Clear button only clears the code in the editor not that been stored in the object 
- Solution : I made it clear the whole object each time clear button been pressed 

