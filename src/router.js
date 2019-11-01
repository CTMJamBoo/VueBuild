import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CartList from './views/CartList.vue'
import GoodsList from './views/GoodsList.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Error from './views/Error.vue'
import GoodsDetail from './views/GoodsDetail.vue'
import Search from './views/Search.vue'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            redirect: '/home' //重定向到首页
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/goodsDetail/:goodsId',
            name: 'goodsDetail',
            component: GoodsDetail
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/cartList',
            name: 'cartList',
            component: CartList
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        },
        {
            path: '/goodsList/:classifyId/:sign1/:sign2',
            name: 'goodsList',
            component: GoodsList
        },
        {
            path: '*',
            name: 'error',
            component: Error // 内容
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})