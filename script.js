const cards = document.querySelectorAll('.card');
const modal = document.getElementById('modalOuter');
const startGame = document.getElementById('startGame');

let flippedCard = false;

let pauseCards =false;

let firstCard, secondCard;

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
    if (firstCard.dataset.name === secondCard.dataset.name) {
        disableCards();
        return;
    }

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

cards.forEach(card => card.addEventListener('click', flipCard));

startGame.addEventListener('click', function() {
    modal.style.display = 'none';
    shuffle();
});

