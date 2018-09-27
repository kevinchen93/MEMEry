const cards = document.querySelectorAll('.card-content');

Array.from(cards).forEach( card => {  
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
})
