const cards = document.querySelector('.cards');
const heading1 = document.createElement('h1');
heading1.textContent = 'Shopping cart';
cards.insertAdjacentElement('beforebegin', heading1);

const buyButtons = document.querySelectorAll('.buy');
const endOfCart = document.querySelector('.endOfCart');

// If buttons are clicked, add items to the cart.
// 01 Add click event listener 
// 02 Handle event
// Get event.currentTarget Item$, itemPrice, itemQuantity
// 03 itemQuantity --> create counter
// 04 Create new .cartItem 
// 05 Add new cartItem before hr 
// If there is already an item, update html and don't add new line
// Or simply skip the counter (B version)

const eventHandler = (event) => {
    // create counter
    let counter = parseFloat(event.currentTarget.nextElementSibling.textContent);
    counter += 1;
    event.currentTarget.nextElementSibling.textContent = counter;
    // add item to the cartItem
    const cartItemHtml = `
    <div class="cartItem">
        <p>${event.currentTarget.previousElementSibling.previousElementSibling.textContent}</p>
        <p>${parseFloat(event.currentTarget.nextElementSibling.textContent)}</p>
        <p>${parseFloat(event.currentTarget.nextElementSibling.nextElementSibling.textContent)}</p>
        <p>${parseFloat(event.currentTarget.nextElementSibling.textContent)*parseFloat(event.currentTarget.nextElementSibling.nextElementSibling.textContent)}</p>
    </div>`;
    const cartItemRange = document.createRange().createContextualFragment(cartItemHtml);
    const cartItem = cartItemRange.querySelector('div');
    endOfCart.insertAdjacentElement('beforebegin', cartItem);
}

const clickEventListener = (button) => {
    button.addEventListener('click', eventHandler)
}

buyButtons.forEach(clickEventListener)