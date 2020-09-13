import { StoreOptions } from "vuex";

const option: StoreOptions<any> = {
	state: {
		userInfo: null
	},
	mutations: {
		updateUserInfo: (state, userInfo) => {
			state.userInfo = userInfo;
		}
	},
	getters: {
		userInfo: (state) => {
			return state.userInfo;
		}
	},
	actions: {}
};

export default option;
