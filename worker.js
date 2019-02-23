// fichier du worker

let places = [{taille:15,
               fourmis:[[7,0,0],[3,3,0],[0,7,0],[3,11,0],[7,14,0],[11,11,0],[14,7,0],[11,3,0],[7,0,0],[3,3,0],[0,7,0],[3,11,0],[7,14,0],[11,11,0],[14,7,0],[11,3,0]],
               coor:[[7,0,0],[3,3,0],[0,7,0],[3,11,0],[7,14,0],[11,11,0],[14,7,0],[11,3,0],[7,0,0],[3,3,0],[0,7,0],[3,11,0],[7,14,0],[11,11,0],[14,7,0],[11,3,0]],
               nourriture:[[6,6,1],[7,6,1],[8,6,1],[6,7,1],[7,7,50],[8,7,1],[6,8,1],[7,8,1],[8,8,1]],
               nourrRaf:[],
               ballon:[7,7,0,0],
               usine:[],
               team:8,
               members:2},
              {taille:15,
               fourmis:[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],        // 1 Cette map est destinée à des vagues de tailles 1 pour 1 à 5 fourmis par équipe.
               coor:[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
               nourriture:[[14,14,10],[13,14,10],[14,13,10],[13,13,10]],
               nourrRaf:[],
               ballon:[1,8,0,0],
               team:8,
               usine:[[7,7,0],[7,8,0],[8,7,0],[6,7,0],[7,6,0]],
               members:5},
              {taille:41,
               fourmis:[[20,0,0],[0,20,0],[20,40,0],[40,20,0],[7,14,0],[11,11,0],[14,7,0],[11,3,0]],
               coor:[[20,0,0],[0,20,0],[20,40,0],[40,20,0],[7,14,0],[11,11,0],[14,7,0],[11,3,0]],
               nourriture:[[19,19,10],[20,19,10],[21,19,10],[19,20,10],[20,20,50],[21,20,10],[19,21,10],[20,21,10],[21,21,10]],
               nourrRaf:[],
               ballon:[7,7,0,0],
               team:4,
               usine:[],
               members:10},
              {taille:15,            // Carte avec uniquement le ballon.
               fourmis:[[7,14,0],[11,11,0],[14,7,0],[11,3,0],[7,0,0],[3,3,0],[0,7,0],[3,11,0]],
               coor:[[7,0,0],[3,3,0],[0,7,0],[3,11,0],[7,14,0],[11,11,0],[14,7,0],[11,3,0]],
               nourriture:[],
               nourrRaf:[],
               ballon:[7,7,0,0],
               team:8,
               usine:[],
               members:5},
              {taille:15,
               fourmis:[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],        // 4 Cette map est destinée à des vagues de tailles 1 pour 1 à 5 fourmis par équipe.
               coor:[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
               nourriture:[[14,14,10],[13,14,10],[14,13,10],[13,13,10],[0,14,10],[14,0,10]],
               nourrRaf:[],
               ballon:[7,7,0,0],
               team:8,
               usine:[],
               members:5},
              {taille:9,
               fourmis:[[5,0,0],[5,3,0],[0,7,0],[3,8,0],[7,8,0],[8,8,0],[8,7,0],[8,3,0]],
               coor:[[5,0,0],[5,3,0],[0,7,0],[3,8,0],[7,8,0],[8,8,0],[8,7,0],[8,3,0]],
               nourriture:[[6,6,1],[7,6,1],[8,6,1],[6,7,1],[7,7,50],[8,7,1],[6,8,1],[7,8,1],[8,8,1]],
               nourrRaf:[],
               ballon:[5,5,0,0],
               team:8,
               usine:[],
               members:1},
              {taille:9,
               fourmis:[[5,0,0],[5,3,0],[0,7,0],[3,8,0],[7,8,0],[8,8,0],[8,7,0],[8,3,0]], // Ce tableau 5 sert à tester les fonctions du ballon
               coor:[[5,0,0],[5,3,0],[0,7,0],[3,8,0],[7,8,0],[8,8,0],[8,7,0],[8,3,0]],
               nourriture:[],
               nourrRaf:[],
               ballon:[5,5,0,0],
               team:4,
               usine:[],
               members:1},
              {taille:15,
               fourmis:[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],        // 7 Carte avec placement aléatoire.
               coor:[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
               nourriture:[[2,2,1],[15,15,30],3,11],
               nourrRaf:[],
               ballon:[2,2,15,15],
               team:8,
               usine:[[2,2,0],[15,15,0],0,3],
               members:5,
               random:true}
             ];
let placeId = 7;
let waveSize = 1;
let panelTot = 1;
let echantillon = 10;

let taillePlateau = places[placeId].taille;
let uselessBorder = 0;
let cases = 10;
let fourmis = JSON.parse(JSON.stringify(places[placeId].fourmis));
let coor = JSON.parse(JSON.stringify(places[placeId].coor));
let nourriture = JSON.parse(JSON.stringify(places[placeId].nourriture));
let nourrRaf = JSON.parse(JSON.stringify(places[placeId].nourrRaf));
let usine = JSON.parse(JSON.stringify(places[placeId].usine));
let ballon = JSON.parse(JSON.stringify(places[placeId].ballon));
let teamN = places[placeId].team;
let membN = places[placeId].members;
let bornI = 0;
let bornS = 0;

function initTerrain(id){
    coor = JSON.parse(JSON.stringify(places[id].coor));
    if (places[id].random){
        let bout_de_nourriture;
        let valuesL = places[id].nourriture;
        nourriture = [];
        for (let i = 0;i < valuesL[2] + rnd(valuesL[3] - valuesL[2]);i++){
            bout_de_nourriture = [];
            for (let j = 0; j < 3; j++){
                bout_de_nourriture.push(valuesL[0][j] + rnd(valuesL[1][j] - valuesL[0][j]));
            }
            nourriture.push(bout_de_nourriture);
        }
        nourrRaf = [];

        valuesL = places[id].usine;
        usine = [];
        for (let i = 0;i < valuesL[2] + rnd(valuesL[3] - valuesL[2]);i++){
            bout_de_nourriture = [];
            for (let j = 0; j < 3; j++){
                bout_de_nourriture.push(valuesL[0][j] + rnd(valuesL[1][j] - valuesL[0][j]));
            }
            usine.push(bout_de_nourriture);
        }
        valuesL = places[id].ballon;
        ballon = [valuesL[0] + rnd(valuesL[2] - valuesL[0]),valuesL[1] + rnd(valuesL[3] - valuesL[1])];
    }
    else{
        nourriture = JSON.parse(JSON.stringify(places[id].nourriture));
        nourrRaf = JSON.parse(JSON.stringify(places[id].nourrRaf));
        usine = JSON.parse(JSON.stringify(places[id].usine));
        ballon = JSON.parse(JSON.stringify(places[id].ballon));
    }
}

initTerrain(placeId);

let fCode = [];
let nManche = 200;
let actions = [];
let nAction = 0;
let pointsFourmis = [0,0,0,0,0,0,0,0]; // C'est là que sont stockés les points attribués à chaque fourmis En fait non !
let bareme = {"bonk":-1,"catch":50,"deliver":100,"vol":-100,"takeBonk":2,"dropBonk":0,ballon:0,giveFactory:10,deliverR:200};
let nGeneration = 10;
let error = 5;

let savedData = [];
let thingsSaved = ["",""];

onmessage = function(e){
    actions = e.data;
    whatDoIDoNow();
};

function rnd(n){
    return Math.floor(Math.floor(Math.random()*n));
}

function defaultInit(){ // [fourmis,nourriture,nid , fourmis/carry,nourriture/carry,nid/carry , ballon, ballon/carry]
    var fCode = [];
    fCode[0] = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]; // La première fourmi est la noire. Elle sert de test et doit normalement foncer vers le mur d'indecision
    fCode[1] = [[0,0,0,0,0],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]; // La deuxième fourmi est la rouge. Elle doit normalement foncer vers la nourriture puis foncer vers le haut.
    fCode[2] = [[0,0,0,0,0],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]; // La troisième fourmi est la verte. Elle devrait aller vers la nourriture à tout prix.
    fCode[3] = [[0,0,0,-10,-10],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,-10,-10],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]; // La 4eme est la bleue. Elle est antisociale et devrait fuir tout contact.
    fCode[4] = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0]]; // La 5eme est la orange. Elle est casanière et veut à tout prix rester dans son nid.
    fCode[5] = [[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]; // La 6eme est la violette. Elle adore les autres fourmis et leur fonce dessus à tout prix.
    fCode[6] = [[0,0,0,-1,-1],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,-1,-1],[0,0,0,0,0],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0]]; // La 7eme et la 8eme sont des stéréoptypes ideaux. Elles vont de la nourriture à leur nid en évitant légerement les autres fourmis.
    fCode[7] = [[0,0,0,-1,-1],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,-1,-1],[0,0,0,0,0],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0]]; // Elles obtiennent d'ailleurs les scores les plus élevés avec des scores allant de 900 à 2000
    for (var i = 0; i < 8; i ++){
        fourmis[i] = new Fourmi();
        fourmis[i].getData(fCode[i] , [coor[i][0],coor[i][1]] , i , 0 , 0); // A REPARER POUR COLLER AVEC TEAM
    }
}

