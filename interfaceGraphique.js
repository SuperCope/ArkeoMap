// document.getElementById("submitEnvoiPieceJoueur").setAttribute("onclick","envoiPieceJoueur()")

let ctx = document.getElementById("puzzle").getContext('2d')
let numPageLivre = 0
let numPageLivre2 = 1
let idLivre = null
let posCharLivre = 0
let ordi = false
let ordiProgress = 0
let idCarte = null
var cartesTabLiege = []
let idSelectedCarte = null
let posSelectedCarte = null
let posSelectedCarte2 = null
let idModeForm = 0
let modeCursor = 0
let cursorRepere = 0
let postIts = []


document.getElementById("puzzle").onmouseenter = function(){
    determineCurseurCanvas()
}
document.body.oncontextmenu = function(){
    cursorRepere++
    cursorRepere = cursorRepere % types.length
    determineCurseurCanvas()
    return false;

}

document.addEventListener("keydown",shortCutEchap)

document.getElementById("quitIcon").setAttribute("class","quitIcon")
document.getElementById("quitIcon").setAttribute("onmouseover","document.getElementById('quitIcon').setAttribute('src','img/quit0.png')")
document.getElementById("quitIcon").setAttribute("onmouseleave","document.getElementById('quitIcon').setAttribute('src','img/quit.png')")

document.getElementById("quitIcon").onclick = function(){
    closeDivPleinEcran()
    var audio = new Audio('./audio/button.mp3');
    audio.play();
}
document.getElementById("addIcon").setAttribute("onmouseover","document.getElementById('addIcon').setAttribute('src','img/add0.png')")
document.getElementById("addIcon").setAttribute("onmouseleave","document.getElementById('addIcon').setAttribute('src','img/add.png')")
document.getElementById("addIcon").onclick = function(){
    addMapTabLiege()
}

document.getElementById("ordinateur").onclick = function(){

    document.getElementById("divPleinEcran").style.visibility = "visible"
    document.getElementById("quitIcon").style.visibility = "visible"
    document.getElementById("bibliotheque").style.opacity = "20%"
    document.getElementById("divPleinEcran").style.backgroundImage = "url('./img/ordi.png')"
    document.getElementById("divPleinEcran").style.backgroundSize = "60%"
    document.getElementById("divPleinEcran").style.backgroundPositionX= "50%";
    document.getElementById("divPleinEcran").style.backgroundPositionY= "70%";
    ordinateur()
}
document.getElementById("affichageSuccIcon").setAttribute("onmouseover","document.getElementById('affichageSuccIcon').setAttribute('src','img/pageSucc0.png')")
document.getElementById("affichageSuccIcon").setAttribute("onmouseleave","document.getElementById('affichageSuccIcon').setAttribute('src','img/pageSucc.png')")
document.getElementById("affichageSuccIcon").onclick = function(){
    videFormCarte()
    idModeForm++
    scanModeForm()
}

document.getElementById("affichagePrevIcon").setAttribute("onmouseover","document.getElementById('affichagePrevIcon').setAttribute('src','img/pagePrev0.png')")
document.getElementById("affichagePrevIcon").setAttribute("onmouseleave","document.getElementById('affichagePrevIcon').setAttribute('src','img/pagePrev.png')")

document.getElementById("affichagePrevIcon").onclick = function(){
    videFormCarte()
    idModeForm--

    scanModeForm()
}

document.getElementById("pagePrevIcon").setAttribute("onmouseover","document.getElementById('pagePrevIcon').setAttribute('src','img/pagePrev0.png')")
document.getElementById("pagePrevIcon").setAttribute("onmouseleave","document.getElementById('pagePrevIcon').setAttribute('src','img/pagePrev.png')")
document.getElementById("pagePrevIcon").onclick = function(){
    numPageLivre-=2
    numPageLivre2-=2
    if(numPageLivre==0){
        posCharLivre = 0
    }else{
        posCharLivre = (numPageLivre-2) * 520
    }

    var audio = new Audio('./audio/page.mp3');
    audio.play();
    clearLivre()
    consulterLivre()
    var audio = new Audio('./audio/button.mp3');
    audio.play();
}

document.getElementById("pageSuccIcon").setAttribute("onmouseover","document.getElementById('pageSuccIcon').setAttribute('src','img/pageSucc0.png')")
document.getElementById("pageSuccIcon").setAttribute("onmouseleave","document.getElementById('pageSuccIcon').setAttribute('src','img/pageSucc.png')")
document.getElementById("pageSuccIcon").onclick = function(){
    numPageLivre+=2
    numPageLivre2+=2
    var audio = new Audio('./audio/page.mp3');
    audio.play();
    clearLivre()
    consulterLivre()
    var audio = new Audio('./audio/button.mp3');
    audio.play();
}

