const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let startX = 0;
let endX = 0;
const SWIPE_THRESHOLD = 50;

function showCard(index) {
  cards.forEach((card, i) => {
    card.classList.remove('active', 'slide-left', 'slide-right', 'is-flipped');
    if (i === index) {
      card.classList.add('active');
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  currentIndex = index;
}

function showNextCard() {
  if (currentIndex < cards.length - 1) {
    showCard(currentIndex + 1);
  }
}

function showPrevCard() {
  if (currentIndex > 0) {
    showCard(currentIndex - 1);
  }
}

// Tap a card to flip it
cards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });

  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', 'Tap to open card');

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('is-flipped');
    }
  });
});

// Swipe detection on the whole stage
const stage = document.getElementById('cardStage');

stage.addEventListener('touchstart', (e) => {
  startX = e.changedTouches[0].screenX;
});

stage.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].screenX;
  const difference = startX - endX;

  if (Math.abs(difference) > SWIPE_THRESHOLD) {
    if (difference > 0) {
      showNextCard();
    } else {
      showPrevCard();
    }
  }
});

// Allow clicking dots directly too
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showCard(i));
});

// Initialize
showCard(0);
