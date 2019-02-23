var colors = [["rgb(0,0,0)","rgb(100,100,100)"],["rgb(100,0,0)","rgb(180,0,0)"],["rgb(0,100,0)","rgb(0,180,0)"],["rgb(0,0,100)","rgb(0,0,180)"],["rgb(100,100,0)","rgb(180,180,0)"],["rgb(100,0,100)","rgb(180,0,180)"],["rgb(0,100,100)","rgb(0,180,180)"],["rgb(100,100,100)","rgb(180,180,180)"]];

function draw(l,four){
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

    // DESSIN DE LA NOURRITURE
    ctx.fillStyle = "rgb(130,170,70)";
    nourriture.forEach(
        function(e){
            ctx.fillRect( (e[0] + uselessBorder[0]) * cases + 4, (e[1] + uselessBorder[1]) * cases + 4 , cases -8 , cases - 8);
        }
    );
    
    // DESSIN DES NIDS
    // On utilisera des carrés de la couleurs de la fourmi en plus foncé pour représenter les nids
    // On affichera aussi le score de la fourmi sur son nid. En blanc
    coor.forEach(
        function(e,i){
            ctx.fillStyle = colors[i][0];
            ctx.fillRect( (e[0] + uselessBorder[0]) * cases , (e[1] + uselessBorder[1]) * cases , cases , cases);
            ctx.fillStyle = "rgb(250,250,250)";
            ctx.font = "20px serif";
            ctx.fillText(four[i].getPoints(),(e[0] + uselessBorder[0]) * cases , (e[1] + uselessBorder[1] + 1) * cases);
        }
    );


    // DESSIN DES FOURMIS
    if (four == undefined) return;
    four.forEach(
        function(e,i){
            ctx.fillStyle = colors[i][0];
            ctx.fillRect( (e.getX() + uselessBorder[0]) * cases + cases/4, (e.getY() + uselessBorder[1]) * cases + cases/4, cases / 2 , cases / 2);
            if (e.getCarry() == 1){
                ctx.fillStyle = "rgb(130,170,70)";
                ctx.fillRect( (e.getX() + uselessBorder[0]) * cases + cases/4 + cases/8, (e.getY() + uselessBorder[1]) * cases + cases/4 + cases/8, cases / 4 , cases / 4);
            }
        }
    );

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
