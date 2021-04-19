// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: 'https://placehold.it/50x100',
            showCart: false,
            amount: 0
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.imgPath = `img/${item.id_product}.png`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {
                        quantity: 1
                    })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({
                    quantity: 1
                }, item);
                item.imgPath = `img/${item.id_product}.png`;
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, {
                        quantity: -1
                    })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },

    template: `<div class="header_cart_link"  >
                    <a href="#"><img src="img/cart.png" alt="cart" class="header_cart" @click="showCart = !showCart"></a>
                    <div class="drop drop_1" v-show="showCart">
                            <div class="drop_col_cart">
                                <cart-item class="drop_col_product" v-for="item of cartItems" :key="item.id_product" :img="item.imgPath" :cart-item="item" @remove="remove">
                                </cart-item>
                                <div class="drop_col_total">
                                    <div class="drop_total">Total</div>
                                    <div class="drop_total"><span>$</span>{{ this.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0) }}</div>
                                </div>
                                <a href="checkout.html">
                                    <div class="drop_button_checkout">Checkout</div>
                                </a>
                                <a href="cart.html">
                                    <div class="drop_button_go">Go&nbsp;to&nbsp;cart</div>
                                </a>
                            </div>
                    </div>
                </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item">
        <a href="#">
            <img class="drop_col_product_img" :src="img" alt="Some img">
            
        </a>
        <div class="drop_col_product_text">
            <a href="#">
                <h4 class="drop_col_product_text_h">{{ cartItem.product_name }}</h4>
            </a>
            <img class="drop_col_product_stars" src="img/stars2.png" alt="stars">
            <p class="drop_col_product_text_p">{{ cartItem.quantity }}&nbsp;x {{ cartItem.price }}</p>
        </div>
        <div class="drop_col_product_icon">
            <a href="javascript://" @click="$emit('remove', cartItem)">
                <i class="fas fa-times-circle drop_col_product_icon_i"></i>
            </a>
        </div>
    </div>
    `
})