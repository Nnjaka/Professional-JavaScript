const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts = []; //массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
        this.addToBasket();
    }

    addToBasket() {
        let btnBuyArr = document.querySelectorAll('.buy-btn');
        btnBuyArr.forEach(btn => btn.addEventListener('click', this.changeInBasket));
    }

    changeInBasket(e) {
        let itemId = e.target.parentNode.parentNode.dataset.id;
        let itemPrice = this.parentNode.children[1].children[0].textContent;
        basket.addProductInBasket(itemId, itemPrice);
    }
}


class ProductItem {
    constructor(product, img = 'https://picsum.photos/200/150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p><span class="product-price">${this.price}</span> $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}


class Basket {
    constructor(container = '.drop') {
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts = []; //массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data.contents];
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        this.showBasket();

        for (let product of this.goods) {
            const productObj = new BasketItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
        block.insertAdjacentHTML('beforeend', `<button class="buy-order">Оформить заказ</button>`);


    }

    showBasket() {
        const btnBasket = document.querySelector('.btn-cart');
        const drop = document.querySelector('.drop');
        let dropStatus = drop.style.display;
        btnBasket.addEventListener('click', () => {
            drop.classList.toggle('basket-invisible');
        });
    }

    addProductInBasket(id, price) {
        let product = document.querySelector(`.basket-product-item[data-id="${id}"]`);
        let quantity = product.querySelector('.basket-quantity').textContent;
        quantity++;
        product.querySelector('.basket-quantity').textContent = quantity;
        let newPrice = price * quantity;
        product.querySelector('.basket-price').textContent = newPrice;
        this.calcSum();
    }
}

class BasketItem {
    constructor(product, img = 'https://picsum.photos/200/150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="basket-product-item" data-id="${this.id}">
                <img class="basket-img" src="${this.img}" alt="Some img">
                <div class="basket-desc">
                    <h3>${this.title}</h3>
                    <p><span class="basket-price">${this.price}</span> $</p>
                    <div class="basket-items">
                        <a href="#"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>
                        <span class="basket-quantity">1</span>
                        <a href="#"><i class="fa fa-plus-circle" aria-hidden="true"></i></a>
                        <a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a>
                    </div>
                </div>
                </div>`
    }
}

let list = new ProductsList();
let basket = new Basket();