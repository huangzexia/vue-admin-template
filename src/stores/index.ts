import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// 公共Store
import commonStore from "@/services/common/store"
// 登录Store
import authStore from "@/services/auth/store"
Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		common: commonStore,
		auth: authStore,
	},
	plugins: [
		createPersistedState({
			storage: window.sessionStorage
		})
	]
});

export default store;
