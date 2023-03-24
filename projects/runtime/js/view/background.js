var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
        var tree;
        var buildings = [];

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'black');
            background.addChild(backgroundFill);

            // TODO: 3 - Add a moon and starfield
            for (var i = 0; i < 100; i++) {
                var circle = draw.circle(5, "white", "LightGray", 2); // draws a cirlce and stores it in the circle variable
                circle.x = canvasWidth * Math.random(); // takes the width of the canvas and multiplies times a random decimal and 
                circle.y = groundY * Math.random(); // takes groundY and multiplies i times a random decimal and stores
                background.addChild(circle); // adds that circle to the background as a child
            }

            var moon = draw.bitmap("img/moon.png");
            moon.x = canvasWidth - 500; // creates an x key for the moon object and assigns it a value
            moon.y = 50; // creates an y key for the moon object and assigns it a value
            moon.scaleX = 1; // scale the x value of the moon
            moon.scaleY = 1; // scale the y value of the moon
            background.addChild(moon); // add the value of moon as a child to background
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            for (var i = 0; i < 5; i++) {
                var buildingHeight = [100, 200, 300, 400, 500]; // creates variable called buildingHeight and stores 300 as the height of the building
                var building = draw.rect(75, buildingHeight[i], "LightGray", "Black", 1); // draws a rectangle and stores 
                building.x = 200 * i; // multiplies 200 times the current iteration of the loop so that the buildings are 200 pixels apart and sotres it as the same x value as the building
                building.y = groundY - buildingHeight[i]; // subtracts the building height from groundY and sets it as the y value
                background.addChild(building); // add the building as a child to the background
                buildings.push(building); // adds the buildings to the buildings array
            }
            
           
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png"); // draws a tree using bitmap and stores it to the variable tree
            tree.x = 0; // sets the x value of the tree
            tree.y = groundY - 240; // sets the y value of the tree
            background.addChild(tree); // adds the tree to the background as a child
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x -= 1;

            if (tree.x < -200) {
              tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            // loops through the buildings of the arrau, moves it, and checks its position on the canvas and resets to the right side of the canvas
            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];
                building.x -= 1; // takes the current x position of the tree and subtracts from the current x pos.

                // checks if the tree has moved off of the canvas and if it has it resets it to the right side of the canvas
                if (building.x < -300) {
                    building.x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
