// import products from './data/products.js';
import { renderAdminProducts, getsaveLocalStorageAdmin, saveLocalStorageAdmin, addNewProduct } from "./render/renderAdminProducts.js";

const productsLocal = getsaveLocalStorageAdmin();
console.log('In Admin productsLocal:', productsLocal);

for (let i = 0; i < productsLocal.length; i++) {
    renderAdminProducts('.admin-products', productsLocal[i]);
}

addNewProduct('.admin-products-new');

// const htmlAddBN = '<button class="add-btn">Додати новий товар</button>';
// document.querySelector('.admin-products-new-btn').insertAdjacentHTML('beforeend', htmlAddBN);
// document.querySelector('.add-btn').addEventListener("click", addNewProduct('.admin-products-new'));