function validationForm(){
    while(document.getElementById("divPopUp").childElementCount > 0){
        document.getElementById("divPopUp").lastChild.remove()
    }
 

    var audio = new Audio('./audio/button.mp3');
    audio.play();
    let boutons = []
    boutons[0] = document.createElement("div")
    boutons[0].style.backgroundColor = "green"
    boutons[0].innerText = "Oui"
    boutons[0].style.boxShadow = "0px 0px 2px 0px lightgreen"
    boutons[0].setAttribute("class","boutonPopUp")
    boutons[0].onclick = function(){
        document.body.style.cursor = "wait"
        while(document.getElementById("divPopUp").childElementCount > 0){
            document.getElementById("divPopUp").lastChild.remove()
        }
        lancementRecherches()
        document.getElementById("divPopUp").style.display = "none"
        var audio = new Audio('./audio/button.mp3')
        audio.play()
    }

    boutons[1] = document.createElement("div")
    boutons[1].style.backgroundColor = "red"
    boutons[1].innerText = "Non"
    boutons[1].style.boxShadow = "0px 0px 2px 0px lightsalmon"
    boutons[1].setAttribute("class","boutonPopUp")
    boutons[1].onclick = function(){
        while(document.getElementById("divPopUp").childElementCount > 0){
            document.getElementById("divPopUp").lastChild.remove()
        }
        document.getElementById("divPopUp").style.display = "none"
        var audio = new Audio('./audio/button.mp3')
        audio.play()
    }

    creationPopUp("Lancer les recherches","Voulez-vous vraiment lancer les recherches ?",boutons,"#map",0,200)
    






}


function lancementRecherches(){
    let canvas = document.getElementById("puzzle")
    ctx = canvas.getContext("2d")

    document.getElementById("validIcone2").style.visibility = "hidden"
    $("#puzzle").fadeOut(2500,function(){

        creationCarte(ctx)
        
    });

    
    $("#puzzle").fadeIn(7000,function(){

        document.body.style.cursor = "unset"
        if(document.getElementById("validIcone2")){
            document.getElementById("validIcone2").style.visibility = "visible"
        }else{
            console.log("ERROR VALID ICON")
        }

    });


    var audio = new Audio('./audio/suspense.mp3')
    audio.play()
}

function clearLivre(){
    if(document.getElementById("pageGauche") && document.getElementById("pageDroite")){
        document.getElementById("pageGauche").innerText = ""

        document.getElementById("pageDroite").innerText = ""
    }

}
function fillSelectPlayer(){
    let select = document.getElementById("listeJoueurs")
    for(let i = 0;i<partie.nbJoueurs;i++){
        if(partie.joueurs[i].id != joueur.id){
            let elmt = document.createElement("option")
            elmt.innerText = partie.joueurs[i].pseudo
            elmt.setAttribute("id",partie.joueurs[i].id)
            elmt.setAttribute("onclick","selectPlayer("+partie.joueurs[i].id+")")
            select.appendChild(elmt)
        }

    }
    
}
function fillBibliotheque(){
    livres = []
    let divsLivres = [[]]
    let divLivre = null
    console.log(ouvrages.length+"livres")
    for(let i = 0;i<ouvrages.length;i++){
        console.log("OK")

        let top0 = parseInt(Math.random()*3)

        divLivre = document.createElement("div")
        if(!livres[top0]){

            divsLivres[top0] = []
            livres[top0] = 0
        }


 
        console.log("AJOUT EN "+top0+" PAR "+livres[top0])
        divsLivres[top0][livres[top0]] = divLivre

        


        console.log("AJOUT EN LIGNE "+top0)
        livres[top0]++
    }
    console.log(divsLivres)
    let divRayon = null
    let compteur = 0
    for(let i = 0;i<divsLivres.length;i++){
        if(!divRayon){
            divRayon = document.createElement("div")
        }
        if(divsLivres[i]){
            for(let j = 0;j<divsLivres[i].length;j++){
                let livre = document.createElement("div")
                livre.style.backgroundImage = "url('./img/livre"+compteur+".png')"
                livre.style.backgroundSize = "116%"
                let idImage = parseInt(Math.random() * (6 - 1) + 1);
                console.log("url('./img/livre"+idImage+".png')")
                livre.style.height = "200px"
                livre.style.width = "27px"
                let left = 4 + parseInt(Math.random() * (15 - 5) + 5) + j;
                let top = 9.5 + i*32.5

                livre.setAttribute("idLivre",""+compteur+"")
                livre.setAttribute("onclick","consulterLivre(event);var audio = new Audio('./audio/ouvreLivre.mp3');audio.play();")
                livre.style.position = "relative"
                divRayon.style.display = "flex"
                divRayon.style.position = "absolute"
                divRayon.style.top = top+"%"
                divRayon.style.left = left+"%"
                console.log(divRayon)
                divRayon.appendChild(livre)
                compteur++
            }

        }
        document.getElementById("biblio").appendChild(divRayon)
        divRayon = null
    }
}

