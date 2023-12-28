import products from '../data/products.js';
import { cart, quantity, updateCartQuantity, saveLocalStorage, getLocalStorage } from '../render/renderProduct.js';
console.log('123', cart);

const cartBox = document.querySelector('.shopping-cart-box');
const bgPopup = document.querySelector('.background-for-window');
const addBlockProducts = document.querySelector('.window-order');
const closeCart = document.querySelector('.close-img-bg');

const titlePopup = document.createElement('h3');
titlePopup.innerText = 'Ваше замовлення';
addBlockProducts.append(titlePopup);

export const renderCart = () => {
    addBlockProducts.innerHTML = '';
    const formatCart = formatCartData(cart); // беремо новий масив без дублікатів
    const money = ' грн.';
    let sumTotalAddProd = 0;

    formatCart.forEach(function(cartItem) {
        const block = document.createElement('div');
        const boxImg = document.createElement('div');
        const boxTitle = document.createElement('div');
        const boxQuantity = document.createElement('div');
        const boxSum = document.createElement('div');
        const title = document.createElement('p');
        const quantityEl = document.createElement('p');
        const sum = document.createElement('p');
        const imgDel = document.createElement('div');

        block.className = `product-add-block`;
        
        boxImg.className = `product-add-box`;
        boxImg.innerHTML = `<img src="./img/products/${cartItem.img}" alt="" class="product-add-icon">`;

        boxTitle.className = `product-add-box`;
        boxQuantity.className = `product-add-box`;
        boxSum.className = `product-add-box`;

        title.className = `product-add-title`;
        title.innerHTML = cartItem.title;

        quantityEl.className = `product-add-quan-sum`;
        quantityEl.innerHTML = `<img src="img/minus.png" alt="" class="close-img minus-img">${quantityAddProducts(cart, cartItem.id)}<img src="img/plus.png" alt="" class="close-img plus-img">`;

        sum.className = `product-add-quan-sum`;
        sum.innerHTML = quantityAddProducts(cart, cartItem.id) * cartItem.price + money;
        sumTotalAddProd = sumTotalAddProd + quantityAddProducts(cart, cartItem.id) * cartItem.price;

        imgDel.className = `product-add-box`;
        imgDel.innerHTML = `<img src="img/close.png" alt="" class="close-img">`;
        
        addBlockProducts.append(block);
        block.append(boxImg, boxTitle, boxQuantity, boxSum, imgDel);
        boxTitle.append(title);
        boxQuantity.append(quantityEl);
        boxSum.append(sum);

        const minQuantity = document.querySelectorAll('.minus-img');
        const maxQuantity = document.querySelectorAll('.plus-img');

        console.log('555', minQuantity);

        // minQuantity.onclick = function() {
        //     const productIdMin = cartItem.id;
        //     const indexToRemoveMin = cart.findIndex(product => product.id === productIdMin);

        //     if (indexToRemoveMin !== -1) {
        //         cart.splice(indexToRemoveMin, 1);
        //     }

        //     updateCartQuantity(cart.length);
        //     block.remove();
        //     renderCart();
        //     saveLocalStorage();
        // };

        imgDel.onclick = function() {
            const productIdToRemove = cartItem.id;
            const quantityToRemove = quantityAddProducts(cart, productIdToRemove);

            for (let i = 0; i < quantityToRemove; i++) {
                const indexToRemove = cart.findIndex(product => product.id === productIdToRemove);
        
                if (indexToRemove !== -1) {
                    cart.splice(indexToRemove, 1);
                }
            }
            
            updateCartQuantity(cart.length);
            block.remove();
            renderCart();
            saveLocalStorage();
        };
    
    });
    
    const totalBox = document.createElement('div');
    const totalText = document.createElement('h4');
    const totalSum = document.createElement('h4');
  
    totalBox.className = `total`;
    totalText.className = `total-text`;
    totalText.innerHTML = 'До сплати:&nbsp;'
    totalSum.className = `total-sum`;
    totalSum.innerHTML = sumTotalAddProd;
  
    addBlockProducts.append(totalBox);
    totalBox.append(totalText, totalSum);
}

cartBox.onclick = function() {
    bgPopup.style.display = 'initial';

    renderCart();
}

closeCart.onclick = function(event) {
    event.stopPropagation(); // Зупиняємо подальше розповсюдження події, щоб не викликати bgPopup.onclick
    bgPopup.style.display = 'none';
}

bgPopup.onclick = function() {
    bgPopup.style.display = 'none';
}

addBlockProducts.onclick = function(event) {
    event.stopPropagation(); // Зупиняємо подальше розповсюдження події, щоб не викликати bgPopup.onclick
}

function quantityAddProducts(arr, id) { // arr = cart / id = cartItem.id
    let sumAdd = 0;

    arr.forEach(function(item) {
        if (item.id === id) {
        sumAdd += 1;
        }
    });
    return sumAdd;
}

function formatCartData() {
    const formatDataNew = Array.from(new Set(cart.map(product => product.id))); // Set вилучить дублікати з масиву cart
    const formatData = formatDataNew.map(productId => {
        return products.find(product => product.id === productId);
    });
    return formatData;
}