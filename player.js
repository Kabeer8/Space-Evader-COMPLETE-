

document.addEventListener("keydown", keydownHandler)
function keydownHandler(event){

    if(event.keyCode === 65){
        player.yVU = -5;
    }
    if(event.keyCode === 68){
        player.yVD = 5;
    }


}
document.addEventListener("keyup", keyupHandler)
function keyupHandler(event){

    if(event.keyCode === 65){
        player.yVU = 0;
    }
    if(event.keyCode === 68){
        player.yVD = 0;
    }
}


