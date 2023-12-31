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
            <div class="product-admin-box" title="Назва товару">
                <textarea class="product-admin-title edit" cols="20" disabled>${ title }</textarea>
            </div>
            <div class="product-admin-box" title="Короткий опис товару">
                <textarea class="product-admin-descr-mini edit" cols="20" disabled>${ descrMini }</textarea>
            </div>
            <div class="product-admin-box" title="Повний опис товару">
                <textarea class="product-admin-descr-full edit" cols="20" disabled>${ descrFull }</textarea>
            </div>
            <div class="product-admin-box price-icon" title="Ціна товару">
                <textarea class="product-add-quan-sum edit" cols="20" disabled>${ price } ₴</textarea>
            </div> 
            <div class="product-admin-box" title="Редагувати товар">
                <i class="fa-solid fa-pen-to-square edit-icon"></i>
            </div>
            <div class="product-admin-box" title="Видалити товар">
                <img src="img/close.png" alt="" class="close-img">
            </div>
            <div class="product-admin-box save-btn-box" title="Видалити товар">
                <button class="save-btn">Зберегти</button>
            </div>
        </div>`;

    parent.insertAdjacentHTML('beforeend', htmlAdmin);    
}

document.addEventListener('DOMContentLoaded', function() { //Обгортка DOMContentLoaded, щоб переконатися, що код виконується тільки після того, як сторінка повністю завантажена
    const textareaEl = document.querySelectorAll('textarea');

    textareaEl.forEach((item) => {
        item.addEventListener('input', autoResize);
        autoResize.call(item); // Викликаємо функцію при завантаженні сторінки для налаштування початкового розміру.
    });

    function autoResize() {
        this.style.height = 'auto'; // Спочатку встановлюємо height в auto для отримання розміру вмісту.
        this.style.height = this.scrollHeight + 'px'; // Змінюємо height на висоту вмісту.
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const editIcons = document.querySelectorAll('.edit-icon');

    editIcons.forEach(function(editIcon) {
        editIcon.addEventListener('click', function() {
            const productAdminBlock = this.closest('.product-admin-block');
            const saveBtn = productAdminBlock.querySelector('.save-btn');
            const edit = productAdminBlock.querySelectorAll('.edit');
            
            saveBtn.style.display = 'initial';

            edit.forEach(function(textarea) {
                textarea.removeAttribute('disabled');
                textarea.style.border = '1px solid silver';
            });

            saveBtn.addEventListener('click', function() {
                saveBtn.style.display = 'none';
    
                edit.forEach(function(textarea) {
                    textarea.setAttribute('disabled', true);
                    textarea.style.border = 'none';
                });
            });
        });
    });
});

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