function consulterLivre(event){
    if(!document.getElementById("pageGauche")){
        let pageGaucheDiv = document.createElement("div")
        pageGaucheDiv.setAttribute("id","pageGauche")
        pageGaucheDiv.setAttribute("class","pages")
        document.getElementById("divPleinEcran").appendChild(pageGaucheDiv)
    }
    if(!document.getElementById("pageDroite")){
        let pageDroiteDiv = document.createElement("div")
        pageDroiteDiv.setAttribute("id","pageDroite")
        pageDroiteDiv.setAttribute("class","pages")
        document.getElementById("divPleinEcran").appendChild(pageDroiteDiv)
    }

 
    document.getElementById("divPleinEcran").style.backgroundImage = "url('./img/livre.png')"
    if(event && (!idLivre || event.target.getAttribute("idLivre")!= idLivre)){
        idLivre = event.target.getAttribute("idLivre")
    }

    document.getElementById("quitIcon").style.visibility = "visible"
    if(numPageLivre > 0){
        document.getElementById("pagePrevIcon").style.visibility = "visible"
    }else{
        document.getElementById("pagePrevIcon").style.visibility = "hidden"
    }

    document.getElementById("pageSuccIcon").style.visibility = "visible"
    document.getElementById("divPleinEcran").style.backgroundSize = "100%"

    document.getElementById("bibliotheque").style.opacity = "20%"
    document.getElementById("divPleinEcran").style.visibility = "visible"



    if(numPageLivre==0){
        ajoutTitre()
        adaptLignes(1)
    }
    if(numPageLivre>1){

        ajoutTexte("pageGauche")
        adaptLignes(2)
    }



}
function ajoutTitre(){
    for(let i = 0;i<4;i++){
        document.getElementById("pageGauche").innerHTML += "<br>"
    }
    document.getElementById("pageGauche").style.textAlign = "center"
    document.getElementById("pageGauche").style.fontSize = "3vw"
    document.getElementById("pageGauche").style.fontWeight = "bold"

    let divTexte = document.createElement("div")
    divTexte.innerText += ouvrages[idLivre]["titre"][2]
    document.getElementById("pageGauche").innerText += divTexte.innerText


}
function ajoutTexte(page){

    document.getElementById("pageGauche").style.textAlign = "left"
    document.getElementById("pageGauche").style.fontSize = "2vw"
    document.getElementById("pageGauche").style.fontWeight = "initial"
    let divTexte = document.createElement("div")

    divTexte.innerText += ouvrages[idLivre]["contenu"]
    let numPage = -1
    if(page=="pageGauche"){
        numPage = numPageLivre
    }else{
        numPage = numPageLivre2
    }


    let iDeb = 0
    if(posCharLivre!=0){
        iDeb = posCharLivre
        posCharLivre = 0

    }else{
        document.getElementById(page).innerText += divTexte.innerText
    }
    if(document.getElementById(page).innerHTML.length > 520 || iDeb != 0){
        
        document.getElementById(page).innerText = ""
        console.log("GAUCHE :"+document.getElementById(page).innerText.length)
        let contenuGauche = (ouvrages[idLivre]["contenu"].slice(iDeb, iDeb+520)).toString()

        document.getElementById(page).innerText +=  contenuGauche

        iDeb+=520
        let contenuDroit = (ouvrages[idLivre]["contenu"].slice(iDeb, iDeb+520)).toString()
        document.getElementById("pageDroite").innerText +=  contenuDroit
        iDeb+=520
        if(iDeb < ouvrages[idLivre]["contenu"].length){
            posCharLivre = iDeb
            document.getElementById("pageSuccIcon").style.visibility = "visible"
        }else{
            document.getElementById("pageSuccIcon").style.visibility = "hidden"
        }


    }
}
function adaptLignes(type){
 
    let nb = parseInt(document.getElementById("pageGauche").innerHTML.length / 35)
    console.log("NB : "+nb)
    for(let i = 0;i<(14-nb);i++){

        document.getElementById("pageGauche").innerHTML += "<br>"
        
    }
    nb = parseInt(document.getElementById("pageDroite").innerHTML.length / 35)
    console.log("NB : "+nb)

    for(let i = 0;i<(14-nb);i++){

        document.getElementById("pageDroite").innerHTML += "<br>"
        
    }
    
}
function affichePieces(){
    document.getElementById("piecesRecepetion").remove()
    let container = document.createElement("div")
    container.setAttribute("id","piecesRecepetion")
    document.body.appendChild(container) 

    for(let i = 0;i<piecesRecues.length;i++){

        if(piecesRecues[i].idJoueur == joueur.id){
            let div = document.createElement("div")
            div.style.backgroundImage = "url('"+piecesRecues[i].imageURL+"')"
            div.style.backgroundPosition = piecesRecues[i].posImage
            div.style.rotate = piecesRecues[i].rotation
            div.style.position = "relative"
            div.style.marginTop = "10px"
            div.style.height = "120px"
            div.style.width = "120px"

            container.appendChild(div) 
        }



    }
}
function ordinateur(){

    ordi = true
    
    setTimeout(demarrageOrdi,2000)
    setTimeout(initialisationOrdi,5000)
}
function demarrageOrdi(){
    let ecranDiv = document.createElement("div")
    ecranDiv.setAttribute("id","ecran")
    ecranDiv.onclick = function(){
        var audio = new Audio('./audio/clic.mp3');
        audio.play();
        // document.getElementById("txtMozila").style.backgroundColor = "unset"
    }
    document.getElementById("divPleinEcran").style.top = "0%"
    document.getElementById("divPleinEcran").style.paddingLeft = "22%"
    document.getElementById("divPleinEcran").style.paddingTop = "6%"
    document.getElementById("divPleinEcran").appendChild(ecranDiv)
    var audio = new Audio('./audio/windowsStart.mp3');
    audio.play();
    ordiProgress++
}
function initialisationOrdi(){
    let ecranDiv = document.getElementById("ecran")
    ecranDiv.style.backgroundImage = "url('./img/windows.png')"
    let iconeMozila = document.createElement("div")
    iconeMozila.style.backgroundImage = "url('./img/firefox.png')"
    iconeMozila.setAttribute("id","iconeMozila")
    let txtMozila = document.createElement("div")
    txtMozila.setAttribute("id","txtMozila")
    txtMozila.innerText  = "Mozila Firefox"
    let mozila = document.createElement("div")
    mozila.setAttribute("id","mozila")
    mozila.appendChild(iconeMozila)
    mozila.appendChild(txtMozila)
    txtMozila.onclick = selection
    txtMozila.ondblclick = navigateur
    iconeMozila.ondblclick = navigateur
    ecranDiv.appendChild(mozila)
    ordiProgress++
}
function selection(){
    document.getElementById("txtMozila").style.backgroundColor = "blue"
}
function navigateur(){
    changePage()
    let ecranDiv = document.getElementById("ecran")
    ecranDiv.style.paddingTop = "2%"
    if(document.getElementById("mozila")){
        document.getElementById("mozila").remove()
    }

    ecranDiv.style.backgroundImage = "url('img/blanc.png')"
    let iconeGoogle = document.createElement("div")
    iconeGoogle.style.backgroundImage = "url('./img/google.png')"
    iconeGoogle.setAttribute("id","iconeGoogle")
    ecranDiv.appendChild(iconeGoogle)
    for(let i = 0;i<sites.length;i++){
        
        let lienVert = document.createElement("div")
        lienVert.setAttribute("id","lienVert"+i)
        lienVert.setAttribute("class","lienVert")
        lienVert.innerText += liensVerts[sites[i]]
        lienVert.onclick = function(){
            affichePage(i)
        }

        let lien = document.createElement("div")
        lien.setAttribute("id","lien"+i)
        lien.setAttribute("class","lien")
        lien.innerText += nomsSites[sites[i]]
        lien.onclick = function(){
            affichePage(i)
        }

        let description = document.createElement("div")
        description.setAttribute("id","description"+i)
        description.setAttribute("class","description")
        description.innerHTML += descriptionsSites[sites[i]]+"<br><br><br><br>"

        ecranDiv.appendChild(lienVert)
        ecranDiv.appendChild(lien)
        ecranDiv.appendChild(description)

    }
    ordiProgress++
}
function changePage(){
    let ecranDiv = document.getElementById("ecran")

    while(ecranDiv.childNodes.length){

        ecranDiv.lastChild.remove()
    }
}
function affichePage(i){
    changePage()
    let ecranDiv = document.getElementById("ecran")

    let entete = document.createElement("div")
    let contenu = document.createElement("div")
    let prev = document.createElement("img")
    let url = document.createElement("input")
    contenu.setAttribute("id","contenu")
    contenu.innerText = squelettesBatailles[i]
    if(i<nbIndicesTextes){
        let img = document.createElement("img")
        img.src = cartesBatailles[i]
        document.body.appendChild(img)
        contenu.appendChild(img)
    }

    entete.setAttribute("id","entete")
    prev.setAttribute("src","./img/prev.png")
    prev.setAttribute("id","prev")
    prev.onclick = navigateur
    url.setAttribute("type","text")
    url.setAttribute("id","url")
    url.setAttribute("value",""+liensVerts[sites[i]]+"")
    url.disabled = true
    entete.appendChild(prev)
    entete.appendChild(url)
    ecranDiv.appendChild(entete)
    ecranDiv.appendChild(contenu)

}
function shortCutEchap(e){
    var keynum;
    if(window.event) // IE
    {
        keynum = e.keyCode;
    }
    else if(e.which) // Netscape/Firefox/Opera
    {
        keynum = e.which;
    
    }
 
    if (keynum == 27){
        closeDivPleinEcran()
    }
}

