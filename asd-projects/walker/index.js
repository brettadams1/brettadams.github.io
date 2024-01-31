/* global $, sessionStorage */

$(document).ready(runProgram); // Wait for all HTML/CSS elements to be loaded before running program

function runProgram() {
  // CONSTANTS AND VARIABLES DECLARATION

  // Frame settings
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

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
    xCoord: 0,
    yCoord: 0,
    xSpeed: 0,
    ySpeed: 0
  };

  let PLAYER2 = {
    xCoord: 390,
    yCoord: 390,
    xSpeed: 0,
    ySpeed: 0
  };
  // Set up functions execution intervals
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);

  // Event listeners registration
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  Function called on each timer tick. Performs game logic.
  */
  function newFrame() {
    repositionGameItem()
    redrawGameItem()
    wallCollision()
    randomColor()
  }

  /* 
  Functions called when specific keyboard events occur.
  */
  function handleKeyDown(event) {
    switch (event.which) {
      case KEY.LEFT:
        walker.xSpeed = -5;
        break;
      case KEY.UP:
        walker.ySpeed = -5;
        break;
      case KEY.RIGHT:
        walker.xSpeed = 5;
        break;
      case KEY.DOWN:
        walker.ySpeed = 5;
        break;
      case KEY.A:
        PLAYER2.xSpeed = -5;
        break;
      case KEY.W:
        PLAYER2.ySpeed = -5;
        break;
      case KEY.D:
        PLAYER2.xSpeed = 5;
        break;
      case KEY.S:
        PLAYER2.ySpeed = 5;
        break;
      default:
        break;
    }
  }

  function handleKeyUp(event) {
    switch (event.which) {
      case KEY.LEFT:
        walker.xSpeed = 0;
        break;
      case KEY.UP:
        walker.ySpeed = 0;
        break;
      case KEY.RIGHT:
        walker.xSpeed = 0;
        break;
      case KEY.DOWN:
        walker.ySpeed = 0;
        break;
      case KEY.A:
        PLAYER2.xSpeed = 0;
        break;
      case KEY.W:
        PLAYER2.ySpeed = 0;
        break;
      case KEY.D:
        PLAYER2.xSpeed = 0;
        break;
      case KEY.S:
        PLAYER2.ySpeed = 0;
        break;
      default:
        break;
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