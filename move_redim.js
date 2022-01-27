
/*---------------------------------------------------------------
Vous pouvez utiliser ce code librement
Toutefois laissez les lignes suivantes
code trouver sur : http::/jpconnexion.free.fr
Si vous modifiez ce code merci de bien vouloir nous en informer
à l'adresse emai suivante: claudecnx@blanquefort.net
---------------------------------*/


var iex = document.all;
var isdrag=false;
var x_ini, y_ini;
var width_ini, height_ini;
var dobj;
var eventButton;//2 si bouton droit


function movemouse(e) {
		if(eventButton==2) {
		/* --------------------------------------
		ne pas mettre de fonction alert() dans cet evenement => fonctionne en sonnette!!!
		Détecte un click droit
		permet lors d'un click droit de modifier la taille d'une image dynamiquement
		---------------------------------------- */
		dobj.style.width = iex ? width_ini + eval(event.clientX - x_ini) : width_ini + eval(e.clientX - x_ini);   // on recupere la nouvelle taille en X;
		dobj.style.height = iex ? height_ini + eval(event.clientY - y_ini) : height_ini + eval(e.clientY - y_ini); // on recupere la nouvelle taille en Y;
	}
	else {
		/*-----------------------------------------
		l'évènement est un clic gauche
		gère le déplacement de l'objet en fonction des nouvelles coordonnées de la souris
		----------------------------------------*/
		if (isdrag) {
				 dobj.style.left = iex ? tx + event.clientX - x_ini : tx + e.clientX - x_ini;
				 dobj.style.top  = iex ? ty + event.clientY - y_ini : ty + e.clientY - y_ini;
				 return false;
		 }
	}
}



function selectmouse(e) {
		eventButton = iex ? event.button: e.button;//indique le bouton cliqué
        isdrag = true;
        tx = parseInt(dobj.style.left+0); //position initiale de l'objet sur l'axe des x
        ty = parseInt(dobj.style.top+0); //position initiale de l'objet sur l'axe des y
        
        x_ini = iex ? event.clientX : e.clientX; //position initiale de la souris sur l'axe des x
        y_ini = iex ? event.clientY : e.clientY; //position initiale de la souris sur l'axe des y
		
		width_ini = dobj.width; //largeur initiale de l'objet
		height_ini = dobj.height; //hauteur initiale de l'objet


        document.onmousemove=movemouse; //2ieme gestionnaire pour déplacement de l'objet
        return false;
}

function selectObjet(obj){
        //fournit l'objet image à déplacer
        identificateur=obj.id;
        dobj=document.getElementById(identificateur);
}

function noContextMenu() {
	return(false);// anti click droit
}

document.getElementById("idImage").onmousedown=selectmouse;
document.onmouseup=new Function("isdrag=false");
document.oncontextmenu = noContextMenu; //évite l'apparition du menu contextuel lors d'une click droit


