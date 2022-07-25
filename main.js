//Creates Canvas

let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.height = 620;
cnv.width = 1300;
let animateIndex = 1;
let playerHP = 100;
let villainHP = 100;
let fire = true;


//Creates player 
let goodGuy = new Image();
goodGuy.src = "img/Protaginist Ship Frames.png";
let player = {x:800, y:310, yVU:0, yVD:0, w:70, h:20, yF:0};

//Creates badGuy
let badGuy = new Image();
badGuy.src = "img/Bad Guy Frames.png";
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
missile.src = "img/Missile Frames.png";
let bullet = {x: villain.x + 400, y: villain.y + 170, w: 0, h: 0, yF: 0};

//Create Asteroids
let asteroids = [];
for(i = 0; i < 30; i++){
asteroidsGen()
}

function asteroidsGen(){
    asteroids.push(newAsteroid(Math.floor((Math.random() * 1000) + 1300),
    Math.floor(Math.random() * 630),
    Math.floor((Math.random() * 3) + 10),
    Math.floor((Math.random() * 2) + 5)));
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
    ctx.fillStyle = "brown"
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

//UI text
function text(text, x, y,c){
    ctx.fillStyle = c;
    ctx.font = "20px Courier New";
    ctx.fillText(text, x, y);
}

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
         for(d = 0; d < 67; d++){
            if(dist(player.x + d, player.y, asteroids[i].x , asteroids[i].y) <= 10){
                playerHP -= 10;
                asteroids[i].x = 1300;
                asteroids[i].y = Math.floor(Math.random() * 630);
            }
        }
        for(d = 0; d < 310; d++){
            if(dist(villain.x, villain.y + d, asteroids[i].x, asteroids[i].y) <= 30){
                villainHP -= 0.5;
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
                    c: "blue"
                }
            };
        }, 2000);
    }
    ctx.drawImage(missile, 0, bullet.yF, 986, 100, bullet.x, bullet.y, bullet.w, bullet.h);
    if(bullet.w == 60){
        bullet.x += 10;
        fire = false;
    }
    if(fire == false){
        if(bullet.y > player.y ){
            bullet.y -= 2;
        }
        if(bullet.y < player.y ){
            bullet.y += 2;
        }
        if(bullet.x >= 2000){
            bullet.x = villain.x + 400;
            fire = true;
        }
        
    }
    for(d = 0; d < 67; d++){
        if(dist(player.x + d, player.y, bullet.x + d, bullet.y) <= 10){
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
    rect(50, 560, villainHP*5, 50, "green");
    rect(750, 560, playerHP*5, 50, "green");
    text(villainHP +"%", 275, 580, "white" );
    text(playerHP +"%", 950, 580, "white" );

    if (playerHP <= 0){
        rect(0, 0, 1300, 520, "black");
        text("Objective failed, refresh to try again.", 425, 250, "red" );
        cancelAnimationFrame(raf)
    }
    if (villainHP <= 0){
        rect(0, 0, 1300, 520, "black");
        text("Objective complete, refresh to play again.", 425, 250, "green" );
        cancelAnimationFrame(raf)
    }
}

animate()