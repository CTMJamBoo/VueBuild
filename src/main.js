import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './assets/js/axios'
import VueLazyload from 'vue-lazyload'
import {commonUrl} from './assets/js/env'

Vue.config.productionTip = false



import { Button, Toast, Swipe, Loadmore, MessageBox, Popup, Search, SwipeItem } from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Search.name, Search);
Vue.component(Popup.name, Popup);


Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '@assets/img/error.jpg',
    loading: '@assets/img/loading.gif',
    attempt: 1
})


Vue.prototype.$Toast = Toast
Vue.prototype.$axios = axios
Vue.prototype.$MessageBox = MessageBox

// const commonUrl = `http://${process.env.NODE_ENV == 'development' ? 'localhost' : '47.100.137.9'}:8888`

Vue.prototype.$commonUrl = commonUrl

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')