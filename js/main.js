const cards = document.querySelectorAll('.card-content');

Array.from(cards).forEach( card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
});

const startButton = document.getElementsByClassName('start-button')[0];
const resetButton = document.getElementsByClassName('reset-button')[0];

startButton.addEventListener('click', () => {
  Array.from(cards).forEach( card => {
    card.classList.remove('is-flipped');
  });
});

resetButton.addEventListener('click', () => {
  Array.from(cards).forEach( card => {
    card.classList.remove('is-flipped');
  });
});
