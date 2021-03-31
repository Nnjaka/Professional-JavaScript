class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [{
                id: 1,
                title: 'Notebook',
                price: 2000
            },
            {
                id: 2,
                title: 'Mouse',
                price: 20
            },
            {
                id: 3,
                title: 'Keyboard',
                price: 200
            },
            {
                id: 4,
                title: 'Gamepad',
                price: 50
            },
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
            //            block.innerHTML += productObj.render();
        }
    }

    //Метод, определяющий суммарную стоимость всех товаров
    getSumOfGoods() {
        let sumOfGoods = 0;
        this.goods.forEach(good => sumOfGoods += good.price);
    }

}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;

    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class Cart {
    constructor() {
        //в конструкторе должен быть контейнер с названием класса и массив товаров (по аналогии с ProductsList)
    }

    addToCart() {
        //добавление товаров в корзину
    }

    removeFromCart() {
        //удаление товаров из корзины
    }

    emptyingCart() {
        //очистка корзины
    }

    restoreCart() {
        //восстановить удаленные товары
    }

    sumOfGoodsInCart() {
        //подсчет суммы товаров в корзине
    }

    checkout() {
        //оформить заказ
    }

    render() {
        //"отрисовка" корзины
    }
}

class CartItem {
    //по-идее свойства и методы аналогичны ProductItem (меняется только оформление)
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;

    }

    render() {

    }
}

let list = new ProductsList();
list.render();