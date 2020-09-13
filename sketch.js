const matrx = 10;
const matry = 1;

const ancho = 50;
const alto = 80;
const tasaSeparacion = 11

const nexos = 26;
const puntosPorTrazo = 4; // allways more than 3

const lines = false
const curves = true


let puntosXY = [];
let ordenes = [];
let distancias = [];
let rawdistancias = [];
let sortedDist = [];

function setup() {
  createCanvas(1280, 190);
  background(25);
}

function draw() {
  noLoop();
  noFill();
  translate(0, alto*1.2);
  stroke(255);
  // point(0,0)
  let c = 0;
  for (let index = 1; index <= matrx * matry; index++) {
    c++;
    puntosXY = [];
    ordenes = [];
    translate(width / tasaSeparacion, 0);
    console.log("glifo n" + index);
    strokeWeight(1);
    quad(ancho, alto, ancho, -alto, -ancho, -alto, -ancho, alto);
    strokeWeight(2);

    for (let i = 0; i < nexos * puntosPorTrazo; i++) {
      x = random(0, ancho * 0.8);
      y = random(-alto * 0.8, alto * 0.8);
      puntosXY.push([x, y]);
      // point(x, y);
      // point(-x, y);
    }

    distancias = [];
    rawdistancias = [];
    sortedDist = [];
    let ref = [];

    for (let i = 0; i < puntosXY.length; i++) {
      let ref = 99999;
      let pareja;
      let aph = [];
      for (let j = 0; j < puntosXY.length; j++) {
        if (
          ref >
            dist(
              puntosXY[i][0],
              puntosXY[i][1],
              puntosXY[j][0],
              puntosXY[j][1]
            ) &&
          i != j
        ) {
          ref = dist(
            puntosXY[i][0],
            puntosXY[i][1],
            puntosXY[j][0],
            puntosXY[j][1]
          );
          pareja = j;
        }

        aph.push(
          dist(puntosXY[i][0], puntosXY[i][1], puntosXY[j][0], puntosXY[j][1])
        );

        distancias.push([
          i,
          j,
          dist(puntosXY[i][0], puntosXY[i][1], puntosXY[j][0], puntosXY[j][1]),
        ]);
      }
      sortedDist.push(aph.slice());
      rawdistancias.push(aph.slice());

      ordenes.push([i, pareja]);
    }

    if (lines == true || (curves == true && lines == true)) {
      for (let i = 0; i < puntosXY.length; i++) {
        line(
          puntosXY[ordenes[i][0]][0],
          puntosXY[ordenes[i][0]][1],
          puntosXY[ordenes[i][1]][0],
          puntosXY[ordenes[i][1]][1]
        );
        line(
          -puntosXY[ordenes[i][0]][0],
          puntosXY[ordenes[i][0]][1],
          -puntosXY[ordenes[i][1]][0],
          puntosXY[ordenes[i][1]][1]
        );
      }
    }
    if (curves == true || (curves == true && lines == true)) {
      sortedDist.forEach((element) => {
        element.sort(function (a, b) {
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        });
      });

      for (let i = 0; i < puntosXY.length; i++) {
        beginShape();
        for (let j = 0; j < int(puntosPorTrazo); j++) {
          x = puntosXY[rawdistancias[i].indexOf(sortedDist[i][j])][0];
          y = puntosXY[rawdistancias[i].indexOf(sortedDist[i][j])][1];
          curveVertex(x, y);
          // console.log(j);
        }
        endShape();
        beginShape();
        for (let j = 0; j < int(puntosPorTrazo); j++) {
          x = -puntosXY[rawdistancias[i].indexOf(sortedDist[i][j])][0];
          y = puntosXY[rawdistancias[i].indexOf(sortedDist[i][j])][1];
          curveVertex(x, y);
          // console.log(j);
        }
        endShape();
      }
    }
    if (c == matrx) {
      translate(-(width / tasaSeparacion) * matrx, alto * 2.5);
      c = 0;
    }
  }
}
