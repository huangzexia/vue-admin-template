class CacheSession {
	public set = async (key: string, data: any) => {
		try {
			return await sessionStorage.setItem(key, data);
		} catch (err) {
			console.log(err);
		}
	}

	public get = async (key: string) => {
		try {
			return await sessionStorage.getItem(key);
		} catch (err) {
			console.log(err);
		}
	}

	public remove = async (key: string) => {
		try {
			return  await sessionStorage.removeItem(key);
		} catch (err) {
			console.log(err);
		}
	}

	public clear = async () => {
		try {
			return await sessionStorage.clear();
		} catch (err) {
			console.log(err);
		}
	}
}

export const cacheSession = new CacheSession();
