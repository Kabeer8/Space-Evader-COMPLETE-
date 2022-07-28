//Creates Canvas
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.height = 620;
cnv.width = 1300;
let animateIndex = 1;
let playerHP = 100;
let villainHP = 100;
let fire = true;
let go = false;

//Creates player 
let goodGuy = new Image();
goodGuy.src = "assets/Protaginist Ship Frames.png";
let player = {x:800, y:310, yVU:0, yVD:0, w:80, h:30, yF:0};

//Creates badGuy
let badGuy = new Image();
badGuy.src = "assets/Bad Guy Frames.png";
let villain = {x:0, y:310, yV:0, w:400, h:250, yF:0};

//Create laser and bullet
function laser(x1,y1,x2,y2,c){
    ctx.strokeStyle = c;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = 1;
    ctx.stroke();
}
let missile = new Image();
missile.src = "assets/Missile Frames.png";
let bullet = {x: villain.x + 400, y: villain.y + 170, w: 0, h: 0, yF: 0};

//Create Asteroids
let asteroids = [];
for(i = 0; i < 30; i++){
asteroidsGen()
}

function asteroidsGen(){
    asteroids.push(newAsteroid(Math.floor((Math.random() * 1000) + 1300),
    Math.floor(Math.random() * 530),
    Math.floor((Math.random() * 3) + 10),
    (Math.random() * 3) + 6));
    }
function newAsteroid(initX, initY, initR, initS){
    return{
        x: initX,
        y: initY,
        r: initR,
        s: initS
    };
}
function drawAsteroids(asteroid){
    x = asteroid.x
    y = asteroid.y
    r = asteroid.r
    ctx.fillStyle = "lightgrey"
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fill();
}

function animateAsteroids(asteroid){
    asteroid.x -= asteroid.s
}

function dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

//Create rectangle
function rect(x,y,w,h,c){
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
}
let badBar = "green"
let goodBar = "green"

//UI text
function text(text, x, y,c){
    ctx.fillStyle = c;
    ctx.font = "20px Courier New";
    ctx.fillText(text, x, y);
}

// creates sounds effects

let loss = new Audio("assets/Lose.mp3");
let hit = new Audio ("assets/Hit.mp3");
let missileSFX = new Audio ("assets/missile.mp3");
let win = new Audio ("assets/Win.mp3");
let boom = new Audio ("assets/Boom.mp3");
let info = new Audio("assets/instructions.mp3")
let music = new Audio("assets/ItHasToBeThisWay.mp3")
missileSFX. volume = 0.4;
music.volume = 0.5;


