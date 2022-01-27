


function ecritTexte(str,selector,mode){
    document.querySelector("#divPopUp").style.visibility = "visible"
    let wrapper = document.createElement("div")
    wrapper.setAttribute("class","wrapper")
    for(let i = 0;i<str.length;i++){
        let lettre = document.createElement("span")
        lettre.innerText = str[i]
        lettre.style.width = "30px"
        if(mode==0 || mode==3){
            lettre.style.animation = "none"
        }
        wrapper.appendChild(lettre)
    }
    wrapper.style.zIndex = 1001
    wrapper.style.position = "fixed"
    
    document.getElementById("divPopUp").appendChild(wrapper)
    

}