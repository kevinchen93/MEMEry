let moves = 0;
let sec, count;
let timerStarted = false;

let stopwatch = {
  start: function() {
    sec = 0;
    count = setInterval(function() {
      sec++;
      stopwatch.update(sec);
    }, 1000);
  },
  stop: function() {
    clearInterval(count);
  },
  update: function(text) {
    let temp = document.getElementsByClassName('time')[0];
    temp.firstChild.nodeValue = text;
  }
};

function toggleFlipHandler() {
  this.classList.toggle('is-flipped');
}

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderCards() {
  let cardsURLArray = [
    { imageURL:'https://i.redd.it/y22lkf2ji9j11.jpg' },
    { imageURL: 'https://i.redd.it/s88hijpgc4r01.jpg' },
    { imageURL: 'https://i.imgur.com/JpUnMZJ.jpg' },
    { imageURL: 'https://i.imgur.com/mk12hAk.jpg' },
    { imageURL: 'https://i.redd.it/uj9zdnu1vt801.jpg' },
    { imageURL: 'https://i.redd.it/4lhmxjtj6yp01.jpg' },
  ];

  function resetTime() {
    if (timerStarted) {
      stopwatch.stop();
      stopwatch.start();
      timerStarted = true;
    } else {
      stopwatch.start();
      timerStarted = true;
    }
  }

  const cardsURLArrayCopy = cardsURLArray.slice();
  cardsURLArray = cardsURLArray.concat(cardsURLArrayCopy);
  cardsURLArray = shuffle(cardsURLArray);

  const cardContainer = document.getElementsByClassName('card-container')[0];

  cardsURLArray.forEach( item => {
    const card = document.createElement('div');

    card.classList.add('card-content');

    const frontFace = document.createElement('div');

    frontFace.classList.add('card__face', 'card__face--front');

    const backFace = document.createElement('div');

    backFace.classList.add('card__face', 'card__face--back');
    backFace.style.backgroundImage = `url(${item.imageURL})`;

    card.appendChild(frontFace);
    card.appendChild(backFace);
    cardContainer.appendChild(card);
  });
}

function checkMatch() {
  const flippedCards = document.getElementsByClassName('is-flipped');
  const flippedCardsArray = Array.from(flippedCards);

  const firstURL = flippedCardsArray[0].querySelectorAll('div.card__face--back')[0].style.backgroundImage;
  const secondURL = flippedCardsArray[1].querySelectorAll('div.card__face--back')[0].style.backgroundImage;

  if (firstURL === secondURL) {
    flippedCardsArray[0].querySelectorAll('div.card__face--front')[0].style.background = firstURL;
    flippedCardsArray[0].querySelectorAll('div.card__face--front')[0].style.backgroundSize = '100% 100%';

    flippedCardsArray[1].querySelectorAll('div.card__face--front')[0].style.background = firstURL;
    flippedCardsArray[1].querySelectorAll('div.card__face--front')[0].style.backgroundSize = '100% 100%';

    flippedCardsArray.forEach( flippedCard => {
      flippedCard.classList.add('matched');
      flippedCard.classList.remove('is-flipped');
      flippedCard.removeEventListener('click', toggleFlipHandler);
    });

    return true;
  } else {
    return false;
  }
}

function endGame() {
  const matchedCards = document.getElementsByClassName('matched');
  const modalPopup = document.getElementsByClassName('modal')[0];
  let modalText = document.getElementsByClassName('modal-content')[0];

  if (matchedCards.length === 12) {
    stopwatch.stop();
    modalPopup.style.display = 'block';
    modalText.firstChild.nodeValue = `Congratulations! You won in ${moves} moves in ${sec} seconds!`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  stopwatch.start();
  timerStarted = true;

  const cardDivs = document.querySelectorAll('div.card-container > div');
  const cards = document.querySelectorAll('.card-content');

  Array.from(cards).forEach( card => {
    card.addEventListener('click', toggleFlipHandler);
  });

  const cardContainer = document.getElementsByClassName('card-container')[0];

  cardContainer.addEventListener('click', () => {
    let flippedCards = document.getElementsByClassName('is-flipped');
    let flippedCardsLen = flippedCards.length;

    setTimeout(function() {
      if (flippedCardsLen === 2) {
        if (checkMatch()) {
          moves++;

          let temp2 = document.getElementsByClassName('moves')[0];
          temp2.firstChild.nodeValue = moves;

          Array.from(flippedCards).forEach( flippedCard => {
            flippedCard.classList.add('matched');
            flippedCard.classList.remove('is-flipped');
            flippedCard.removeEventListener('click', toggleFlipHandler);
          });

          setTimeout( () => endGame(), 1000);

        } else {
          moves++;

          let temp2 = document.getElementsByClassName('moves')[0];
          temp2.firstChild.nodeValue = moves;

          Array.from(flippedCards).forEach( flippedCard => {
            flippedCard.classList.remove('is-flipped');
          });
        }
      }
    }, 900);
  });

  const newGameButton = document.getElementsByClassName('new-game-button')[0];
  const modalButton = document.getElementsByClassName('modal-button')[0];
  let myAudio = new Audio();

  newGameButton.addEventListener('click', () => {
    myAudio.src = 'assets/sounds/Nujabes - Luv(sic) Pt. 3 (ft. Shing02).mp3';
    myAudio.play();

    const cardContainer = document.getElementsByClassName('card-container')[0];
    while(cardContainer.firstChild){
      cardContainer.removeChild(cardContainer.firstChild);
    }

    renderCards();
    resetTime();

    const cards = document.querySelectorAll('.card-content');

    Array.from(cards).forEach( card => {
      card.addEventListener('click', toggleFlipHandler);
    });

    moves = 0;
    let temp500 = document.getElementsByClassName('moves')[0];
    temp500.firstChild.nodeValue = moves;
  });

  modalButton.addEventListener('click', () => {
    renderCards();
    resetTime();

    const cardContainer = document.getElementsByClassName('card-container')[0];
    while(cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }

    const modalPopup = document.getElementsByClassName('modal')[0];
    modalPopup.style.display = 'none';

    const cards = document.querySelectorAll('.card-content');

    Array.from(cards).forEach( card => {
      card.addEventListener('click', toggleFlipHandler);
    });

    moves = 0;
    let temp500 = document.getElementsByClassName('moves')[0];
    temp500.firstChild.nodeValue = moves;
  });

  const modalPopup = document.getElementsByClassName('modal')[0];
  const closeButton = document.getElementsByClassName('close')[0];
  closeButton.addEventListener('click', () => {
    modalPopup.style.display = 'none';
  });

  window.addEventListener('click', () => {
    modalPopup.style.display = 'none';
  });
});