function init(){
    // initialise avant de commencer les tournois
    fourmis = [];
    for (var i = 0; i < teamN; i ++){
        fourmis[i] = new Team();
        fourmis[i].init(membN,i);
        fourmis[i].getData(generateCode() , [coor[i][0],coor[i][1]] , 0);
    }
    //whatDoIDoNow();
}

function preselect(initState){
    // Ici le worker se met à jour avec les données que lui passe la fonction start()
    for (var i = 0;i < teamN;i++){
        fourmis[i] = new Team();
        fourmis[i].init(membN,i);
        fourmis[i].getData(initState[0][i], [coor[i][0],coor[i][1]] , 0);
    }
}

function generateCode(){
    // Les codes de fourmis sont sous la forme : element -> fonction
    // type étant dans l'ordre : ennemie nourriture  nid  ballon  nourriture+  usineRepos  usineActive donc on a besoin de 14 fonctions.
    var result = [];
    for (var memb = 0;memb < membN;memb++){
        result[memb] = [];
        for (var etat = 0;etat < 14;etat++){
            result[memb][etat] = [];
            for (var type = 0; type < 5; type ++){
                result[memb][etat][type] = rnd(100)-50;
            }
        }
    }
    return result;
}

function tournoi(graph,fourmis){ // Si graph == True alors on dessine tout pour le spectateur sinon non !

    // On initialise le terrain avant le tournoi.
    // On n'oublie pas de remettre les fourmis à leur position initial
    for (let groupe = 0;groupe < teamN; groupe += waveSize){
        bornI = groupe;
        bornS = groupe + waveSize;
        for (let id = bornI;id < bornS;id ++){
            fourmis[id].goToNest(places[placeId].fourmis);
            fourmis[id].looseCarry();
            fourmis[id].initPts();
        }
        //On n'oublie pas non plus de remettre les stocks de nourriture en place
        initTerrain(placeId);
        
        if (graph){
            if (groupe != 0) return; // On ne se fatigue pas et on ne s'occupe de dessiner que la première vague tout simplement.
            var mancheRestante = nManche;
            var slowNumber = 5;
            var slow = slowNumber;
            console.log(fourmis);
            var manche = function(){
                if (slow == 0){
                    // Lors d'une manche, chaque fourmi agit à son tour en selectionnant une direction qui sera executée si possible (pas d'obstacles) et ramasse/depose de la nourriture automatiquement

                    if (vitesseAffichage){
                        for (let id = bornI;id < bornS;id ++){
                            fourmis[id].yourTurn(bareme,nourriture,coor,fourmis,ballon);
                        }
                        moveBall(); // On n'oublie pas de faire bouger le ballon après toutes les fourmis.
                    }
                    draw(fourmis);
                    if (vitesseAffichage) mancheRestante -= 1;
                    slow = slowNumber;
                }
                else slow -= 1;
                if (mancheRestante > 0) window.requestAnimationFrame(manche);
                else {
                    // On log le code des fourmis qui viennent de jouer.
                    console.log("Voici les fourmis qui viennent de jouer.");
                    for (let id = bornI;id < bornS;id ++){
                        console.log(waveSize);
                        console.log(fourmis[id].getCode());
                    }
                }
            };
            window.requestAnimationFrame(manche);
        }
        else {

            for(var i = 0;i < nManche;i++){
                for (let id = bornI;id < bornS;id ++){
                    fourmis[id].yourTurn(bareme,nourriture,coor,fourmis,ballon);
                }
                moveBall();
            }

        }
    }
}

