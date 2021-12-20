const mainBox = document.querySelector(".main-box");
const finishBox = document.querySelector(".finishing-box");
const startBox = document.querySelector(".starting-box");
const audioWin = document.querySelector("#audioWin");
const audio = document.querySelector("#audio");
const error = document.querySelector("#error");
const start = document.querySelector("#start");

start.addEventListener('click', () => {
    startBox.style.display = "none";
    mainBox.style.display = "block";
})


function startMusic(){
    audio.play();
}

//  VARIABLES OF MIAN
const board = document.querySelector(".bord")
let boxAddString;

function  addBoxes(){
    boxAddString = "";
    for(let i = 0; i < 25; i ++){
        boxAddString += `<div class="boxes">
                <div onclick="getIdElement(this, this.id)" id="${i}" class="box"></div>
            </div>`;
    }
}addBoxes();
board.innerHTML = boxAddString;

//Random sonlar
function randomNumber(max, min = 0){
    return Math.floor(Math.random() * (max - min)) + min;
}

const boxes = document.querySelectorAll(".box");
const score = document.querySelector("#score");
let countScore = 0;
const maxTime = 15;
let timeCounter = 15;

function reload() {
    randNum = randomNumber(24, 0);




    boxes.forEach((element, index) => {
            if (randNum === index) {
                element.style.backgroundColor = "yellow"
            }
            element.addEventListener('click', () => {
                if (index === randNum) {
                    element.style.backgroundColor = "green";
                    reload();
                } else {
                    element.style.backgroundColor = "red";
                    reload();
                }
            })
        }
    )
}
let randNum;
function paintBoxWithRandom(oldElement){
    randNum = randomNumber(24, 0) + "";

    if (randNum === oldElement){
        paintBoxWithRandom(oldElement);
    }

    for (const box of boxes) {
        if(box.id === randNum){
            box.style.backgroundColor = "#ff9f1a";
            break;
        }
    }
}paintBoxWithRandom();

function getIdElement(element, elementId){
    if (randNum === elementId){
        audioWin.play();
        countScore ++;
        score.innerHTML = countScore;
        paintBoxWithRandom(elementId + "");
        element.style.backgroundColor = "#2C5364"
    }else{
        error.play();
        countScore --;
        if (countScore <= 0){
            mainBox.style.display = "none";
            finishBox.style.display = "block"
        }
        score.innerHTML = countScore;
    }
}
let interval;
const line = document.querySelector(".min-line");
function changeWidthLine(){
    line.style.width = (timeCounter / maxTime) * 100 + "%"
}

function startTime() {
    interval = setInterval(() => {
        if(timeCounter <= 0){
            mainBox.style.display = "none";
            finishBox.style.display = "block"
            clearInterval(interval);
            return 0;
        }
        timeCounter --;
        changeWidthLine();
    }, 1000)
}startTime();