function creationDivsIndicesCartes(){
    let table = document.getElementById("biblio2")
    for(let i = 0;i<2;i++){
        let dossier = document.createElement("div")
        dossier.setAttribute("id","dossier"+i)
        dossier.setAttribute("class","dossiers")
        dossier.style.left = 5+(i*13)+"%"
        dossier.style.top = -4-((i)*18)+"%"
        dossier.onclick = function(){
            idCarte = i + nbIndicesTextes
            consulterCarte(i)
        }
        table.appendChild(dossier)
    }
}
function consulterCarte(i){
    
    var audio = new Audio('./audio/papier.mp3');
    audio.play();
    document.getElementById("divPleinEcran").style.backgroundPosition = "45% 100%"
    document.getElementById("divPleinEcran").style.visibility = "visible"
    if(!cartesTabLiege[i]){
        document.getElementById("addIcon").style.visibility = "visible"
    }

    document.getElementById("quitIcon").style.visibility = "visible"
    document.getElementById("biblio2").style.opacity = "20%"
    document.getElementById("divPleinEcran").style.backgroundImage = "url('./img/lac.jpg')"

    let carte = document.createElement("div")
    carte.setAttribute("id","carteIndice")
    carte.style.backgroundImage = indicesCartes[nbIndicesTextes+ i].style.backgroundImage
    document.getElementById("divPleinEcran").appendChild(carte)
    document.getElementById("divPleinEcran").style.backgroundSize = "100%"
    
}
function closeDivPleinEcran(){
    document.getElementById("divPleinEcran").style.removeProperty("top")
    if(document.getElementById("carteIndice")){
        document.getElementById("carteIndice").remove()
    }
    if(document.getElementById("validIcon2")){
        document.getElementById("validIcon2").remove()
        
    }
    if(document.getElementById("postIt")){
        document.getElementById("postIt").remove()
        
    }

    document.getElementById("divPleinEcran").style.visibility = "hidden"
    document.getElementById("addIcon").style.visibility = "hidden"
    document.getElementById("quitIcon").style.visibility = "hidden"
    document.getElementById("pagePrevIcon").style.visibility = "hidden"
    document.getElementById("pageSuccIcon").style.visibility = "hidden"
    document.getElementById("bibliotheque").style.opacity = "100%"
    document.getElementById("biblio2").style.opacity = "100%"
    document.getElementById("map").style.opacity = "100%"
    if(ordi){
        if(document.getElementById("ecran")){
            document.getElementById("ecran").remove()
        }
        ordi = false
        var audio = new Audio('./audio/windowsStop.mp3');
        audio.play();
    }else{
        if(document.getElementById("pageGauche") && document.getElementById("pageDroite")){
            document.getElementById("pageGauche").remove()
            document.getElementById("pageDroite").remove()
        }
        var audio = new Audio('./audio/fermeLivre.mp3');
        audio.play();
    }

    document.getElementById("divPleinEcran").style.removeProperty('background-position');

    document.getElementById("divPleinEcran").style.removeProperty('padding-right');

    document.getElementById("divPleinEcran").style.paddingLeft = "0%"
    document.getElementById("divPleinEcran").style.paddingTop = "0%"


    clearLivre()
    numPageLivre = 0
    numPageLivre2 = 1
}
function addMapTabLiege(){
    document.getElementById("addIcon").style.visibility = "hidden"
    var audio = new Audio('./audio/pin.mp3');
    audio.play();
    let image = indicesCartes[idCarte]
    let rotation =  parseInt(Math.random() * (0 - -0) -0 )+"deg";
    let posX =  parseInt(Math.random() * (16 - 8) + 8);
    let posY =  parseInt(Math.random() * (16 - 8) + 8);
    let divImage = document.createElement("div")
    let quitIcon = document.createElement("div")
    quitIcon.style.visibility = "visible"
    quitIcon.setAttribute("class","quitIcon")
    quitIcon.setAttribute("id","quitIcon"+(idCarte-nbIndicesTextes))
    quitIcon.style.height = "23%"
    quitIcon.style.width = "15%"
    quitIcon.style.backgroundImage = "url('./img/quit.png')"
    quitIcon.style.backgroundSize = "100%"
    quitIcon.onclick = function(event){
        closeDivPleinEcran()
        console.log(Number(document.getElementById(event.target.id).parentElement.id.split("mapIndice")[1])-1)
        let id = Number(document.getElementById(event.target.id).parentElement.id.split("mapIndice")[1])-1
        console.log("RETIRONS "+("mapIndice"+Number(document.getElementById(event.target.id).parentElement.id.split("mapIndice")[1])-1))
        id = event.target.id.split("quitIcon")[1]
        console.log("ID : "+id)

        document.getElementById(event.target.parentElement.id).remove()
        
        let l = cartesTabLiege.length
        cartesTabLiege.splice(id,1)
        if(id<l -1){
            console.log("PB")
            cartesTabLiege.splice(id,0,null)
        }
        console.log(cartesTabLiege)
    }

    divImage.appendChild(quitIcon)
    image.style.position = "relative"

    image.style.backgroundSize = "100%"
    image.style.width = "100%"
    image.style.height = "100%"
    image.style.bottom = "3%"
    
    image.style.backgroundRepeat = "no-repeat"

    divImage.style.width = "8%"
    divImage.style.height = "20%"
    divImage.style.position = "relative"
    divImage.style.backgroundImage = "url('./img/lac.jpg')"
	divImage.style.rotate = rotation

    
    
    divImage.setAttribute("id","mapIndice"+idCarte)
    divImage.onmousedown = function(event){
        idSelectedCarte = event.target.id
        posSelectedCarte = [event.target.style.left.split("px")[0],event.target.style.top.split("px")[0]]
        posSelectedCarte2 = [event.screenX,event.screenY]
    }


    // console.log(posSelectedCarte)


    document.onmousemove = function(event){
        if(idSelectedCarte && posSelectedCarte[0] > 0 && posSelectedCarte[1] > 0){
            console.log(idSelectedCarte)
            console.log(posSelectedCarte)        

            let decX = Number(posSelectedCarte[0]) + (event.screenX - posSelectedCarte2[0])
            let decY = Number(posSelectedCarte[1]) + (event.screenY - posSelectedCarte2[1])
            console.log(decX,decY)
            document.getElementById(idSelectedCarte).style.left = decX+"px"
            document.getElementById(idSelectedCarte).style.top = decY+"px"

        }else{
            
        }

    }
    document.onmouseup = function(event){

        if(idSelectedCarte){
            console.log(posSelectedCarte)        

            let decX = Number(posSelectedCarte[0]) + (event.screenX - posSelectedCarte2[0])
            let decY = Number(posSelectedCarte[1]) + (event.screenY - posSelectedCarte2[1])
            console.log(decX,decY)
            if(decX != 0 && decY != 0){
                document.getElementById(idSelectedCarte).style.left = decX+"px"
                document.getElementById(idSelectedCarte).style.top = decY+"px"
            }else{
                idCarte = Number(event.target.id.split("mapIndice")[1])
                consulterCarte(idCarte - nbIndicesTextes)
            }

            idSelectedCarte = null
            posSelectedCarte = null
        }
    }
    
    divImage.appendChild(image)
    console.log(idCarte-nbIndicesTextes)
    cartesTabLiege[idCarte-nbIndicesTextes] = (image)
    console.log("ET NOUS Y")

    document.getElementById("tabLiege").appendChild(divImage)
    document.getElementById("tabLiege2")[i].appendChild(divImage)
    





}
function creationPopUp(titre,contenu,boutons,selector,mode,time,contenu2){


    $("#divPopUp").fadeIn(time,function(){

    });
    ecritTexte(titre,selector,mode)
    let divContenu = document.createElement("div")
    divContenu.setAttribute("id","contenuPopUp")
    divContenu.innerText = contenu
    let boutonsDiv = document.createElement("div")
    for(let i = 0;i<boutons.length;i++){
        boutonsDiv.setAttribute("id","boutonsDiv")
        boutons[i].style.width = ((100/boutons.length)-10)+"%"
        boutonsDiv.appendChild(boutons[i])
    }
    if(boutons.length==1){
        boutonsDiv.style.left = "4%"
    }
    if(mode==2 || mode==3){
        let divContenu2 = document.createElement("div")
        divContenu2.setAttribute("id","contenuPopUp2")

        let divInfluence = document.createElement("div")
        divInfluence.setAttribute("id","contenuInfluencePopUp")

        let nbInfluence = document.createElement("div")
        nbInfluence.innerText = influence
        nbInfluence.setAttribute("id","nbInfluence")
        nbInfluence.style.animation = "levelUp 1s ease-in-out infinite"

        let icoInfluence = document.createElement("img")
        icoInfluence.src = "./img/influence.png"
        icoInfluence.style.width = "50px"
        icoInfluence.style.height = "50px"
        let addInfluence = document.createElement("div")

        divInfluence.appendChild(nbInfluence)
        divInfluence.appendChild(icoInfluence)
        divInfluence.appendChild(addInfluence)

        divContenu2.appendChild(divInfluence)
        let nb = Number(contenu2)
        let signe = 0
        if(nb<0){
            signe = -1
        }else{
            signe = 1
        }
        addInfluence.innerText = " ("+nb+")"

        setTimeout(function(){

            let interval = setInterval(function(){


                nb = nb - signe

                if(signe > 0){
                    addInfluence.innerText = " ("+nb+")"
                }else{
                    addInfluence.innerText = " ("+nb+")"
                }
                influence = influence + signe
                console.log(influence)
                updateInterfaceGraphique("influence",influence)
                nbInfluence.innerText = influence
                if(nb==0){
                    addInfluence.remove()
                    setTimeout(function(){
                        nbInfluence.style.animation = "none"
                    },500)
 
                    clearInterval(interval)
                }
            },500)
        },3000)

  
        document.getElementById("divPopUp").appendChild(divContenu2)

    }
    document.getElementById("divPopUp").appendChild(divContenu)

    divContenu.appendChild(boutonsDiv)
    
}

