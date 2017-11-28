/***********************************************************
*                                                          *
* ALPHA BREAKOUT CLONE IN JAVASCRIPT EARLY SIMPLE VERSION  *
*                                                          *
***********************************************************/

/***************************************************
*                                                  *
*                  GAME OBJEKT                     *
*                                                  *
***************************************************/

var game = {
    
    init: function() {
        this.canvas = document.querySelector('#breakoutCanvas');
        this.context = this.canvas.getContext('2d');
        
        if(!this.context) {
            console.log("Error getting gamelication context");
            return;
        }
        
        window.addEventListener('keydown', controller.keypress, true);
        document.getElementById("startButton").addEventListener('click', this.startGameButton);
        this.canvas.addEventListener('mousemove', mouseController.updateMousePos);
        this.canvas.addEventListener('mousedown', mouseController.handleMouseClick);
        this.setupBricks();
        this.showScreen.update();
        //this.startGame.start(); TEST
        
        return;
        
    },
    
    startGameButton: function() {
    
        game.showScreen.showStartScreen = false;
        //game.startGame.start(); TEST
    
    },
    
    startGame: {
        start: function() {
            
            game.clearContext();

            game.drawBricks();

            gamer.draw();
            ball.update();
            
//            requestAnimationFrame(game.showScreen.update); TEST
            
        }
        
    },
    
    showScreen: {
        
        showStartScreen: true,
        showWinScreen: false,
        showEndScreen: false,
    
        update: function() {

            if(game.showScreen.showStartScreen) {

                game.gameStartText();

            } else if(game.showScreen.showWinScreen) {

                game.gameWinText();

            } else if (game.showScreen.showEndScreen) {

                game.gameOverText();

            } else {

                game.startGame.start();

            }
        
            requestAnimationFrame(game.showScreen.update);
        }
    
    },
    
    clearContext: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return;
    },
    
    ballMiss: function() {
        
        gamer.lives -=1;
        
        if(gamer.lives < 1) {
//            this.reset(); TEST
            game.showScreen.showEndScreen = true;
            gamer.highScore.highScores();
            gamer.highScore.drawHighScore();
        }
        
        ball.reset();
        
    },
    
    drawBricks: function() {
        
        this.bricks.forEach(function(brick) { brick.draw(); });
        
    },
    
    setupBricks: function() {
        
        this.bricks = new Array();
        
        var i = 0;
        var brickTop = 50;
        var brickBackLeft = 150;
        
        // Setup back row
        for (i = 0; i < 12; i++) {
            var brick = new Brick();
            brick.position.x = 100 + (i * brick.size.width) + i;
            brick.position.y = brickTop;
            brick.health = 1;
            this.bricks.push(brick);
        }
        
        //Setup middle row
        for (i = 0; i < 12; i++) {
            var brick = new Brick();
            brick.position.x = 100 + (i * brick.size.width) + i;
            brick.position.y = brickTop + brick.size.height + 1;
            brick.health = 3;
            this.bricks.push(brick);
        }
        
        //Setup 2nd middle row
        for (i = 0; i < 12; i++) {
            var brick = new Brick();
            brick.position.x = 100 + (i * brick.size.width) + i;
            brick.position.y = brickTop + (2 * brick.size.height) + 1;
            brick.health = 2;
            this.bricks.push(brick);
        }
        
        //Setup front row
        for (i = 0; i < 12; i++) {
            var brick = new Brick();
            brick.position.x = 100 + (i * brick.size.width) + i;
            brick.position.y = brickTop + (3 * brick.size.height) + 1;
            brick.health = 3;
            this.bricks.push(brick);
        }
        
    },
    
    gameStartText: function() {
      
        this.colorText("GAME START!",this.canvas.width/2,this.canvas.height/2 -100,'black');
        this.colorText("-- click button to start --",this.canvas.width/2,this.canvas.height-20,'black');
        this.colorText("-- use left and right arrows to move paddle --",this.canvas.width/2,this.canvas.height-60,'black');
        
    },
    
    gameOverText: function() {
      
        this.colorText("GAME OVER!",this.canvas.width/2,this.canvas.height/2 -100,'black');
        this.colorText("YOUR SCORE IS " + gamer.score,this.canvas.width/2,this.canvas.height/2,'black');
        this.colorText("-- click to continue --",this.canvas.width/2,this.canvas.height-20,'black');
        
    },
    
    gameWinText: function() {
      
        this.colorText("YOU WON!",this.canvas.width/2,this.canvas.height/2 -100,'black');
        this.colorText("YOUR SCORE IS " + gamer.score,this.canvas.width/2,this.canvas.height/2,'black');
        this.colorText("-- click to continue --",this.canvas.width/2,this.canvas.height-20,'black');
        
    },
    
    colorText: function(showWords, textX, textY, fillColor) {
        
        this.context.fillStyle = fillColor;
        this.context.fillText(showWords, textX, textY);
        this.context.font = "16px sans-serif";
        
    },
    
    reset: function() {
      
        gamer.reset();
        ball.reset();
        this.setupBricks();
        
    },
    
    bricks: [],
    
    canvas: null,
    context: null,
    timeout: 33
    
};

