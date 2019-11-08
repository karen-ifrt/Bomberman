//chosit un nombre aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let hero = document.getElementById("hero");
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
            hero.style.background = "url(images/haut1.gif)";
            break;

        //droite
        case 39:
            //code quand on va à droite
            move(hero, "droite");
            hero.style.background = "url(images/droit3.gif)";
            break;

        //bas
        case 40:
            //code quand on va en bas
            move(hero, "bas");
            hero.style.background = "url(images/bas2.gif)";
            break;

        //gauche
        case 37:
            //code quand on va à gauche
            move(hero, "gauche");
            hero.style.background = "url(images/gauche1.gif)";
            break;

        case 32:
            let bombes = document.querySelectorAll(".bomb");
            if (bombes.length < 3) {
                drop();
            }
            break;

        case 96:
            location.reload();
            break;
    }
});

// faire bouger l'ennemi dans une direction aléatoirement




setInterval(function () {
    let enemy = document.querySelectorAll(".enemy");

    for (let i = 0; i < enemy.length; i++) {

        let random = getRandomInt(4);

        switch (random) {
            case 0:
                if (parseInt(window.getComputedStyle(enemy[i]).getPropertyValue("top")) === 0) {
                    move(enemy[i], "bas");
                    // enemy.style.background = "url(images/ennemi/DEVANT.gif)";
                }
                else {
                    move(enemy[i], "haut");
                    // enemy.style.background = "url(images/ennemi/DEVANT.gif)";
                }
                break;
            case 1:
                if (parseInt(window.getComputedStyle(enemy[i]).getPropertyValue("top")) === 650) {
                    move(enemy[i], "haut");
                    // enemy.style.background = "url(images/ennemi/DEVANT.gif)";
                }
                else {
                    move(enemy[i], "bas");
                    // enemy.style.background = "url(images/ennemi/DEVANT.gif)";
                }
                break;
            case 2:
                if (parseInt(window.getComputedStyle(enemy[i]).getPropertyValue("left")) === 0) {
                    move(enemy[i], "droite");
                    // enemy.style.background = "url(images/ennemi/DROITE.gif)";
                }
                else {
                    move(enemy[i], "gauche");
                    // enemy.style.background = "url(images/ennemi/GAUCHE.gif)";
                }
                break;
            case 3:
                if (parseInt(window.getComputedStyle(enemy[i]).getPropertyValue("left")) === 650) {
                    move(enemy[i], "gauche");
                    // enemy.style.background = "url(images/ennemi/GAUCHE.gif)";
                }
                else {
                    move(enemy[i], "droite");
                    // enemy.style.background = "url(images/ennemi/DROITE.gif)";
                }
                break;
        }
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

    setTimeout(function() {
        bomb.classList.add("explosion");
    }, 2500);

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
let myenemy;
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

        if (compt == 0) {
            gameOver();
        }
    }
}

// Collision Ennemi Bombe (sans périmètre)

function checkBombEnemy() {
    let enemy = document.querySelectorAll(".enemy");

    for (let i = 0; i < enemy.length; i++) {

        myEnemy = { x: parseInt(window.getComputedStyle(enemy[i]).getPropertyValue("top")), y: parseInt(window.getComputedStyle(enemy[i]).getPropertyValue("left")), width: 50, height: 50 }
        myBomb = { x: top_bomb, y: left_bomb, width: 50, height: 50 }
        myPerimetre = { width: 50, height: 50 }

        if (myEnemy.x < myBomb.x + myBomb.width + myPerimetre.width &&
            myEnemy.x + myEnemy.width + myPerimetre.width > myBomb.x &&
            myEnemy.y < myBomb.y + myBomb.height + myPerimetre.height &&
            myEnemy.height + myEnemy.y + myPerimetre.height > myBomb.y) {
            scorePlus++;
            score.innerHTML = "SCORE : " + scorePlus;
            enemy[i].remove();

            console.log("collision bombe ennemi !");
        }
    }

}

// Collision Héros Ennemi

function checkCollision() {
    let enemy = document.querySelectorAll(".enemy");
    for (let i = 0; i < enemy.length; i++) {

        myHero = { x: parseInt(window.getComputedStyle(hero).getPropertyValue("top")), y: parseInt(window.getComputedStyle(hero).getPropertyValue("left")), width: 50, height: 50 }
        myEnemy = { x: parseInt(window.getComputedStyle(enemy[i]).getPropertyValue("top")), y: parseInt(window.getComputedStyle(enemy[i]).getPropertyValue("left")), width: 50, height: 50 }

        if (myHero.x < myEnemy.x + myEnemy.width &&
            myHero.x + myHero.width > myEnemy.x &&
            myHero.y < myEnemy.y + myEnemy.height &&
            myHero.height + myHero.y > myEnemy.y) {
            console.log("collision ennemi héros !");

            compt = compt - 1;
            life.innerHTML = "VIES : " + compt;

            if (compt == 0) {
                gameOver();
            }
        }
    }
}

// Game Over

let gameOv = document.querySelector('h1');
let replay = document.querySelector('#canvas .p-replay');

function gameOver() {
    game.classList.add("gameover");
    gameOv.innerHTML = "GAME OVER<br>" + "SCORE = " + scorePlus;
    replay.innerHTML = "Appuyez sur zéro pour rejouer";
    
    let enemy = document.querySelectorAll(".enemy");

    for (let i = 0; i < enemy.length; i++) {
        enemy[i].remove();
    }
    hero.remove();
}