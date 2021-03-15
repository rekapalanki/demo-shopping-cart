const cards = document.querySelector('.cards');
const heading1 = document.createElement('h1');
heading1.textContent = 'Shopping cart';
cards.insertAdjacentElement('beforebegin', heading1);

const buyButtons = document.querySelectorAll('.buy');

// If buttons are clicked, add items to the cart.
