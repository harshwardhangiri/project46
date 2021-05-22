
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var PLAY;
var END ;
var gameState = "PLAY";
var score=0;
var blastGroup,monsterGroup;
var ship,shipImg,monsterImg,blastImg,fireImg;

function preload()
{
	shipImg = loadImage("ship.png");
	monsterImg = loadImage("monster.png");
	blastImg = loadImage("blast.png");
	fireImg = loadImage("fireblast.png");
}

function setup() {
createCanvas(displayWidth,displayHeight);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
ship = createSprite(displayWidth/2,displayHeight-200,30,30);
ship.addImage(shipImg);
ship.scale = 0.4;

monsterGroup = createGroup();
blastGroup = createGroup();

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(rgb(15, 25, 38));



 
  
  if(gameState === "PLAY"){

	spwanmonster();
   
   
   if(keyWentDown("space")){
	var blast = createSprite(0,350,10,10);
	blast.addImage(blastImg);
	blast.scale = 0.7;
	blast.x = ship.x;
	blast.velocityY = -10;
	blast.lifeTime = 200;
	blastGroup.add(blast);
	}
   
  
   edges = createEdgeSprites() ; 
  ship.bounceOff(edges[0]); 
  ship.bounceOff(edges[1]);
 
   
   
   if (keyDown("right")) {
   ship.x+=5;  
   }
   
  if (keyDown("left")) {
   ship.x-=5;  
   }


   /*if(blastGroup.isTouching(monsterGroup)){
	   monsterGroup.addImage(fireImg);
   }*/


   if(monsterGroup.isTouching(ship)){
	   gameState = "END"

   }
  }
  
   if (gameState === "END"){
	 monsterGroup.destroyEach();
	 ship.addImage(fireImg);
	 textSize(40);
	 fill ("yellow")
	 text("you loose your ship is captured",displayWidth/2-200,displayHeight/2);
   }
   
   
   
   
  drawSprites();
 
}


function spwanmonster(){

	if (frameCount % 60 === 0) {
		
	
	var monster = createSprite(0,0,100,100);
	monster.x = Math.round(random(0,displayWidth));
	monster.addImage(monsterImg);
	monster.scale = 0.1;
	monster.velocityY = 3;
	monster.lifeTime=200;
	monsterGroup.add(monster);

}
}