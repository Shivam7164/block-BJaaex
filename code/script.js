let game = document.getElementById("game")
let win = document.querySelector(".win")
let grid = document.createElement("section")
let move = document.querySelector(".move")
let time = document.querySelector(".time")
let gameGrid = cardsArray.concat(cardsArray)
grid.setAttribute("class", "grid")
game.append(grid)

// refresh data
gameGrid.sort(() => 0.5 - Math.random())
let sum = 0
let count = 0
let firstGuess = ''
let secondGuess = ''
let previousTarget = "";
let delay = 1000;
let countMove = 0
let winMove = 12
// move.innerText =`Move: ${countMove}`


gameGrid.forEach((item, i) => {
    let cards = document.createElement("div")
    cards.classList.add("card")
    cards.dataset.name = item.name
    let front = document.createElement('div')
    front.classList.add('front')

    let back = document.createElement('div')
    back.classList.add('back')

    cards.style.backgroundImage = `url(../asset/${item.img})`

    grid.append(cards)
    cards.append(front, back)
})

let match = () => {
    let selected = document.querySelectorAll('.selected')

    selected.forEach((card) => {
        card.classList.add('match')
    })
}

const resetGuesses = () => {
    firstGuess = ''
    secondGuess = ''
    previousTarget = ''
    count = 0
    let selected = document.querySelectorAll('.selected')
    selected.forEach((card) => {
        card.classList.remove('selected')
    })
}
let counter = 0;
let timeout;
let timer_on = 0;

function timedCount() {
    time.innerText = `Time : ${counter}`;
    counter++;
    timeout = setTimeout(timedCount, 1000);
}

function startCount() {
    if (!timer_on) {
        timer_on = 1;
        timedCount();
    }
}

function stopCount() {
    clearTimeout(timeout);
    timer_on = 0;
}
function winMatch(){
    win.innerText = `🏆🏆 You Won This Game in ${countMove} Moves 🏆🏆`
}
grid.addEventListener("click", (e) => {
    let clicked = e.target
    if (clicked.nodeName === "SECTION" || previousTarget === clicked || clicked.parentNode.classList.contains('selected')) {
        return
    }
    if (count < 2) {
        startCount()
        count++
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name
            clicked.parentNode.classList.add('selected')

        } else {
            secondGuess = clicked.parentNode.dataset.name
            clicked.parentNode.classList.add('selected')

        }
        if (firstGuess !== '' && secondGuess !== '') {
            countMove += 1
            move.innerText = `Move : ${countMove}`
            if (firstGuess === secondGuess) {
                winMove -= 1
                if (winMove === 0) {
                    stopCount()
                   setTimeout(winMatch , 1200)
                }
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
               
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
    }
    previousTarget = clicked
})



