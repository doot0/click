/**
 * Created by Kamill on 2017-03-30.
 */
(function () {

    var levels = document.getElementsByClassName("level"),
        levelAmount = document.querySelector(".level-amount"),
        background = document.querySelector(".container"),

        mobScreen = document.querySelector(".game-screen"),
        mob = document.querySelector(".monster"),

        button = document.querySelector(".btn"),
        criticalHitInformation = document.querySelector(".critical-hit"),
        criticalHit = document.querySelector(".critical-hit"),

        informationText = document.querySelector("#information-text"),
        information = document.querySelector(".information"),


        health = document.querySelector(".health"),
        healthMob = document.querySelector(".health-mob"),
        damageHealth = document.querySelector(".damaged");



    var healthLevel = [10000,20000,30000,40000,50000,60000,70000,80000,90000,100000];
    var textLevels = ["Wow, you made him! Let's see what would you do with another one!",
        "Hah! This one is really easy for you! You are good player!",
        "Really nice! Who are you? Men in black?!",
        "You are such a good player... But this monster would kill you!",
        "Aww... Just how?! Let's see your skills in next level!",
        "Wow, that was really amazing. How did you do that?",
        "Incredible! You got really fast hand. You killed him so fast!",
        "Awesome! That's 8'th level! Amazing player...",
        "LOL, That's one before last monster! Would you kill him? ",
        "You WON IT! All monsters are defeated! CONGRATULATIONS!"];
    var monsterImages = ["monsterOne","monsterTwo","monsterThree","monsterFour","monsterFive","monsterSix","monsterSeven","monsterEight","monsterNine","monsterTen"];

    button.addEventListener("click", function(){
        button.classList.add("none");
        mobScreen.classList.add("active");
        levelAmount.classList.add("active");
        health.classList.add("active");
        mob.src = "_img/" + monsterImages[0] + ".png";
        mob.classList.add("monster-active");
    });

    var i = 0,
        max=9,
        life = 100,
        damaged = 0,
        healthMobs = healthLevel[i],
        maxLevel = levels.length - 1,
        url = "Lava",
        hit = 100;


    console.log(i + "URL: " + url);
    levels[maxLevel].classList.add("acutal");
    moveBackground(url);

    mobScreen.addEventListener("click", function () {
        if(i<healthLevel.length) {
            if (healthMobs > hit) {
                updateLife();
            } else {
                criticalHitInformation.classList.remove("critical-hit-active");
                setInformation();
            }
        }
    });

    function updateLife(){
        setCriticalHit();
        healthMobs = healthMobs - hit;
        damaged = hit * 100 / healthLevel[i];
        life = life - damaged;
        if(healthMobs - hit <= 0){
            damaged = life;
            life = 0;
        }
        damageHealth.style.width = damaged + "%";
        damageHealth.style.left = life + "%";
        setTimeout(function () {
            damageHealth.style.width = "0%";
        },300);
        healthMob.style.width = life + "%";

    }

    function changeLevel (){
        life = 100;
        damageHealth.style.width = "0%";
        healthMob.style.width = "100%";
        levels[max--].classList.add("level-done");
        levels[max].classList.add("acutal");
        i++;
        healthMobs  = healthLevel[i];

    }

    function nextLevel(){
        mob.classList.add("monster-active");
        information.classList.add("deactive");
        mobScreen.classList.remove("deactive");
        levelAmount.classList.remove("deactive");
        health.classList.remove("deactive");

    }

    function setInformation(){

        healthMob.style.width = "0%";
        informationText.innerText = "";
        informationText.innerText = textLevels[i];
        information.classList.add('information-active');
        mob.classList.remove("monster-active");
        console.log(i);
        if(i != 9){
            setTimeout(function(){
                information.classList.remove('information-active');
                nextLevel();
                changeLevel();
                setMobImage();

            }, 3000);
        } else {
            lastLevel();
        }
    }

    function lastLevel(){
        mobScreen.classList.add("deactive");
        levelAmount.classList.add("deactive");
        health.classList.add("deactive");
        criticalHitInformation.classList.remove("critical-hit-active");
        if( i == 9 ) {
            url = "Sea";
            moveBackground(url);
            resetLevel();
        }
    }
    function moveBackground(url){
        var moveX = 0;

        background.style.background = "url(_img/" + url + ".jpg)";
        var backgroundMove = setInterval(function () {
            if(i == 9 && url == "Lava"){
                clearInterval(backgroundMove);
            }
            moveX = moveX - 1;
            background.style.backgroundPosition = moveX + "px 0";
        },60);
    }

    function setCriticalHit(){
        criticalHitInformation.classList.remove("critical-hit-active");
        var lotteryNumber = Math.floor(Math.random() * healthLevel.length);
        console.log(hit);
        if( lotteryNumber === 2){
            hit = hit * 5;
            criticalHitInformation.classList.add("critical-hit-active");

            var roundX = Math.floor(Math.random() * 30)+ 35,
                roundY = Math.floor(Math.random() * 25) + 20;
            criticalHit.style.top = roundX + "%";
            criticalHit.style.right = roundY + "%";
        } else {
            hit = 100;
        }
        return hit;
    }
    function setMobImage() {
        mob.src = "_img/"+ monsterImages[i] + ".png";
    }

    function resetLevel(){
        if(i == 9){
            information.addEventListener("click",function () {
                i = 0;
            })
        }
    }

})();