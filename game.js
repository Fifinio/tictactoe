//declaring all the html elements
const tictactoe = document.querySelector('.ticTacToe');
const boxes = Array.from(document.querySelectorAll('.box'));
const message = document.querySelector('h1');
const reset = document.querySelector('#reset');
var isPies = false;
var xMoves = [];
var oMoves = [];
var moves = 0;

const winningCombinations = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
];

function resetGame() {
    boxes.forEach(box => box.textContent = ' ')
    xMoves = [];
    oMoves = [];
    moves = 0;
    isPies = false;
    boxes.forEach(box => {
        box.addEventListener('click', move);
    })
    popup.style.display = 'none';
}

function move(){
    if(this.textContent === ' ' || this.textContent === ''){
        moves++;
        this.innerHTML = isPies ? '🐶' : '😺';
        addMove(this.id);
        checkWin();
        isPies = !isPies;
    }
}

function addMove(boxId){
    if(isPies){
        xMoves.push(boxId);
    }else{
        oMoves.push(boxId);
    }
}

function checkWin(){
            winningCombinations.forEach(combination => {
                if(xMoves.includes(combination[0]) && xMoves.includes(combination[1]) && xMoves.includes(combination[2])){
                    displayWin(false, combination)
                }else if(oMoves.includes(combination[0]) && oMoves.includes(combination[1]) && oMoves.includes(combination[2])){
                    displayWin(false, combination)
                }
            });
            if(moves === 9 && message.textContent === 'Tic Tac Toe'){
                displayWin(true)
            }
        
}
function displayWin(draw = false, combination = null){
    const popup = document.querySelector('#popup');
    popup.style = 'visibility:visible; opacity:1; width: 40vw; height: 20vh;';
    const title = document.querySelector('.title');
    const whoWon = document.getElementById('whoWon');
    if(draw){
        boxes.forEach(box => box.removeEventListener('click', move));
        title.textContent = 'Draw 🤔';
        whoWon.textContent = 'No one wins!';
    }else{
        boxes.forEach(box => box.removeEventListener('click', move));
        title.textContent = 'Congratulations! 🎉';
        whoWon.textContent = isPies ? '🐶 is the winner! 🎉🎉🎉' : '😺 is the winner! 🎉🎉🎉';
    }
}
//event listeners
reset.addEventListener('click', resetGame);
boxes.forEach(box => {
    box.addEventListener('click', move);
})

