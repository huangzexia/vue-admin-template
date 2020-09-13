/**
 * 用户登录
 */
import {get , post} from '@/services/remote.service';
import url from './url';
class AccountService {
  public login({username, password, service = window.location.hostname }: any) {
    return post(url.loginWithAccount, {username	, password, service });
  }
}

export default new AccountService();
