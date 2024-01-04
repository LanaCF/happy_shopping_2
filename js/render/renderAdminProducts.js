// import products from '../data/products.js';
//import { cart, quantity, updateCartQuantity, saveLocalStorage, getLocalStorage, addToCartHandler } from './renderProduct.js';
//import { quantityAddProducts } from './listAddProduct.js';

// import products from "../data/products";

export const renderAdminProducts = (selector, data) => {
    getsaveLocalStorageAdmin();

    const parent = document.querySelector(selector);
    const { id, img, title, descrMini, descrFull, price } = data;
    const imgName = img ? img : 'noimg.webp';
    
    const htmlAdmin = 
        `<div class="product-admin-block" data-id="${ id }">
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
                <img src="img/close.png" alt="" class="del-icon">
            </div>
            <div class="product-admin-box save-btn-box">
                <button class="save-btn">Зберегти</button>
            </div>
        </div>`;

    parent.insertAdjacentHTML('beforeend', htmlAdmin);    
}

document.addEventListener('DOMContentLoaded', function() {
    const textareaEl = document.querySelectorAll('textarea');

    textareaEl.forEach((item) => {
        item.addEventListener('input', autoResize);
        autoResize.call(item); // Викликаємо функцію при завантаженні сторінки для налаштування початкового розміру.
    });

    function autoResize() {
        this.style.height = 'auto'; // Спочатку встановлюємо height в auto для отримання розміру вмісту.
        this.style.height = this.scrollHeight + 'px'; // Змінюємо height на висоту вмісту.
    }

    const editIcons = document.querySelectorAll('.edit-icon');

    editIcons.forEach(function(editIcon) {
        editIcon.addEventListener('click', function() {
            const productAdminBlock = this.closest('.product-admin-block');
            const saveBtn = productAdminBlock.querySelector('.save-btn');
            const editAreas = productAdminBlock.querySelectorAll('.edit');
            
            saveBtn.style.display = 'initial';

            editAreas.forEach(function(textarea) {
                textarea.removeAttribute('disabled');
                textarea.style.border = '1px solid silver';
            });
            
            saveBtn.addEventListener('click', function() {
                saveBtn.style.display = 'none';

                editAreas.forEach(function(textarea) {
                    textarea.setAttribute('disabled', true);
                    textarea.style.border = 'none';
                    const products = getsaveLocalStorageAdmin();

                    const productId = parseInt(productAdminBlock.getAttribute('data-id'), 10);
                    const productData = products.find(product => product.id === productId);
                    
                    // Оновити масив products
                    const index = products.findIndex(item => item.id === productData.id);
                    
                    if (index !== -1) {
                        products[index].title = productAdminBlock.querySelector('.product-admin-title').value;
                        products[index].descrMini = productAdminBlock.querySelector('.product-admin-descr-mini').value;
                        products[index].descrFull = productAdminBlock.querySelector('.product-admin-descr-full').value;
                        const priceV = productAdminBlock.querySelector('.product-add-quan-sum').value;
						products[index].price = parseInt(priceV.slice(0, priceV.length - 2));
                    }
        
                    saveLocalStorageAdmin(products);
                });

                renderAdminProducts('.admin-products', products);
            });
        });
    });

    const delIcon = document.querySelectorAll('.del-icon');

    delIcon.forEach(function(del) {
        del.addEventListener('click', function() {
            const productAdminBlock = this.closest('.product-admin-block');
            const products = getsaveLocalStorageAdmin();
            const productIdToDel = parseInt(productAdminBlock.getAttribute('data-id'), 10);
            const indexToDelete = products.findIndex(product => product.id === productIdToDel);
            let sumAdd = 0;
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart.forEach(function(item) {
                if (item.id === productIdToDel) {
                sumAdd += 1;
                }
            });
            const quantityToRemove = sumAdd;

            for (let i = 0; i < quantityToRemove; i++) {
                const indexToRemove = cart.findIndex(product => product.id === productIdToDel);
        
                if (indexToRemove !== -1) {
                    cart.splice(indexToRemove, 1);
                }
            }

            if (indexToDelete !== -1) {
                products.splice(indexToDelete, 1);
            }
            
            //updateCartQuantity(cart.length);
            //saveLocalStorage();
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('cartLength', String(cart.length));
            saveLocalStorageAdmin(products);
            productAdminBlock.remove();
        });
    }); 
});