function moveBall(){
    // Fonction qui s'occupe de faire agir le ballon.
    ballon[4] = ballon[0];
    ballon[5] = ballon[1]; // On stocke en 4 et 5 la position dans laquelle veux aller le ballon.
    if (ballon[2] != 0){
        if (ballon[2] > 0){
            ballon[2] -= 1;
            ballon[4] += 1;
        }
        if (ballon[2] < 0){
            ballon[2] += 1;
            ballon[4] -= 1;
        }
    }
    if (ballon[3] != 0){
        if (ballon[3] > 0){
            ballon[3] -= 1;
            ballon[5] += 1;
        }
        if (ballon[3] < 0){
            ballon[3] += 1;
            ballon[5] -= 1;
        }
    }
    for (let id = bornI;id < bornS;id ++){
        fourmis[id].getListe().forEach(
            function(e){
                if (e.getX() == ballon[4] && e.getY() == ballon[5]){
                    ballon[4] = ballon[0];
                    ballon[5] = ballon[1];
                }
            }
        );
    }
    if (ballon[4] < 0 || ballon[5] < 0 || ballon[4] >= taillePlateau || ballon[5] >= taillePlateau){
        ballon[4] = (ballon[4] + taillePlateau)%taillePlateau;
        ballon[5] = (ballon[5] + taillePlateau)%taillePlateau;
    }
    for (let i = bornI;i < bornS;i ++){
        if (coor[i][0] == ballon[4] && coor[i][1] == ballon[5]){
            fourmis[i].addPoints(bareme.ballon);
            ballon[4] = places[placeId].ballon[0];
            ballon[5] = places[placeId].ballon[1];
        }
    }
    ballon[0] = ballon[4];
    ballon[1] = ballon[5];
}

