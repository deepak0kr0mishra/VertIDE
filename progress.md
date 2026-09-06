# Day 02 
I fetch API ( Codemirror ) , made a real editor working 
Intergrated the code terminal 

# Day 03 
I made an Iframe where my code get compile and get printed 
By pressing run button my code output show up on that frame 

# Day 04 
Implemented console 
Problem : when we console log anything it get to our browser console 

solution : whenever user runs console log it get replaced with our function (Overriding)

we modify code before sending it to Iframe , we create a temp and store the original console function and replace console log with message 

 we post this message and listen to it 
