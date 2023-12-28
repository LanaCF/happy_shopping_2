import products from '../data/products.js';

const quantity = document.querySelector('.quantity');
let cart = [];
const display = document.querySelector('.bg-popup-window');
const imgCloseBtn = document.querySelector('.close-img-bg');
const popWin = document.querySelector('.popup-window');
const savedCartLength = getLocalStorage();
quantity.innerHTML = savedCartLength;

export const renderProduct = (selector, data) => {
    const parent = document.querySelector(selector);
    let productsHtml = '';
    const { id, img, title, descrMini, price } = data;
    const imgName = img ? img : 'noimg.webp';
    
    const html = 
        `<div class="product" data-id="${ id }">
            <div class="product__img" data-id="${ id }">
                <img src="./img/products/${ imgName }" alt="">
            </div>
            <h3 class="product__title">${ title }</h3>
            <p class="product__descr">${ descrMini }</p>
            <div class="product__price-block">
                <span class="product__price">${ price } ₴</span>
                <button class="product__add-to-cart" data-id="${ id }">Add to cart</button>
            </div>
        </div>`;

    parent.insertAdjacentHTML('beforeend', html);
    productsHtml = document.querySelectorAll('.product__add-to-cart');
    
    productsHtml.forEach(btn => {
        btn.addEventListener('click', addToCartHandler);
        // btn.onclick = addToCartHandler;
    });

    const imgEl = document.querySelectorAll('img');

    imgEl.forEach(function(item) {
        item.onclick = function() {
            const parent = this.closest('.product');
    
            if (parent) {
                const productId = parent.dataset.id;
                display.style.display = 'initial';
                popupWindow('.popup-window', productId);
            }
        };
    });

    imgCloseBtn.onclick = function() {
        display.style.display = 'none';
        popWin.innerHTML = '';
    }

    display.onclick = function() {
        display.style.display = 'none';
        popWin.innerHTML = '';
    }
}

function getProductById(productId) {
    return products.find(product => product.id === parseInt(productId));
}

function addToCartHandler() {
    const productId = this.dataset.id;
    const selectedProduct = getProductById(productId);

    if (selectedProduct) {
        cart.push(selectedProduct);
        updateCartQuantity(cart.length);
        // 1 - quantity.innerHTML = cart.length;
        console.log('cart2', cart);
        saveLocalStorage();
    }
    const parent = this.closest('.product');
    const id = parent.dataset.id;
    
    console.log('click', id);
}

function updateCartQuantity(newQuantity) {
    quantity.innerHTML = newQuantity;
}

function popupWindow(selector, productId) {
    const parent = document.querySelector(selector);
    const product = getProductById(productId);
    
    if (product) {
        const { id, img, title, descrFull, price } = product;
        const imgName = img ? img : 'noimg.webp';
        
        const html = 
            `<div class="product" data-id="${id}">
                <div class="product__img">
                    <img src="./img/products/${imgName}" alt="">
                </div>
                <h3 class="product__title">${title}</h3>
                <p class="product__descr">${descrFull}</p>
                <div class="product__price-block">
                    <span class="product__price">${price} ₴</span>
                </div>
            </div>`;

        parent.insertAdjacentHTML('beforeend', html);
    }
}

// localStorage.clear(); // Очищує localStorage, наприклад, від даних попередніх задач

function saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartLength', String(cart.length));  
    // console.log('Data saved:', cart.length);
}
  
function getLocalStorage() {
    const getData = localStorage.getItem('cart');
    const parsedData = JSON.parse(getData);

    if (parsedData && Array.isArray(parsedData)) {
        cart.push(...parsedData);
        return parsedData.length;
    }

    return 0;
    // const getData = localStorage.getItem('cartLength');    
    // console.log('Data loaded:', getData);
    // return parseInt(getData) || 0;
}


export { cart, quantity, updateCartQuantity, saveLocalStorage, getLocalStorage };