function whatDoIDoNow(){
    for(let iAct = 0;iAct<actions.length;iAct++){
        if (actions[iAct] == "init") init();
        else if (actions[iAct] == "takeBackInput") postMessage(["I'm done !"]);
        else if (actions[iAct] == "default") defaultInit();
        else if (actions[iAct] == "changeId") {iAct += 1; placeId += actions[iAct];}
        else if (actions[iAct] == "tournoi") tournoi(false,fourmis);
        //else if (actions[iAct] == "tournoiVisible") tournoi(true);
        else if (actions[iAct] == "selection") selection();
        else if (actions[iAct] == "saveData"){
            iAct += 2;
            let M = 0;
            fourmis.forEach(
                function(e,i){
                    if (e.getPoints() > fourmis[M].getPoints()) M = i;
                }
            );
            if (savedData[actions[iAct]] == undefined) savedData[actions[iAct]] = [];

            if (actions[iAct-1] == "points"){
                thingsSaved = ["pts",""];
                savedData[actions[iAct]].push(fourmis[M].getPoints());
            }
            else if (actions[iAct-1] == "interetBallon"){
                thingsSaved = ["ballon",""];
                savedData[actions[iAct]].push(fourmis[M].getInteretBall());
            }
        }
        else if (actions[iAct] == "drawGraph"){
            postMessage(["dessine ce truc",JSON.stringify(savedData),thingsSaved[0]]);
        }
        else if (actions[iAct] == "drawMatch"){
            var code = [];
            fourmis.forEach(
                function(e,i){
                    code.push(e.getCode());
                }
            );
            postMessage([code]);
        }
        else if (actions[iAct] == "display"){
            iAct += 1;
            postMessage(["dis cette chose",actions[iAct]]);
        }
        else if (actions[iAct] == "preselected") {
            iAct += 1;
            preselect(actions[iAct]);
        }
        else if (actions[iAct] == "reporting"){
            var code = [];
            fourmis.forEach(
                function(e,i){
                    code.push(e.getCode());
                }
            );
            console.log("RAPPORT EN COURS");
            postMessage(["rapport",code]);
        }
        else if (actions[iAct] == "reportingM"){
            var code = 0;
            fourmis.forEach(
                function(e,i){
                    if (e.getPoints() > fourmis[code].getPoints()) code = i;
                }
            );
            console.log("RAPPORT EN COURS");
            postMessage(["rapportM",fourmis[code].getCode()]);
        }
    }
    //postMessage([code,evolution]);    // J'ai enlevé le message de fin de liste des tâches mais c'est pas forcément une bonne idée sur le long terme...
}

