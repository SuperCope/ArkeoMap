let depouilles = []
let cartesBatailles = []
let coordsDepouilles = []

depouilles[0] = ["Okrodels",1]
depouilles[1] = ["Buskelos",1]
depouilles[2] = ["Poiskels",1]
depouilles[3] = ["Eparlis",1]
depouilles[4] = ["Greniox",1]
depouilles[5] = ["Glanpekis",1]
depouilles[6] = ["Soleps",1]
depouilles[7] = ["Glanpekis",1]
depouilles[8] = ["Soleps",1]
depouilles[9] = ["Glanpekis",1]
depouilles[10] = ["Soleps",1]

let nomsSites = []
let sites = []
let sitesFaits = []
let indicesCartes = []
nomsSites[0] = "Ces batailles qui ont marqué l'histoire"
nomsSites[1] = "HISTINFO - Les grandes batailles depuis l'an 600"
nomsSites[2] = "DERRIERE L'HISTOIRE - Conflits coloniaux"
nomsSites[3] = "L'historique des grandes guerres"
nomsSites[4] = "Les principales guerres"
nomsSites[5] = "Batailles : les grandes dates"
nomsSites[6] = "GUERRIA : l'hiistoire de la guerre"
nomsSites[7] = "BATAILLA : les batailles importantes"

let liensVerts = []
liensVerts[0] = "https://bataillesHistoire.com"
liensVerts[1] = "https://histinfo.fr"
liensVerts[2] = "https://derriereHistoire.fr"
liensVerts[3] = "https://histoireGuerre.com"
liensVerts[4] = "https://guerres.fr"
liensVerts[5] = "https://batailles.com"
liensVerts[6] = "https://guerria.com"
liensVerts[7] = "https://batailla.com"

let descriptionsSites =[]
descriptionsSites[0] = "Ce site répertorie toutes les grandes batailles de l'histoire de l'humanité \n"+
"Vous pourrez y trouver toutes les grandes dates de l'an 600 à l'an 1600"
descriptionsSites[1] = "Toutes les informations à propos des conflits ayant eu lieu entre l'année 600 et l'année \n"+
" 1600 sont répertoriées sur ce site. N'hésitez pas à créer un compte pour en savoir \n plus et être au courant de tous \n"+
" les nouveaux articles ajoutés sur notre site !"
descriptionsSites[2] = "Derrière l'Histoire replonge dans ces conflits du passés qui ont contribué à \n"+
"façonner notre monde pour l'obtenir tel qu'il est aujourd'hui. Redécouvrez les dates de chaque bataille \n"+
"entre les années 600 et 1600"
descriptionsSites[3] = "Découvrez toutes les guerres ayant eu lieu entre 600 et 1600 !"
descriptionsSites[4] = "Vous pourrez trouver sur ce site tous les détails à propos des guerres et batailles entre 600 et 1800!"
descriptionsSites[5] = "batailles.com est LE site officiel des grandes batailles qui ont marqué l'histoire. \n"+
"N'hésitez pas à vous inscrire pour en savoir plus !"
descriptionsSites[6] = "LE site officiel des grandes dates des plus importantes guerres de l'histoire"
descriptionsSites[7] = "LE site officiel des grandes dates des plus importantes batailles de l'histoire"

let directions= ["nord ouest","nord est","sud est","sud ouest"]
let batailles = []
let datesBatailles = []
let seigneursDepouilles = []
let ouvrages = [[]]
let dates2 = []

let nbSites = parseInt(Math.random() * (6 - 3) + 3);
let dejaFaits = []
let depouillesPartie = []
let distSitesReperes = []
let nbIndicesTextes = 6;
let nbFauxIndicesTextes = parseInt(Math.random() * (3 - 2) + 2);
console.log("++++++++++++++++++"+nbFauxIndicesTextes+"+++++++++++++++++++")
let nbIndicesCartes = 6
let typeDepouilles = 1
let squelettesBatailles = [[]]

for(let i = 0;i<nbIndicesTextes;i++){
    let id = parseInt(Math.random() * depouilles.length);

    if(!dejaFaits[id]){
        dejaFaits[id] = true
        depouillesPartie[i] = depouilles[id]
        distSitesReperes[i] = parseInt(Math.random() * (65 - 35) + 35);

    }else{
        i--
    }

}

let contexteIntro = "Tomber sur un vestige archéologique au cours d'un chantier est un aléa largement redouté par les maîtres d'ouvrage. "+
"Pour palier à ce problème, le gouvernement à décidé de constituer des équipes d'archéologues et d'historiens pour trouver les derniers vestiges "+
"archéologiques encore non découverts à ce jour. "
squelettesIndices = [[]]

let dates = []


setTimeout(generationIndices,4000)

