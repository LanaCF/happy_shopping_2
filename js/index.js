import products from './data/products.js';
import { renderProduct } from './render/renderProduct.js';
import { renderCart } from './render/listAddProduct.js';

for (let i = 0; i < products.length; i++) {
    renderProduct('.products', products[i]);
}

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
