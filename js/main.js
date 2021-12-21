const mainBox = document.querySelector(".main-box");
const finishBox = document.querySelector(".finishing-box");
const startBox = document.querySelector(".starting-box");
const audioWin = document.querySelector("#audioWin");
const audio = document.querySelector("#audio");
const error = document.querySelector("#error");
const start = document.querySelector("#start");
const yourScore = document.querySelector("#yourScore");
const yourRecord = document.querySelector("#yourRecord");
const tbody = document.querySelector("#tbody");


start.addEventListener('click', () => {
    startTime();
    startBox.style.display = "none";
    mainBox.style.display = "block";
    audio.play();
})


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

let isOldScore = false;
function checkBestScore(){
    if(isOldScore) return 0;

    yourScore.innerHTML = countScore;
    let oldBestScore = +localStorage.getItem("BestScore");

    if(countScore > oldBestScore){
        localStorage.setItem("BestScore", countScore);
        yourRecord.innerHTML = countScore;
        yourScore.style.color = "green";

    }else{
        yourRecord.innerHTML = oldBestScore;
        yourScore.style.color = "red";
    }

    let allScores = JSON.parse(localStorage.getItem("allScores")) || [];

    let scores = [...allScores, countScore].sort((a, b) => a - b);
    scores = [...new Set(scores)];

    let topScores = scores.slice(-7);

    localStorage.setItem("allScores", JSON.stringify(scores))

    topScores.reverse().map((e, i) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");

        td1.innerHTML = i + 1;
        td2.innerHTML = e;
        td3.innerHTML = e;

        if(e === countScore){
            tr.style.backgroundColor = "aqua";
            td3.style.color = "black";
            td2.style.color = "black";
            td1.style.color = "black";
            td3.style.fontWeight = "bold";
            td2.style.fontWeight = "bold";
            td1.style.fontWeight = "bold";
        }

        tbody.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
    })

}

function getIdElement(element, elementId){
    if (randNum === elementId){
        audioWin.play();
        countScore ++;
        paintBoxWithRandom(elementId + "");
        score.innerHTML = countScore;
        element.style.backgroundColor = "#1c6174"
    }else{
        error.play();
        countScore --;
        if (countScore <= 0){
            countScore = 0;
            checkBestScore();
            mainBox.style.display = "none";
            finishBox.style.display = "block"
            clearInterval(interval);
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
            checkBestScore();
            mainBox.style.display = "none";
            finishBox.style.display = "block"
            clearInterval(interval);
            return 0;
        }
        timeCounter --;
        changeWidthLine();
    }, 1000)
}


function reloadPage(){
    window.location.reload();
}