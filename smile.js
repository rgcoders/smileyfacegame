// Global Variable
var numberOfFaces = 5;

function generateFaces() {
	// Initiate local variables
	var theLeftSide = document.getElementById("leftSide");
	var theRightSide = document.getElementById("rightSide");
	var theBody = document.getElementsByTagName("body")[0];
	var count = 1; // Counter Variable
	
	// Loop executes numberOfFaces times
	while (count <= numberOfFaces) {
		var this_img = document.createElement("img");
		this_img.src="smile.png"; // smiley face image
		
		// Generate Random Numbers for Top & Left Smiley Face Positions
		var top_position = Math.random() * 401;
		top_position = Math.floor(top_position); // random top (0 to 400)
		var left_position = Math.random() * 401;
		left_position = Math.floor(left_position); // random left (0 to 400)
		
		// Assign Random Positions to Smiley Faces via .style
		this_img.style.top = top_position + "px";
		this_img.style.left = left_position + "px";
		
		// Add Smiley Face to the DOM (leftSide Div)
		theLeftSide.appendChild(this_img);
		
		// Clone Left Side Smiley Faces 
		var leftSideImages = theLeftSide.cloneNode(true);
		
		// remove the last child of leftSideImages
		// before leftSideImages are cloned to right side
		// the lastChild is the the extra face the player seeks
		leftSideImages.removeChild(leftSideImages.lastChild);
		
		// Add Smiley Faces to the DOM (rightSide Div)
		theRightSide.appendChild(leftSideImages);
		
		// Increment Loop Counter
		count++; 
	}
	// Smiley face Loop Ends and transitions to new function below...
	
	// This function adds an Event Handler ".onclick" to 
	// the extra face on the leftSide Div... (theLeftSide.lastChild.onclick)
	// If player chooses correctly, by clicking on the extra face, 
	// the function generates a new set of faces with 5 more than before
	
	// The line event.stopPropagation(); is necessary in order to ensure that 
	// the event does not also get applied to other elements in the web page, 
	// such as other faces. That would trigger the function multiple times, 
	// which is not what we want.
	theLeftSide.lastChild.onclick = 
			function nextLevel(event) {
	    		event.stopPropagation();
	    		numberOfFaces += 5;
	    
			// delete all faces and generate a new set
	    		while(theLeftSide.firstChild) {
			theLeftSide.removeChild(theLeftSide.firstChild);
	    		}
	    		while(theRightSide.firstChild) {
			theRightSide.removeChild(theRightSide.firstChild);
	    		}
	    		generateFaces();
		};
	
	// Add an Event Handler function to the body (theBody.onclick)
	// to manage situations when the player clicks on 
	// anything except the correct face
	
	// The line theBody.onclick = null;
	// means that from now onwards nothing will happen 
	// when the user clicks anywhere in the web page 
	
	// theLeftSide.lastChild.onclick = null; means that from now onwards 
	// nothing will happen when the user clicks on the extra face.
	
	theBody.onclick = function gameOver() {
		alert("Game Over!");
		theBody.onclick = null;
		theLeftSide.lastChild.onclick = null;
	}; 
	
}