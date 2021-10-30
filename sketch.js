var canvas;
var shooter,shooterImg1,shooterImg2,bgImg;
var zombiesGroup, zombie1, zombie2, zombie3;
var bulletGroup,bulletImg;
var bg,score;

function preload(){
shooterImg1 = loadImage("Shooter1.png.png");
shooterImg2 = loadImage("Shooter2.png.png");
bgImg = loadImage("background.jpg");
zombie1 = loadImage("zombie1.png");
zombie2 = loadImage("zombie2.png");
zombie3 = loadImage("zombie3.png");
bulletImg = loadImage("bullet.png");
}

function setup(){
        console.log(windowWidth)
    canvas = createCanvas(windowWidth,windowHeight);
        // bg=createSprite(852,480,50,50);
//  bg=createSprite(0,0,windowWidth,windowHeight);
//     bg.addImage(bgImg)
//    // bg.scale=2;

    shooter = createSprite(100,340,20,20);
    shooter.addImage("standing",shooterImg1);
    shooter.addImage("shooting",shooterImg2);
    shooter.debug = true;

    zombiesGroup = createGroup();
    bulletGroup = createGroup();

    score = 0;
}

function draw() {

    background(bgImg);

   //image (bgImg,0,0,windowWidth,windowHeight)
    if(keyWentDown("space")){
      shooter.changeImage("shooting",shooterImg2);
      spawnBullets();
    }
    if(keyWentUp("space")){
      shooter.changeImage("standing",shooterImg1);
    }

    //collision between zombie and bullet
    if(zombiesGroup.isTouching(bulletGroup)){
        for(var i=0;i<zombiesGroup.length;i++){     
            
         if(zombiesGroup[i].isTouching(bulletGroup)){
              zombiesGroup[i].destroy()
              bulletGroup.destroyEach()
          
              } 
        score = score+1;
        }
      }
      textSize(30);
      fill("white");
      text("Score:"+ score, 1400,50);

    spawnZombies();
    drawSprites();
}

function spawnZombies(){
    if (frameCount % 100 === 0){
      var zombie = createSprite(1500,340,10,40);
      zombie.velocityX = -3;
      
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: zombie.addImage(zombie1);
                 break;
         case 2: zombie.addImage(zombie2);
                 break;
         case 3: zombie.addImage(zombie3);
                 break;
         default: break;
       }
         
       zombie.scale = 0.5;
       zombie.lifetime = 1500;
      
       zombiesGroup.add(zombie);
    }
   }

function spawnBullets(){
    var bullet = createSprite(100,340,20,20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.07;
    bullet.velocityX = 4;
    bulletGroup.add(bullet);
}