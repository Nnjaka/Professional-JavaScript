Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `<form action="#" class="header_form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                    <details class="header_browse">
                        <summary class="summery_browse">Browse</summary>
                            <div class="drop">
                                <div class="drop_col">
                                    <h3 class="drop_col_heading">Woman</h3>
                                    <ul class="drop_ul">
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Dresses </a></li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Tops </a></li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Sweaters/Knits </a>
                                        </li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Jackets/Coats </a>
                                        </li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Blazers </a></li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Denim </a></li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Leggings/Pants </a>
                                        </li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Skirts/Shorts </a>
                                        </li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Accessories</a></li>
                                    </ul>
                                    <h3 class="drop_col_heading">Man</h3>
                                    <ul class="drop_ul">
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Tees/Tank tops </a>
                                        </li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Shirts/Polos </a>
                                        </li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Sweaters </a></li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Sweatshirts/Hoodies
                                            </a></li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Blazers </a></li>
                                        <li class="drop_col_list"><a href="#" class="drop_col_link">Jackets/vests </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                    </details>
                    <input class="header_input" type="text" placeholder="Search for Item..." v-model="userSearch">
                    <div class="header_button_search"><a href="#"><img src="img/search.png" alt="search"></a></div>
                </form>`
})