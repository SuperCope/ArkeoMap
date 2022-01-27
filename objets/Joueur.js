class Joueur{
    constructor(x,y,id,idPartie,password,pseudo,nbSpts,pieces){
        this.x = x;
        this.y = y;
        this.id = id;
        this.idPartie = idPartie;
        this.password = password;
        this.pseudo = pseudo;
        this.couleur = "";
        this.nbSpts = nbSpts;
        this.pieces = pieces;
    }
    async create(){
        let url = 'http://merome.net3124/api/joueurs/';
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
		let title = "Inscription"
		cuteToast({
			type: typeMsg,
			message: "Etat "+title+" : "+msg+" ("+response.status+")",
			timer: 5000
		})
                return response.json()
            })
            .then(function (json) {
                joueurCree = json;
                joueurCree = joueurCree[joueurCree.length -1]
            })
    }    
    async update() {

        let url = 'http://merome.net3124/api/joueurs/' + this.id;
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
                joueur =new Joueur(json.x,json.y,json.id,json.idPartie,json.password,json.pseudo,json.nbSpts,json.pieces)

            })
    }

}
