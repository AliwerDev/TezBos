const mainBox = document.querySelector(".main-box");
const finishBox = document.querySelector(".finishing-box");
const startBox = document.querySelector(".starting-box");
const audioWin = document.querySelector("#audioWin");
const audio = document.querySelector("#audio");
const error = document.querySelector("#error");
const yourScore = document.querySelector("#yourScore");
const yourRecord = document.querySelector("#yourRecord");
const gameTime = document.querySelector("#gameTime");
const tables = document.querySelector(".tables");
const audioBox = document.querySelector(".audioControle");
const timeLimit = document.querySelectorAll(".timeLimit");
const line = document.querySelector(".min-line");
const board = document.querySelector(".bord");
let boxAddString;
let allScore15, allScore30, allScore60;

const thead = ` <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Your Best Scores</th>
                        <th scope="col">Time Limit</th>
                    </tr>
                </thead>`

//Boxslarni to`ldiriah
function  addBoxes(){
    boxAddString = "";
    for(let i = 0; i < 25; i ++){
        boxAddString += `<div class="boxes">
                <div onclick="getElementId(this)" id="box${i}" class="box">
                    <h1>${String.fromCharCode(i + 65)}</h1>            
                </div>
            </div>`;
    }
    board.innerHTML = boxAddString;
}
addBoxes();

//Time
const score = document.querySelector("#score");
let countScore = 0;
let maxTime;
let timeCounter;

//Random sonlar
function randomNumber(max, min = 0){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Starting game
let isGameStart = false;
let isMusicPlay = false;

function startGame(){
    findTimeLimit();
    startTime();
    startBox.style.display = "none";
    mainBox.style.display = "block";
    isMusicPlay = false;
    musicControl();
    isGameStart = true;
}

function musicControl(){
    if(isMusicPlay) {
        audio.pause();
        isMusicPlay = false;
        audioBox.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    }else {
        audio.play();
        isMusicPlay = true;
        audioBox.innerHTML = `<i class="fas fa-volume-down"></i>`;
    }
}

function findTimeLimit(){
    timeLimit.forEach(element =>{
        if(element.checked === true){
            maxTime = +element.value;
            timeCounter = +element.value;
        }
    })

}

let randNum;

function paintBoxWithRandom(lastPaintElement){
    randNum = randomNumber(24, 0) + "";

    if (randNum === lastPaintElement){
        paintBoxWithRandom(lastPaintElement);
    }

    const nowBox = document.querySelector(`#box${randNum}`);
    const lastBox = document.querySelector(`#box${lastPaintElement}`);

    lastBox.style.backgroundColor = "#1c6174";
    nowBox.style.backgroundColor = "#ff9f1a";
}
paintBoxWithRandom(0);

let isGameOver = false;

function checkBestScore(){
    if(isGameOver) return 0;

    yourScore.innerHTML = countScore;
    gameTime.innerHTML = maxTime + "s";
    
    if(maxTime === 15) table15(countScore);
    if(maxTime === 30) table30(countScore);
    if(maxTime === 60) table60(countScore);

    
    isGameOver = true;
}

const successAnswer = (paintElement) => {
    audioWin.play();
    countScore ++;
    paintBoxWithRandom(paintElement);
    score.innerHTML = countScore;
}

function finishGame (){
    isMusicPlay = true;
    musicControl();
    checkBestScore();
    mainBox.style.display = "none";
    finishBox.style.display = "block"
    clearInterval(interval);
}

const wrongAnswer = () => {
    error.play();
    countScore --;
    if (countScore <= 0){
        countScore = 0;
        finishGame();
    }

    score.innerHTML = countScore;
}

const getElementId = (element) => {
    if(randNum === element.id.slice(3)){
        successAnswer(randNum);
    }else{
        wrongAnswer();
    }
}
const getKeyUp = (item) => {
    if(isGameOver || !isGameStart) return 0;
    
    const findingId = (item.key.charCodeAt() - 97) + "";
    if(randNum === findingId){
        successAnswer(findingId);
    }
    else{
        wrongAnswer();
    }
}

function changeWidthLine(){
    if(timeCounter > maxTime*0.6) line.style.backgroundColor = "#2ecc71";
    if(timeCounter > maxTime*0.3 && timeCounter < maxTime*0.6) line.style.backgroundColor = "#d35400";
    if(timeCounter < maxTime*0.3) line.style.backgroundColor = "red";
    line.style.width = (timeCounter / maxTime) * 100 + "%"
}

//Start timeInterval
let interval;
function startTime() {
    interval = setInterval(() => {
        if(timeCounter <= 0) finishGame();

        timeCounter --;
        changeWidthLine();
    }, 1000)
}

function reloadPage(){
    window.location.reload();
}