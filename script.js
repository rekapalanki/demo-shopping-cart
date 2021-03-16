const cards = document.querySelector('.cards');
const heading1 = document.createElement('h1');
heading1.textContent = 'Shopping cart';
cards.insertAdjacentElement('beforebegin', heading1);

const buyButtons = document.querySelectorAll('.buy');
const endOfCart = document.querySelector('.endOfCart');
const cartSum = document.getElementById('cartSum');
const cartValueWrapper = document.querySelector('.cartValueWrapper');
const cartValue = document.getElementById('cartValue');

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
    <div class="cartItem" id=${event.currentTarget.previousElementSibling.previousElementSibling.textContent}>
        <p>${event.currentTarget.previousElementSibling.previousElementSibling.textContent}</p>
        <p>${parseFloat(event.currentTarget.nextElementSibling.textContent)}</p>
        <p>${parseFloat(event.currentTarget.nextElementSibling.nextElementSibling.textContent)} AUD</p>
        <p>${parseFloat(event.currentTarget.nextElementSibling.textContent)*parseFloat(event.currentTarget.nextElementSibling.nextElementSibling.textContent)} AUD</p>
    </div>`;
    const cartItemRange = document.createRange().createContextualFragment(cartItemHtml);
    const cartItem = cartItemRange.querySelector('div');
    // if there is no itemId div, create one. Else, update existing one.
    const itemDiv = document.getElementById(cartItem.id);
    // check if item has been created
    // console.log(itemIdDiv === null);
    if (itemDiv === null) {
        console.log('true');
        endOfCart.insertAdjacentElement('beforebegin', cartItem);
    } else {
        console.log('false');
        // update existing div
        itemDiv.children[1].textContent = parseFloat(cartItem.children[1].textContent);
        itemDiv.children[2].textContent = `${parseFloat(cartItem.children[2].textContent)} AUD`
        itemDiv.children[3].textContent = `${parseFloat(cartItem.children[3].textContent)} AUD`;
    }
    // Sum up total value
    // 01 Store original value in a new variable
    let cartSumText = parseFloat(cartSum.textContent);
    // 02 Get value to be added up
    cartSumText += parseFloat(cartItem.children[2].textContent);
    // update cartsum.textContent
    cartSum.textContent = `${cartSumText} AUD`;
    cartValue.textContent = `${cartSumText} AUD`;
    cartValueWrapper.classList.remove('displayNone');
}

const clickEventListener = (button) => {
    button.addEventListener('click', eventHandler);
}

buyButtons.forEach(clickEventListener);

// Add remove button to cart items