export const addNewProduct = (selector) => {
    const parentEl = document.querySelector(selector);
    let { id, img, title, descrMini, descrFull, price } = '';
    const imgName = img ? img : 'noimg.webp';
    id = parseInt(localStorage.getItem('maxProductId')) + 1;
    
    const htmlAdmin = 
        `<div class="product-admin-block-new" data-id="${ id }">
            <div class="product-admin-box-new">
                <textarea class="product-admin-icon" cols="20" placeholder="Введіть назву файлу та розширення: p1.webp"></textarea>
            </div>
            <div class="product-admin-box-new" title="Назва товару">
                <textarea class="product-admin-title" cols="20" placeholder="Назва товару"></textarea>
            </div>
            <div class="product-admin-box-new" title="Короткий опис товару">
                <textarea class="product-admin-descr-mini" cols="20" placeholder="Короткий опис товару"></textarea>
            </div>
            <div class="product-admin-box-new" title="Повний опис товару">
                <textarea class="product-admin-descr-full" cols="20" placeholder="Повний опис товару"></textarea>
            </div>
            <div class="product-admin-box-new price-icon" title="Ціна товару">
                <textarea class="product-add-quan-sum" cols="20" placeholder="Ціна товару"></textarea>
            </div>
            <div class="product-admin-box-new">
                <button class="add-btn">Додати новий <br> товар</button>
            </div>
        </div>`;

    parentEl.insertAdjacentHTML('beforeend', htmlAdmin); 

    const addBtn = document.querySelector('.add-btn');

    addBtn.addEventListener("click", function() {
        const products = getsaveLocalStorageAdmin();
        const newProdImg = document.querySelector('.product-admin-icon');
        const newProdTitle = document.querySelector('.product-admin-title');
        const newProdDescrMini = document.querySelector('.product-admin-descr-mini');
        const newProdDescrFull = document.querySelector('.product-admin-descr-full');
        const newProdPrice = document.querySelector('.product-add-quan-sum');

        let newArrProd = { 
            id: id, 
            title: newProdTitle.value, 
            img: newProdImg.value, 
            price: newProdPrice.value,
            descrMini: newProdDescrMini.value,
            descrFull: newProdDescrFull.value
        };    

        products.push(newArrProd);
        saveLocalStorageAdmin(products);
        renderAdminProducts('.admin-products', products[products.length-1]);

        newProdImg.value = '';
        newProdTitle.value = '';
        newProdDescrMini.value = '';
        newProdDescrFull.value = '';
        newProdPrice.value = '';
    });  
}

export const saveLocalStorageAdmin = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
    const maxProduct = products.find((product) => product.id === Math.max(...products.map((product) => product.id)));
	localStorage.setItem('maxProductId', maxProduct.id);
};

export const getsaveLocalStorageAdmin = () => {
    const getData = localStorage.getItem('products');
    const parsedData = JSON.parse(getData);

    return parsedData || [];
};






// function imgAdd() {
//     const fileInput = document.querySelector("input[type='file']");
//     const imgPreview = document.querySelector(".product-preview"); // Припустимо, що ви хочете відобразити попередній перегляд у відповідному елементі

//     fileInput.addEventListener("change", function() {
//         const file = this.files[0];

//         if (file) {
//             const reader = new FileReader();

//             reader.addEventListener("load", function() {
//                 const imageUrl = reader.result;
//                 imgPreview.src = imageUrl;

//                 // Тут ви можете використовувати imageUrl для відображення попереднього перегляду або використання в іншій логіці
//             });

//             reader.readAsDataURL(file);
//         }
//     });
// }

// function imgAdd() {
//     const fileInput = document.querySelector("input[type='file']");
//     const file = fileInput.files[0];

//     const formData = new FormData();
//     formData.append("image", file);

//     fetch("./img/products", {
//       method: "POST",
//       body: formData,
//     }).then((response) => {
//         if (response.ok) {
//           // Файл успішно завантажений
//             const filename = file.name; // Отримати тільки ім'я файлу
//             console.log(filename);
//         } else {
//           // Помилка завантаження файлу
//         }
//       })
//     .catch((error) => {
//     // Помилка завантаження файлу
//     });
// }