function selection(){
    var A = 0;
    var B = 1;
    var total = 0;
    fourmis.forEach(
        function(e,i){
            total += e.getPoints();
            if (e.getPoints() >= fourmis[A].getPoints()){
                B = A;
                A = i;
            }
            else if (e.getPoints() >= fourmis[A].getPoints()){
                B = i;
            }
        }
    );
    //console.log(evolution);
    // Les tests semblent indiquer que la selection des meilleurs fourmis fonctionne
    pointsFourmis = [0,0,0,0,0,0,0,0];
    //console.log(JSON.stringify(fCode[A]));
    // On vient de selectionner les deux meilleurs fourmis A et B On va les mettre aux positions 0 et 1 de notre nouveau groupe de fourmis
    var newFourmis = [fourmis[A].copy(0),fourmis[B].copy(0)];
    for (var i = 2; i < teamN - 1; i ++){
        if (i%2 == 0) newFourmis[i] = fourmis[A].copy(error);
        else newFourmis[i] = fourmis[B].copy(error);
    }
    newFourmis[teamN - 1] = generateCode(teamN);

    // On a notre nouvelle liste de Fourmis ! Il faut maintenant les mélanger.
    var liste = [];
    for (var i = 0;i < teamN; i ++){
        liste[i] = i;
    }

    fourmis.forEach(
        function(e,i){
            var alea = rnd(liste.length);
            e.init(membN,i);
            e.getData(newFourmis[liste[alea]],[0,0],0);
            e.goToNest(coor);
            liste.splice(alea,1);
        }
    );
    //console.log(JSON.stringify(fCode));
    //whatDoIDoNow();
}

const Fourmi = function(){
    let position = [0,0];
    let code = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0]];
    let n = 0;
    let carry = 0;
    let points = 0;
};