/***************************************************
*                                                  *
*                   GAMER OBJEKT                   *
*                                                  *
***************************************************/

var gamer = {
    
    position: {
        x: 375,
        y: 480
    },
    
    score: 0,
    lives: 3,
    
    physics: {
        speed: 10
    },
    
    size: {
        height: 10,
        width: 100
    },
    
    draw: function() {

            this.colorRect(this.position.x,this.position.y,this.size.width,this.size.height, 'black');
        
            game.context.textAlign = "center";
            game.context.fillStyle = "rgba(0, 200, 0, .8)";
        
            game.context.font = "18px sans-serif";
            game.context.fillText("Lives", 40, 500);
            game.context.fillText("Score", 750, 500);
        
            game.context.font = "46px sans-serif";
            game.context.fillText(this.lives, 40, 555);
            game.context.fillText(this.score, 750, 555);
        
            },
    
    colorRect: function(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
        
        game.context.fillStyle = fillColor;
        game.context.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
        
    },
    
    moveLeft: function() {
                if(this.position.x > 0) {
                    this.position.x -= this.physics.speed;
                }
            },
    
    moveRight: function() {
                if(this.position.x < (game.canvas.width - this.size.width)) {
                    this.position.x += this.physics.speed;
                }
            },
    
    reset: function() {
        this.lives = 3;
        this.score = 0;
        this.position.x = 100;
    },
    
    highScore: {
      
        highScoreLista: document.getElementById("highScore-lista"),
        highScoreArr: [],
        scores: 10,
        highScores: function() {
            
            this.highScoreArr.push(this.scores);
            this.drawHighScore(this.scores);
            
            },
        
        drawHighScore: function(scores) {
            
            while (gamer.highScore.highScoreLista.firstChild) {
                this.highScoreLista.removeChild(this.highScoreLista.firstChild);
            }
            
            this.highScoreArr.sort(function(x, y) {
                return x - y;
            });
            
            for(var i =0; i < this.highScoreArr.length; i++) {
                var el = document.createElement('li');
                el.appendChild( document.createTextNode( this.highScoreArr[i] + ' poäng' ) );
                if ( this.score === this.highScoreArr[i] ) {
                    el.style['font-weight'] = 'bold';
                }
                this.highScoreLista.appendChild( el );
            }
            
        }
        
    },
    
};

/***************************************************
*                                                  *
*           CONTROLLER OBJEKT (ARROWS KEYS)        *
*                                                  *
***************************************************/

var controller = {
    
    keypress: function(event) {
        
        switch(event.keyCode) {
                
            case 37: // Left
                
                gamer.moveLeft();
                
                break;
                
            case 39: // Right
                
                gamer.moveRight();
                
                break;
                
        }
        
    },
    
};

/***************************************************
*                                                  *
*            UNDER CONSTRUCTION, NOT WORKING       *
*                                                  *
***************************************************/

var mouseController = {

    paddleX: gamer.position.x,
    mouseX: 0,
    mouseY: 0,

    updateMousePos: function(e) {
        var rect = game.canvas.getBoundingClientRect();
        var root = document.documentElement;
        
        mouseX = gamer.moveLeft();
        mouseY = gamer.moveRight();

        paddleX = mouseX - gamer.size.width/2;
    },
    
    handleMouseClick: function(e) {
        
        if(game.showScreen.showWinScreen !== true || game.showScreen.showEndScreen !== true) {
            gamer.reset();
            game.showScreen.showingWinScreen = false;
            game.showScreen.showingWinScreen = false;
            document.location.reload();
        }
        
    }
    
};

/***************************************************
*                                                  *
*                  BALL OBJEKT                     *
*                                                  *
***************************************************/

