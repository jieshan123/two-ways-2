//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded


let routines;

function setup() {
  createCanvas(500, 500);

  //no animation / interaction chart
  noLoop();

  fetch("./json/routines.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    routines = data.breakfast;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(200);

}

function drawChart(){

  let total = 0; 
  for (let i= 0 ; i<routines.length; i++) {
    total += routines[i].amount;
  }

  let centreX = width/2;
  let centreY = height/2; 
  let diam = 300;
  let angleStart = TWO_PI*0.75; 

  for (let i=0; i<routines.length; i++) {

    let item = routines[i];

    let itemFraction = item.amount/total;
    let itemAngle = itemFraction * TWO_PI; 
    let angleEnd = angleStart + itemAngle;

    //normal pie
    fill(item.color);
   // stroke(0, 0, 0); 
   // strokeWeight(1); 
   // strokeJoin(ROUND); 
    arc(centreX, centreY, diam, diam, angleStart, angleEnd, PIE); //PIE creates closed slices the the center


    noStroke();
    fill(0); 
    push();
    translate(centreX, centreY); 
    rotate(angleEnd); 
    textAlign(RIGHT, BOTTOM); 
    //normal pie
    text(item.ingredient, diam/2 - 20, -8); 

    pop();

    //update the angle start before the next iteration
    angleStart += itemAngle;
  }

}