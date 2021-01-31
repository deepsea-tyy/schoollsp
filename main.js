import Vue from 'vue'
import App from './App'


//引入vuex
import store from './store/index.js'  //vuex
import uView from 'uview-ui';
import * as fun from 'common/fun.js';

Vue.use(uView);

Vue.prototype.$store = store    //挂载vux
Vue.prototype.$fun = fun    //挂载vux

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	//挂载store
	store,
    ...App
})



app.$mount()
