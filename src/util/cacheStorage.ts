import localForage from 'localforage';
import moment from 'moment';
const EXPIRE_KEY = '_expire';

class Cache {
  public generateKey = (url: string, params: any) => {
    const sortedParams = Object.keys(params).sort().reduce((result: any, key: any) => {
      result[key] = params[key];
      return result;
    }, {});
    url += `${JSON.stringify(sortedParams)}`;
    return url;
  }

  public set = async (key: string, data: any, expired: number = 2) => {
    try {
      await localForage.setItem(key, data);
      // [year, month, day, hour, minute, second, millisecond]
      await localForage.setItem(`${key}${EXPIRE_KEY}`, moment().add(expired, 'minute').toISOString());
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  public get = async (key: string) => {
    try {
      const expiredKey = `${key}${EXPIRE_KEY}`;
      const expired: any = await localForage.getItem(expiredKey);
      if (expired && moment(expired).isBefore(moment())) {
        await localForage.removeItem(expiredKey);
        return null;
      } else {
        return await localForage.getItem(key);
      }
    } catch (err) {
      console.log(err);
    }
  }

  public remove = async (key: string) => {
    try {
      const expiredKey = `${key}${EXPIRE_KEY}`;
      await localForage.removeItem(expiredKey);
      return await localForage.removeItem(key);
    } catch (err) {
      console.log(err);
    }
  }

  public clear = async () => {
    try {
      await localForage.clear();
    } catch (err) {
      console.log(err);
    }
  }
}

export const cacheStorage = new Cache();
