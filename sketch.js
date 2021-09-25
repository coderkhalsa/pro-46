var player 
var panimation
var ground , groundImg ,inGr
var obImg, obsGroup,gameState = "play"
var submit,ans,quest,qnum, gameOver,retry,gaimg,reimg
function preload(){
panimation = loadAnimation("i/frame_00_delay-0.04s.gif","i/frame_01_delay-0.04s.gif","i/frame_02_delay-0.04s.gif","i/frame_03_delay-0.04s.gif","i/frame_04_delay-0.04s.gif","i/frame_05_delay-0.04s.gif","i/frame_06_delay-0.04s.gif","i/frame_07_delay-0.04s.gif","i/frame_08_delay-0.04s.gif","i/frame_09_delay-0.04s.gif","i/frame_10_delay-0.04s.gif","i/frame_11_delay-0.04s.gif")
groundImg = loadImage("i/realGround.png")
obImg = loadImage("i/ob1.png")






}

function setup() {
  createCanvas(displayWidth -50 , displayHeight - 150);
 player =  createSprite(100, displayHeight-650, 50, 50);
 player.addAnimation("mario",panimation)
 player.scale = 0.2
 ground = createSprite(displayWidth/2, displayHeight-200, 50, 50);
ground.addImage("ground",groundImg)
ground.x  = ground.width/6
ground.scale = 4.5
ground.velocityX = -4
inGr = createSprite(100, displayHeight-500, 400, 50);
inGr.visible = false

retry = createSprite(displayWidth/2,displayHeight/2,50,50)
gameOver = createSprite(displayWidth/2,displayHeight/2-150,50,50)
obsGroup = new Group()
quest = createElement("h2")
ans = createInput("YOUR ANSWER")
submit = createButton("DONE")
quest.hide()
  ans.hide()
  submit.hide()
  retry.visible = false;
  gameOver.visible = false

}

function draw() {
  background(0); 
  //console.log(data)
  if (gameState === "play"){

    ground.velocityX = -4
  if(ground.x<200){
    ground.x  = ground.width/2
  } 
  if(keyDown("space")){
    player.velocityY = -15
  }
  player.velocityY = player.velocityY +0.5
  
  problem()
  if(obsGroup.isTouching(player)){
    gameState = "end"
  }
} else if(gameState=== "end"){
  ground.velocityX =0
  player.velocityY = 0 
  obsGroup.setVelocityXEach(0)
qnum = Math.round(random(0,1))
 askRiddle(qnum)
 submit.mousePressed(restart)
  
 
}
if(gameState ==="tryAgain"&& mousePressedOver(retry)){
  retry.visible = false;
  gameOver.visible = false
gameState = "play"
obsGroup.destroyEach()
ans.setAttribute("value", "your answer");
  quest.hide()
  ans.hide()
  submit.hide()

}
player.collide(inGr)
  drawSprites();
}

function problem(){
  if(World.frameCount %100 ===0){
    var obs = createSprite(displayWidth,player.y ,10,10)
    obs.addImage("ob1",obImg)
    obs.velocityX = -4
    obsGroup.add(obs)
  }
}

function askRiddle(qnum){
gameState = "riddle"
 var que = data[qnum]
quest.position (200,200)
quest.html(que.Q)

ans.position(200,250)

submit.position(200,300)
quest.show()
  ans.show()
  submit.show()


} 

function restart(){
playerAns = ans.value()
var actualAns = data[qnum].A
if(playerAns === actualAns){
  obsGroup.destroyEach()
  gameState = "play"
  quest.hide()
  ans.hide()
  submit.hide()
 ans.setAttribute("value", "your answer");
}else{
retry.visible = true;
gameOver.visible = true
gameState = "tryAgain" 
}
}
