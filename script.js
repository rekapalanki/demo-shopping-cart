const cards = document.querySelector('.cards');
const heading1 = document.createElement('h1');
heading1.textContent = 'Shopping cart';
cards.insertAdjacentElement('beforebegin', heading1);

const addButtons = document.querySelectorAll('.add');
const endOfCart = document.querySelector('.endOfCart');                 // YGNI - you'll gonna need it
const cartSum = document.getElementById('cartSum');                     // YGNI 
const cartValueWrapper = document.querySelector('.cartValueWrapper');   // YGNI 
const cartValue = document.getElementById('cartValue');                 // YGNI 

// Increment / decrement elements
// 01 Select input field, buttons + and -
// 02 Create value incrementing event handler
// 03 Create value decrementing event handler prohibiting to enter negative values 
// 04 Attach event handlers to buttons  + and -
// Hints: 
// Think backwards. What do you want to do? 
// Define which elements have to be clicked. Create a forEach statement. 
// Define the variable of the forEach statement, then define the event listener
// with an addEventListener method, adding the event handler
// Define the event handler with a simple console.log('Hello!') command. 
// Then console.dir(event) in your event handler to see what you have selected. 

const valueInputs = document.querySelectorAll('.quantity');
const incrementButtons = document.querySelectorAll('.increment');
const decrementButtons = document.querySelectorAll('.decrement');

const incrementEventHandler = event => {
    // Catch the value itself
    let { value } = event.target.parentElement.children[1];
    // Store it in a variable
    let oldValue;
    oldValue = value;
    // Increment value
    value++;
    event.target.parentElement.children[1].value = value;
    console.log(`Current value: ${value}`);
}

const decrementEventHandler = event => {
    // Catch the value itself
    let { value } = event.target.parentElement.children[1];
    // Store it in a variable
    let oldValue;
    oldValue = value;
    // Decrement value
    value--;
    // Prevent negative value 
    if (value < 0) {
        value = 0;
    }
    event.target.parentElement.children[1].value = value;
    console.log(`Current value: ${value}`);
}

const incrementEventListener = (increment) => {
    increment.addEventListener('click', incrementEventHandler);
}

const decrementEventListener = (decrement) => {
    decrement.addEventListener('click', decrementEventHandler);
}

incrementButtons.forEach(incrementEventListener);
decrementButtons.forEach(decrementEventListener);

// Add items to the counter
// 01 Select addItems
// endOfCart, cartSum, cartValue etc. are already defined above
// 02 Create a new div.cartItem with a unique ID and insertAdjacentElement it before cartSum 
// 02.b. newCartItem should contain itemName, itemQty, itemPrice and totalPrice
// 03 Check if the unique ID exists, and if yes, update existing data with new data
// 04 Prevent form from default execution 
// Update cartSum and cartValue

const addItems = document.querySelectorAll('.addItem');

const addItemsEventHandler = event => {
    const [ itemName, itemQty, itemPrice ] = [
        event.target.parentElement.parentElement.children[0].innerText,
        parseFloat(event.target.parentElement.children[1].value),
        parseFloat(event.target.parentElement.parentElement.children[3].innerText), // ----------- CHANGE IT AFTER REMOVING ORIGINAL ADD BUTTONS -------------         
    ];
    const totalPrice = itemQty * itemPrice;
     const cartItemHTML = `
     <div class="cartItem" id=${itemName}>
         <p class="cartItemName">${itemName}</p>
         <p class="cartItemQty">${itemQty}</p>
         <p class="cartItemPrice">${itemPrice}</p>
         <p class="cartItemTotalPrice">${totalPrice}</p>
         <button class="trash">🗑️</button>
     </div>
    `;
    const cartItemFragment = document.createRange().createContextualFragment(cartItemHTML);
    const cartItem = cartItemFragment.querySelector('.cartItem');
    const [ cartItemQtyValue, cartItemTotalPriceValue ] = [
        parseFloat(cartItem.querySelector('.cartItemQty').innerText),
        parseFloat(cartItem.querySelector('.cartItemTotalPrice').innerText),
    ];
    const [ cartItemName, cartItemQty, cartItemPrice, cartItemTotalPrice ] = [  // YAGNI - you aren't gonna need it
        cartItem.querySelector('.cartItemName'),                                // YAGNI 
        cartItem.querySelector('.cartItemQty'),                                 // These values need to be defined related to the newId variable
        cartItem.querySelector('.cartItemPrice'),                               // YAGNI 
        cartItem.querySelector('.cartItemTotalPrice'),                          // These values need to be defined related to the newId variable
    ];
    const newId = document.getElementById(itemName);
    if (newId === null ) {                                          // Multiple arguments (newId === null && itemQty !== 0) just didn't work
        if (itemQty !== 0) {                                        // However, embedded arguments, as implemented here, work fine            
        endOfCart.insertAdjacentElement('beforebegin', cartItem);
        // The trash event listener has to be created after the trash element itself appears on the site 
        const trash = document.querySelector('.trash');
        const deleteItem = (event) => {
            console.log('Line will be deleted');
            event.target.parentElement.remove();
        }
        trash.addEventListener('click', deleteItem);
        } 
    } else {
        const newIdQty = parseFloat(newId.querySelector('.cartItemQty').innerText);
        const newIdTotalValue = parseFloat(newId.querySelector('.cartItemTotalPrice').innerText);
        newId.querySelector('.cartItemQty').innerText = newIdQty + cartItemQtyValue;
        newId.querySelector('.cartItemTotalPrice').innerText = newIdTotalValue + cartItemTotalPriceValue;
        console.log('It already exists');
    }
    event.preventDefault();   
}

const addItemsEventListener = (add) => {
    add.addEventListener('click', addItemsEventHandler);
} 

addItems.forEach(addItemsEventListener);

