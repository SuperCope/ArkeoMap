class Piece{
    constructor(id,imageURL,idJoueur,posImage,trace,rotation){
        this.id = id;
        this.idJoueur = idJoueur
        this.imageURL = imageURL;
        this.posImage = posImage;
        this.trace = trace;
        this.rotation = rotation;
    }
    async create(){
        let url = 'http://merome.net3124/api/pieces/';
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
            let title = "Envoi de la pièce"
            cuteToast({
                type: typeMsg,
                message: "Etat "+title+" : "+msg+" ("+response.status+")",
                timer: 5000
            })
            return response.json()
        })

    }
    async addToPartie(partie){
        let url = 'http://merome.net3124/api/parties/'+partie.id;
        let data = this

        // Les options de la requete
        let options = {
            method: 'PATCH',
            body: JSON.stringify(data)
        };
        fetch(url, options)
            .then(function (response) {
		
            let typeMsg = displayResRequete(response.status)[0]
            let msg = displayResRequete(response.status)[1]
            let title = "Envoi de la pièce"
            cuteToast({
                type: typeMsg,
                message: "Etat "+title+" : "+msg+" ("+response.status+")",
                timer: 5000
            })
            return response.json()
        })

    }

}
