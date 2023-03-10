var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle;       // declare circle variable
        var circles = [];  // declare array to store circles
        
        // TODO 2 : Create a function that draws a circle 
        function drawCircle() {           // Code to draw a circle
            circle = draw.randomCircleInArea(canvas, true, true, '#999', 2);    // calls a function from lib to make a random circle at a random spot
            physikz.addRandomVelocity(circle, canvas);                          // add random velocity to circles
            view.addChild(circle);                                              // view is given the child "cricle"
            circles.push(circle);                                               // adds the circle to the circles array
        }   

        // TODO 3 / 7 : Call the drawCircle() function 
        for (var loopsCompleted = 0; loopsCompleted <100; loopsCompleted++) {           // loop to iterate through array to draw 1000 circles
            drawCircle();                                                                // calls drawCircle function (see comments on lines 27-31 for details)
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            // TODO 8 : Iterate over the array
            for (var i = 0; i < circles.length; i++) { 
                var eachCircle = circles[i];              
                physikz.updatePosition(eachCircle)        
                game.checkCirclePosition(eachCircle)      
            }
          
        }
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {   // checks position of circle
            // if circle goes too far right, move it back to the left
            if (circle.x > canvas.width ) {
                circle.x = 0;
            }
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if (circle.x < 0) {                         // if circle moves to far left, move it to the right
                circle.x = canvas.width;       
            } else if (circle.y < 0) {                  // if circle goes too far up, move it down 
                circle.y = canvas.height;     
            } else if (circle.y > canvas.height) {      // if cirlce moves too far down, move it to the top
                circle.y = 0;                 
            }                                 

            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}