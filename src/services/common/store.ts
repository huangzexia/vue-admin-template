import { StoreOptions } from "vuex";
import service from "./index";
import {cacheStorage} from "@/util/cacheStorage";

const option: StoreOptions<any> = {
	state: {
		navList: [],
		appDetail: {},
	},
	mutations: {
		setNavList(state: any, navList: string) {
			state.navList = navList;
		},
		setAppDetail(state: any, appDetail: object) {
			state.appDetail = appDetail;
		},
	},
	getters: {
		navList(state: any) {
			return state.navList;
		},
		appDetail(state: any) {
			return state.appDetail;
		},
	},
	actions: {

		// 小区联想查询
		queryCommunity: async ({ commit }: any, params: any) => {
			return await service.queryCommunity(params);
		},
	}
};

export default option;
