import products from './data/products.js';
import { renderProduct, saveLocalStorage } from './render/renderProduct.js';
import { renderCart } from './render/listAddProduct.js';
import { renderLoginBtn } from './render/renderLoginBtn.js';
import { getsaveLocalStorageAdmin, saveLocalStorageAdmin } from './render/renderAdminProducts.js';

if (localStorage.getItem("products") == null) { // ініціалізація списку товарів в localStorage
	saveLocalStorageAdmin(products, products[products.length-1]);
}

renderCart();
renderLoginBtn();

const productsLocal = getsaveLocalStorageAdmin();

console.log('productsLocal:', productsLocal);

for (let i = 0; i < productsLocal.length; i++) {
    renderProduct('.products', productsLocal[i]);
}

saveLocalStorage();












// renderProduct('.products', products[0]);
// renderProduct('.products', products[1]);
// renderProduct('.products', products[2]);
// renderProduct('.products', products[3]);
// renderProduct('.products', products[4]);
// renderProduct('.products', products[5]);
// renderProduct('.products', products[6]);

// renderCart();

// import { popupWindow } from './render/popupWindow.js';

// popupWindow('.popup-window', products[2]);
