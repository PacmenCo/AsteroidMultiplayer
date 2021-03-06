
var WIDTH = 1000;
var HEIGHT = 700;
var socket = io();

var world;
var shipsDestroyed = [];
var asteroidsDestroyed = [];

var shipRender = new ShipRender();
var asteroidRender = new AsteroidRender();
var asteroidExplosionRender = new ExplosionRender("grey");
var shipExplosionRender = new ExplosionRender("yellow");

function setup(){
  var canvas = createCanvas(WIDTH, HEIGHT);
  canvas.position(300, 10);
  background(0);
  frameRate(60);

  socket.on('update', function(data){
    world = data;
  });

  socket.on('shipDestroyed', function(data){
    shipsDestroyed.push(data);
  });

  socket.on('asteroidsDestroyed', function(data){
    asteroidsDestroyed.push(data);
  });
}

function draw(){
  if(world){
    renderWorld(world);
  }
}

function renderWorld(world){
  background(0);

  for (var i = 0; i < world.asteroids.length; i++) {
    asteroidRender.render(world.asteroids[i]);
  }
  shipRender.render(world.players);
  ScoreRender.render(world.players, world.roundNumber);
  ClockRender.render(world.timeRemaining);
  asteroidExplosionRender.render(asteroidsDestroyed);
  shipExplosionRender.render(shipsDestroyed);

  asteroidsDestroyed = [];
  shipsDestroyed = [];
}

function startGame(){
  score = "";
  socket.emit("start", {});
}
