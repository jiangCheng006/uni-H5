import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: false
	},
	mutations: {
		login(state, provider) {
			state.isLogin = true
		},
		logout(state) {
			state.isLogin = false
		}
	},
	getters: {
		isLogin(state) {
			return state.isLogin
		}
	},
	actions: {
	}
})

export default store
