var canvas,ctx,W,H;


var savedAnts = [[[-413,-43,-143,-132,98],[87,-7,-108,-454,-112],[73,300,263,-216,-263]],[[29,0,4,-48,-18],[24,-10,140,-338,290],[180,114,329,26,84]],[[-40,-9,20,39,-25],[-34,-19,-40,1,-32],[-29,-44,31,-47,13]],[[393,28,199,-178,-489],[272,12,701,-469,-72],[211,-257,-35,215,395]],[[-347,-17,-64,-16,249],[59,-6,-312,114,-50],[307,-86,-51,-33,-65]],[[152,20,41,-59,-74],[-120,2,151,-20,-106],[-156,68,143,-267,55]],[[-121,-58,-41,108,-77],[-6,1,-49,-109,-29],[-81,-33,10,-92,-50]],[[-223,-8,4,-244,-30],[-65,13,-212,173,212],[-304,184,129,-189,-64]]];
var precision = 100;
var size = 1000;

function rnd(n){
    return Math.floor(Math.floor(Math.random()*n));
}

function start(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    resize();
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.fillRect(0,0,W,H);
    for (var i = 0; i < 8; i++){
        drawCurveCode(savedAnts[i][2],(i%4) * W/4,Math.floor(i/2)*H/2,W/4,H/2);
    }
}

function calcul(code,n){
    var r = code[0] * n * n + code[1] * n + code[2];
    r = Math.min(r,code[3]);
    r = Math.max(r,code[4]);
    return r;
}

function drawCurveCode(code,x,y,w,h){
    var liste = [];
    ctx.beginPath();
    ctx.moveTo(x,y-(calcul(code,0)/size - 1/2)*h);
    for (var j = 0;j<precision;j++){
        ctx.lineTo(x + j*w/precision,y-(calcul(code,j)/size - 1/2)*h);
    }
    ctx.stroke();
}


function resize(){
    // ici on redimensionne les canvas à la taille de la fenêtre
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);
}