function generationIndices(){
    console.log("EN ROUTE !")
    for(let i = 0;i<nbIndicesTextes;i++){
        creationIndiceTexte(i)
    }

    console.log("AVANT : "+squelettesIndices.length)
    
    creationFauxIndices()
    creationBatailles()
    creationOuvrages()
    fillBibliotheque()
    creationSites()
    generationCartesIndices()
    creationDivsIndicesCartes()
	document.getElementById("loader").style.display = "none"
	console.log(document.getElementById("loader"))
    $("#divPopUp").fadeOut(100,function(){
        while(document.getElementById("divPopUp").childElementCount > 0){
            document.getElementById("divPopUp").lastChild.remove()
        }
        
    });
}



function creationFauxIndices(){



    for(let i = squelettesIndices.length;i<nbIndicesTextes + nbFauxIndicesTextes;i++){

        let nomDepouille = null
        let k = 0
    
        while( (k<nbIndicesTextes || dejaFaits[k]==true)){
            console.log(k,dejaFaits[k])
            if(!dejaFaits[k]){
                break
            }
            k++
    
        }
        console.log(k)
        dejaFaits[k] = true
        nomDepouille = depouilles[k][0]
        seigneursDepouilles[i] = nomDepouille
        console.log(squelettesIndices)
        console.log(dejaFaits)
        let annee = parseInt(Math.random() * (1600 - 600) + 600);
        dates[i] = annee
        
        let idEnnemi = parseInt(Math.random() * nbIndicesTextes)
        let delaiBataille = parseInt(Math.random() * (63 - 4) + 4);
        batailles[i-nbIndicesTextes] = [i,idEnnemi]

        
        console.log(dates[idEnnemi],dates[i],delaiBataille)
        let dateBataille = Math.max(dates[idEnnemi],dates[i])+delaiBataille


        datesBatailles[i-nbIndicesTextes] = dateBataille

        
        squelettesIndices[i] = []
        squelettesIndices[i][0] = ["Le seigneur "+nomDepouille+" découvrait l'île en "+dates[i]+". "]
    
        squelettesIndices[i][2] = ["Il aurait perdu une bataille en "+datesBatailles[i-nbIndicesTextes]+". "]

        let typeRepere = parseInt(Math.random() * (6 - 0) + 0);
        typeRepere = types[reperes[i%reperes.length][2]]
        directionRepere = parseInt(Math.random() * (4 - 0) + 0);
        directionRepere = directions[directionRepere]
    
        console.log(typeRepere)
        associationRepere(typeRepere,directionRepere,i)
    }
}


console.log("APRES : "+squelettesIndices.length)


function creationOuvrages(){

    for(let i = 0;i<dates.length;i++){
        dates2[i] = dates[i]
    }

    dates.sort((a, b) => a - b);

    let compteur2 = 0
    let compteur = 0
    for(let date = 600;date<1601;date++){

        for(let i = 0;i<dates.length;i++){
    
            if(date%200 == 0 && date > 600){
                if(compteur2 > 0){
                    ouvrages[compteur] = []
    
                    ouvrages[compteur]["titre"] = [date-200,date,"Colonisations de l'île entre "+(date-200)+" et "+date]
                    compteur++
                    
                }
    
                compteur2 = 0
            }
            if(dates[i]==date){
    
                compteur2++
            }
        }
    }
    for(let i = 0;i<ouvrages.length;i++){
        if(ouvrages[i]){
    
            ouvrages[i]["contenu"] = ""
    
            for(let j = 0;j<dates2.length;j++){
        
                if(dates2[j]>=ouvrages[i]["titre"][0] && dates2[j]<=ouvrages[i]["titre"][1]){

                    for(let k = 0;k<squelettesIndices[j].length;k++){
                        
                        let u = squelettesIndices[j][k]
                       
                        ouvrages[i]["contenu"] += ""+squelettesIndices[j][k]+""
    
                    }
                }
    
            }
        }
    }
    for(let i = nbIndicesTextes;i<nbReperesMax;i++){
        dates[i] = parseInt(Math.random() * (1600 - 600) + 600);
    }
}







