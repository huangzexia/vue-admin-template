let baseUrl = ""; // 这里是一个默认的url，可以没有

if (process.env.VUE_APP_TITLE) {
	let origin: any;
	if (!window.location.origin) {
		origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
	} else {
		origin = window.location.origin;
	}
	baseUrl = origin + '/yougu-app-admin';
	console.log(
    `当前为打包环境：${process.env.VUE_APP_TITLE},接口地址为${baseUrl}`
  );
} else {
  baseUrl = "/api";
  console.log(`当前环境为：dev开发环境,接口地址为${baseUrl}`);
}
export const apiBaseUrl = baseUrl;

