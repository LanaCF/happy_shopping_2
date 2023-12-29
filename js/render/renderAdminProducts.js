import products from '../data/products.js';
// import { updateCartQuantity, saveLocalStorage, getLocalStorage } from './render/renderProduct.js';

// const adminProducts = document.querySelector('.admin-products');

// const savedCartLength = getLocalStorage();
// quantity.innerHTML = savedCartLength;

export const renderAdminProducts = (selector, data) => {
    const parent = document.querySelector(selector);
    const { id, img, title, descrMini, descrFull, price } = data;
    const imgName = img ? img : 'noimg.webp';
    
    const htmlAdmin = 
        `<div class="product-admin-block data-id="${ id }">
            <div class="product-admin-box">
                <img src="./img/products/${ imgName }" alt="" class="product-admin-icon">
            </div>
            <div class="product-admin-box">
                <p class="product-admin-title">${ title }</p>
            </div>
            <div class="product-admin-box">
                <p class="product-admin-descr-mini">${ descrMini }</p>
            </div>
            <div class="product-admin-box">
                <p class="product-admin-descr-full">${ descrFull }</p>
            </div>
            <div class="product-admin-box">
                <p class="product-add-quan-sum">${ price } ₴</p>
            </div> 
            <div class="product-admin-box">
                <img src="img/close.png" alt="" class="close-img">
            </div>
            <div class="product-admin-box">
                <img src="img/close.png" alt="" class="close-img">
            </div>
        </div>`;

    parent.insertAdjacentHTML('beforeend', htmlAdmin);
}

// function getProductById(productId) {
//     return products.find(product => product.id === parseInt(productId));
// }

// function updateCartQuantity(newQuantity) {
//     quantity.innerHTML = newQuantity;
// }

// // localStorage.clear(); // Очищує localStorage, наприклад, від даних попередніх задач

// function saveLocalStorage() {
//     localStorage.setItem('cart', JSON.stringify(cart));
//     localStorage.setItem('cartLength', String(cart.length));  
//     // console.log('Data saved:', cart.length);
// }
  
// function getLocalStorage() {
//     const getData = localStorage.getItem('cart');
//     const parsedData = JSON.parse(getData);

//     if (parsedData && Array.isArray(parsedData)) {
//         cart.push(...parsedData);
//         return parsedData.length;
//     }

//     return 0;
//     // const getData = localStorage.getItem('cartLength');    
//     // console.log('Data loaded:', getData);
//     // return parseInt(getData) || 0;
// }

// export { cart, quantity, updateCartQuantity, saveLocalStorage, getLocalStorage };

// cartBox.onclick = function() {
//     bgPopup.style.display = 'initial';

//     renderCart();
// }

// closeCart.onclick = function(event) {
//     event.stopPropagation(); // Зупиняємо подальше розповсюдження події, щоб не викликати bgPopup.onclick
//     bgPopup.style.display = 'none';
// }

// bgPopup.onclick = function() {
//     bgPopup.style.display = 'none';
// }

// addBlockProducts.onclick = function(event) {
//     event.stopPropagation(); // Зупиняємо подальше розповсюдження події, щоб не викликати bgPopup.onclick
// }

// function quantityAddProducts(arr, id) { // arr = cart / id = cartItem.id
//     let sumAdd = 0;

//     arr.forEach(function(item) {
//         if (item.id === id) {
//         sumAdd += 1;
//         }
//     });
//     return sumAdd;
// }

// function formatCartData() {
//     const formatDataNew = Array.from(new Set(cart.map(product => product.id))); // Set вилучить дублікати з масиву cart
//     const formatData = formatDataNew.map(productId => {
//         return products.find(product => product.id === productId);
//     });
//     return formatData;
// }