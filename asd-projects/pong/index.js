/* global $, sessionStorage */
$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  "use strict";
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const BALL_SPEED = 5;
  
  // Game Item Objects
  let player1 = {
    ID: "#player1",
    xCoord: 25,
    yCoord: 350,
    ySpeed: 0
  }

  let player2 = {
    ID: "#player2",
    xCoord: 1850,
    yCoord: 350,
    ySpeed: 0
  }

  let ball = {
    ID: "#ball",
    xCoord: BOARD_WIDTH / 2,
    yCoord:BOARD_HEIGHT / 2,
    xSpeed: 0,
    ySpeed: 0
  }

  const KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
    SPACE: 32
  };

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  let newFrame = () => {
    repositionGameItem()
    drawItem()
    checkBoundaries(player1)
    checkBoundaries(player2)
    checkBoundaries(ball)

  }
  
  /* 
  Called in response to events.
  */
  let drawItem = () => {
    $("#player1").css("left", player1.xCoord);
    $("#player1").css("top", player1.yCoord);
    $("#player2").css("left", player2.xCoord);
    $("#player2").css("top", player2.yCoord);
    $("#ball").css("left", ball.xCoord);
    $("#ball").css("top", ball.yCoord);
  
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  let handleKeyDown = (e) => {
    switch (e.which) {
      case KEY.W:
        player1.ySpeed = -5; // move up
        break;
      case KEY.S:
        player1.ySpeed = 5; // move down
        break;
      case KEY.UP:
        player2.ySpeed = -5; // move player 2 up
        break;
      case KEY.DOWN:
        player2.ySpeed = 5; // move player 2 right
        break;
      case KEY.SPACE:
        ball.xSpeed = 1
        ball.ySpeed = 1
      default:
        break;
    }
  }

  let handleKeyUp = (e) => {
    switch (e.which) {
      case KEY.W:
        player1.ySpeed = 0; // move up
        break;
      case KEY.S:
        player1.ySpeed = 0; // move down
        break;
      case KEY.UP:
        player2.ySpeed = 0; // move player 2 up
        break;
      case KEY.DOWN:
        player2.ySpeed = 0; // move player 2 right
        break;
      default:
        break;
    }
  }

  let checkBoundaries = (item) => {
    if (item.yCoord > BOARD_HEIGHT- $(item.ID).height() || item.yCoord < 0) {
      item.yCoord -= item.ySpeed;
    }
    if (item.xCoord > BOARD_WIDTH - $(item.ID).width() || item.xCoord < 0) {
      item.xCoord -= item.xSpeed;
    }
  }

  let ballFunction = () => {
    
  }

  let repositionGameItem = () => {
    player1.yCoord += player1.ySpeed
    player2.yCoord += player2.ySpeed
    ball.xCoord += ball.xSpeed
    ball.yCoord += ball.ySpeed
  }

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp); 

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
