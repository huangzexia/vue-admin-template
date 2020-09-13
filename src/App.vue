<template>
	<div id="app">
		<router-view> </router-view>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import "@/styles/base.scss";
	import "@/styles/resetElement.scss";
	import { delay } from 'lodash';
	@Component({
		components: {}
	})
	export default class App extends Vue {
		constructor() {
			super();
		}
		created() {
			const _this: any = this;
			// _this.setWebLogo();
		}
		get sysInfo() {
			return this.$store.getters.appDetail;
		}
		// async setWebLogo() {
		// 	const _this: any = this;
		// 	const sysInfo = _this.sysInfo;
		// 	if(sysInfo && sysInfo.web_logo_path) {
		// 		const link: any = document.querySelector("link[rel*='icon']") || document.createElement('link');
		// 		link.type = 'image/x-icon';
		// 		link.rel = 'shortcut icon';
		// 		link.href = sysInfo.web_logo_path;
		// 		document.getElementsByTagName('head')[0].appendChild(link);
		// 	}
		// 	if(sysInfo && sysInfo.sys_name) {
		// 		document.title = sysInfo.sys_name;
		// 	}
		// }
	}
</script>

<style lang="scss">
</style>