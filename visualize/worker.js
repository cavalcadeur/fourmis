// fichier du worker

var taillePlateau = 15;
var uselessBorder = 0;
var cases = 10;
var fourmis = [[7,0,0],[3,3,0],[0,7,0],[3,11,0],[7,14,0],[11,11,0],[14,7,0],[11,3,0]];
var coor = [[7,0,0],[3,3,0],[0,7,0],[3,11,0],[7,14,0],[11,11,0],[14,7,0],[11,3,0]];
var nourriture = [[6,6,1],[7,6,1],[8,6,1],[6,7,1],[7,7,50],[8,7,1],[6,8,1],[7,8,1],[8,8,1]];
var fCode = [];
var nManche = 300;
var actions = [];
var nAction = 0;
var pointsFourmis = [0,0,0,0,0,0,0,0]; // C'est là que sont stockés les points attribués à chaque fourmis
var bareme = {"bonk":-1,"catch":50,"deliver":100,"vol":-100,"takeBonk":10,"dropBonk":-10};
var nGeneration = 5000;
var error = 3;
var evolution = [];

onmessage = function(e){
    actions = e.data;
    whatDoIDoNow();
};

function rnd(n){
    return Math.floor(Math.floor(Math.random()*n));
}

function defaultInit(){
    var fCode = [];
    fCode[0] = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,10,10]]; // La première fourmi est la noire. Elle sert de test et doit normalement foncer vers le mur d'indecision
    fCode[1] = [[50,0,0,0,0],[0,0,0,0,0],[0,0,0,10,10]]; // La deuxième fourmi est la rouge. Elle doit normalement foncer vers la nourriture puis foncer vers le haut.
    fCode[2] = [[50,0,0,0,0],[50,0,0,0,0],[0,0,0,10,10]]; // La troisième fourmi est la verte. Elle devrait aller vers la nourriture à tout prix.
    fCode[3] = [[0,-10,0,0,0],[0,-10,0,0,0],[0,0,0,10,10]]; // La 4eme est la bleue. Elle est antisociale et devrait fuir tout contact.
    fCode[4] = [[0,0,50,0,0],[0,0,50,0,0],[0,0,0,10,10]]; // La 5eme est la orange. Elle est casanière et veut à tout prix rester dans son nid.
    fCode[5] = [[0,50,0,0,0],[0,50,0,0,0],[0,0,0,10,10]]; // La 6eme est la violette. Elle adore les autres fourmis et leur fonce dessus à tout prix.
    fCode[6] = [[50,0,0,0,0],[0,0,50,0,0],[0,0,0,10,10]]; // La 7eme et la 8eme sont des stéréoptypes ideaux. Elles vont de la nourriture à leur nid en évitant légerement les autres fourmis.
    fCode[7] = [[50,-2,0,0,0],[0,-2,50,0,0],[0,0,0,10,10]]; // Elles obtiennent d'ailleurs les scores les plus élevés avec des scores allant de 900 à 2000
    for (var i = 0; i < 8; i ++){
        fourmis[i] = new Fourmi();
        fourmis[i].getData(fCode[i] , [coor[i][0],coor[i][1]] , i , 0 , 0);
    }
}

function init(){
    // initialise avant de commencer les tournois
    for (var i = 0; i < 8; i ++){
        fourmis[i] = new Fourmi();
        fourmis[i].getData(generateCode() , [coor[i][0],coor[i][1]] , i , 0 , 0);
    }
    //whatDoIDoNow();
}

function preselect(initState){
    // Ici le worker se met à jour avec les données que lui passe la fonction start()
    for (var i = 0;i<8;i++){
        fourmis[i] = new Fourmi();
        fourmis[i].getData(initState[0][i], [coor[i][0],coor[i][1]] , i , 0 , 0);
    }
}

function generateCode(){
    // Les codes de fourmis sont sous la forme : état -> type d'élément
    // type étant dans l'ordre : nourriture  ennemie  nid  alliée  menace
    var result = [];
    for (var etat = 0;etat<3;etat++){
        result[etat] = [];
        for (var type = 0; type < 5; type ++){
            result[etat][type] = rnd(100)-50;
        }
    }
    return result;
}

