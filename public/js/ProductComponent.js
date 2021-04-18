Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 'https://placehold.it/200x150'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    item.imgPath = `img/${item.id_product}.png`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="galery_products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.imgPath"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: ` <div class="galery_product">
                    <a href="#" class="galery_link">
                        <img :src="img" class="galery_product_img" alt="img_photo">
                    </a>
                    <div class="product_info">
                        <a href="#" class="galery_product_name">{{product.product_name}}</a>
                        <p class="galery_product_price"><span>$</span>{{product.price}}<img class="product_stars" src="img/stars.png" alt="stars">
                        </p>
                    </div>
                    <a class="galery_product_button" href="javascript://" @click="$emit('add-product', product)"><img src="img/cart_white.png" alt="cart">Add to&nbsp;Cart</a>
                </div>`
})