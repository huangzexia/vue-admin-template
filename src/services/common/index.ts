
/**
 * 公共方法API
 */
import {get, post, del, put, upLoad} from '@/services/remote.service';
import url from './url';

export interface IReportService {
	queryCommunity(params: any): Promise<any>; // 小区联想查询
	// upLoad(file: any): Promise<any>; // 单张图片上传
}

class CommonService implements IReportService {
	// 小区联想查询
	queryCommunity(params: any) {
		const config: object = {
			headers: {
				showLoading: false,
				timeout: 10000
			}
		};
		params.community = encodeURI(params.community);
		return get(url.queryCommunity(params.community, params.district), config);
	}
}

export default new CommonService();
