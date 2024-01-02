// import products from './data/products.js';
import { renderAdminProducts, getsaveLocalStorageAdmin, saveLocalStorageAdmin, addNewProduct } from "./render/renderAdminProducts.js";

const productsLocal = getsaveLocalStorageAdmin();
console.log('In Admin productsLocal:', productsLocal);

for (let i = 0; i < productsLocal.length; i++) {
    renderAdminProducts('.admin-products', productsLocal[i]);
}

const htmlAddBN = '<button class="add-btn">Додати товар</button>';
document.querySelector('.admin-products').insertAdjacentHTML('beforeend', htmlAddBN);

document.querySelector('.add-btn').addEventListener("click", addNewProduct('.add-btn'));