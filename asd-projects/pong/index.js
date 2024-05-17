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
  let winner;
  let player1Score = $("#player1Score");
  let player2Score = $("#player2Score");
  // Game Item Objects
  let player1 = {
    ID: "#player1",
    xCoord: 25,
    yCoord: 350,
    ySpeed: 0,
    score: 0
  }

  let player2 = {
    ID: "#player2",
    xCoord: 1850,
    yCoord: 350,
    ySpeed: 0,
    score: 0
  }

  let ball = {
    ID: "#ball",
    xCoord: BOARD_WIDTH / 2,
    yCoord: BOARD_HEIGHT / 2,
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
    checkScore()
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
        player1.ySpeed = -8; // move up
        break;
      case KEY.S:
        player1.ySpeed = 8; // move down
        break;
      case KEY.UP:
        player2.ySpeed = -8; // move player 2 up
        break;
      case KEY.DOWN:
        player2.ySpeed = 8; // move player 2 right
        break;
      case KEY.SPACE:
        ball.xSpeed = 10
        ball.ySpeed = 10
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
    if (
      item.yCoord > BOARD_HEIGHT - $(item.ID).height() ||
      item.yCoord < 0
    ) {
      if (item.ID === ball.ID) {
        item.ySpeed *= -1;
      } else {
        item.yCoord -= item.ySpeed;
      }
    }

    if (item.ID === ball.ID) {
      if (
        item.xCoord < player1.xCoord + $(player1.ID).width() &&
        item.xCoord + $(item.ID).width() > player1.xCoord &&
        item.yCoord < player1.yCoord + $(player1.ID).height() &&
        item.yCoord + $(item.ID).height() > player1.yCoord
      ) {
        item.xSpeed *= -1; 
      }

      if (
        item.xCoord < player2.xCoord + $(player2.ID).width() &&
        item.xCoord + $(item.ID).width() > player2.xCoord &&
        item.yCoord < player2.yCoord + $(player2.ID).height() &&
        item.yCoord + $(item.ID).height() > player2.yCoord
      ) {
        item.xSpeed *= -1; 
      }
    }
    if (item.xCoord > BOARD_WIDTH - $(item.ID).width()) {
      player1.score++;
      item.xSpeed *= -1;
      resetBoard()
      console.log(player1.score)
    } else if (item.xCoord < 0) {
      player2.score++;
      resetBoard()
      console.log(player2.score)
    }
  };
  
  let checkScore = () => {
    if (player1.score === 11) {
      winner = "Player 1"
      endGame()
    } else if (player2.score === 11) {
      winner = "Player 2"
      endGame()
    }
  }

  let repositionGameItem = () => {
    player1.yCoord += player1.ySpeed
    player2.yCoord += player2.ySpeed
    ball.xCoord += ball.xSpeed
    ball.yCoord += ball.ySpeed
  }

  let resetBoard = () => {
    ball.xCoord = BOARD_WIDTH / 2
    ball.yCoord = BOARD_HEIGHT / 2
    ball.xSpeed = 0
    ball.ySpeed = 0
    player1.yCoord = 350
    player2.yCoord = 350
    player1Score.text(player1.score)
    player2Score.text(player2.score)
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
    $("body").html(`<span style="color: white">${winner} Wins! Refresh the page to play again!</span>`);
    
  }
}
