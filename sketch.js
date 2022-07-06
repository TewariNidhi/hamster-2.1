var gameState = "play";
function preload() {
  HamsterIMG = loadAnimation("hamster.png"); 
  TreatsIMG = loadImage("Treats.png");
  WheelIMG = loadAnimation("Wheel.gif");
  GroundIMG = loadImage("Ground.png")
}
function setup() {
  createCanvas(windowWidth,windowHeight);
 
   ground = createSprite(width/2-350,height/2,width/2,20);
   ground.velocityX = -7
   ground.scale = 3.50;
   ground.addImage(GroundIMG);
   inviGround = createSprite(width/2-350,height/2+400,width/2);
   inviGround.visible = false;
   Hamster = createSprite(100,height/2,50,50)
   Hamster.addAnimation("running",HamsterIMG);
   Hamster.scale = 0.3;
   score = 0;
   treatsG = new Group();
   wheelsG = new Group();

}

function draw() 
{
  background(30);
  textSize(25);
  text("Score: "+score,width-200,50)
  if(gameState==="play"){
  drawSprites();
  if(ground.x<0) {
    ground.x = ground.width/2;
  }
  if(keyDown("space")) {
    Hamster.velocityY = -15
  }
  Hamster.velocityY+=0.8;                   
  Hamster.collide(inviGround);  
  spawnTreats();  
  spawnWheels();
  if(treatsG.isTouching(Hamster)){
  
    treatsG.destroyEach();
    score+=2;
  }
  if(wheelsG.isTouching(Hamster)){
    gameState = "end";
  }
}
else if(gameState==="end"){
  textSize(60);
  fill("red");
  text("Game Over!!", width/2-100, height/2)
}
}
function spawnTreats() {
  if(frameCount%100===0) {
    Treats = createSprite(width-300,height/2+50,50,50);
    Treats.y = Math.round(random(height/2+20,height/2+80));
    Treats.addImage(TreatsIMG);
    Treats.velocityX = -6;
    Treats.scale = 0.2;
    treatsG.add(Treats)
  }
}
function spawnWheels() {
  if(frameCount%200===0) {
    Wheels = createSprite(width-300,height/2+200,50,50);
    Wheels.addAnimation("Wheels",WheelIMG);
    Wheels.velocityX = -7;
    Wheels.scale = 2.5;
    wheelsG.add(Wheels)
  }
}




