let influence = 2
let argent = 999
init()

window.onload=lecturePartie
async function lecturePartie(){
    await connexionPartie()



    if(partie.pieces.length > 0){
        recupertaionPartie()
    }else{
        lancementPartie()
    }

    fillSelectPlayer()
}
function lancementPartie(){
    init()
}
function recupertaionPartie(){
    affichePieces()
}

function init(){
    updateInterfaceGraphique("argent",argent)
    updateInterfaceGraphique("influence",influence)
}