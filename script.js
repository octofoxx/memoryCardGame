const cards = document.querySelectorAll('.card');
const modal = document.getElementById('modalOuter');
const startGame = document.getElementById('startGame');
const timer = document.getElementById('timer');
const firstModal = document.getElementById('modalInner');
const scorePage = document.getElementById('scorePage');
const scores = document.getElementById('scores');
const scoreList = document.getElementById('scoreList');
const playerName = document.getElementById('name');
const submit = document.getElementById('submit');

let flippedCard = false;

let pauseCards =false;

let gameStarted = false;

let cardCounter = 0;

let countdown =60;

let firstCard, secondCard, interval;

//function to flip the cards, used with the eventListener to see which is clicked. After two cards are clicked, will run the checkMatch to determine if they are the same or not.
function flipCard () {
    if (pauseCards) return;
    if (this ===firstCard) return;
    this.classList.add ('flip');

    if (!flippedCard) {
        flippedCard =true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkMatch();
}

//checks the cards against the dataset names and if they match, will set them as disabled from flipping. Otherwise, they will be flipped back down.
function checkMatch () {
    let isMatch =firstCard.dataset.name === secondCard.dataset.name;
    //this will increment the cardCounter by 1, and when it reaches half the cards length (half the length since each card is used twice) will stop the timer
    if(isMatch) {
        cardCounter+=1;
        disableCards();
        if (cardCounter ==(cards.length/2)) {
            clearInterval(interval);
            modal.style.display = "flex";
            firstModal.style.display ="none";
            scorePage.style.display = "flex";
        }
    } else

    unflipCards();
}

//prevents user from clicking cards that have been flipped over and confirmed as matched
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
}

//if cards do not match, this function will flip them back face down
function unflipCards() {
    pauseCards = true;
    setTimeout(()=> {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCards();
    }, 1000);
}

//using the destructing assignment of [var1, var2] = ['value1', 'value2'] to reset the variables values after each attempt at matching
function resetCards() {
    [flippedCard, pauseCards] = [false,false];
    [firstCard, secondCard] = [null, null];
}

function shuffle () {
    cards.forEach(card => {
        let randomSpot = Math.floor(Math.random() * 12);
        card.style.order =randomSpot;
    });
}

function saveScore() {
    var scoreInfo = {
    name: playerName.value.trim(),
    points: (countdown *12),}
    localStorage.setItem("scoreInfo",JSON.stringify(scoreInfo));
}

function showScore(){
    var displayedScore =JSON.parse(localStorage.getItem("scoreInfo"));
    scoreList.innerHTML ="name " + displayedScore.name + " score: " +displayedScore.points;
    }

cards.forEach(card => card.addEventListener('click', flipCard));

startGame.addEventListener('click', function() {
    modal.style.display = 'none';
    timer.style.display = 'flex';
    scores.style.display = 'block';

    gameStarted = true;
    showCountdownToPage();
    shuffle();

    interval = setInterval(function() {
        if (!gameStarted) {
            return;
        }
        countdown --;
    
        if (countdown <= 0) {
            clearInterval(interval);
            timer.textContent = "Time's Up!";
        }
    
        showCountdownToPage();
    }, 1000);
    
    function showCountdownToPage() {
    timer.textContent = "Time Remaining " + countdown;
    }
});

submit.addEventListener("click",function() {
    cards.forEach(card => card.addEventListener('click', flipCard));
    cards.forEach(card => card.classList.remove('flip'));
    saveScore();
    showScore();
    shuffle();
    modal.style.display = "flex";
    firstModal.style.display ="block";
    scorePage.style.display = "none";
    scores.style.display = 'none';
    timer.style.display = 'none';
    countdown= 60;
    cardCounter = 0;
});

