// Déplacement héros

let myHero = document.getElementById('hero');
let bottom = 0;
let left = 0;

function move(e) {
    let key = e.keyCode;

    if (key == 38) {
        bottom += 50;
        myHero.style.bottom = bottom + "px";
    }
    if (key == 39) {
        left += 50;
        myHero.style.left = left + "px";
    }
    if (key == 37) {
        left -= 50;
        myHero.style.left = left + "px";
    }
    if (key == 40) {
        bottom -= 50;
        myHero.style.bottom = bottom + "px";
    }

    if (bottom == 600) {
        bottom = 0;
        myHero.style.bottom = bottom + "px";
    }
    if (left == 900) {
        left = 0;
        myHero.style.left = left + "px";
    }
    if (left <= -50) {
        left = 850;
        myHero.style.left = left + "px";
    }
    if (bottom <= -50) {
        bottom = 550;
        myHero.style.bottom = bottom + "px";
    }
}
document.onkeydown = move;



let direction = Math.floor(Math.random() * 4);

let myEnemy = document.getElementById('enemy');
let randomBottom = Math.floor(Math.random() * 500);
let randomTop = Math.floor(Math.random() * 500);
let randomLeft = Math.floor(Math.random() * 500);
let randomRight = Math.floor(Math.random() * 500);

function randomEnemy(){

    let direction = Math.floor(Math.random() * 4);

if (direction = 1) {
    bottom = randomBottom ;
    myEnemy.style.bottom = bottom + "px";
}
if (direction = 0) {
    bottom = randomTop ;
    myEnemy.style.bottom = bottom + "px";
}
if (direction = 2) {
    left = randomLeft ;
    myEnemy.style.left = left + "px";
}
if (direction = 3) {
    left = randomRight ;
    myEnemy.style.left = left + "px";
}

}

randomEnemy();

console.log(direction);
console.log(randomBottom);
