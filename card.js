const testCard = document.getElementById('testCard');

testCard.addEventListener('click', () => {
  testCard.classList.toggle('is-flipped');
});

// Keyboard accessibility: allow flipping with Enter/Space
testCard.setAttribute('tabindex', '0');
testCard.setAttribute('role', 'button');
testCard.setAttribute('aria-label', 'Tap to open card');

testCard.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    testCard.classList.toggle('is-flipped');
  }
});
