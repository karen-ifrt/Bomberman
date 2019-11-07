//chosit un nombre aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let hero = document.getElementById("hero");
let enemy = document.getElementById("enemy");
let game = document.getElementById("canvas");


// fonction qui permet de bouger un élément dans une direction
function move(element, direction) {

    let top_element = parseInt(
        window.getComputedStyle(element).getPropertyValue("top")
    );
    let left_element = parseInt(
        window.getComputedStyle(element).getPropertyValue("left")
    );

    switch (direction) {
        case "bas":
            top_element = parseInt(
                window.getComputedStyle(element).getPropertyValue("top")
            );
            if (top_element < 650) {
                top_element += 50;
                element.style.top = top_element + "px";
            }
            break;
        case "haut":
            top_element = parseInt(
                window.getComputedStyle(element).getPropertyValue("top")
            );
            if (top_element > 0) {
                top_element -= 50;
                element.style.top = top_element + "px";
            }
            break;
        case "droite":
            left_element = parseInt(
                window.getComputedStyle(element).getPropertyValue("left")
            );
            if (left_element < 650) {
                left_element += 50;
                element.style.left = left_element + "px";
            }
            break;
        case "gauche":
            left_element = parseInt(
                window.getComputedStyle(element).getPropertyValue("left")
            );
            if (left_element > 0) {
                left_element -= 50;
                element.style.left = left_element + "px";
            }
            break;
    }
    checkCollision();
}

// event listener pour écouter les touches du clavier, et bouger le carré en fonction de ces touches
window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        //haut
        case 38:
            //code quand on va en haut
            move(hero, "haut");
            break;

        //droite
        case 39:
            //code quand on va à droite
            move(hero, "droite");
            break;

        //bas
        case 40:
            move(hero, "bas");
            //code quand on va en bas
            break;

        //gauche
        case 37:
            //code quand on va à gauche
            move(hero, "gauche");
            break;

        case 32:
            let bombes = document.querySelectorAll(".bomb");
            if (bombes.length < 5) {
                drop();
            }
            break;
    }
});

// faire bouger l'ennemi dans une direction aléatoirement




setInterval(function () {
    let random = getRandomInt(4);
    
    switch (random) {
        case 0:
            if (parseInt(window.getComputedStyle(enemy).getPropertyValue("top")) === 0) {
                move(enemy, "bas");
            }
            else {
                move(enemy, "haut");
            }
            break;
        case 1:
            if (parseInt(window.getComputedStyle(enemy).getPropertyValue("top")) === 650) {
                move(enemy, "haut");
            }
            else {
                move(enemy, "bas");
            }
            break;
        case 2:
            if (parseInt(window.getComputedStyle(enemy).getPropertyValue("left")) === 0) {
                move(enemy, "droite");
            }
            else {
                move(enemy, "gauche");
            }
            break;
        case 3:
            if (parseInt(window.getComputedStyle(enemy).getPropertyValue("left")) === 650) {
                move(enemy, "gauche");
            }
            else {
                move(enemy, "droite");
            }
            break;
    }
}, 1000)


// Création et explosion de la bombe

function drop() {
    let bomb = document.createElement("div");
    bomb.classList.add("bomb");
    game.appendChild(bomb);
    bombTop = window.getComputedStyle(hero).getPropertyValue("top");
    bombLeft = window.getComputedStyle(hero).getPropertyValue("left");
    bomb.style.top = bombTop;
    bomb.style.left = bombLeft;
    setTimeout(function () {
        checkBombEnemy();
        checkBombHero();
        bomb.remove();
    }, 3000);

    top_bomb = parseInt(window.getComputedStyle(bomb).getPropertyValue("top"));
    left_bomb = parseInt(window.getComputedStyle(bomb).getPropertyValue("left"));
}

// Collision Héros Bombe (sans périmètre)

let myHero;
let myEnemy;
let compt = 3;
let life = document.querySelector("#life p");
let score = document.querySelector("#score p");
let scorePlus = 0;

life.innerHTML = "VIES : " + compt;
score.innerHTML = "SCORE : " + scorePlus;


function checkBombHero() {
    myHero = { x: parseInt(window.getComputedStyle(hero).getPropertyValue("top")), y: parseInt(window.getComputedStyle(hero).getPropertyValue("left")), width: 50, height: 50 }
    myBomb = { x: top_bomb, y: left_bomb, width: 50, height: 50 }
    myPerimetre = { width: 50, height: 50 }

    if (myHero.x < myBomb.x + myBomb.width + myPerimetre.width &&
        myHero.x + myHero.width + myPerimetre.width > myBomb.x &&
        myHero.y < myBomb.y + myBomb.height + myPerimetre.height &&
        myHero.height + myHero.y + myPerimetre.height > myBomb.y) {
        console.log("collision bombe héros !");
        
        compt -= 1;
        life.innerHTML = "VIES : " + compt;
        
        if (compt == 0){
            gameOver();
        }
    }
}

// Collision Ennemi Bombe (sans périmètre)

function checkBombEnemy() {
    myEnemy = { x: parseInt(window.getComputedStyle(enemy).getPropertyValue("top")), y: parseInt(window.getComputedStyle(enemy).getPropertyValue("left")), width: 50, height: 50 }
    myBomb = { x: top_bomb, y: left_bomb, width: 50, height: 50 }
    myPerimetre = { width: 50, height: 50 }

    if (myEnemy.x < myBomb.x + myBomb.width + myPerimetre.width &&
        myEnemy.x + myEnemy.width + myPerimetre.width > myBomb.x &&
        myEnemy.y < myBomb.y + myBomb.height + myPerimetre.height &&
        myEnemy.height + myEnemy.y + myPerimetre.height > myBomb.y) {
            scorePlus ++;
            score.innerHTML = "SCORE : " + scorePlus;
            enemy.remove();
           
        console.log("collision bombe ennemi !");
    }
}

// Collision Héros Ennemi

function checkCollision() {
    myHero = { x: parseInt(window.getComputedStyle(hero).getPropertyValue("top")), y: parseInt(window.getComputedStyle(hero).getPropertyValue("left")), width: 50, height: 50 }
    myEnemy = { x: parseInt(window.getComputedStyle(enemy).getPropertyValue("top")), y: parseInt(window.getComputedStyle(enemy).getPropertyValue("left")), width: 50, height: 50 }

    if (myHero.x < myEnemy.x + myEnemy.width &&
        myHero.x + myHero.width > myEnemy.x &&
        myHero.y < myEnemy.y + myEnemy.height &&
        myHero.height + myHero.y > myEnemy.y) {
        console.log("collision ennemi héros !");

        compt = compt - 1;
        life.innerHTML = "VIES : " + compt;

        if (compt == 0){
            gameOver();
        }
    }
}

let gameOv = document.querySelector('h1');

function gameOver () {
    game.classList.add("gameover");
    gameOv.innerHTML = "GAME OVER<br>" + "SCORE = " + scorePlus;
    enemy.remove();
    hero.remove();
}