Fourmi.prototype.fonctionVision = function(n,code){
    var r = code[0] * n * n + code[1] * n + code[2];
    //var r = code[1] * n + code[2];
    r = Math.min(r,code[3]);
    r = Math.max(r,code[4]);
    return r;
};
Fourmi.prototype.calculVect = function(A,B,D){
    //console.log(D);
    var norme = Math.abs(A[0]) + Math.abs(A[1]);
    if (norme != 0){
        A[0] /= norme;
        A[1] /= norme;
    }
    norme = this.fonctionVision(norme,D);
    B[0] += A[0] * norme;
    B[1] += A[1] * norme;
    return B;
};
Fourmi.prototype.getData = function(codeN,positionN,nN,carryN,pointsN){
    // Cette fonction initialise les données internes de la fonction.
    if (codeN == undefined) codeN = [[50,-2,0,0,0],[0,-2,50,0,0],[0,0,0,10,10],[0,0,0,10,10],[0,0,0,10,10],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,10,10],[0,0,0,0,0],[0,0,0,0,0]];
    this.code = codeN;
    if (positionN == undefined) positionN = [0,0];
    if (nN == undefined) {nN = 0; console.log("On m'a passé un n undefined ! Gros débile !");}
    if (carryN == undefined) carryN = 0;
    if (pointsN == undefined) pointsN = 0;
    this.n = nN;
    this.points = pointsN;
    this.position = positionN;
    this.carry = carryN;
};
Fourmi.prototype.goToNest = function(coor){
    var lulz = coor[this.n];
    this.position[0] = lulz[0];
    this.position[1] = lulz[1];
};
Fourmi.prototype.getX = function(){
    return this.position[0];
};
Fourmi.prototype.getY = function(){
    return this.position[1];
};
Fourmi.prototype.isHere = function(x,y){
    return x == this.position[0] && y == this.position[1];
};
Fourmi.prototype.getCode = function(){
    return this.code;
};
Fourmi.prototype.getPoints = function(){
    return this.points;
};
Fourmi.prototype.getCarry = function(){
    return this.carry;
};
Fourmi.prototype.looseCarry = function(){
    this.carry = 0;
};
Fourmi.prototype.addPoints = function(n){
    this.points += n;
};
Fourmi.prototype.tendance = function(fourmis,nourriture,coor,ball){
    // Cette fonction a besoin de la liste de toutes les fourmis, de la liste des positions de la nourriture, et les coordonnées des nids.
    // La fourmi n veut faire un choix de direction qui se traduira par un nombre entre 0 et 3  4 si elle ne veut aller nulle part.
    // D'abord chaque objet va lui envoyer un signal sous la forme d'un vecteur dans sa direction
    // On ajoute ce vecteur au vecteur final de la fourmi qui indiquera au final la direction qu'elle veut le plus prendre
    var cc = this.carry; // 0 si la fourmi ne transporte rien 1 sinon
    var result = [[0,0],[0,0],[0,0],[0,0]]; // liste resultat
    var vecteurFinal = [0,0];

    for (let j = bornI;j < bornS;j ++){
        let liste = fourmis[j].getListe();
        for (let i = 0;i < liste.length;i++){
            let vecteursA = [liste[i].getX() - this.position[0],liste[i].getY() - this.position[1]];
            vecteurFinal = this.calculVect(vecteursA,vecteurFinal,this.code[0 + cc]);
        }
    }

    for (var i = 0; i < nourriture.length; i ++){
        let vecteursA = [nourriture[i][0] - this.position[0],nourriture[i][1] - this.position[1]];
        vecteurFinal = this.calculVect(vecteursA,vecteurFinal,this.code[2 + cc]);
    }

    for (var i = 0; i < nourrRaf.length; i ++){
        let vecteursA = [nourrRaf[i][0] - this.position[0],nourrRaf[i][1] - this.position[1]];
        vecteurFinal = this.calculVect(vecteursA,vecteurFinal,this.code[8 + cc]);
    }

    // Calcul du vecteur pour le nid

    let vecteursA = [coor[this.n][0] - this.position[0],coor[this.n][1] - this.position[1]];
    vecteurFinal = this.calculVect(vecteursA,vecteurFinal,this.code[4 + cc]);

    // Calcul du vecteur pour le ballon

    vecteursA = [ball[0] - this.position[0],ball[1] - this.position[1]];
    vecteurFinal = this.calculVect(vecteursA,vecteurFinal,this.code[6 + cc]);

    // Calcul du vecteur pour les usines

    for (let i = 0; i < usine.length; i ++){
        let vecteursA = [usine[i][0] - this.position[0],usine[i][1] - this.position[1]];
        let nnn = 12 + cc;
        if (usine[i][2] == 0) nnn = 10 + cc;
        vecteurFinal = this.calculVect(vecteursA,vecteurFinal,this.code[nnn]);
    }

    return vecteurFinal;
};
Fourmi.prototype.chooseDirection = function(fourmis,nourriture,coor,ball){
    // Cette fonction détermine la direction à prendre à partir de la tendance renvoyée par la fonction interne tendance.

    var final = this.tendance(fourmis,nourriture,coor,ball);

    // Voici la méthode : on prend le vecteur et ça nous donne une probabilité pour les deux directions x et y
    var total = Math.abs(final[0]) + Math.abs(final[1]);
    if (total == 0) return 4;
    var hasard = rnd(total);
    if (hasard < Math.abs(final[0])) {
        if (final[0] > 0) return 1;
        else return 3;
    }
    else {
        if (final[1] > 0) return 2;
        else return 0;
    }

    /*
     if (Math.abs(final[0]) > Math.abs(final[1])){
     if (final[0] > 0) return 1;
     else return 3;
     }
     else {                                                  // Methode un peu pourrie si vous voulez mon avis
     if (final[1] > 0) return 2;
     else if (final[1] < 0) return 0;
     else return 4;
     }
     */

};
Fourmi.prototype.copy = function(erreurs){ // Cette fonction retourne une copie du code de la fourmi avec un certain nombre d'erreurs !
    var result = [];
    for (var etat = 0;etat < 14;etat++){
        result[etat] = [];
        for (var type = 0; type < 5; type ++){
            result[etat][type] = this.code[etat][type];
        }
    }

    // On effectue des erreurs mineures !
    for (var i = 0; i < erreurs;i++){
        result[rnd(8)][rnd(5)] += rnd(21) - 10;
    }
    return result;
};
Fourmi.prototype.yourTurn = function(that,bareme,nourriture,coor,fourmis,ball){
    // C'est la fonction qui sert à dire à la fourmi : vas-y joue ton tour !
    var dir = this.chooseDirection(fourmis,nourriture,coor,ball);
    that.move(that,dir,bareme,nourriture,coor,ball);
};
Fourmi.prototype.move = function(that,dir,bareme,nourriture,coor,ball){
    // La fourmi avance dans la direction dir ou ne fait rien si dir == 4
    if (dir == 4) return true;
    let coors = [];
    coors[0] = this.position[0];
    coors[1] = this.position[1];
    const vecteurs = [[0,-1],[1,0],[0,1],[-1,0]];
    coors[0] += vecteurs[dir][0];
    coors[1] += vecteurs[dir][1];
    if (coors[1] < 0 || coors[0] < 0 || coors[0] >= taillePlateau || coors[1] >= taillePlateau){
        this.points += bareme.bonk;
        coors[0] -= vecteurs[dir][0];
        coors[1] -= vecteurs[dir][1];
    }

    let bonk = 0;
    let canSteal = this.carry == 0;
    //                     Partie vol de nourriture
    let gainFood = 0;
    for (let id = bornI;id < bornS;id ++){
        fourmis[id].getListe().forEach(
            function(e){
                if (e.getX() == coors[0] && e.getY() == coors[1]) {
                    bonk = 1;
                    if (canSteal && e.getCarry() == 1){
                        e.looseCarry();
                        gainFood = e.potential;
                        e.points += bareme.dropBonk;
                    }
                }
            }
        );
    }

    if (gainFood > 0){
        this.carry = 1;  // La fourmis vole la nourriture.
        this.potential = gainFood;
        this.points += bareme.takeBonk;
    }

    // Partie Ballon
    if (ball[0] == coors[0] && ball[1] == coors[1]){
        // La fourmi frappe dans la balle !!!
        bonk = 1; // La fourmi ne peut avancer et subit un malus, frapper dans un ballon n'est une bonne chose que si l'on sait ce que l'on fait.
        ball[2] += vecteurs[dir][0];
        ball[3] += vecteurs[dir][1]; // Ici on imprime le vecteur mouvement de la fourmi sur la balle. La balle avance de deux cases en théorie.
    }

    if (bonk == 1) {
        this.points += bareme.bonk; // La fourmi gagne ou perd des points car elle a foncé dans une autre fourmi ou dans le ballon.
    }
    else {
        this.position[0] = coors[0];
        this.position[1] = coors[1];
    }

    bonk = 0;

    if (that.carry == 0){
        let kill = -1;
        nourriture.forEach(
            function(e,i){
                if (e[0] == coors[0] && e[1] == coors[1]){
                    bonk = 1;
                    e[2] -= 1;
                    if (e[2] <= 0) kill = i;
                }
            }
        );
        if (kill != -1) nourriture.splice(kill,1);

        
        kill = -1;
        nourrRaf.forEach(
            function(e,i){
                if (e[0] == coors[0] && e[1] == coors[1]){
                    bonk = 2;
                    e[2] -= 1;
                    if (e[2] <= 0) kill = i;
                }
            }
        );
        if (kill != -1) nourrRaf.splice(kill,1);
         
    }

    if (bonk == 1) {
        this.carry = 1;
        this.potential = bareme.deliver;
        this.points += bareme.catch;
    }
    else if (bonk == 2){
        this.carry = 1;
        this.potential = bareme.deliverR;
        this.points += bareme.catch;
    }

    if (coor[this.n][0] == coors[0] && coor[this.n][1] == coors[1] && this.carry == 1) {
        this.carry = 0;
        this.points += this.potential;
        // La fourmi a rammené de la nourriture à son nid. La nourriture est donc ajoutée à l'emplacement du nid. On ne le fait pas pour le moment.
        //addFood(coors[0],coors[1]);
    }

    // Partie usine !
    for (let i = 0; i < usine.length;i++){
        if (usine[i][0] == coors[0] && usine[i][1] == coors[1]) { // La fourmi est sur une usine.
            if (usine[i][2] == 0 && this.carry == 1 && this.potential != bareme.deliverR){
                this.carry = 0;
                usine[i][2] = 5;
                this.points += bareme.giveFactory;
            }
            else{     // On considère que la fourmi transportant de la nourriture peut travailler à l'usine... Parce que pourquoi pas.
                if (usine[i][2] == 1) addFoodR(coors[0],coors[1],1);
                usine[i][2] = Math.max(usine[i][2] - 1,0);
            }
        }
    }

};

