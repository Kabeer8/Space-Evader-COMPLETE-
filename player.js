
let paused = false;
document.addEventListener("keydown", keydownHandler)
function keydownHandler(event){
    if(event.keyCode === 37){
        player.yVU = -6;
    }
    if(event.keyCode === 39){
        player.yVD = 6;
    }
    if(event.keyCode === 80){
        if (paused == false){
        cancelAnimationFrame(raf);
        paused = true;
        }
        else{
            animate();
        paused = false;
        }
    }
}
document.addEventListener("keyup", keyupHandler)
function keyupHandler(event){

    if(event.keyCode === 37){
        player.yVU = 0;
    }
    if(event.keyCode === 39){
        player.yVD = 0;
    }
}


