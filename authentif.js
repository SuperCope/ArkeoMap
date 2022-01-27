let joueurCree;
let partieCree;
let parties;

function validFormInscription(){
    if(document.getElementById("connexionBtn")){
        document.getElementById("connexionBtn").remove();
    }
    joueurCree = new Joueur(800,800,-1,-1,(document.getElementById("mdpJoueur").value),(document.getElementById("pseudoJoueur").value),15,[]);
    joueurCree.create();
    initForm()
    document.getElementById("validForm").setAttribute("onclick","validFormAuthentif()");

}
function initForm(){
    if(document.getElementById("connexionBtn")){
        document.getElementById("connexionBtn").remove();
    }
    document.getElementById("titreFormAuthentif").innerText = "Connexion";
    document.getElementById("pseudoJoueur").value = "";
    document.getElementById("mdpJoueur").value = "";
}

function validFormAuthentif(){
    let joueur  = new Joueur();
    joueur.pseudo = document.getElementById("pseudoJoueur").value;
    joueur.password = document.getElementById("mdpJoueur").value;
    connexionJoueur(joueur)
}

function displayChoixPartie(){
    let divTitreChoixParties = document.createElement("h1");
    divTitreChoixParties.innerText = "Choisissez une partie à rejoindre :";
    if(document.getElementById("formAuthentif")){
        document.getElementById("formAuthentif").remove();
    }
    let divChoixParties = document.createElement("div");
    getParties();
    setTimeout(function () {
        cuteToast({
            type: "warning",
            message: "Chargement des parties en cours...",
            timer: 1000
        })
        for (let i = 0; i < parties.length; i++) {
            let partieInfo = new Partie(parties[i].id,parties[i].nbJoueurs,parties[i].joueurs,parties[i].phase,parties[i].pieces,parties[i].points,parties[i].nbTraits);
            let divPartie = document.createElement("div");
            divPartie.innerText = partieInfo.id+ " | "+ partieInfo.nbJoueurs + " joueurs";
            divPartie.onclick = function () {
                window.sessionStorage["idPartie"] =  partieInfo.id;
                cuteToast({
                    type: "warning",
                    message: "Connexion en cours...",
                    timer: 3000
                })
                setTimeout(function (){

                    partieCree = new Partie(-1,0,[],[],0,0,0,[],[],0);
                    partieCree = partieInfo;
                    partieInfo.ajoutJoueur(joueurCree)


                    // Ancien emplacement du petit setTimeout
                    cuteToast({
                        type: "warning",
                        message: "Chargement en cours...",
                        timer: 3000
                    })
                },3000)
                setTimeout(function (){
                    cuteToast({
                        type: "warning",
                        message: "Accès à la partie...",
                        timer: 6000
                    })
                    document.location.href = "index.html";
                },6000)

            }
            divChoixParties.appendChild(divPartie)
        }
        document.body.appendChild(divChoixParties);

    },3000)

    let btnCreatePartie = null;
    if(document.getElementById("btnCreerPartie")){
        btnCreatePartie = document.getElementById("btnCreerPartie");
    }else{
        btnCreatePartie = document.createElement("button");
    }
    btnCreatePartie.innerText = "Créer une partie";
    btnCreatePartie.id = "btnCreerPartie";
    btnCreatePartie.onclick = function (event){
        partieCree = new Partie(-1,0,[],[],0,0,[],[],0);
        partieCree.initGame();
        cuteToast({
            type: "warning",
            message: "Envoi des données au serveur...",
            timer: 3000
        })
        setTimeout(function () {
            partieCree.create();
            cuteToast({
                type: "warning",
                message: "Création de la partie en cours...",
                timer: 3000
            })
        },3000)

        setTimeout(function (){
            if(partieCree.id == -1){
                console.error("ERREUR DE CREATION")
                return;
            }
		cuteToast({
			type: "warning",
			message: "Connexion à la partie en cours()...",
			timer: 3000
		})
            partieCree.ajoutJoueur(joueurCree)

        },6000)
        setTimeout(function (){
            window.sessionStorage["idPartie"] =  partieCree.id;
            cuteToast({
                type: "warning",
                message: "Création de la partie en cours...",
                timer: 3000
            })

            document.location.href = "index.html";
        },9000)


    }
    document.body.appendChild(btnCreatePartie);

}

function getParties(){
    options = {
        method: 'GET',
    };
    url = 'http://merome.net3124/api/parties/';
    fetch(url, options)
        .then(function(response) {
            // Récupérer le corps de la requete en JSON

            return response.json();
        })
        .then(function (json) {
            // Utiliser notre objet JSON
            parties = json;
        })
}
