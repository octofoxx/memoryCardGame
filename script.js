const cards = document.querySelectorAll('.card');

let flippedCard = false;

let pauseCards =false;

let firstCard, secondCard;

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

function checkMatch () {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
}

function unflipCards() {
    pauseCards = true;
    setTimeout(()=> {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCards();
    }, 1000);
}

function resetCards() {
    [flippedCard, pauseCards] = [false,false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));