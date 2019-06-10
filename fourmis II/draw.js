var colors = [["rgb(0,0,0)","rgb(100,100,100)"],["rgb(100,0,0)","rgb(180,0,0)"],["rgb(0,100,0)","rgb(0,180,0)"],["rgb(0,0,100)","rgb(0,0,180)"],["rgb(100,100,0)","rgb(180,180,0)"],["rgb(100,0,100)","rgb(180,0,180)"],["rgb(0,100,100)","rgb(0,180,180)"],["rgb(100,100,100)","rgb(180,180,180)"],["rgb(0,0,0)","rgb(100,100,100)"],["rgb(100,0,0)","rgb(180,0,0)"],["rgb(0,100,0)","rgb(0,180,0)"],["rgb(0,0,100)","rgb(0,0,180)"],["rgb(100,100,0)","rgb(180,180,0)"],["rgb(100,0,100)","rgb(180,0,180)"],["rgb(0,0,155)","rgb(0,0,255)"],["rgb(120,120,0)","rgb(220,220,0)"]];

function draw(four){
    // La fonction draw dessine à l'écran la partie sous forme schématique
    // La plupart du temps elle sera inactive lors des entrainements mais pourra servir à montrer les résultats

    if (four == undefined) four = fourmis;

    //console.log("Je vais dessiner.");
    // AFFICHAGE DU QUADRILLAGE
    ctx.fillStyle = "rgb(230,232,230)";
    ctx.fillRect(0,0,W,H);
    ctx.strokeStyle = "rgb(150,150,150)";
    for (var i = 0;i <= W / cases;i ++){
        ctx.beginPath();
        ctx.moveTo(i * cases,0);
        ctx.lineTo(i * cases,H);
        ctx.stroke();
    }
    for (var i = 0;i <= H / cases;i ++){
        ctx.beginPath();
        ctx.moveTo(0,i * cases);
        ctx.lineTo(W,i * cases);
        ctx.stroke();
    }

    // DESSIN DES USINES
    ctx.fillStyle = "rgb(0,0,0)";
    usine.forEach(
        function(e){
            ctx.fillStyle = "rgb(" + (e[2]*40) + ",0,0)";
            ctx.beginPath();
            ctx.moveTo((e[0] + uselessBorder[0] + 0.5) * cases,(e[1] + uselessBorder[1]) * cases);
            ctx.lineTo((e[0] + uselessBorder[0]) * cases,(e[1] + uselessBorder[1] + 1) * cases);
            ctx.lineTo((e[0] + uselessBorder[0] + 1) * cases,(e[1] + uselessBorder[1] + 1) * cases);
            ctx.closePath();
            ctx.fill();
        }
    );
    
    
    // DESSIN DE LA NOURRITURE
    let colory = ["rgb(130,170,70)","rgb(170,70,70)"];
    nourriture.forEach(
        function(ligne,y){
            ligne.forEach(
                function(e,x){
                    if (e[0] != 0){
                        let col = 0;
                        if (e[0] < 0) col = 1;
                        ctx.fillStyle = colory[col];
                        ctx.fillRect( (x + uselessBorder[0]) * cases + 4, (y + uselessBorder[1]) * cases + 4 , cases -8 , cases - 8);
                    }
                }
            );
        }        
    );

    ctx.fillStyle = "rgb(130,170,70)";
    nourrRaf.forEach(
        function(e){
            ctx.beginPath();
            ctx.moveTo((e[0] + uselessBorder[0] + 0.5) * cases,(e[1] + uselessBorder[1] + 0.2) * cases);
            ctx.lineTo((e[0] + uselessBorder[0] + 0.2) * cases,(e[1] + uselessBorder[1] + 0.9) * cases);
            ctx.lineTo((e[0] + uselessBorder[0] + 0.8) * cases,(e[1] + uselessBorder[1] + 0.9) * cases);
            ctx.closePath();
            ctx.fill();
        }
    );

    // DESSIN DES NIDS
    // On utilisera des carrés de la couleurs de la fourmi en plus foncé pour représenter les nids
    // On affichera aussi le score de la fourmi sur son nid. En blanc

    for (let i = bornI;i < bornS;i ++){
        ctx.fillStyle = colors[i][0];
        ctx.fillRect( (coor[i][0] + uselessBorder[0]) * cases , (coor[i][1] + uselessBorder[1]) * cases , cases , cases);
        ctx.fillStyle = "rgb(250,250,250)";
        ctx.font = JSON.stringify(cases/3) + "px serif";
        ctx.fillText(four[i].getPoints(),(coor[i][0] + uselessBorder[0]) * cases , (coor[i][1] + uselessBorder[1] + 1) * cases);
    }
    
    // DESSIN DU BALLON

    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.beginPath();
    ctx.arc((ballon[0] + uselessBorder[0] + 1/2) * cases,(ballon[1] + uselessBorder[1] + 1/2) * cases,cases/3,-Math.PI,Math.PI);
    ctx.closePath();
    ctx.stroke();


    // DESSIN DES FOURMIS

    if (four == undefined) return;
    if (modeJeune){
        for (let id = bornI;id < bornS;id ++){
            fourmis[id].getListe().forEach(
                function(e,j){
                    ctx.drawImage(imgAnt,(e.getX() + uselessBorder[0]) * cases,(e.getY() + uselessBorder[1]) * cases,cases,cases);
                }
            );
        }
    }
    else{
        for (let id = bornI;id < bornS;id ++){
            fourmis[id].getListe().forEach(
                function(e,j){
                    ctx.fillStyle = colors[id][0];
                    ctx.fillRect( (e.getX() + uselessBorder[0]) * cases + cases/4, (e.getY() + uselessBorder[1]) * cases + cases/4, cases / 2 , cases / 2);
                    if (e.getCarry() == 1){
                        if (e.potential == bareme.deliver){
                            ctx.fillStyle = "rgb(130,170,70)";
                            ctx.fillRect( (e.getX() + uselessBorder[0]) * cases + cases/4 + cases/8, (e.getY() + uselessBorder[1]) * cases + cases/4 + cases/8, cases / 4 , cases / 4);
                        }
                        else{
                            ctx.fillStyle = "rgb(130,170,70)";
                            ctx.beginPath();
                            ctx.moveTo((e.getX() + uselessBorder[0] + 0.5) * cases,(e.getY() + uselessBorder[1] + 0.3) * cases);
                            ctx.lineTo((e.getX() + uselessBorder[0] + 0.3) * cases,(e.getY() + uselessBorder[1] + 0.7) * cases);
                            ctx.lineTo((e.getX() + uselessBorder[0] + 0.7) * cases,(e.getY() + uselessBorder[1] + 0.7) * cases);
                            ctx.closePath();
                            ctx.fill();
                        }
                    }
                    ctx.fillStyle = "rgb(250,250,250)";
                    ctx.font = JSON.stringify(cases/3) + "px serif";
                    ctx.fillText(j,(e.getX() + uselessBorder[0]) * cases + cases/4,(e.getY() + uselessBorder[1]) * cases + 3*cases/4);
                    let tendency = e.tendance(fourmis,nourriture,coor,ballon);
                    /*
                    ctx.beginPath();
                    ctx.moveTo((e.getX() + uselessBorder[0] + 1/2)*cases,(e.getY() + uselessBorder[1] + 1/2) * cases);
                    ctx.lineTo((e.getX() + uselessBorder[0] + 1/2 + tendency[0]/50)*cases,(e.getY() + uselessBorder[1] + 1/2 + tendency[1]/50) * cases);
                    ctx.strokeStyle = "rgb(0,0,0)";
                    ctx.stroke();
                    */
                }
            );
        }
    }

    // AFFICHAGE DES RÉSUMÉS DE CODE
    let coorD = [mouse[0] - uselessBorder[0] * cases,mouse[1] - uselessBorder[1] * cases];
    coorD = [Math.floor(coorD[0] / cases),Math.floor(coorD[1] / cases)];
    for (let id = bornI;id < bornS;id ++){
        fourmis[id].getListe().forEach(
            function(e,j){
                if (e.isHere(coorD[0],coorD[1])){
                    afficheResume(e.getCodeResume(),coorD,e.tendance(fourmis,nourriture,coor,ballon),e.getX(),e.getY());
                }
            }
        );
    }
    
    // AFFICHAGE DES COURBES DES DIFFÉRENTES FOURMIS SUR LES BORDS (UNIQUEMENT EN MODE STALINE)
    if (modeStaline){
        drawCourbeLat();
    }

    /*
     // AFFICHAGE DE LA COURBE DES POINTS

     ctx.fillStyle = "rgb(255,255,255)";
     ctx.fillRect(5,5,W-10,H-10);
     ctx.stokeStyle = "rgb(0,0,0)";
     ctx.lineWidth = 2;
     ctx.beginPath();
     ctx.moveTo(5,l[0] + H/2);
     //console.log(l);
     try{
     var max = 5000;
     var taille = l.length;
     taille = (W-10)/taille;
     //console.log(l);
     l.forEach(
     function(e,i){
     ctx.lineTo(5 + taille*i,(-e/100 + H/2));
     }
     );
     //ctx.closePath();
     ctx.stroke();
     } catch(e){console.log("ERREUR");}
     */
}

