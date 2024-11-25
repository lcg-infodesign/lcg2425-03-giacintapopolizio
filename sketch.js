p5.disableFriendlyErrors=true;
let data;
let dataObj;

let pageColor = "#050223";

let circleSize;
let padding = 350;

function preload() {
  data = loadTable("assets/data.csv", "csv", "header");
}

let fiumiIndicizzatiPerOutflow = {};

function setup() {

  /****************************  DATI ******************************* */

  let fiumi = data.getObject(); 
  console.log(fiumi);

  for (let i in fiumi) {
    let fiume = fiumi[i]; 
    let outflow = fiume["outflow"]; 

    //se non cè l'outflow nella lista di outflow
    //lo aggiungo, come una lista vuota (perche per ora non ci aggiungo fiumi)
    if( !(outflow in fiumiIndicizzatiPerOutflow) ) { 
      fiumiIndicizzatiPerOutflow[outflow] = [];     
    }

    fiumiIndicizzatiPerOutflow[outflow].push(fiume);
  }

  console.log(fiumiIndicizzatiPerOutflow);

  let listaOutflows = Object.keys(fiumiIndicizzatiPerOutflow); 
  let titolo = 410


  /****************************  DISEGNO ******************************* */


  circleSize = windowWidth/6;

  

  console.log(listaOutflows.length);

  let totalHeight =
    circleSize * listaOutflows.length + padding * (1 + listaOutflows.length) + titolo;
  createCanvas(windowWidth, totalHeight);
  background(pageColor);

  
  //titolo
  stroke("lightblue");
  fill("lightblue");
  textSize(50);
  textAlign(CENTER, CENTER);
  text("The ends of the World's", windowWidth/2, 100);
  text("100 Longest Rivers", windowWidth/2, 150);
  
  //legenda
  textSize(20);
  text("Legend", windowWidth/2, 300);
  noFill();
  stroke ("#17144f");
  drawingContext.setLineDash([5, 5]);
  ellipse (windowWidth/2, 370, 50);
  ellipse (windowWidth/2, 370, 80);
  fill("#7377ad");
  noStroke();
  rect(windowWidth/2, 367, 50, 6);
  fill("lightblue");
  ellipse (windowWidth/2, 370, 20);
  stroke("white");
  drawingContext.setLineDash([0, 0]);
  line(windowWidth/2 - 100, 370, windowWidth/2, 370);
  line(windowWidth/2 + 45, 370, windowWidth/2 + 100, 370);
  line(windowWidth/2 + 35, 350, windowWidth/2 + 100, 350);
  noStroke();
  fill("white");
  textSize(15);
  text("River:", windowWidth/2 + 130, 370);
  textSize(10);
  textAlign(LEFT, CENTER);
  text("The length and area of the rectangle", windowWidth/2 + 113, 382);
  text("represent the length and area of the river.", windowWidth/2 + 113, 394);
  text("The color represent the average temperature.", windowWidth/2 + 113, 406);
  text("The rings are the lengths of 5000 and 2500 km", windowWidth/2 + 110, 350);
  text("Outflow", windowWidth/2 -140, 370);

  //grafico
  for(let i = 0; i < listaOutflows.length; i++) {
    let outflow = listaOutflows[i]; 
    let listaFiumi = fiumiIndicizzatiPerOutflow[outflow]; 
    
    let yPos = i* (padding + circleSize) + padding + titolo;
    let xPos = windowWidth / 2;

    cerchioRiferimentoLunghezza(xPos, yPos);
  
    stroke(0) 

    push();
    translate(xPos, yPos);
    //j mi dice il numero del fiume dell outflow corrente
    for(let j = 0; j < listaFiumi.length; j++) {
      let fiume = listaFiumi[j]; 

      let areaFiume = fiume ["area"];
      let temperatura = fiume ["avg_temp"];
      let spessore = areaFiume / 150000
      let nome = fiume ["name"];

      push();
      
      rotate(TWO_PI / listaFiumi.length * j); 
      let col = map(temperatura, -8, 30, 0, 255);  
  
      fill(col, 100, 255 - col);
      noStroke();
      rect(0,-(spessore/2), circleSize/2 + 200 * fiume["length"]/6000, spessore);
      
      fill ("white");
      textAlign(LEFT, CENTER)
      textSize (12);
      text(nome.replace("–","\n"), -(spessore/2) + 5/7*circleSize + 200 * fiume["length"]/6000, 0);
      
      pop();

    }
    pop(); 

    nomeOutflow (xPos, yPos, circleSize, outflow);
  }
}

function draw() {}

function nomeOutflow (x, y, size, nome){
  fill ("lightBlue");
  noStroke(); 
  ellipse (x, y, size);
  
  drawingContext.setLineDash([0,0]);
  //stroke ("3")
  stroke(pageColor);
  fill(pageColor);
  textSize(15);
  textAlign(CENTER, CENTER);
  text(nome.replace(" ", "\n", 1), x, y);

}

function cerchioRiferimentoLunghezza (x,y){
  noFill();
  stroke ("#17144f");
  drawingContext.setLineDash([10, 10]);
  ellipse (x, y, 2 * (circleSize/2 + 200 * (5000/6000)));
  ellipse (x, y, 2 * (circleSize/2 + 200 * (2500/6000)));
  
}