/* global $, sessionStorage */

$(document).ready(runProgram); // Wait for all HTML/CSS elements to be loaded before running program

function runProgram() {
  // CONSTANTS AND VARIABLES DECLARATION
  
  // Frame settings
  const FRAME_RATE = 60; // number of frames per second
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE; // time between frames in milliseconds

  // Key codes for arrow keys
  const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68
  };

  // Walker object containing initial values and speeds
  let walker = {
    xCoord: 0, // current horizontal position
    yCoord: 0, // current vertical position
    xSpeed: 0, // change in horizontal position per frame
    ySpeed: 0 // change in vertical position per frame
  };

  let PLAYER2 = {
    xCoord: 390,
    yCoord: 390,
    xSpeed: 0,
    ySpeed: 0
  };

  // Set up functions execution intervals
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // call newFrame every FRAMES_PER_SECOND_INTERVAL ms

  // Event listeners registration
  $(document).on('keydown', handleKeyDown); // register keydown event listener
  $(document).on('keyup', handleKeyUp); // register keyup event listener
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  Function called on each timer tick. Performs game logic.
  */
  function newFrame() {
    repositionGameItem() // update positions of game items
    redrawGameItem() // redraw game items at their updated positions
    wallCollision() // check for collisions with walls
    randomColor() // randomly generate colors for game items upon click
  }

  /* 
  Functions called when specific keyboard events occur.
  */
  function handleKeyDown(event) {
    switch (event.which) {
      case KEY.LEFT:
        walker.xSpeed = -5; // move left
        break;
      case KEY.UP:
        walker.ySpeed = -5; // move up
        break;
      case KEY.RIGHT:
        walker.xSpeed = 5; // move right
        break;
      case KEY.DOWN:
        walker.ySpeed = 5; // move down
        break;
      case KEY.A:
        PLAYER2.xSpeed = -5; // move player 2 left
        break;
      case KEY.W:
        PLAYER2.ySpeed = -5; // move player 2 up
        break;
      case KEY.D:
        PLAYER2.xSpeed = 5; // move player 2 right
        break;
      case KEY.S:
        PLAYER2.ySpeed = 5; // move player 2 down
        break;
      default:
        break;
    }
  }

  function handleKeyUp(event) {
    switch (event.which) {
      case KEY.LEFT:
        walker.xSpeed = 0; // stop moving horizontally
        break;
      case KEY.UP:
        walker.ySpeed = 0; // stop moving vertically
        break;
      case KEY.RIGHT:
        walker.xSpeed = 0; // stop moving horizontally
        break;
      case KEY.DOWN:
        walker.ySpeed = 0; // stop moving vertically
        break;
      case KEY.A:
        PLAYER2.xSpeed = 0; // stop moving player 2 horizontally
        break;
      case KEY.W:
        PLAYER2.ySpeed = 0; // stop moving player 2 vertically
        break;
      case KEY.D:
        PLAYER2.xSpeed = 0; // stop moving player 2 horizontally
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function randomColor() {
    let randomColor = "#000000".replace(/0/g, () => {
      return (~~(Math.random() * 16)).toString(16);
    });

    $("#walker").on("click", () => {
      $("#walker").css("background-color", randomColor)
    })
    $("#player2").on("click", () => {
      $("#player2").css("background-color", randomColor)
    })
  }

  function repositionGameItem() {
    walker.xCoord += walker.xSpeed
    walker.yCoord += walker.ySpeed
    PLAYER2.xCoord += PLAYER2.xSpeed
    PLAYER2.yCoord += PLAYER2.ySpeed
  }

  function redrawGameItem() {
    $("#walker").css("left", walker.xCoord);
    $("#walker").css("top", walker.yCoord);
    $("#player2").css("left", PLAYER2.xCoord);
    $("#player2").css("top", PLAYER2.yCoord);
  }

  function wallCollision() {
    if (walker.xCoord > $("#board").width() - $("#walker").width() || walker.xCoord < 0) {
      walker.xCoord -= walker.xSpeed;
    } 
    if (walker.yCoord > $("#board").height() - $("#walker").height() || walker.yCoord <= 0) {
      walker.yCoord -= walker.ySpeed;
    }
    if (PLAYER2.xCoord > $("#board").width() - $("#player2").width() || PLAYER2.xCoord < 0) {
      PLAYER2.xCoord -= PLAYER2.xSpeed;
    } 
    if (PLAYER2.yCoord > $("#board").height() - $("#player2").height() || PLAYER2.yCoord <= 0) {
      PLAYER2.yCoord -= PLAYER2.ySpeed;
    }
  }

  function endGame() {
    // Stop the interval timer
    clearInterval(interval);

    // Turn off event handlers
    $(document).off();
  }
}