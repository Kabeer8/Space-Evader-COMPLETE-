
let paused = false;
let halt = 0;
document.addEventListener("keydown", keydownHandler)
function keydownHandler(event){
    if(event.keyCode === 37){
        player.yVU = -6;
    }
    if(event.keyCode === 39){
        player.yVD = 6;
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
    if(event.keyCode === 80 && go == true){
        if (paused == false){
            music.pause();
            missileSFX.pause();
            ctx.drawImage(fade, 0, 0, 190, 190, 0, 0, 1300, 520);
            ctx.drawImage(gamePause, 0, 0, 394, 360, 575, 150, 200, 200);
            cancelAnimationFrame(raf);
            halt = 1.7;
            paused = true;
        }
        else{
            animate();
            halt = 0;
            music.play();
            missileSFX.play();
        paused = false;
        }
    }
    if(event.keyCode === 73){
        info.play()
        text("Your mission: Evade the missiles deployed by the destroyer", 100, 330, "white" );
        text("while cruising through an asteroid belt. The destroyer is", 100, 360, "white" );
        text("slow and not suited to its current environment. Use this", 100, 400, "white" );
        text("to your advantage. Use the left arrow key to go up and the", 100, 440,"white");
        text("right one to go down. Once ready, you may press the space", 100, 480,"white");
        text("bar to start, good luck.", 100, 520,"white");
    }
    if(event.keyCode === 32){
        if(go == false){
            animate()
            music.play();
            setInterval(function(){
                villainHP -= 1.7;
                villainHP += halt;
            },1000);
            go = true;
        }
        info.pause();
        info.currentTime = 0;
        if(playerHP == 0 || villainHP <= 0){
            location.reload();
        }
    }
}


