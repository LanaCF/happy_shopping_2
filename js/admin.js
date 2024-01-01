// import products from './data/products.js';
import { renderAdminProducts, getsaveLocalStorageAdmin, saveLocalStorageAdmin } from "./render/renderAdminProducts.js";

const productsLocal = getsaveLocalStorageAdmin();
console.log('In Admin productsLocal:', productsLocal);

for (let i = 0; i < productsLocal.length; i++) {
    renderAdminProducts('.admin-products', productsLocal[i]);
}