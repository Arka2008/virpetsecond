//Create variables here
var dog,dogImage,happyDogImage,happyDog;
var database;
var foodS,foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png");
  happyDogImage=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog=createSprite(250,350,20,20);
  dog.addImage(dogImage);
  dog.scale=0.3;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodObj=new Food();
  feed=createButton("feed the dog");
  feed.position(150,100);
  feed.mousePressed(feeddog);
  addFood=createButton("add food");
  addFood.position(250,100);
  addFood.mousePressed(addFoods);
}


function draw() { 
  background(46,139,87);
  
  fill(255,255,254);
  textSize(15);
  if (lastFed>=12) {
    text("Last Feed : "+ lastFed%12 + " PM",350,30);
  } else if(lastFed==0) {
    text("Last Feed : 12 AM",350,30);
  } else {
    text("Last Feed : "+ lastFed + " AM",350,30);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  drawSprites();
  //add styles here
  textSize(20);
  fill("orange");
  text("Press UP_ARROW key to feed Drago milk",50,30);
}

function feedDog(){
  dog.addImage(dogImage);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  database.ref('/').update({
    Food:x
  })
}
