var level01 = (window) => {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = (game) => {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { 
                    "type": "tub", 
                    "x": 400, 
                    "y": groundY - 10 
                },
                { 
                    "type": "tub", 
                    "x": 600, 
                    "y": groundY - 10 
                },
                { 
                    "type": "tub", 
                    "x": 900, 
                    "y": groundY - 10 
                },
                { 
                    "type": "tub", 
                    "x": 1200, 
                    "y": groundY - 10 
                },
                { 
                    "type": "enemy", 
                    "x": 300, 
                    "y": groundY - 50 
                },
                { 
                    "type": "reward", 
                    "x": 600, 
                    "y": groundY - 500 
                },
                { 
                    "type": "reward", 
                    "x": 500, 
                    "y": groundY - 500 
                },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        
        function createSawBlade(x, y) {
            var hitZoneSize = 25; // the size of the hitzone assigned to the variable hitzone
            var damageFromObstacle = 10; // sets the damage amount and assigns to a variable called 
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap("img/sawblade.png"); // draws the image as a  bitmap and stores it to the variable obstacleImage
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        function createTub(x, y) {
            var hitZoneSize = 25; // the size of the hitzone assigned to the variable hitzone
            var damageFromObstacle = 10; // sets the damage amount and assigns to a variable called 
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap("img/tub.png"); // draws the image as a  bitmap and stores it to the variable obstacleImage
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        function createSpikes(x, y) {
            var hitZoneSize = 25; // the size of the hitzone assigned to the variable hitzone
            var damageFromObstacle = 10; // sets the damage amount and assigns to a variable called 
            var spikeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            spikeHitZone.x = x;
            spikeHitZone.y = y;
            game.addGameItem(spikeHitZone);
            var obstacleImage = draw.bitmap("img/sawblade.png"); // draws the image as a  bitmap and stores it to the variable obstacleImage
            spikeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        

        function createEnemy(x, y) {
            var enemy = game.createGameItem("enemy", 25);
            var redSquare = draw.rect(50, 50, "red");
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = 400;
            enemy.y = groundY - 50;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
    
            enemy.onPlayerCollision = () => {
                game.changeIntegrity(-10)
            };
    
            enemy.onProjectileCollision = () => {
                game.increaseScore(100);
                enemy.fadeOut();
            }
        }

        function createReward(x, y) {
            var reward = game.createGameItem("reward", 25);
            reward.velocityX = -1;
    
            var hitZoneSize = 25; // the size of the hitzone assigned to the variable hitzone
            var damageFromObstacle = 10; // sets the damage amount and assigns to a variable called 
            var rewardHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            rewardHitZone.x = x;
            rewardHitZone.y = y;
            game.addGameItem(rewardHitZone);
            var rewardImage = draw.bitmap("img/moneymoney.png"); // draws the image as a  bitmap and stores it to the variable obstacleImage
            rewardHitZone.addChild(rewardImage);
            rewardImage.x = -25;
            rewardImage.y = -25;

            reward.onPlayerCollision = () => {
                game.changeIntegrity(10)
            };
    
            reward.onProjectileCollision = () => {
                game.increaseScore(100);
                reward.fadeOut();
            }
        }

        // loop for game items
        for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i]; // assigns the current index of the gameItem array to the 
        
            switch(gameItem.type){
                case "tub":
                    createTub(gameItem.x, gameItem.y);
                    break;
                case "sawblade":
                    createSawBlade(gameItem.x, gameItem.y);
                    break;
                case "enemy":
                    createEnemy(gameItem.x, gameItem.y);
                    break;
                case "reward":
                    createReward(gameItem.x, gameItem.y);
                    break;
                case "spikes":
                    createSpikes(gameItem.x, gameItem.y);
                    break;
                default:
                    console.log("Invalid gameItem inputted.");
            }

        }

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
