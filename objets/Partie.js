class Partie{
    constructor(id,nbJoueurs,joueurs,phase,pieces,points,nbTraits){
        this.id =id;
        this.nbJoueurs =nbJoueurs;
        this.joueurs = joueurs;
	    this.phase = phase;
        this.pieces = pieces;
        this.points = points;
        this.nbTraits = nbTraits;
    }
    initGame(){
        this.niveau = 0;
        this.joueurs = [];
        this.pieces = [];
    }
    create(){
        let url = 'http://merome.net3124/api/parties/';
        let data = this

        // Les options de la requete
        let options = {
            method: 'POST',
            body: JSON.stringify(data)
        };
        fetch(url, options)
	.then(function (response) {
			
			let typeMsg = displayResRequete(response.status)[0]
			let msg = displayResRequete(response.status)[1]
			let title = "Création de la partie"
			// cuteToast({
			// 	type: typeMsg,
			// 	message: "Etat "+title+" : "+msg+" ("+response.status+")",
			// 	timer: 5000
			// })
		        return response.json()
		    })
            .then(function (json) {

                partieCree.id =  json[json.length -1].id;

            })
    }
    findJoueur(id){
        for(let i = 0;i<this.joueurs.length;i++){
            if(this.joueurs[i].id == id){

                return new Joueur(this.joueurs[i].x,this.joueurs[i].y,this.joueurs[i].id,this.joueurs[i].idPartie,this.joueurs[i].password,this.joueurs[i].pseudo,this.joueurs[i].nbSpts,this.joueurs[i].pieces);
            }
        }
    }
    updateJoueur(id,joueur){
        for(let i = 0;i<this.joueurs.length;i++){
            if(this.joueurs[i].id == id){
                this.joueurs[i] = joueur

            }
        }
    }
    ajoutJoueur(joueur){
        let couleursSouris = ["red","green","yellow","orange","blue","cyan","brown","purple","gray","magenta"];
        joueurCree.idPartie = this.id
        this.joueurs.push(joueur)
        this.nbJoueurs ++;
        let url = 'http://merome.net3124/api/parties/' + this.id;
        let data = null;

        data = this
	    let id = this.id;
         // Les options de la requete
        let options = {
            method: 'PATCH',
            body: JSON.stringify(data)
        };
        fetch(url, options)
	.then(function (response) {
			
			let typeMsg = displayResRequete(response.status)[0]
			let msg = displayResRequete(response.status)[1]
			let title = "Connexion à la partie "+id

		        return response.json()
		    })
            .then(function (json) {
                partieCree = json
            })
    }
    update() {

        let url = 'http://merome.net3124/api/parties/' + this.id;
        let data = this
        // Les options de la requete
        let options = {
            method: 'PATCH',
            body: JSON.stringify(data)
    
        };
    
        fetch(url, options)
            .then(function (response) {
                return response.json()
            })

            .then(function (json) {
                partie = new Partie(json.id,json.nbJoueurs,json.joueurs,json.phase,json.pieces,json.points,json.nbTraits)
            })
    }

}