function tournoi(graph,fourmis){ // Si graph == True alors on dessine tout pour le spectateur sinon non !
    if (graph){
        var mancheRestante = nManche;
        var slowNumber = 5;
        var slow = slowNumber;
        console.log(fourmis);
        var manche = function(){
            if (slow == 0){
                // Lors d'une manche, chaque fourmi agit à son tour en selectionnant une direction qui sera executée si possible (pas d'obstacles) et ramasse/depose de la nourriture automatiquement

                fourmis.forEach(
                    function(e){
                        e.yourTurn(bareme,nourriture,coor,fourmis);
                    }
                );
                draw(evolution,fourmis);
                mancheRestante -= 1;
                slow = slowNumber;
            }
            else slow -= 1;
            if (mancheRestante > 0) window.requestAnimationFrame(manche);
            else {
                // On log les codes des fourmis
                for (var i = 0;i<8;i++){
                    console.log(fourmis[i].getCode());
                }
                // On n'oublie pas de remettre les fourmis à leur position initial
                fourmis.forEach(
                    function(e){
                        e.goToNest(coor);
                    }
                );
                //On n'oublie pas non plus de remettre les stocks de nourriture en place
                nourriture = [[6,6,1],[7,6,1],[8,6,1],[6,7,1],[7,7,50],[8,7,1],[6,8,1],[7,8,1],[8,8,1],[0,0,1],[0,14,1],[14,0,1],[14,14,1]];
            }
        };
        window.requestAnimationFrame(manche);
    }
    else {
        for(var i = 0;i < nManche;i++){
            fourmis.forEach(
                function(e){
                    e.yourTurn(bareme,nourriture,coor,fourmis);
                }
            );
        }

        // On n'oublie pas de remettre les fourmis à leur position initial
        fourmis.forEach(
            function(e){
                e.goToNest(coor);
            }
        );
        //On n'oublie pas non plus de remettre les stocks de nourriture en place
        nourriture = [[6,6,1],[7,6,1],[8,6,1],[6,7,1],[7,7,50],[8,7,1],[6,8,1],[7,8,1],[8,8,1]];
    }
}

function whatDoIDoNow(){
    for(var i = 0;i<actions.length;i++){
        if (actions[i] == "init") init();
        if (actions[i] == "default") defaultInit();
        else if (actions[i] == "tournoi") tournoi(false,fourmis);
        //else if (actions[i] == "tournoiVisible") tournoi(true);
        else if (actions[i] == "selection") selection();
        else if (actions[i] == "preselected") {
            i += 1;
            preselect(actions[i]);
        }
        else if (actions[i] == "reporting"){
            var code = [];
            fourmis.forEach(
                function(e,i){
                    code.push(e.getCode());
                }
            );
            console.log("RAPPORT EN COURS");
            postMessage(["rapport",code]);
        }
    }
    var code = [];
    fourmis.forEach(
        function(e,i){
            code.push(e.getCode());
        }
    );
    postMessage([code,evolution]);
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
    evolution.push(fourmis[A].getCode());
    //console.log(evolution);
    // Les tests semblent indiquer que la selection des meilleurs fourmis fonctionne
    pointsFourmis = [0,0,0,0,0,0,0,0];
    //console.log(JSON.stringify(fCode[A]));
    // On vient de selectionner les deux meilleurs fourmis A et B On va les mettre aux positions 0 et 1 de notre nouveau groupe de fourmis
    var newFourmis = [fourmis[A].copy(0),fourmis[B].copy(0),fourmis[A].copy(error),fourmis[B].copy(error),fourmis[A].copy(error),fourmis[B].copy(error),fourmis[A].copy(error),generateCode()];
    
    // On a notre nouvelle liste de Fourmis ! Il faut maintenant les mélanger.
    var liste = [0,1,2,3,4,5,6,7];
    
    fourmis.forEach(
        function(e,i){
            var alea = rnd(liste.length);
            e.getData(newFourmis[liste[alea]],[0,0],i,0,0);
            e.goToNest(coor);
            liste.splice(alea,1);
        }
    );
    //console.log(JSON.stringify(fCode));
    //whatDoIDoNow();
}

