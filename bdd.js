function getPartie(id){
    // console.log("RECUPERATION")
    let p = new Partie();
    p.id =id;
    let options = {
        method: 'GET',
    };
    let url = 'http://merome.net3124/api/parties/'+id;
    fetch(url, options).then(function(response){

        return response.json().then(function(json) {
		let typeMsg = displayResRequete(response.status)[0]
		let msg = displayResRequete(response.status)[1]
		let title = "Connexion à la partie"
		if(typeMsg=="error" || typeMsg=="warning"){
			cuteToast({
				type: typeMsg,
				message: "Etat "+title+" : "+msg+" ("+response.status+")",
				timer: 5000
			})
			if(typeMsg=="error"){
				document.location.href = "authentif.html";
			}
		}
            partie = new Partie(json.id,json.nbJoueurs,json.joueurs,json.points,json.taillePoints,json.phase,json.evaluation)
            gameDisplayer.displayPoints()
        });
    })


}

function updatePositionSourisJoueur(x,y){
    for(let i = 0;i<partie.joueurs.length;i++){
        if(partie.joueurs[i].id == idJoueur){
            partie.joueurs[i].x =x
            partie.joueurs[i].y =y
        }
    }

    let url = 'http://merome.net3124/api/parties/'+(window.sessionStorage["idPartie"]);
    let data = {
        id: partie.id,
        joueurs: partie.joueurs,
        nbJoueurs: partie.nbJoueurs,
        taillePoints: partie.taillePoints,
        points: partie.points
    };
    // Les options de la requete
    let options = {
        method: 'PATCH',
        body: JSON.stringify(data)

    };
    fetch(url, options)
	.then(function (response) {
			
			let typeMsg = displayResRequete(response.status)[0]
			let msg = displayResRequete(response.status)[1]
			let title = "Mise à jour de la position des joueur"
			if(typeMsg=="error" || typeMsg=="warning"){
				cuteToast({
					type: typeMsg,
					message: "Etat "+title+" : "+msg+" ("+response.status+")",
					timer: 5000
				})
				if(typeMsg=="error"){
					document.location.href = "authentif.html";
				}
			}
		        return response.json()
		    })

}

function connexionJoueur(infosJoueur){

    let options = {
        method: 'GET',
    };
    let url = 'http://merome.net3124/api/joueurs/';

    fetch(url, options).then(function(response){


		
		let typeMsg = displayResRequete(response.status)[0]
		let msg = displayResRequete(response.status)[1]
		let title = "Connexion"
		if(typeMsg=="error" || typeMsg=="warning"){
			cuteToast({
				type: typeMsg,
				message: "Etat "+title+" : "+msg+" ("+response.status+")",
				timer: 5000
			})
		}
	    
        return response.json().then(function(json) {
            for(let i = 0;i<json.length;i++){
                let joueurBdd = json[i];
                if(joueurBdd.pseudo == infosJoueur.pseudo && joueurBdd.password == infosJoueur.password){
                    window.sessionStorage["idJoueur"] =  joueurBdd.id
                    joueurCree = new Joueur(-1,-1,-1,-1,"","",15)
                    joueurCree.id = joueurBdd.id;
                    joueurCree.x = joueurBdd.x;
                    joueurCree.y = joueurBdd.y;
                    joueurCree.pseudo = joueurBdd.pseudo;
                    joueurCree.password = joueurBdd.password;
                    joueurCree.idPartie = joueurBdd.idPartie;

                    displayChoixPartie();
                }
            }
		cuteToast({
		  type: "info",
		  title: "Inscription",
		  message: "Bienvenu "+joueurCree.pseudo+" !",
		  timer: 2000
		})

        });
    })
}
function getJoueur(id){
    options = {
        method: 'GET',
    };
    url = 'http://merome.net3124/api/joueurs/'+id;
    fetch(url, options)
	.then(function (response) {
			
			let typeMsg = displayResRequete(response.status)[0]
			let msg = displayResRequete(response.status)[1]
			let title = "Recherche du joueur "+id
			if(typeMsg=="error" || typeMsg=="warning"){
				cuteToast({
					type: typeMsg,
					message: "Etat "+title+" : "+msg+" ("+response.status+")",
					timer: 5000
				})
				if(typeMsg=="error"){
					document.location.href = "authentif.html";
				}
			}
		        return response.json()
		    })

        .then(function (json) {
            joueur.id = json.id;
            joueur.pseudo = json.pseudo;
            joueur.idPartie = json.idPartie;
            joueur.password = json.password;
            joueur.x= json.x;
            joueur.y = json.y;
            // Utiliser notre objet JSON
        })
        .catch(err => {
            console.error('IMPOSSIBLE DE TROUVER LE JOUEUR');
        })
}
function getJoueursPartie(){

    let options = {
        method: 'GET',
    };
    let url = 'http://merome.net3124/api/parties/';

    fetch(url, options).then(function(response){
		
		let typeMsg = displayResRequete(response.status)[0]
		let msg = displayResRequete(response.status)[1]
		let title = "Recherche des joueurs de la partie"
		if(typeMsg=="error" || typeMsg=="warning"){
			cuteToast({
				type: typeMsg,
				message: "Etat "+title+" : "+msg+" ("+response.status+")",
				timer: 5000
			})
			if(typeMsg=="error"){
				document.location.href = "authentif.html";
			}
		}
		    

        return response.json().then(function(json) {
            json = json[idPartie - 1];
            for(let i = 0;i<json.joueurs.length;i++){
                let souris = null;


                if(json.joueurs[i].id != Number(joueur.id)){
                    if(document.getElementById("souris"+json.joueurs[i].id)){
                        souris = document.getElementById("souris"+json.joueurs[i].id);
                    }else{
                        souris = document.createElement("img");
                    }
                    souris.style.left = json.joueurs[i].x+"px";
                    souris.style.top = (json.joueurs[i].y)+"px";
                    souris.style.height = "40px";
                    souris.style.width = "40px";
                    souris.style.position = "absolute";
                    souris.setAttribute("id","souris"+json.joueurs[i].id)
                    souris.setAttribute("class","souris");
                    souris.setAttribute("src","img/souris"+gameDisplayer.couleursSouris[i]+".png");
                    if(json.joueurs[i].id != joueur.id && !(document.getElementById("souris"+json.joueurs[i].id)) && (json.joueurs[i].gadget != 1 || joueur.gadget == 1)){
                        document.getElementById("jeu").appendChild(souris);
                    }
                }else{
                    joueur.couleur = gameDisplayer.couleursSouris[i];
                    document.getElementById("jeu").style.cursor = "url('./img/souris"+joueur.couleur+".png'),default"
                }




            }
        });
    })
}


