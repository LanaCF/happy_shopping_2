// import products from '../data/products.js';

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
                <img src="img/close.png" alt="" class="close-img">
            </div>
            <div class="product-admin-box save-btn-box" title="Видалити товар">
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
            const editAreas = productAdminBlock.querySelectorAll('.edit');  // Оновлено: Змінено назву для уникнення конфлікту імен
            
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
                        console.log(products[index].price);
                    }
        
                    console.log(products);
                    saveLocalStorageAdmin(products);
                    renderAdminProducts('.admin-products', products);
                });
            });
        });
    });
});

export const saveLocalStorageAdmin = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
};

export const getsaveLocalStorageAdmin = () => {
    const getData = localStorage.getItem('products');
    const parsedData = JSON.parse(getData);

    return parsedData || [];
};







// export const saveLocalStorageAdmin = (data) => {

//     // Отримати збережені дані з локального сховища
//     // const storedData = getsaveLocalStorageAdmin();

//     // // Замінити старі дані на нові в масиві
//     // const updatedData = storedData.map(item => (item.id === data.id ? data : item));

//     // Збереження оновлених даних в локальному сховищі
//     localStorage.setItem('products', JSON.stringify(products));
// };