function findMiMa(liste){
    let max = liste[0];
    let min = liste[0];
    for (let i=0; i < liste.length; i ++){
        if (liste[i] > max) max = liste[i];
        if (liste[i] < min) min = liste[i];
    }
    return [min,max];
}

function drawGraph(liste,ord,pan){
    console.log("dessin du graphe !");
    let minMax = findMiMa(liste);
    let carreau = cases/3;
    let interX = (W - 10) / liste.length;
    let interY = (H - 60) / (minMax[1] - minMax[0]);
    
    // AFFICHAGE DU QUADRILLAGE
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    ctx.strokeStyle = "rgb(50,50,50)";
    for (var i = 0;i <= W / carreau;i ++){
        ctx.beginPath();
        ctx.moveTo(i * carreau,0);
        ctx.lineTo(i * carreau,H);
        ctx.stroke();
    }
    for (var i = 0;i <= H / carreau;i ++){
        ctx.beginPath();
        ctx.moveTo(0,i * carreau);
        ctx.lineTo(W,i * carreau);
        ctx.stroke();
    }
    ctx.strokeStyle = "rgb(250,250,250)";
    ctx.moveTo(5,H - (liste[0] - minMax[0]) * interY - 55);
    liste.forEach(
        function(e,i){
            ctx.lineTo(i * interX + 5,H - (e - minMax[0]) * interY - 55);
        }
    );
    ctx.stroke();

    ctx.fillStyle = "rgb(200,200,200)";
    ctx.font = "20px serif";
    ctx.fillText("Min : " + minMax[0] + "; Max : " + minMax[1] + "; Abs : gen; Ord : " + ord + "; nGen : " + nGeneration + "; Wave : " + waveSize  + "; teamN : " + teamN + "; membN : " + membN + "; Manches : " + nManche +"; Error : " + error + "; Panel : " + pan ,0,H - 25);
    
}

