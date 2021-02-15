var PLAY = 1;
var END = 0;
gameState = PLAY;
var score = 0;

var background, backgroundImage;
var ground;
var obstacle, obstacleImage, obstacleGroup;
var objects, objectsImage,objectsGroup;
var body, bodyImage;
var jumpSound, gameoverSound;
var gameOver,gameOverImage;


function preload(){
  backgroundImage=loadImage("background.png");
  objectsImage = loadImage ("star.png");
  bodyImage = loadImage ("dog.png");
  obstacleImage = loadImage ("obstacle.png");
  jumpSound = loadSound ("jump.mp3");
 
   gameOverImage = loadImage ("gameover.png");
  
}

function setup() {
  createCanvas(500,500);
  
  ground = createSprite(600,280,100,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=true;
  ground.addImage (backgroundImage);
  
  body = createSprite (150,110,10,10);
  body.addImage (bodyImage);
  body.scale = 0.15;
  
  gameOver = createSprite (250,130,25,25);
gameOver.addImage (gameOverImage);
  gameOver.scale = 0.50;
  gameOver.visible=false;
    
  obstacleGroup = new Group;
  objectsGroup = new Group
  
  
}

function draw() {
  
  if (gameState === PLAY){
  if(ground.x < 0) {
    ground.x=ground.width/2;
  }
  
  if (objectsGroup.isTouching(body)){
      objectsGroup.destroyEach ();
      score = score + 1;
      jumpSound.play();    
  }
  
  if (keyWentDown (UP_ARROW)){
    body.velocityY = - 5;
  }
  
   if (keyWentDown (DOWN_ARROW)){
    body.velocityY = 5;
         
  }
   if (obstacleGroup.isTouching(body)||body.y<0||body.y>500){
       gameState = END;
     }
    
  }  
  
 if (gameState === END){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach (0);
    objectsGroup.setVelocityXEach (0);
    obstacleGroup.destroyEach();
    objectsGroup.destroyEach();
    body.velocityY = 0;
   
    gameOver.visible=true;
    
   
 }
   
  spawnObjects();
  spawnObstacles();
    
  drawSprites();
 
  textSize(20);
  fill("white");
  text("Score: "+ score, 380,50);
}


function spawnObjects(){
 if (frameCount%300===0){
     objects = createSprite (600,250,10,20);
     objects.addImage (objectsImage);
     objects.scale = 0.1;
     objects.y = Math.round (random(100,490));
     objects.lifetime = 800;
     objects.velocityX = -5;
     objectsGroup.add (objects) ;     
   }
}

function spawnObstacles(){
  if (frameCount%500===0){
      obstacle = createSprite (700,220,10,10);
      obstacle.addImage (obstacleImage);
      obstacle.y = Math.round(random(100,490));
      obstacle.scale = 0.1;
      obstacle.lifetime = 800;
      obstacle.velocityX = -2;
      obstacleGroup.add (obstacle);
      
  }
}