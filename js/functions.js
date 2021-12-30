const winAudio = document.querySelector("#win");
const overAudio = document.querySelector("#over");
const yourScoreP = document.querySelector(".your-score");

const myCreatElement = (elementName, attrs = {}, father) => {
    const element = document.createElement(elementName);

    for (const attrsKey in attrs) {
        element[attrsKey] = attrs[attrsKey];
    }

    father && father.append(element);

    return element;
};

function tableBuilder(getTable, tableName, nowTimeLimit, nowScore) {
    tables.innerHTML = "";
    const table = myCreatElement("table", {className: "table text-light", innerHTML: thead}, tables);
    const tbody = myCreatElement("tbody", {}, table);
    console.log(nowScore)

    getTable = JSON.parse(localStorage.getItem(`${tableName}`)) || [];

    let topScores = getTable, scores;

    if(nowScore !== undefined){
        let oldBestScore = (getTable.length === 0) ? 0 : getTable[getTable.length - 1];
        if(nowScore > oldBestScore){
            yourRecord.innerHTML = oldBestScore;
            yourScoreP.style.color = "green";
            winAudio.play();
        }else{
            yourRecord.innerHTML = oldBestScore;
            yourScoreP.style.color = "red";
        }

        scores = [...new Set([...getTable, nowScore])].sort((a, b) => a - b);
        topScores = scores.slice(-7);
        localStorage.setItem(`${tableName}`, JSON.stringify(topScores));
    }

    topScores.reverse().map((e, i) => {
        const tr = myCreatElement("tr", {}, tbody);
        myCreatElement("td", {innerHTML: i + 1}, tr);
        myCreatElement("td", {innerHTML: e}, tr);
        myCreatElement("td", {innerHTML: nowTimeLimit}, tr);

        if(e === countScore){
            tr.classList.add("active");
        }
    })
}
function table15(nowScore) {
    tableBuilder(allScore15, "allScore15", 15, nowScore);
}
function table30(nowScore) {
    tableBuilder(allScore30, "allScore30", 30, nowScore);
}
function table60(nowScore) {
    tableBuilder(allScore60, "allScore60", 60, nowScore);
}