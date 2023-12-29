import products from './data/products.js';
import { renderAdminProducts } from "./render/renderAdminProducts.js";

for (let i = 0; i < products.length; i++) {
    renderAdminProducts('.admin-products', products[i]);
}