function creationIndiceTexte(i){

    squelettesIndices[i] = []
    let typeRepere = types[reperes[i][2]]
    let nomDepouille = depouillesPartie[i][0]
    seigneursDepouilles[i] = nomDepouille
    let typeDepouille = depouillesPartie[i][1]
    let annee = parseInt(Math.random() * (1600 - 600) + 600);
    dates[i] = annee
    let directionRepere = -1;

    if(typeDepouille==1){

        if(reperes[i][0] > 300 && reperes[i][1] < 250){
            directionRepere = "nord est"
        }
        else if(reperes[i][0] > 300 && reperes[i][1] > 250){
            directionRepere = "sud est"
        }
        else if(reperes[i][0] < 300  && reperes[i][1] > 250){
            directionRepere = "sud ouest"
        }
        else if(reperes[i][0] < 300  && reperes[i][1] < 250){
            directionRepere = "nord ouest"
        }
        
        squelettesIndices[i][0] = ["Le seigneur "+nomDepouille+" découvrait l'île en "+dates[i]+". "]

        associationRepere(typeRepere,directionRepere,i)


    }
}
function associationRepere(typeRepere,directionRepere,i){
    switch(typeRepere){
        // Trouver la nature du repère
        case "crevasse":
            squelettesIndices[i][1] = ["Il y avait un endroit au centre du royaume qui effrayait tous les habitants au "+directionRepere+" de l'île. Certains allaient même jusqu'à prétendre qu'il s'agissait du repère du démon. "] 
            break;
        case "pont":
            squelettesIndices[i][1] = ["Une fois le territoire colonisé, il fut contraint de l'aménager pour pouvoir traverser le grand fleuve se trouvant au "+directionRepere+" de l'île, au centre du royaume. "]
            break;
        case "tour":
            squelettesIndices[i][1] = ["Il fit enfermer sa fille dans un grand bâtiment isolé au "+directionRepere+" de l'île au centre du royaume pour qu'elle ne puisse plus revoir son amant qui était un habitant du royaume enemi. "]
            break;
        case "fort":
            squelettesIndices[i][1] = ["Pour impressionner ses enemis, il décida de construire un grand bâtiment défensif au "+directionRepere+" de l'île, au centre de son royaume. "]
            break;
        case "grotte":
            squelettesIndices[i][1] = ["Des reliques sacrées furent découvertes au "+directionRepere+" de l'île dans les entrailles de l'île, au centre de sont royaume. "]
            break;
        case "cabanon":
            squelettesIndices[i][1] = ["Il fit batir un bâtiment très rudimentaire  au "+directionRepere+" de l'île, au centre du royaume, pour y emprisonner les voleurs et les criminels qui sévissaient dans son royaume . "]
            break;
    }
}

function creationBatailles(){
    let compteur = 0
    for(let i = 0;i<nbIndicesTextes;i++){
        let canvas = document.createElement("canvas")
        let ctx =canvas.getContext("2d")
        ctx.canvas.width = 1100
        ctx.canvas.height = 850
        ctx.clearRect(0,0,canvas.width,canvas.height)
        creationCarte(ctx)
        squelettesBatailles[i]  = "Le seigneur "+seigneursDepouilles[i%nbIndicesTextes]+" fut tué par un seigneur ennemi à "+distSitesReperes[i]+" kilomètres du centre de son royaume (voir carte ci-jointe)"

        ctx.drawImage(images[31],reperes[i][0],reperes[i][1])
        ctx.font = "bold 48px Arial"
        ctx.fillStyle = "black"
        ctx.fillText("Carte de la bataille",225,730)
        ctx.lineWidth = 3
        ctx.stroke()
        cartesBatailles[i] =  ctx.canvas.toDataURL()

    }

    console.log("DE "+0+" A "+(nbIndicesTextes))
    for(let i = nbIndicesTextes;i<nbIndicesTextes + nbFauxIndicesTextes;i++){
        console.log("DONNEZ MOI "+i)
        let typeRepere = types[reperes[i-nbIndicesTextes][2]]
        squelettesBatailles[i] = "Une bataille a eu lieu en "+datesBatailles[i-nbIndicesTextes]+". Elle opposait  "+seigneursDepouilles[i]+" à "+seigneursDepouilles[batailles[i-nbIndicesTextes][1]]
        +". Cette bataille fut gagnée par les troupes du seigneur "+seigneursDepouilles[batailles[i-nbIndicesTextes][1]]+". De nombreuses personnes furent victime de cette bataille. Un / une "+typeRepere+" fut détruit."
        compteur++
  
    }
    console.log("DE "+nbIndicesTextes+" A "+(nbIndicesTextes + nbFauxIndicesTextes))


}

function creationSites(){
    let compteur = 0
    while(sites.length < (squelettesBatailles.length)){
    let compteur2 = parseInt(Math.random() * nomsSites.length);
        if(!sitesFaits[compteur2]){
            sites[compteur] = compteur2
            sitesFaits[compteur2] = true
            compteur++
        }
        
    }
}

function generationCartesIndices(){
    let patternsCartes = [[0,4],[1,2,3,5,6]]
    let canvas = document.createElement("canvas")
    let ctx2 = canvas.getContext("2d")
    ctx2.canvas.width = 1100;
    ctx2.canvas.height = 1250;
    for(let i = 0;i<patternsCartes.length;i++){

        console.log(patternsCartes[i])
        creationCarte(ctx2,patternsCartes[i])

        ctx2.fillStyle = "white";
        ctx2.font = "bold 48px Arial";
        if(i==0){
            ctx2.fillText("Carte des sites naturels de l'île",225,780)
        }else{
            ctx2.font = "bold 36px Arial";
            ctx2.fillText("Carte des inaugurations des monuments",225,780)
        }

        let urlImage = canvas.toDataURL()
        let image = document.createElement("img")
        console.log(urlImage)
        let img = document.createElement("div")
        img.style.backgroundImage = "url('"+urlImage+"')"
        img.setAttribute("id","mapIndice"+(i+nbIndicesTextes))
        img.setAttribute("class","mapIndice")
        indicesCartes[nbIndicesTextes+i] = img
        ctx2.clearRect(0,0,canvas.width,canvas.height)
    }
}
// Utiliser un repère d'une carte pour faire trouver un repère textuel (2e for)