Fourmi.prototype.getInteretBall = function(){
    let result = 0;
    for (var i = 0; i < taillePlateau; i ++){
        result += this.fonctionVision(i,this.code[6]);
        result += this.fonctionVision(i,this.code[7]);
    }
    result = result/(2*taillePlateau);
    return result;
};
Fourmi.prototype.getCodeResume = function(){
    let norme = [];
    let middle = taillePlateau/2;
    for (let i = 0; i < this.code.length; i++){
        norme[i*2] = 0;
        norme[i*2 + 1] = 0;
        for (let j = 0; j < middle; j ++){
            norme[i*2] += this.fonctionVision(j,this.code[i]) * (middle - j);
        }
        for (let j = Math.floor(middle); j < taillePlateau; j ++){
            norme[i*2+1] += this.fonctionVision(j,this.code[i]) * (j - middle + 1);
        }
    }
    let range = minMax(norme); 
    range[1] = range[1] / 3;
    range[3] = range[3] / 3;
    let modif = 1;
    for (let i = 0; i < norme.length; i ++){
        if (norme[i] >= 0) modif = 1;
        else modif = -1;
        norme[i] = Math.floor(Math.abs(norme[i]) / range[1 + 2*Math.floor((i%4)/2)]) * modif;
    }
    return norme;
};