let raf
function animate(){
    raf = requestAnimationFrame(animate) 
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for(i = 0; i < asteroids.length; i++){
        animateAsteroids(asteroids[i]);
        drawAsteroids(asteroids[i]);
         if (asteroids[i].x <= 0){
            asteroids[i].x = 1300;
            asteroids[i].y = Math.floor(Math.random() * 630);
         }
         for(d = 0; d < 80; d++){
            if(dist(player.x + d, player.y + 15, asteroids[i].x , asteroids[i].y) <= 15){
                hit.play()
                playerHP -= 10;
                asteroids[i].x = 1300;
                asteroids[i].y = Math.floor(Math.random() * 630);
            }
        }
    }
    if (animateIndex == 3){
        setTimeout(() => {
            player.yF = 800;
            villain.yF = 935;
            bullet.yF = 250;
            animateIndex = 2;
        }, 50);
    }
    if (animateIndex == 2){
        setTimeout(() => {
            player.yF = 400;
            villain.yF = 475;
            bullet.yF = 125;
            animateIndex = 1;
        }, 50);
    }
    if (animateIndex == 1){
        setTimeout(() => {
            player.yF = 0;
            villain.yF = 0;
            bullet.yF = 0;
            animateIndex = 3;
        }, 50);
    }
    ctx.drawImage(goodGuy, 0, player.yF, 1302, 364, player.x, player.y, player.w, player.h);
    ctx.drawImage(badGuy, 0, villain.yF, 936, 450, villain.x, villain.y, villain.w, villain.h);
    player.y += player.yVU;
    player.y += player.yVD;
    villain.y += villain.yV;

    if(player.y >= 500 ){
        player.yVU = 0;
        player.y = 500;
    }
    if(player.y <= 10 ){
        player.yVD = 0;
        player.y = 10;
    }

    if(player.y > villain.y + 160){
            villain.y += 1;
    }
    if(player.y < villain.y + 160){
        villain.y -= 1;
    }
    if (villain.y <= 0){
        villain.y = 0;
    }
    if (villain.y >= 300){
        villain.y = 300;
    }
    if(villain.y <= player.y && villain.y >= player.y - 300){
        laser(villain.x + 400,villain.y + 175,player.x,player.y + 10, "red");
        setTimeout(function(){
            if(fire == true){
                bullet = {
                    x : villain.x + 400,
                    y: villain.y + 170,
                    w: 60,
                    h: 10,
                }
                missileSFX.play();
            };
        }, 2000);
    }
    ctx.drawImage(missile, 0, bullet.yF, 986, 100, bullet.x, bullet.y, bullet.w, bullet.h);
    if(bullet.w == 60){
        bullet.x += 8;
        fire = false;
    }
    if(fire == false){
        if(bullet.y > player.y + 5 ){
            bullet.y -= 3;
        }
        if(bullet.y < player.y + 5 ){
            bullet.y += 3;
        }
        if(bullet.x >= 2500){
            missileSFX.pause();
            missileSFX.currentTime = 0;
            bullet.x = villain.x + 400;
            bullet.y = villain.y + 170
            fire = true;
        }
        if(bullet.y == villain.y + 170){
            missileSFX.play()
        }
    }
    for(d = 0; d < 80; d++){
        if(dist(player.x + d, player.y + 15, bullet.x + d, bullet.y) <= 15){
            missileSFX.pause();
            missileSFX.currentTime = 0;
            boom.play()
            playerHP -= 50;
            bullet.x = 1300;
        }
    }
    //UI
    rect(0, 520,1300, 100, "DarkSlateGray");
    text("Destroyer", 250, 550, "white" );
    text("Player", 950, 550,"white" );
    rect(50, 560, 500, 50, "black");
    rect(750, 560, 500, 50, "black");
    if (playerHP <= 0){ playerHP = 0;}
    if (villainHP <= 0){villainHP = 0;}
    if (villainHP <= 40){badBar = "yellow";} 
    if(villainHP <= 20){badBar = "red";}
    if (playerHP <= 40){goodBar = "yellow";} 
    if(playerHP <= 20){goodBar = "red";}
    rect(50, 560, villainHP*5, 50, badBar);
    rect(750, 560, playerHP*5, 50, goodBar);
    text(Math.round(villainHP) +"%", 275, 580, "white" );
    text(playerHP +"%", 950, 580, "white" );

    if (playerHP <= 0){
        rect(0, 0, 1300, 520, "black");
        text("Objective failed, refresh to try again.", 425, 250, "red" );
        music.pause();
        music.currentTime = 0;
        loss.play();
        cancelAnimationFrame(raf)
    }
    if (villainHP <= 0){
        missileSFX.pause();
        rect(0, 0, 1300, 520, "black");
        text("Objective complete, refresh to play again.", 425, 250, "green" );
        cancelAnimationFrame(raf);
    }
}

text("Press space to start", 525, 250, "white" );
text("Press 'i' for information", 500, 270, "white" );

document.addEventListener("keyup", start)
function start(event){
    if(event.keyCode === 73){
        info.play()
        text("Your mission: Evade the missiles deployed by the destroyer while cruising through an ", 125, 300, "white" );
        text("asteroid belt. The destroyer is slow and not suited to its current environment. Use ", 125, 320, "white" );
        text("this to your advantage. Use the left arrow key to go up and the right one to go down.", 125, 340, "white" );
        text("Once ready, you may press the space bar to start, good luck.", 250, 360,"white");
    }
    if(event.keyCode === 32){
        if(go == false){
            animate()
            music.play();
            setInterval(function(){
                villainHP -= 1.7;
            },1000);
            go = true;
        }
        info.pause();
        info.currentTime = 0;
    }
}

