const cards = document.getElementsByClassName('card');

Array.from(cards).forEach( card => {
  card.addEventListener('click', () => {
    card.style.background="url('https://img.washingtonpost.com/news/the-intersect/wp-content/uploads/sites/32/2015/04/putin-meme.jpg')";
    card.style.backgroundSize="100% 100%";
    card.style.backgroundRepeat="no-repeat";
  });
});