function drawMessage(msg){
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.font = "20px serif";
    ctx.fillText(msg,0,H - 25);
}

function drawCourbeLat(){
    let code = fourmis[bornI].getCode(); // Ok là on a une liste de tous les codes qu'il va falloir afficher sur le côté de l'écran.
    const data = 4; // On affiche les 4 courbes suivantes dans l'ordre : nourriture  ennemie  nid  ballon  pour chaque fourmi... ce qui fait data*code.length courbes.
    // On peut en faire rentrer deux côte à côte. Donc 4 sur chaque ligne. A gauche on mettra nourriture  ennemie  et à droite nid  ballon Peut-être avec un peu de texte pour aider à comprendre.
    const tailleX = (uselessBorder[0] * 2 * cases) / data;
    const tailleY = Math.min(H / code.length,tailleX);

    // AFFICHAGE DU QUADRILLAGE
    let carreau = cases/3;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    /*
    ctx.strokeStyle = "rgb(50,50,50)";
    for (var i = 0;i <= W / carreau;i ++){
        ctx.beginPath();
        ctx.moveTo(i * carreau,0);
        ctx.lineTo(i * carreau,H);
        ctx.stroke();
    }
    for (var i = 0;i <= H / carreau;i ++){
        ctx.beginPath();
        ctx.moveTo(0,i * carreau);
        ctx.lineTo(W,i * carreau);
        ctx.stroke();
    }
     */
    
    //for (let y = 0;y < code.length;y++){
    if (seenAnt < 0) seenAnt = 0;
    else if (seenAnt >= code.length) seenAnt = code.length - 1;
    for (let x = 0; x < data; x++){
        drawVision(10 + (W/2) * (x%2) ,10 + (H/2) * Math.floor(x/2),W/2 - 20,H/2 - 20,code[seenAnt][x*2],code[seenAnt][x*2+1],["ennemi","nourriture","nid","ballon"][x]);
    }
}

