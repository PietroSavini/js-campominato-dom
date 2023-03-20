const grid = document.querySelector(".grid");
let square;
let squareNumber;
let difficulty = document.getElementById("difficulty");
const playBtn = document.querySelector(".btn");
const nBomb = 16;
let userScore;

//funzioni
//funzione che crea la griglia in base alla difficoltà/////////////////////////////////////
function createGrid(difficulty) {
    grid.innerHTML = "";
    let numSquares;

    if(difficulty === "easy") {
        numSquares = 100;
        squareClass = "easy";
    } else if(difficulty === "medium") {
        numSquares = 81;
        squareClass = "medium";
    } else if(difficulty === "hard") {
        numSquares = 49;
        squareClass = "hard";
    }

    for(let i = 0; i < numSquares; i++) {
        square = document.createElement("div");
        square.classList.add("box", squareClass);
        grid.appendChild(square);
    }
    return numSquares;
}

//funzione per creare array di x numeri (nBomb) che sia compreso tra 1 e squareNumber-------
function generateBombs (bombNum, squareNumber){
    const randomNumbers =[];
    while(randomNumbers.length < bombNum){
        let randomNumber = Math.floor(Math.random()* squareNumber ) + 1;
        if(!randomNumbers.includes(randomNumber)){
            randomNumbers.push(randomNumber);
        }
    }
    return randomNumbers;
}

//interazione al click degli square
playBtn.addEventListener("click" , function(){
    userScore = 0;
    squareNumber = createGrid(difficulty.value);
    let maxPoints = squareNumber - nBomb ;
    let squares = document.querySelectorAll(".box");
    console.log(squares);
    const bombArray = generateBombs(nBomb , squareNumber);
    console.log(bombArray);
    squares.forEach(function(square, index){
        if(bombArray.includes(index + 1)){
            square.classList.add("mine");
        }
        square.addEventListener("click", function(){
            if(square.classList.contains("toggled")){
                square.classList.remove("toggled");
                userScore = userScore -1;
                maxPoints = maxPoints + 1;
            }else{
                square.classList.add("toggled");
                userScore = userScore +1;
                maxPoints = maxPoints -1;
            }
            console.log(square.innerText);
            console.log("user score" , userScore);
            console.log("remaining points" , maxPoints);
            
            if(square.classList.contains("mine")){
                square.classList.add("boom");
               const  mines = document.querySelectorAll(".mine");
                    mines.forEach(function(mine) {
                        mine.classList.add("boom");
                    });
                userScore = userScore -1;
                setTimeout(function () {
                    alert(`HAI PERSO, il tuo punteggio è stato: ${userScore}`);
                    grid.innerHTML = "";
                }, 100);
            }else if(maxPoints === 0){
                const mines = document.querySelectorAll(".mine");
                mines.forEach(function(mine) {
                    mine.classList.add("boom");
                });
                setTimeout(function () {
                alert(`HAI VINTOOO il tuo punteggio è di : ${userScore}`)
                grid.innerHTML = "";
                },100);
            }
        })
    })
});


