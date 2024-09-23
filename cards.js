let cards = [
  document.getElementById('first'),
  document.getElementById('second'),
  document.getElementById('third')
];

let positions = [
  {
    transform: 'translateX(0)',
    width: '200px',
    height: '300px',
    opacity: '1',
    zIndex: '1',
    left: '43%',
    top: '28%'
  },
  {
    transform: 'translateX(100px)',
    height: '250px',
    opacity: '0.5',
    zIndex: '-1',
    left: '45%',
    top: '33%'
  },
  {
    transform: 'translateX(-100px)',
    height: '250px',
    opacity: '0.5',
    zIndex: '-1',
    left: '42%',
    top: '33%'
  }
];

let currentIndex = 0;

function updateCards() {
  cards.forEach((card, index) => {
    let newPosition = positions[(index - currentIndex + 3) % 3];  // Circular update
    card.style.transform = newPosition.transform;
    card.style.width = newPosition.width;
    card.style.height = newPosition.height;
    card.style.opacity = newPosition.opacity;
    card.style.zIndex = newPosition.zIndex;
    card.style.left = newPosition.left;
    card.style.top = newPosition.top;
  });
}

document.getElementById('next').addEventListener('click', (e) => {
  e.preventDefault();
  currentIndex = (currentIndex + 1) % 3;
  updateCards();
});

document.getElementById('previous').addEventListener('click', (e) => {
  e.preventDefault();
  currentIndex = (currentIndex - 1 + 3) % 3;
  updateCards();
});

// Initialize the card positions
updateCards();
