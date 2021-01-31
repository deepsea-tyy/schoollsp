import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
        set_window_height:'0',
    },
    mutations: {
        set_window_height(state,set_window_height){
			state.set_window_height = set_window_height
		}
    }
})

export default store
