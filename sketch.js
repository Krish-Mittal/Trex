var trex, treximage,ground,gi,gamestate,ig,score,obs,cloud,clouds,obs,obs1,obs2,obs3,obs4,obs5,obs6,obsg,cloudg,gta,go,rs,res,gao;
function preload()
{
treximage=loadAnimation("trex1.png","trex3.png","trex4.png");
gi=loadImage("ground2.png");
cloud=loadImage("cloud.png");
obs1=loadImage("obstacle1.png");
obs2=loadImage("obstacle2.png");
obs3=loadImage("obstacle3.png");
obs4=loadImage("obstacle4.png");
obs5=loadImage("obstacle5.png");
obs6=loadImage("obstacle6.png");
go=loadImage("gameOver.png");
rs=loadImage("restart.png")
gta=loadAnimation("trex_collided.png");
}
function setup() {
  createCanvas(600,250);
  
  //trex
  trex =createSprite(25,186);
  trex.addAnimation("trex",treximage);
  trex.scale=0.75;
  trex.addAnimation("trex1",gta);
  //ground
  ground=createSprite(200,200);
  ground.addImage(gi);
  ground.velocityX=-10;
  
  //invisible ground
  ig=createSprite(300,210,600,1);
  ig.visible=false;
  
  res=createSprite(300,125);
  res.addImage(rs);
  res.visible=false;
  gao=createSprite(300,50);
  gao.addImage(go);
  gao.visible=false;
  
  obsg=createGroup();
  cloudg=createGroup();
  gamestate="start";
  
  score=0;
}

function draw() {
  background("white");
  
  text(mouseX+","+ mouseY,mouseX,mouseY);
  
  trex.collide(ig);
  
  trex.velocityY=4;
  
  //reset ground
  if(ground.x<0)
  {
   ground.x=ground.width/2;
  }
  
  if(gamestate=="start"&& keyDown("space"))
  {
       
     trex.changeAnimation("trex",treximage);
     trex.velocityY=-10;
     gamestate="play";
  }
  

  
  if(gamestate=="play")
     {
       trex.changeAnimation("trex",treximage);
       res.visible=false;
       gao.visible=false;
       co();
       cc();
           
       if(keyWentDown("space")&&trex.y>=150)
  {
     trex.velocityY=-70;
  }
    score=score+0.5;
     if(trex.isTouching(obsg))
       {
       gamestate="end";
       score=score+0;
       trex.velocitX=0;
       obsg.setVelocityXEach(0);
       ground.velocityX=0;
         cloudg.setVelocityXEach(0);
       }
     }
  if(gamestate=="end")
     {
       trex.velocityY=0;
       trex.changeAnimation("trex1",gta);
       res.visible=true;
       gao.visible=true;
       if(mousePressedOver(res))
       {
        score=0;
         gamestate="play"
         cloudg.destroyEach();
         obsg.destroyEach();
       }
     }
  
  text("SCORE:"+Math.round(score),400,15);
  
  drawSprites();
}

function cc()
{
  if(frameCount%50==0){
  clouds=createSprite(600,random(59,104));
  cloudg.add(clouds);
  clouds.velocityX=-5;
  clouds.addImage(cloud);
  trex.depth=clouds.depth+1;

  if(clouds.x<0)
     {
       clouds.destroy();
     }
}
}

function co()
{
  if(frameCount%100==0){
   obs=createSprite(600,218-29);
    obsg.add(obs);
  var ro=Math.round(random(1,6));
  switch(ro)
  { 
    case 1:obs.addImage(obs1);
      break;
    case 2:obs.addImage(obs2);
      break;
    case 3:obs.addImage(obs3);
      break;
    case 4:obs.addImage(obs4);
      break;
    case 5:obs.addImage(obs5);
      break;
    case 6:obs.addImage(obs6);
      break;
      default:break
  }
      obs.velocityX=-5;
      obs.scale=0.5;
}
}