function minMax(liste){
    let result = [0,0,1,0];
    for (let i = 0; i < liste.length;i++){
        if (Math.abs(liste[i]) > result[1 + 2*Math.floor((i%4)/2)]) {
            result[2*Math.floor((i%4)/2)] = i;
            result[1 + 2*Math.floor((i%4)/2)] = Math.abs(liste[i]);
        }
    }
    return result;
}

function addFood(x,y,n){
    // Cette fonction ajoute de la nourriture sur la case de coordonnées x,y
    if (n == undefined) n = 1;
    nourriture.forEach(
        function(e,i){
            if (e[0] == x && e[1] == y){
                nourriture[i][2] += n;
                return;
            }
        }
    );
    nourriture.push([x,y,n]);
}

function addFoodR(x,y,n){
    // Cette fonction ajoute de la nourriture sur la case de coordonnées x,y
    if (n == undefined) n = 1;
    nourrRaf.forEach(
        function(e,i){
            if (e[0] == x && e[1] == y){
                nourrRaf[i][2] += n;
                return;
            }
        }
    );
    nourrRaf.push([x,y,n]);
}

var Team = function(){
    var members = [];
    var points = 0;
    var n = 0;
};

Team.prototype.init = function(taille,nI){
    this.n = nI;
    this.members = [];
    for (var i = 0;i < taille;i++){
        this.members[i] = new Fourmi();
    }
};
Team.prototype.initPts = function(){
    this.points = 0;
    for (var i = 0; i < this.members.length; i ++){
        this.members[i].addPoints(this.members[i].getPoints() * -1);
    }
};
Team.prototype.getData = function(code,position,points){
    this.points = points;
    for (var i = 0; i < this.members.length; i ++){
        this.members[i].getData(code[i],JSON.parse(JSON.stringify(position)),this.n,0,points);
    }
};
Team.prototype.goToNest = function(position){
    for (var i = 0; i < this.members.length; i ++){
        this.members[i].goToNest(JSON.parse(JSON.stringify(position)));
    }
};
Team.prototype.yourTurn = function(bareme,nourriture,coor,fourmis,ballon){
    for (var i = 0; i < this.members.length; i ++){
        this.members[i].yourTurn(this.members[i],bareme,nourriture,coor,fourmis,ballon);
    }
};
Team.prototype.getCode = function(){
    var result = [];
    for (var i = 0; i < this.members.length; i ++){
        result[i] = this.members[i].getCode();
    }
    return result;
};
Team.prototype.addPoints = function(n){
    this.points += n;
};
Team.prototype.getPoints = function(){
    var result = this.points;
    for (var i = 0; i < this.members.length; i ++){
        result += this.members[i].getPoints();
    }
    return result;
};
Team.prototype.copy = function(error){
    var result = [];
    for (var i = 0; i < this.members.length; i ++){
        result[i] = this.members[i].copy(error);
    }
    return result;
};
Team.prototype.getListe = function(){
    return this.members;
};

Team.prototype.looseCarry = function(){
    for (var i = 0; i < this.members.length; i ++){
        this.members[i].looseCarry();
    }
};

Team.prototype.getInteretBall = function(){
    let result = this.members[0].getInteretBall();
    for (var i = 1; i < this.members.length; i ++){
        let inte = this.members[i].getInteretBall();
        if (inte > result) result = inte;
    }
    return Math.round(result);
};

/*                                      // Juste un test des classes prototypées pour être sûr de leur efficacité.
 const FFXIV = function(){};

 FFXIV.prototype.sayHello = function(){
 console.log("Hello !");
 };

 const aRealmReborn = new FFXIV ();

 aRealmReborn.sayHello();
 */
