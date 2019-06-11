var canvas,ctx,W,H;
var etoiles = [];
var keys = [];
// gestion du plateau

/*
 Le plateau fait 15*15 cases.
 Les nids ont les positions suivantes :

 uselessBorder représente la marge de plateau qui ne sera pas utilisé mais quand même affiché pour des raisons esthétiques
 coor représente les 8 positions des nids au départ sous la forme [x,y] ils sont placés dans le sens trigonométrique en partant du point le plus haut
 la nourriture est stockée sous la forme [x,y,quantité]
 fCode représente toutes les fourmis dans le tournoi et contient leur matériel génétique pour chacune
 */
let vitesseAffichage = 1;
let mouse = [0,0];
var myWorker;
//var evolution;
var imgAnt = new Image();
imgAnt.src = "images/fourmi.png";

let modeJeune = false;
let modeStaline = false;

let inputPoss = false;
let seenAnt = 0;

var savedAnts = [];

function rnd(n){
    return Math.floor(Math.floor(Math.random()*n));
}

function start(){
    // Première fonction appellée. Sert à l'initialisation de la fenêtre
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    resize();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    document.addEventListener(
        "keydown",
        function (event){
            if (inputPoss){
                touching(event.keyCode);
                console.log(event.keyCode);
            }
            //vx += (event.keyCode - 38)*10;
            //keys[event.keyCode] = 1;
        }
    );
    document.addEventListener(
        "mousemove",
        function (event){
            mouse[0] = event.clientX;
            mouse[1] = event.clientY;
        }
    );
    for (var i = 0; i < 8; i ++){
        fourmis[i] = new Team();
        fourmis[i].init(membN,i);
        fourmis[i].getData(generateCode() , [coor[i][0],coor[i][1]] , 0);
    }

    window.requestAnimationFrame(draw);
    // A partir de là on crée la liste d'instruction que doit executer le worker. Le worker fait ça en arrière plan. On doit prévoir à l'avance toutes ses actions.
    actions = [];
    for (var j = 0;j<panelTot;j++){
        actions.push("init");
        for (var i = 0;i < nGeneration;i++){
            for (let j = 0;j < echantillon;j ++){
                actions.push("tournoi");
            }
             /*
            actions.push("saveData");
            actions.push("points");
            actions.push(j);
             */
            
            actions.push("display");
            actions.push("Progression : " + Math.round((j + i/nGeneration)/panelTot * 100) + "%");
            
            actions.push("selection");
        }
        //actions.push("default");
    }
    //actions.push("drawGraph");
    actions.push("drawMatch");
    actions.push("takeBackInput");

    // Partie où on donne les instructions au worker
    myWorker = new Worker('worker.js');
    myWorker.postMessage(actions);

    // Partie où l'on reçoit les résultats du worker
    myWorker.onmessage = function(e) {
        console.log(e.data[0]);
        if (e.data[0] == "rapport"){
            savedAnts.push(e.data[1][0]);
            console.log(JSON.stringify(savedAnts));
        }
        else if (e.data[0] == "rapportM"){
            savedAnts.push(e.data[1]);
            console.log("Voici le millésim des meilleures fourmis");
            console.log(JSON.stringify(savedAnts));
        }
        else if (e.data[0] == "I'm done !"){
            inputPoss = true;
        }
        else if (e.data[0] == "dessine ce truc"){
            let rawData = JSON.parse(e.data[1]);
            console.log(rawData);
            let ordo = [];
            let taille = rawData.length;
            for (var j = 0; j < rawData[0].length; j++){   // On mise sur le fait que les différentes données collectées seront de tailles équivalentes.
                for (var i = 0; i < taille;i ++){
                    if (i == 0) ordo[j] = rawData[i][j];
                    else ordo[j] += rawData[i][j];
                }
                ordo[j] = Math.round(ordo[j] / taille);
            }
            
            drawGraph(ordo,e.data[2],taille);
        }
        else if (e.data[0] == "dis cette chose"){
            drawMessage(e.data[1]);
        }
        else {
            var code = e.data[0];
            evolution = e.data[1];
            fourmis = [];
            for (var i = 0; i < code.length; i ++){
                fourmis[i] = new Team();
                fourmis[i].init(membN,i);
                fourmis[i].getData(code[i] , [coor[i][0],coor[i][1]] , 0);
            }
            
            console.log("Message reçu 5 sur 5 !");
            tournoi(true,fourmis);
        }
    };
}

function resize(){
    // ici on redimensionne les canvas à la taille de la fenêtre
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);

    //ici on calcule la taille en pixels des cases et le uselessBorder
    cases = Math.min(W,H)/taillePlateau;
    uselessBorder = Math.floor((Math.max(W,H)/cases - taillePlateau)/2);
    if (W > H) uselessBorder = [uselessBorder,0];
    else uselessBorder = [0,uselessBorder];
}

function touching(key){
    // Ici on gère les touches du clavier
    if (key == 83) saveAs();
    else if (key == 68) {
        modeStaline = modeStaline != true;
        draw();
    }
    else if (key == 39) {seenAnt += 1;draw();}
    else if (key == 37) {seenAnt -= 1;draw();}
    else if (key == 32 && vitesseAffichage == 1) restartGame();
    else if (key == 80 && vitesseAffichage == 1) vitesseAffichage = 0;
    else if (key == 80 && vitesseAffichage == 0) vitesseAffichage = 1;
    else if (key == 67) loadGame();
}

function restartGame(){
    tournoi(true,fourmis);
}

function saveAs(){
    var result = {"codes":JSON.stringify(fourmis[bornI].getCode())};
    
    result = JSON.stringify(result);

    var nowadays = new Date(Date.now());
    nowadays = nowadays.getFullYear() + "-" +
        nowadays.getMonth() + "-" +
        nowadays.getDate() + "-" +
        nowadays.getHours() + "-" +
        nowadays.getMinutes();
     
    SaveAs(new Blob([result]),"Fourmis_" + nowadays + ".txt");
}

function loadGame(){
    // Fonction qui crée le bouton utile pour charger une partie.
    var input = document.getElementById("input");

    input.className = 'show';
    
    input.addEventListener('change', function(evt) {
        console.log(evt);
        canvas.style.display = "block";
        //workCa.style.display = "block";
        var files = evt.target.files;
        var file = files[0];
        var reader = new FileReader();
        reader.readAsText(file);

        //input.removeEventListener();

        reader.onload = function() {
            input.className = ' ';
            var res = JSON.parse(reader.result);
            
            var code = [JSON.parse(res.codes)];
            fourmis = [];
            for (var i = 0; i < coor.length; i ++){
                fourmis[i] = new Team();
                fourmis[i].init(membN,i);
                fourmis[i].getData(code[0] , [coor[i][0],coor[i][1]] , 0);
            }
            
            console.log("Here We GOOOOOOO !");
            tournoi(true,fourmis);

        };
    });
  
}