function recupDataFormCarte(){
    let mode = ""
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height)

    let reperesAMontrer = []

    for(let i = 0;i<types.length;i++){
        if(document.getElementById(types[i]) && document.getElementById(types[i]).checked){
            reperesAMontrer[reperesAMontrer.length] = i
            mode = "A"
        }
    }
    if(document.getElementById("displaySearchCircles") && document.getElementById("displaySearchCircles").checked){
        mode += "B"
    }
    creationCarte(canvas.getContext("2d"),reperesAMontrer,mode)
}
function videFormCarte(){
    while(document.getElementById("formCarteContenu").childElementCount > 0){
        document.getElementById("formCarteContenu").lastChild.remove()
    }
}
function scanModeForm(){
    if(idModeForm <1 || idModeForm > 1){
        if(idModeForm<1){
            document.getElementById("affichagePrevIcon").style.visibility = "hidden"
        }
        if(idModeForm>1){
            document.getElementById("affichageSuccIcon").style.visibility = "hidden"
        }
    }else{
        document.getElementById("affichageSuccIcon").style.visibility = "visible"
        document.getElementById("affichagePrevIcon").style.visibility = "visible"
    }

    switch(idModeForm){
        case 0:
            modeCursor = 0
            document.getElementById("puzzle").style.cursor  ="unset"
            document.getElementById("titreFormCarte").innerText = "Affichage de la carte"
            let formCarteContenu = null
            if(!document.getElementById("formCarteContenu")){
                formCarteContenu = document.createElement("div")
            }else{
                formCarteContenu = document.getElementById("formCarteContenu")
            }
            formCarteContenu.setAttribute("id","formCarteContenu")
            let casesReperes = document.createElement("div")
            casesReperes.setAttribute("id","casesReperes")
            for(let i = 0;i<types.length;i++){
                let caseRepere = document.createElement("div")
                caseRepere.setAttribute("for",types[i])
                caseRepere.setAttribute("id","caseRepere")
                let img = document.createElement("img")
                img.setAttribute("src","img/"+types[i]+".png")
                img.style.width = "28%"
                img.style.height = "100%"
                img.style.position = "relative"
                img.style.left = "37%"
                caseRepere.appendChild(img)
                let checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.setAttribute("id",types[i])
                checkbox.setAttribute("checked","checked")
                caseRepere.appendChild(checkbox)
                let label = document.createElement("label")
                label.setAttribute("for",types[i])
                label.innerText = types[i] 
                caseRepere.appendChild(label)

                casesReperes.appendChild(caseRepere)
            }
            formCarteContenu.appendChild(casesReperes)

            let div = document.createElement("div")
            let img = document.createElement("img")
            img.setAttribute("src","img/searchCircle2.png")
            img.style.position = "relative"
            div.appendChild(img)
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.setAttribute("id","displaySearchCircles")
            div.appendChild(checkbox)
            let label = document.createElement("label")
            label.setAttribute("for","displaySearchCircles")
            label.innerText = "Affichage des recherches déjà effectuées"
            div.appendChild(label)
            if(document.getElementById("validIcon")){
                document.getElementById("validIcon").remove()
            }

            img = document.createElement("img")
            img.src = "img/valid.png"
            img.setAttribute("id","validIcon")
            img.setAttribute("onmouseover","document.getElementById('validIcon').setAttribute('src','img/valid0.png')")
            img.setAttribute("onmouseleave","document.getElementById('validIcon').setAttribute('src','img/valid.png')")
            img.onclick = function(){
                var audio = new Audio('./audio/button.mp3');
                audio.play();
                recupDataFormCarte()
            
            }


            formCarteContenu.appendChild(div)
            formCarteContenu.appendChild(img)
  

            if(!document.getElementById("formCarteContenu")){
                document.getElementById("formCarte").appendChild(formCarteContenu)

            }
            


        break
        case 1:
            document.getElementById("titreFormCarte").innerText = "Gestion des recherches"

            let formCarteContenu2 = document.getElementById("formCarteContenu")
            let divChoix = document.createElement("div")
            divChoix.setAttribute("id","divChoixDessin")
            let divSearchCircle = document.createElement("div")
            divSearchCircle.setAttribute("id","divSearchCircle")
            divSearchCircle.onclick = function(){
                modeCursor = 1
                document.getElementById("divSearchCircle").style.border= "2px solid cyan";
                document.getElementById("divSearchDepouille").style.border= "none";
                document.getElementById("divCrayon").style.border= "none";
                document.getElementById("divDessin").style.visibility = "hidden"
                document.getElementById("validIcone2").style.visibility = "visible"
            }
            let divSearchDepouille = document.createElement("div")
            divSearchDepouille.setAttribute("id","divSearchDepouille")
            divSearchDepouille.onclick = function(){
                modeCursor = 2
                document.getElementById("divSearchCircle").style.border= "none";
                document.getElementById("divCrayon").style.border= "none";
                document.getElementById("divSearchDepouille").style.border= "2px solid cyan";
                document.getElementById("divDessin").style.visibility = "hidden"
                document.getElementById("validIcone2").style.visibility = "visible"
            }
            let divCrayon = document.createElement("div")
            divCrayon.setAttribute("id","divCrayon")
            divCrayon.onclick = function(){
                divDessin.style.visibility = "visible"
                modeCursor = 3
                document.getElementById("divSearchCircle").style.border= "none";
                document.getElementById("divSearchDepouille").style.border= "none";
                document.getElementById("divCrayon").style.border= "2px solid cyan";
                document.getElementById("validIcone2").style.visibility = "hidden"
            }
            divChoix.appendChild(divSearchCircle)
            divChoix.appendChild(divSearchDepouille)
            divChoix.appendChild(divCrayon)
            if(document.getElementById("validIcone2")){
                document.getElementById("validIcone2").remove()
            }
            let img2 = document.createElement("img")
            img2.src = "img/valid.png"
            img2.setAttribute("id","validIcone2")
            img2.setAttribute("onmouseover","document.getElementById('validIcone2').setAttribute('src','img/valid0.png')")
            img2.setAttribute("onmouseleave","document.getElementById('validIcone2').setAttribute('src','img/valid.png')")
            img2.onclick = function(){
                var audio = new Audio('./audio/button.mp3');
                audio.play();
                validationForm()
            }
            let divDessin = document.createElement("div")
            divDessin.setAttribute("id","divDessin")
            let couleurs = document.createElement("input")
            couleurs.type = "color"
            couleurs.style.position = "relative"
            couleurs.style.top = "10%"
            let tailleCrayon = document.createElement("input")
            tailleCrayon.type ="number"
            tailleCrayon.value = 5
            tailleCrayon.setAttribute("size",2)
            tailleCrayon.onchange = function(){
                context.lineWidth = tailleCrayon.value
            }
            let txtTaille = document.createElement("div")
            txtTaille.innerText = "Taille du tracé"
            divDessin.appendChild(txtTaille)
            divDessin.appendChild(tailleCrayon)
            couleurs.onchange = function(){
                context.strokeStyle = couleurs.value
            }

            let txtCouleur = document.createElement("div")
            txtCouleur.innerHTML = "<br>Couleur du tracé"
            divDessin.appendChild(txtCouleur)
            divDessin.appendChild(couleurs)

            let erase = document.createElement("div")
            erase.setAttribute("id","eraseAllButton")

            erase.innerText = "Effacer tout"
            erase.setAttribute("class","boutonPopUp")
            erase.onclick = function(){
                var audio = new Audio('./audio/button.mp3');
                audio.play()
                canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height)
                creationCarte(canvas.getContext("2d"))
            }

            
            divDessin.appendChild(erase)



            formCarteContenu2.appendChild(divChoix)
            formCarteContenu2.appendChild(divDessin)
            formCarteContenu2.appendChild(img2)
        break
        case 2:
            document.getElementById("titreFormCarte").innerText = "Récapitulatif"
            let tableauLiege =  document.getElementById("tabLiege").cloneNode(true);

            tableauLiege.setAttribute("id","tabLiege2")
            tableauLiege.setAttribute("class","tabLiege")

            tableauLiege.style.left = "0%"
            tableauLiege.style.backgroundRepeat = "no-repeat"
            tableauLiege.style.width = "190%"
            document.getElementById("formCarteContenu").appendChild(tableauLiege)

            let addPostIt = document.createElement("div")
            addPostIt.setAttribute("id","addPostIt")

            addPostIt.innerText = "Ajouter un post it"
            addPostIt.setAttribute("class","boutonPostit")
            addPostIt.onclick = function(){
                var audio = new Audio('./audio/button.mp3');
                audio.play();
                affichePostIt()
            }
            document.getElementById("formCarteContenu").appendChild(addPostIt)

        break
    }
}
function affichePostIt(i){
    document.getElementById("divPleinEcran").style.visibility = "visible"
    document.getElementById("quitIcon").style.visibility = "visible"
    document.getElementById("map").style.opacity = "20%"
    document.getElementById("divPleinEcran").style.backgroundImage = "url('./img/postit.png')"
    document.getElementById("divPleinEcran").style.backgroundSize = "60%"
    document.getElementById("divPleinEcran").style.backgroundPositionX= "50%";
    document.getElementById("divPleinEcran").style.backgroundPositionY= "70%";
    let postIt = document.createElement("div")
    postIt.setAttribute("id","postIt")
    postIt.contentEditable = true
    let error = false
    if(i){
        if(!postIts[i]){
            error = true

            closeDivPleinEcran()
        }
        postIt.innerText = postIts[i]

    }

    let id = i 
    if(!id){
        id = postIts.length

    }





    img = document.createElement("img")
    img.src = "img/valid.png"
    img.setAttribute("id","validIcon2")
    img.setAttribute("onmouseover","document.getElementById('validIcon2').setAttribute('src','img/valid0.png')")
    img.setAttribute("onmouseleave","document.getElementById('validIcon2').setAttribute('src','img/valid.png')")
    img.onclick = function(){
        var audio = new Audio('./audio/button.mp3');
        audio.play();
        closeDivPleinEcran()



        postIt.setAttribute("id",id)
        postIt.setAttribute("class","postit")
        postIt.onclick = function(){
            affichePostIt(postIt.getAttribute("id"))
        }
        postIt.appendChild(quitIcon)

        if(!i){
            postIts.push(postIt.innerText)
            document.getElementById("tabLiege2").appendChild(postIt)
            console.log(document.getElementById("tabLiege2").childNodes)
            postIt = postIt.cloneNode(true);
            document.getElementById("tabLiege").appendChild(postIt)
            console.log(document.getElementById("tabLiege2").childNodes)
        }else{
            postIts[i] = postIt.innerText


            
            document.getElementById(i).innerText = postIt.innerText
        }
        

    }
    if(!error){
        document.getElementById("divPleinEcran").appendChild(img)
        document.getElementById("validIcon2").style.visibility = "visible"
        document.getElementById("divPleinEcran").appendChild(postIt)
    }

    let quitIcon = document.createElement("div")
    quitIcon.style.visibility = "visible"
    quitIcon.setAttribute("class","quitIcon")
    quitIcon.setAttribute("id","quitIcon"+(id))
    quitIcon.style.height = "23%"
    quitIcon.style.width = "15%"
    quitIcon.style.position = "relative"
    quitIcon.style.backgroundImage = "url('./img/quit.png')"
    quitIcon.style.backgroundSize = "100%"
    quitIcon.style.backgroundRepeat = "no-repeat"
    quitIcon.style.left = "82%"
    quitIcon.style.top = "-57%"
    console.log(document.getElementById("tabLiege2").childNodes)
    quitIcon.onclick = function(event){
        console.log(Number(document.getElementById(event.target.id)))
        let id = Number(document.getElementById(event.target.id))
        id = event.target.id.split("quitIcon")[1]
        console.log("ID : "+id)


        document.getElementById(id).remove()
        
        let l = postIts.length
        postIts.splice(id,1)
        if(id<l -1){
            console.log("PB")
            postIts.splice(id,0,null)
        }
        console.log(postIts)

    }
}
function determineCurseurCanvas(){

    switch(modeCursor){
        case 1:

            document.getElementById("puzzle").style = "cursor: url('./img/searchRepere|"+types[cursorRepere]+".png'),default;"
            console.log("./img/searchRepere|"+types[cursorRepere]+".png")
        break
        case 2:
            document.getElementById("puzzle").style = "cursor: url('./img/searchDepouille.png'),default;"
        break
        case 3:
            document.getElementById("puzzle").style = "cursor: url('./img/crayon.png'),default;"
        break
    }
}
function updateInterfaceGraphique(divId,val){
    document.getElementById(divId).innerText = val
}