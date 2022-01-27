let nbFormes = parseInt(2) // Entre 15 et 35
let pointsForme = [[]]
let xMax = []
let yMax = []
let reperes = []
let reperesBase = []
let reperesImgs = []
let nbReperesMax = 6
let nbReperesBase = 2
let types = ["crevasse","pont","tour","fort","grotte","cabanon"]
let max = -1;
let find = false
let coordsSearchCircles = []
let coordsSearchCirclesRecents = []
var searchCircles = []
let nbFindGood = 0

for(let idForme = 0;idForme<nbFormes;idForme++){
    let nbPoints = 140 // Entre 15 et 30
    let xPointRef = 150;
    let yPointRef = 100;

    pointsForme[idForme] = []
    pointsForme[idForme][0] = [xPointRef,yPointRef]
    xMax[idForme] = 0
    yMax[idForme] = 0
    for(let idPoint = 1;idPoint<nbPoints;idPoint++){
        let xPoint;
        let yPoint;

        if(idPoint > nbPoints*0.75){
            xPoint = xPointRef + Math.random() * (20 - (-20)) -20;
            yPoint = yPointRef + Math.random() * (-15 + 7) - 7;
        }
        else if(idPoint > nbPoints*0.5){
            xPoint = xPointRef + Math.random() * (-20 + 15) - 15;
            yPoint = yPointRef + Math.random() * (20 - (-10)) -10;
        }
        else if(idPoint > nbPoints*0.25){
            xPoint = xPointRef + Math.random() * (20 - (-20)) -20;
            yPoint = yPointRef + Math.random() * (8 - 7) + 7;
        }
        else if(idPoint > 0){
            xPoint = xPointRef + Math.random() * (20 - 15) + 15;
            yPoint = yPointRef + Math.random() * (20 - (-20)) -20;
        }

        xPointRef = xPoint;
        yPointRef = yPoint;
        pointsForme[idForme][idPoint] = [xPoint,yPoint]
        if(xPoint > xMax[idForme]){
            xMax[idForme] = xPoint
        }
        if(yPoint > yMax[idForme]){
            yMax[idForme] = yPoint
        }
    }

}
let images = []
const maps = []
let toHide = []
let toDiscover = []
var canvas = document.getElementById('puzzle');
let repere = document.getElementById("repere")
let inaugu = document.getElementById("inaugu")
let searchCircle = document.getElementById("searchCircle")
let searchCircle2 = document.getElementById("searchCircle2")
let searchDepouille = document.getElementById("searchDepouille")
let boussole = document.getElementById("boussole")

start()