function drawVision(x,y,tx,ty,vA,vB,name){
    let listA = [];
    ty -= 30;
    for (let i = 0;i < taillePlateau;i++){
        listA[i] = fonctionVision(i,vA);
    }
    let listB = [];
    for (let i = 0;i < taillePlateau;i++){
        listB[i] = fonctionVision(i,vB);
    }
    let minMaxA = findMiMa(listA);
    let minMaxB = findMiMa(listB);
    const minMax = [Math.min(minMaxA[0],minMaxB[0]),Math.max(minMaxA[1],minMaxB[1])];;
    const scaleX = tx/taillePlateau;
    const scaleY = ty/(minMax[1] - minMax[0]);
    // Axe des abcisses
    if (minMax[0] * minMax[1] <= 0){
        ctx.strokeStyle = "rgb(250,250,250)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x,y + ty + minMax[0] * scaleY);
        ctx.lineTo(x+tx,y + ty + minMax[0] * scaleY);
        ctx.stroke();
    }
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(250,0,0)";
    ctx.beginPath();
    ctx.moveTo(x,y + ty - (fonctionVision(0,vA) - minMax[0])*scaleY);
    for (let i = 1;i < taillePlateau;i++){
        ctx.lineTo(x + i*scaleX,y + ty - (fonctionVision(i,vA) - minMax[0])*scaleY);
    }
    ctx.stroke();
    
    ctx.strokeStyle = "rgb(0,0,250)";
    ctx.beginPath();
    ctx.moveTo(x,y + ty - (fonctionVision(0,vB) - minMax[0])*scaleY);
    for (let i = 1;i < taillePlateau;i++){
        ctx.lineTo(x + i*scaleX,y + ty - (fonctionVision(i,vB) - minMax[0])*scaleY);
    }
    ctx.stroke();
    ctx.fillStyle = "rgb(200,200,200)";
    ctx.font = "15px serif";
    ctx.fillText("Min : " + minMax[0] + "; Max : " + minMax[1] + "; Value : " + name + "; Fourmi : " + seenAnt + "; Rouge : sans ;Bleu : avec" ,x,y + ty + 20);

}

function fonctionVision(n,code){
    var r = code[0] * n * n + code[1] * n + code[2];
    //var r = code[1] * n + code[2];
    r = Math.min(r,code[3]);
    r = Math.max(r,code[4]);
    return r;
};

function afficheResume(code,coorr,tendance,x,y){
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,cases*5,cases*7);
    ctx.font = (cases/2) + "px serif";

    let colors = ["rgb(255,255,255)","rgb(255,255,50)","rgb(255,170,0)","rgb(255,0,0)"];
    
    let textes = ["en","no","ni","ba","n+","uR","uA"];

    for(let i = 0;i < code.length;i +=4){
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillText(textes[Math.round(i/4)],0,cases*(i/4 + 1/2));
        for(let j = 0; j < 4; j ++){
            ctx.fillStyle = colors[Math.abs(code[i+j])];
            ctx.fillText(code[i + j],cases*(1 + j),cases*(i/4 + 1/2));
        }
    }
    ctx.beginPath();
    ctx.moveTo((x + uselessBorder[0] + 1/2)*cases,(y + uselessBorder[1] + 1/2) * cases);
    ctx.lineTo((x + uselessBorder[0] + 1/2 + tendance[0]/50)*cases,(y + uselessBorder[1] + 1/2 + tendance[1]/50) * cases);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.stroke();
}