var ball = {
    
    position: {
        x: 50,
        y: 150
    },
    
    size: {
        height: 0,
        width: 10
    },
    
    physics: {
        speed: 5
    },
    
    direction: {
        x: 1, 
        y: 1 
    },
    
    draw: function() {
        
        this.colorCircle(this.position.x, this.position.y, this.size.width, 'blue');
        
    },
    
    colorCircle: function(centerX,centerY, radius, fillColor) {
        
        game.context.fillStyle = fillColor;
        game.context.beginPath();
        game.context.arc(centerX,centerY, radius, 0,Math.PI*2, true);
        game.context.fill();
        
    },
    
    reset: function() {
        this.position.x = 50;
        this.position.y = 150;
        this.direction.x = 1;
        this.direction.y = 1;
    },
    
    update: function() {
        
        if(this.position.x <= 0) { // Left Bounds
            this.direction.x = 1;
        }
        
        if(this.position.x >= game.canvas.width) { // Right Bounds
            this.direction.x = -1;
        }
        
        if(this.position.y <= 0) { // Top Bounds
            this.direction.y = 1;
        }
        
        if(this.position.y >= game.canvas.height) { // Bottom bounds
            game.ballMiss();
        }
        
        this.checkCollisionWithPaddle();
        this.bricksCollision();
        
        this.position.x += (this.physics.speed * this.direction.x);
        this.position.y += (this.physics.speed * this.direction.y);
        
        this.draw();
        
    },
    
    checkCollisionWithPaddle: function() {
        
        if(this.position.y + this.size.height < gamer.position.y) {
            return;
        }
        
        if(this.position.y > gamer.position.y + gamer.size.height) {
            return;
        }
        
        if(this.position.x > gamer.position.x + gamer.size.width) {
            return;
        }
        
        if(this.position.x + gamer.size.width < gamer.position.x) {
            return;
        }
        
        this.direction.y = -1;
        
    },
        
    bricksCollision: function() {
        
        var i = 0;
        for(i = 0; i < game.bricks.length; i++) {
            
            var brick = game.bricks[i];
            
            if(this.position.y + this.size.height < brick.position.y) {
                continue;
            }
            
            if(this.position.y > brick.position.y + brick.size.height) {
                continue;
            }
            
            if(this.position.x > brick.position.x + brick.size.width) {
                continue;
            }
            
            if(this.position.x + this.size.width < brick.position.x) {
                continue;
            }
            
            // If the loop comes here, we have a collision
            
            if(brick.health === 1) {
                gamer.score += 5;  
                gamer.highScore.scores += 5;  
            }
            
            if(brick.health === 2) {
                gamer.score += 10;
                gamer.highScore.scores += 10;
            }
            
            if(brick.health === 3) {
                gamer.score += 15;
                gamer.highScore.scores += 15;
            }
            
            brick.health -= 1;
            
            if(gamer.score === 300) {
                console.log("EXTRA LIFE");
                gamer.lives += 1;
            }
            
            //gamer.score += 20;
            
            if(brick.health < 1) {
                game.bricks.splice(i, 1);
            }
        
            // Moving towards lower right

            if(this.direction.x === 1 && this.direction.y === 1) {

                if(this.position.y > brick.position.y) {

                    this.direction.x = -1;

                } else {

                    this.direction.y = -1;

                }

            } else if(this.direction.x === -1 && this.direction.y === 1) { // Moving towards lower left

                if(this.position.y > brick.position.y) {

                    this.direction.x = 1;

                } else {

                    this.direction.y = -1;

                }

            } else if(this.direction.x === 1 && this.direction.y === -1) { // Moving towards upper right

                if(this.position.y > brick.position.y) {

                    this.direction.x = -1;

                } else {

                    this.direction.y = -1;

                }

            } else if(this.direction.x === -1 && this.direction.y === -1) { // Moving towars upper left

                if(this.position.y > brick.position.y) {

                    this.direction.x = 1;

                } else {

                    this.direction.y = -1;

                }

            }
        }
    }
    
};

/***************************************************
*                                                  *
*     BRICK CONSTRUCTOR FUNCTION AND PROTOTYPE     *
*                                                  *
***************************************************/

var Brick = function() {
    
    this.health = 3;
    
    this.size = {
        height: 30,
        width: 50
    };
    
    this.position = {
        x: 0,
        y: 0
    };
    
};

Brick.prototype.draw = function() {
    
    switch(this.health) {
        case 3:
            game.context.fillStyle = "rgb(0, 200, 0)"; //Green
            break;
        case 2:
            game.context.fillStyle = "rgb(200, 200, 0)"; //Orange
            break;
        case 1:
            game.context.fillStyle = "rgb(200, 0, 0)"; // Red
            break;
    }
    
    if(this.health > 0) {
        game.context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
    
};

game.init();


/***************************************************
*                                                  *
*                   TODO                           *
*                                                  *
***************************************************/

/*

* MORE COMMENTS
* BREAK UP BIG OBJEKTS IN SMALLER PARTS
* BREAK UP BREAKOUT2.JS FILE IN MORE FILES
* FIXING BUGS(GRAPHIC,SCORE UPDATING, BALL COLLISION MM)
* MOUSE CONTROLL
* HIGHSCORE
* OVERALL GRAPHIC LOOK
* GAME FUNCTIONALITY


*/






