function start(){


    document.getElementById("searchCircle").style.display = "none"
    document.getElementById("searchCircle2").style.display = "none"
    document.getElementById("searchDepouille").style.display = "none"
    document.getElementById("boussole").style.display = "none"

    for(let i = 0;i<types.length;i++){
        reperesImgs[i] = document.getElementById("repere"+i)
        document.getElementById("repere"+i).remove()
        searchCircles[i] = document.getElementById("searchRepere|"+types[i])
        document.getElementById("searchRepere|"+types[i]).remove()
    }
    console.log(searchCircles)

    ctx = canvas.getContext('2d')

    
    ctx.lineCap  ='round'
    ctx.canvas.width = 1100;
    ctx.canvas.height = 850;
    ctx.lineWidth = 15
    ctx.strokeStyle="black"
    





    
    
    
    ctx.stroke();


    

    canvas.addEventListener('click', function(event) {
        let xDeb = event.pageX  - 50
        let xFin = event.pageX  + 50
        let yDeb = event.pageY - 50
        let yFin = event.pageY + 50
        console.log(event.pageX,event.pageY)
        searchRepere(xDeb,xFin,yDeb,yFin)

    });

    for(let i = 0;i<32;i++){
        images[i] = document.getElementById("image"+i)
        images[i].addEventListener('load', function() {
            if(i==1){
                creationCarte(ctx)
            }
        }, false);
        images[i].addEventListener('error', function(){
            alert("ERREUR !")
        });
        document.getElementById("image"+i).remove()

    }

}
lancementCarte()
function lancementCarte(){
    setInterval(function(){
        if(lancement == 1){
            creationReperes(reperes,nbReperesMax)
            creationReperes(reperesBase,nbReperesBase)
            creationCarte(ctx)
            scanModeForm()
            lancement = 0
        }
    },1000)

}
function searchRepere(xDeb,xFin,yDeb,yFin){



    if(modeCursor==1){
        coordsSearchCirclesRecents.push([xDeb+50,yDeb,cursorRepere])
        console.log(searchCircles)
        document.getElementById("puzzle").getContext("2d").drawImage(searchCircles[cursorRepere], (xDeb+50),(yDeb));


    }
    if(modeCursor==2){
        coordsDepouilles.push([xDeb+33,yDeb+33])
        document.getElementById("puzzle").getContext("2d").drawImage(searchDepouille, (xDeb+50),(yDeb));

    }
    yDeb-=30
    yFin-=30
    xDeb+=8
    xFin+=8
    console.log("TU AS CLIQUE ENTRE "+xDeb+","+xFin+" | "+yDeb+","+yFin)
    console.log("BAISSE")

    if(modeCursor == 1){
        for(let i = 0;i<reperes.length;i++){
            console.log(reperes[i])
            if(reperes[i][0] > xDeb && reperes[i][0] < xFin && reperes[i][1] > yDeb && reperes[i][1] < yFin){
                console.log("OK"+types[reperes[i][2]])
       
                
    
                if(!toDiscover[i]){
                    find = true
                    toDiscover[i] = true
                    if(cursorRepere==reperes[i][2]){
                        toDiscover[i] = [true,true]
                    }else{
                        toDiscover[i] = [true,false]
                    }            
                }
    
            }
        }
    }




}
function searchZoneChoisie(mode){
    console.log("REFRESH")
    // Check whether point is inside circle
    let nbCouches = 0;
    for(i = 0;i<nbFormes;i++){
        if (ctx.isPointInPath(maps[i], event.offsetX, event.offsetY)) {
            nbCouches++

            if(i > max && !toHide[i]){
                max = i;
            }
        }
        else {
            ctx.fillStyle = 'red';
        }
    }
    let idZoneToHide = max
    if(mode==0){

    }else{
        toDiscover[idZoneToHide]  =true
    }
    console.log(max)


}
function creationCarte(ctx2,aAfficher,mode){
    nbFindGood = coordsSearchCirclesRecents.length * -1
    if(mode==""){
        mode = "A"
    }
    if(!mode){

        for(let i = 0;i<coordsSearchCirclesRecents.length;i++){
            coordsSearchCircles.push(coordsSearchCirclesRecents[i])
        }
        coordsSearchCirclesRecents = []
    }


    let other = false
    if(ctx2){
        ctx = ctx2

        other = true
        console.log("NOUVELLE CARTE")
        console.log(aAfficher)
    }
    ctx.font = '48px serif';

    
    for(let i = 0;i<nbFormes;i++){

        if(!toHide[i]){


            pattern = ctx.createPattern(images[i%2], '');

            console.log("PATTERN")
            console.log(images)
            console.log(pattern)
            maps[i] = new Path2D();
            maps[i].moveTo(parseInt(pointsForme[i][0][0]), parseInt(pointsForme[i][0][1]));
            
            for(let j = 1;j<pointsForme[i].length;j++){
            
                if(pointsForme[i][j+1]){
                    // console.log("OK"+pointsForme[i][j][0])
                    maps[i].lineTo(pointsForme[i][j+1][0], pointsForme[i][j+1][1]);
                }
            
            
            
            }
            

            ctx.fillStyle = pattern;
            

            if(ctx.fillStyle=="#000000"){
                console.log("ERROR")
                
            }

            


            ctx.fill(maps[i]);
            


        }

    }

    for(let i = 0;i<nbReperesMax;i++){

        if((toDiscover[i]) || (aAfficher && aAfficher.indexOf(reperes[i][2])>-1)){

            
            if(aAfficher && aAfficher.indexOf(reperes[i][2])>-1){

                console.log(aAfficher)
                if(aAfficher[0]== 0 && aAfficher[1]==4){
                    ctx.drawImage(reperesImgs[reperes[i][2]], reperes[i][0],reperes[i][1] );
                }else{
                    let affiche = false
                    for(let k = 0;k<aAfficher.length;k++){
                        if(aAfficher[k]==reperes[i][2]){
                            affiche = true
                        }
                    }
                    
                    if((mode=="A" || mode=="AB") && (toDiscover[i])  && affiche){

                        ctx.drawImage(reperesImgs[reperes[i][2]], reperes[i][0],reperes[i][1]);
                    }else if(mode!="A" && mode !="B" && mode!="AB"){
                        ctx.font = "bold 20px Arial"
                        ctx.fillStyle = "black"
                        ctx.fillText(dates[i],reperes[i][0]+5,reperes[i][1]+70)
                        
                        ctx.drawImage(inaugu, reperes[i][0],reperes[i][1]);
                    }

                }
                
            }else if(mode!="A" && mode!="B" && mode!="AB"){

                ctx.drawImage(reperesImgs[reperes[i][2]], reperes[i][0],reperes[i][1] );
            }

        }
        if(toDiscover[i] && toDiscover[i][1]){
            var audio = new Audio('./audio/victoire.mp3')
            audio.play
            toDiscover[i] = [true,false]
            nbFindGood+=2
        }

    }
    for(let i = 0;i<coordsDepouilles.length;i++){
    
        ctx.drawImage(searchDepouille,coordsDepouilles[i][0],coordsDepouilles[i][1])
    
    }

    for(let i = 0;i<coordsSearchCirclesRecents.length;i++){
                
        ctx.drawImage(searchCircle,coordsSearchCirclesRecents[i][0],coordsSearchCirclesRecents[i][1])
            
    }
    if(mode=="B" || mode=="AB"){

        for(let i = 0;i<coordsSearchCircles.length;i++){
            ctx.drawImage(searchCircle2,coordsSearchCircles[i][0],coordsSearchCircles[i][1])
        }
        



    }
    let boutons = []
    boutons[0] = document.createElement("div")
    boutons[0].style.backgroundColor = "green"
    boutons[0].innerText = "OK"
    boutons[0].style.boxShadow = "0px 0px 2px 0px lightgreen"
    boutons[0].setAttribute("class","boutonPopUp")
    boutons[0].onclick = function(){
        while(document.getElementById("divPopUp").childElementCount > 0){
            document.getElementById("divPopUp").lastChild.remove()
        }
        document.getElementById("divPopUp").style.display = "none"
        var audio = new Audio('./audio/button.mp3')
        audio.play()
    }

    if(mode != "A" && mode != "B" && mode!="AB"){
        if(!find && mode != "A" && mode != "B" && mode!="AB"){
            console.log("EH BOH")
            if(modeCursor==1 || modeCursor == 2){
                  
                setTimeout(function(){
                    var audio = new Audio('./audio/echec.mp3')
                    audio.play()
                },0)
                creationPopUp("Aucun repère trouvé","Il semblerait que les fouilles n'aient rien donné... \n Consultez les documents mis à votre disposition à nouveau.",boutons,"#map",0,1500)
            
                
                


 
            }

        }else if((modeCursor == 1 || modeCursor == 2) && find) {
 
    
    
    
            
            var audio = new Audio('./audio/victoire.mp3')
            audio.play()
            creationPopUp("Repère trouvé !!","Vous avez trouvé un/des repère(s) !",boutons,"#map",1,1500)
            find = false


            if(nbFindGood > 0){
                setTimeout(function(){
                    creationPopUp("Gain de réputation (+"+nbFindGood+")","Vous gagnez en réputation grâce à vos estimations correctes",boutons,"#map",2,1500,nbFindGood)
                    var audio = new Audio('./audio/victoire2.mp3')
                    audio.play()
                },5000)
               
            }else{

            }
            
        }
    }


    for(let i = 0;i<nbReperesBase;i++){
            if((reperesBase[i] && ctx2 && canvas==ctx2.canvas) || (ctx2 && aAfficher && aAfficher.indexOf(reperesBase[i][2])>-1)){
                
                if(aAfficher && aAfficher.indexOf(reperesBase[i][2])>-1){
                    if(aAfficher[0]== 0 && aAfficher[1]==4){
                        ctx.drawImage(reperesImgs[reperesBase[i][2]], reperesBase[i][0],reperesBase[i][1] );

                    }else{
                        let affiche = false
                        for(let k = 0;k<aAfficher.length;k++){
                            if(aAfficher[k]==reperesBase[i][2]){
                                affiche = true
                            }
                        }

                        if((mode=="A" || mode=="AB") && affiche){

                            ctx.drawImage(reperesImgs[reperesBase[i][2]], reperesBase[i][0],reperesBase[i][1]);
                        }else if(mode!="A" && mode !="B" && mode!="AB"){
                            ctx.font = "bold 20px Arial"
                            ctx.fillStyle = "black"
                            ctx.fillText(dates[i],reperesBase[i][0]+5,reperesBase[i][1]+70)
                            
                            ctx.drawImage(inaugu, reperesBase[i][0],reperesBase[i][1]);
                        }
                        
                        
                    }
                }else if(mode!="A" && mode!="AB" && mode!="B"){
                    ctx.drawImage(reperesImgs[reperesBase[i][2]], reperesBase[i][0],reperesBase[i][1] );
                }
                
            }
            
    }
    
    
    console.log("NB FIND GOOD : "+nbFindGood)
    if(nbFindGood < 0 && (modeCursor==1 || modeCursor == 2)){
        let nbErreurs = nbFindGood
        setTimeout(function(){
            console.log("OK")
            creationPopUp("Perte de réputation ("+nbErreurs+")","Vous perdez en réputation grâce à vos cause de l'imprécision de vos estimations",boutons,"#map",3,1500,nbErreurs)
            var audio = new Audio('./audio/defaite.mp3')
            audio.play()
        },5000)
        nbFindGood = 0
    }

    console.log(ctx.canvas.toDataURL())
    ctx.drawImage(boussole, 600,570);
    for(let i = 0;i<reperes.length;i++){
        if(toDiscover[i] && toDiscover[i][0]){
            toDiscover[i] = [false,toDiscover[i][1]]
        }
    }

}

function creationReperes(reperesB,nbReperesMax){
    let j = 0
    while(reperesB.length<nbReperesMax){
        if(reperesB.length < nbReperesMax && !reperesB[j]){
            

            if(reperesB.length == 0){
                let id = parseInt(Math.random()*types.length)
                let val = [parseInt(Math.random() * (600 - (250)) +250),parseInt(Math.random() * (500 - (70)) +70),id]
                reperesB[j] = val
                
                j++
            }else{
                let taille = reperes.length
                let ok = true
                let val = -1
                let x = parseInt(Math.random() * (650 - (250)) +250)
                let y = parseInt(Math.random() * (410 - (100)) +100)
                let id = parseInt(Math.random()*types.length)
                
                for(let i = 0;i<taille;i++){
                    val = [x,y,id]
                    if((i!=j) && (Math.abs(reperes[i][0]-x) < 30) || (Math.abs(reperes[i][1]-y) < 30)){
                        console.log("REF : "+j)
                        console.log("DEST : "+i)
                        console.log(reperes[0])
                        console.log(reperes[1])
                        console.log(x,y)
                        ok = false

                        break
                    }
 
                }

                if(ok){

                    reperesB[j] = val
                    j++
                }
            }


        }

    }

}
