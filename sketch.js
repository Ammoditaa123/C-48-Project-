var gameState = "serve"

var ice1, ice2, ice3, water, bg;
var iceImg, waterImg, bg;
var edges;
var win;

var restart;

function preload() {

    iceImg = loadAnimation("ice.png");
    waterImg = loadAnimation("water.png");
    bg = loadImage("freezer.jpeg");
    restartImg = loadImage("restart-button.png");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    edges = createEdgeSprites();

}

function draw() {
    background(bg);
    drawSprites();
    if (gameState === "serve") {

        background(bg);

        fill(0);
        stroke(10);
        textSize(25);
        text("WELCOME I AM FRIZZY", width/2 - 100, height/2.7);
        text("I HOPE IT'S NOT TOO COLD INSIDE BYEEE!!!", width/2 - 200, height/1.9);
        text("Press space to start and touch yellow to WIN", width/2 - 200, height/1.7);

    }

    if (keyDown("space") && gameState === "serve") {

        gameState = "play";

        water = createSprite(width / 2, height / 2);
        water.addAnimation("water drop", waterImg);
        water.scale = 0.1;
        water.setCollider("circle", 0, 90, 300);

        iceGroup = new Group();
        // ice1.debug = false;
        // ice2.debug = false;
        // ice3.debug = false;
        water.debug = false;

        maze1 = createSprite(width / 2 + 150, height / 6, 700, 20);
        maze1.shapeColor = "red";
        maze1.velocityX = 10;

        maze2 = createSprite(width / 2 + 90, height / 2.9, 700, 20);
        maze2.shapeColor = "blue";
        maze2.velocityX = 10;

        maze3 = createSprite(width / 2 + 40, height / 1.9, 700, 20);
        maze3.shapeColor = "green";
        maze3.velocityX = 10;

        maze4 = createSprite(width/2 - 50, height / 1.4, 700, 20);
        maze4.shapeColor = "orange";
        maze4.velocityX = 10;

        maze5 = createSprite(width/2 - 150, height / 1.1, 700, 20);
        maze5.shapeColor = "purple";
        maze5.velocityX = 10;

        win = createSprite(width/2 + 550, height/1, 50, 50);
        win.shapeColor = "yellow";

        ice1 = createSprite(100, 60);
        ice1.addAnimation("ice1", iceImg);
        ice1.scale = 0.3;
        ice1.velocityX = 8.7;
        ice1.setCollider("circle", 0, 0, 200);

        ice2 = createSprite(100, 260);
        ice2.addAnimation("ice2", iceImg);
        ice2.scale = 0.3;
        ice2.velocityX = 8.1;
        ice2.setCollider("circle", 0, 0, 200);

        ice3 = createSprite(100, 500);
        ice3.addAnimation("ice3", iceImg);
        ice3.scale = 0.3;
        ice3.velocityX = 8.5;
        ice3.setCollider("circle", 0, 0, 200);

        iceGroup.add(ice1);
        iceGroup.add(ice2);
        iceGroup.add(ice3);

        restart = createSprite(width/2 + 50, height/1.7);
        restart.scale = 0.2;
        restart.addImage(restartImg);


    }

    if (gameState === "play") {
        restart.visible = false;
        if (keyDown(RIGHT_ARROW)) {
            water.velocityX = 10
        }
        if (keyDown(LEFT_ARROW)) {
            water.velocityX = -10
        }
        if (keyDown(UP_ARROW)) {
            water.velocityY -= 10;
        }
        if (keyDown(DOWN_ARROW)) {
            water.velocityY += 10;
        }

        water.bounceOff(maze1);
        water.bounceOff(maze2);
        water.bounceOff(maze3);
        water.bounceOff(maze4);
        water.bounceOff(maze5);
        water.collide(edges);
        iceGroup.bounceOff(edges);
        maze1.bounceOff(edges);
        maze2.bounceOff(edges);
        maze3.bounceOff(edges);
        maze4.bounceOff(edges);
        maze5.bounceOff(edges);

        if (water.isTouching(iceGroup)) {
           
            water.addAnimation("frozen", iceImg);
            water.changeAnimation("frozen", iceImg);
            water.scale = 0.2;
            iceGroup.setVelocityXEach(0);
            water.velocityX = 0;
            water.velocityY = 0;
            maze1.velocityX = 0;
            maze2.velocityX = 0;
            maze3.velocityX = 0;
            maze4.velocityX = 0;
            maze5.velocityX = 0;
            stroke(10);
            textSize(35);
            fill(0);
            text("OOPS, YOU FROZE", width/2 - 100, height/2.7);
            text("Press restart to play again", width/2 - 100, height/1.9);

            restart.visible = true;
            console.log(restart.depth)
          
        }

        if (water.isTouching(win)){

            iceGroup.setVelocityXEach(0);
            water.velocityX = 0;
            water.velocityY = 0;
            maze1.velocityX = 0;
            maze2.velocityX = 0;
            maze3.velocityX = 0;
            maze4.velocityX = 0;
            maze5.velocityX = 0;

            stroke(10);
            textSize(35);
            fill(0);
            text("YEEH YOU WON", width/2 - 100, height/2.7);
            text("Press restart to play again", width/2 - 100, height/1.9);

            restart.visible = true;
        }

        if (mousePressedOver(restart)) {
            gameState = "serve";
            water.addAnimation("water drop", waterImg);
            water.changeAnimation("water drop", waterImg);
            water.scale = 0.2;
            ice1.visible = false;
            ice2.visible = false;
            ice3.visible = false;
            water.visible = false;
            maze1.visible = false;
            maze2.visible = false;
            maze3.visible = false;
            maze4.visible = false;
            maze5.visible = false;
            restart.visible = false;
            win.visible = false;
        }
    }
}