var Fourmi = function(){
    var position = [];
    var code = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,10,10]];
    var n = 0;
    var carry = 0;
    var points = 0;

    function fonctionVision(n,code){
        var r = code[0] * n * n + code[1] * n + code[2];
        r = Math.min(r,code[3]);
        r = Math.max(r,code[4]);
        return r;
    }

    function calculVect(A,B,C,D){
        //console.log(D);
        var norme = Math.abs(A[0]) + Math.abs(A[1]);
        if (norme != 0){
            A[0] /= norme;
            A[1] /= norme;
        }
        norme = fonctionVision(norme,D);
        B[0] += A[0] * norme * C;
        B[1] += A[1] * norme * C;
        return B;
    }

    function tendance(that,fourmis,nourriture,coor){
        // Cette fonction a besoin de la liste de toutes les fourmis, de la liste des positions de la nourriture, et les coordonnées des nids.
        // La fourmi n veut faire un choix de direction qui se traduira par un nombre entre 0 et 3  4 si elle ne veut aller nulle part.
        // D'abord chaque objet va lui envoyer un signal sous la forme d'un vecteur dans sa direction
        // On va reduire le vecteur pour éviter que les objets lointains aient plus d'impact que les proches puis on va multiplier le vecteur par le coefficient interne de la fourmi
        // On ajoute ce vecteur au vecteur final de la fourmi qui indiquera au final la direction qu'elle veut le plus prendre
        var e = that.carry; // 0 si la fourmi ne transporte rien 1 sinon
        var codeX = that.code[that.carry];
        var result = [[0,0],[0,0],[0,0],[0,0]]; // liste resultat
        var vecteurFinal = [0,0];
        
        fourmis.forEach(
            function (e,i){
                if (i != that.n){
                    var vecteursA = [e.getX() - that.position[0],e.getY() - that.position[1]];
                    vecteurFinal = calculVect(vecteursA,vecteurFinal,codeX[1],that.code[2]);
                }
            }
        );

        nourriture.forEach(
            function (e,i){
                var vecteursA = [e[0] - that.position[0],e[1] - that.position[1]];
                vecteurFinal = calculVect(vecteursA,vecteurFinal,codeX[0],that.code[2]);
            }
        );

        var vecteursA = [coor[that.n][0] - that.position[0],coor[that.n][1] - that.position[1]];
        vecteurFinal = calculVect(vecteursA,vecteurFinal,codeX[2],that.code[2]);

        return vecteurFinal;
    }

    return{
        getData: function(code,position,n,carry,points){
            // Cette fonction initialise les données internes de la fonction.
            if (code == undefined) code = [[50,-2,0,0,0],[0,-2,50,0,0],[0,0,0,10,10]];
            this.code = code;
            if (position == undefined) position = [0,0];
            if (n == undefined) {n = 0; console.log("On m'a passé un n undefined ! Gros débile !");}
            if (carry == undefined) carry = 0;
            if (points == undefined) points = 0;
            this.n = n;
            this.points = points;
            this.position = position;
            this.carry = carry;
        },
        goToNest: function(coor){
            var lulz = coor[this.n];
            this.position[0] = lulz[0];
            this.position[1] = lulz[1];
        },
        getX: function(){
            return this.position[0];
        },
        getY: function(){
            return this.position[1];
        },
        getCode: function(){
            return this.code;
        },
        getPoints: function(){
            return this.points;
        },
        getCarry: function(){
            return this.carry;
        },
        looseCarry: function(){
            this.carry = 0;
        },
        chooseDirection: function(fourmis,nourriture,coor){
            // Cette fonction détermine la direction à prendre à partir de la tendance renvoyée par la fonction interne tendance.

            var final = tendance(this,fourmis,nourriture,coor);

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

        },
        copy: function(erreurs){ // Cette fonction retourne une copie du code de la fourmi avec un certain nombre d'erreurs !
            var result = [];
            for (var etat = 0;etat<3;etat++){
                result[etat] = [];
                for (var type = 0; type < 5; type ++){
                    result[etat][type] = this.code[etat][type];
                }
            }

            // On effectue des erreurs mineures !
            for (var i = 0; i < erreurs;i++){
                result[rnd(3)][rnd(5)] += rnd(31) - 15;
            }
            return result;
        },
        yourTurn: function(bareme,nourriture,coor,fourmis){
            // C'est la fonction qui sert à dire à la fourmi : vas-y joue ton tour !
            var dir = this.chooseDirection(fourmis,nourriture,coor);
            this.move(dir,bareme,nourriture,coor);
        },
        move: function(dir,bareme,nourriture,coor){
            // La fourmi avance dans la direction dir ou ne fait rien si dir == 4
            if (dir == 4) return true;
            var coors = [];
            coors[0] = this.position[0];
            coors[1] = this.position[1];
            var vecteurs = [[0,-1],[1,0],[0,1],[-1,0]];
            coors[0] += vecteurs[dir][0];
            coors[1] += vecteurs[dir][1];
            if (coors[1] < 0 || coors[0] < 0 || coors[0] >= taillePlateau || coors[1] >= taillePlateau){
                this.points += bareme.bonk;
                coors[0] -= vecteurs[dir][0];
                coors[1] -= vecteurs[dir][1];
            }
            
            var bonk = 0;

            var gainFood = 0;
            fourmis.forEach(
                function(e){
                    if (e.getX() == coors[0] && e.getY() == coors[1]) {
                        bonk = 1;
                        if (e.getCarry() == 1){
                            e.looseCarry();
                            gainFood = 1;
                            e.points += bareme.dropBonk;
                        }
                    }
                }
            );

            if (gainFood == 1){
                this.carry = 1;  // La fourmis vole la nourriture.
                this.points += bareme.takeBonk;
            }
            
            if (bonk == 1) {
                this.points += bareme.bonk;                
            }
            else {
                this.position[0] = coors[0];
                this.position[1] = coors[1];
            }

            bonk = 0;
                
            if (this.carry == 0){
                var kill = -1;
                nourriture.forEach(
                    function(e,i){
                        if (e[0] == coors[0] && e[1] == coors[1]){
                            bonk = 1;
                            e[2] -= 1;
                            if (e[2] <= 0) kill = i;
                            /*
                             // On verifie si la nourriture était sur un nid ou non
                             coor.forEach(
                             function(f,j){
                             if (f[0] == coors[0] && f[1] == coors[1]){
                             += bareme.vol;   // La fourmi volée subit des malus
                             }
                             }
                             );
                             */
                        }
                    }
                );
                if (kill != -1) nourriture.splice(kill,1);

            }

            if (bonk == 1) {
                this.carry = 1;
                this.points += bareme.catch;
            }

            if (coor[this.n][0] == coors[0] && coor[this.n][1] == coors[1] && this.carry == 1) {
                this.carry = 0;
                this.points += bareme.deliver;
                // La fourmi a rammené de la nourriture à son nid. La nourriture est donc ajouter à l'emplacement du nid. On ne le fait pas pour le moment.
                //addFood(coors[0],coors[1]);
            }

        }


    }

};

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
