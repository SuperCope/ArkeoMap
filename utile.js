function syncDelay(milliseconds){
    var start = new Date().getTime();
    var end=0;
    while( (end-start) < milliseconds){
        end = new Date().getTime();
    }
}
async function recvPieces(){

    let response = await fetch("http://merome.net3124/api/pieces")


    if(response.status != 200){
        cuteToast({
            type: "error",
            message: "Etat "+response.status+" : "+"Problème de connexion : pièces non trouvées"+" ("+response.statusText+")",
            timer: 1555000
        })
    }else{
        let json = await response.json();    
        let piecesRecues2 = json
        if(!piecesRecues || piecesRecues2.length !=piecesRecues.length){
            piecesRecues = piecesRecues2
            affichePieces()
        }
    }
}   
async function connexionPartie(){

    let idPartie = (window.sessionStorage["idPartie"])
    let response = await fetch("http://merome.net3124/api/parties/"+idPartie)

    if(response.status != 200){
        cuteToast({
            type: "error",
            message: "Etat "+response.status+" : "+"Problème de connexion : partie "+idPartie+" non trouvée"+" ("+response.statusText+")",
            timer: 1555000
        })
    }else{
        let json = await response.json();
        partie = new Partie(json.id,json.nbJoueurs,json.joueurs,json.phase,json.pieces,json.points,json.nbTraits)
        joueurs = partie.joueurs
    }

    let idJoueur = (Number(window.sessionStorage["idJoueur"]))
    console.log(idJoueur)

    joueur = partie.findJoueur(idJoueur)





}
async function recvPartie(){

  
    let response = await fetch("http://merome.net3124/api/parties/"+partie.id)
    


    if(response.status != 200){
       cuteToast({
            type: "error",
            message: "ERROR "+response.status,
            timer: 1555000
        })
    }else{ 
        let json = await response.json();  
        // console.log(json.joueurs[0].pieces[0].pos)
          
        if(json.nbJoueurs != partie.nbJoueurs){
            partie = new Partie(json.id,json.nbJoueurs,json.joueurs,json.phase,json.pieces,json.points,json.nbTraits);
            partie.update()
        }
        

    }
}