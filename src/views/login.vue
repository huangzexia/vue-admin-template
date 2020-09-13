<template>
	<div class="wrap" :key="wrapKey">
		<el-image :src="loginBackground" class="bg-img" fit="cover"></el-image>
		<div class="loginForm">
			<span class="logo">
				这里是Logo
			</span>
			<div v-show="type==='login'">
				<el-input
					class="loginName"
					@keyup.native.13="loginSubmit"
					placeholder="登录名或手机号"
					v-model="phone" >
					<el-image slot="prefix" fit="contain" :src="require('../assets/img/user.png')" class="user-icon"></el-image>
				</el-input>
				<el-input class="password"
					placeholder="登录密码"
					@keyup.native.13="loginSubmit"
					type="password"
					v-model="password">
					<el-image slot="prefix" fit="contain" :src="require('../assets/img/password.png')" class="user-icon"></el-image>
				</el-input>
				<div class="caption">
					<el-checkbox v-model="checked" class="remember-password">
						<span class="remember-text">记住密码</span>
					</el-checkbox>
					<span class="forget-password cursor-pointer">忘记密码</span>
				</div>
				<el-button class="btnBg" @click="loginSubmit" :loading="loginLoading">登录</el-button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import service from '@/services/auth/index';

@Component({
	components: {}
})
export default class Login extends Vue {
	loginBackground: any = require('../assets/img/bg.jpg');
	phone = "admin";
	password: string = "123456";
	type: string = "login";
	loginLoading: boolean = false;
	checked: boolean = true;
	logo: string = '';
	wrapKey: number = 0;
	constructor() {
		super();
	}
	created() {
		const _this: any = this;
		_this.checkLoginStatus();
	}
	// 记住密码
	async checkLoginStatus() {
		const _this: any = this;
		const token = await _this.$storage.get("app_token") || await _this.$session.get("app_token") ;
		if(token) {
			await _this.$router.push({path: '/index'});
		}
	}
	// 登录
	async loginSubmit() {
		const _this: any = this;
		if (_this.phone === '') {
			_this.$message.warning('用户名不能为空！');
			return;
		}
		if (_this.password === '') {
			_this.$message.warning('登录密码不能为空！');
			return;
		}
		// 写自己项目的请求
		// const res: any = await service.login({
		// 	username: _this.phone,
		// 	password: _this.password
		// });
		// if(res) {
		// 	if(res.code) {
		// 		if(res.code && res.code === 'app_413') {
		// 			_this.$message.warning(res.message);
		// 		}
		// 	} else {
		// 		if(_this.checked) {
		// 			// 记住密码,2天
		// 			await _this.$storage.set("app_token", res[0].app_token, 60 * 24 * 2);
		// 		} else {
		// 			// 没有勾选记住密码，清空storage
		// 			if(await _this.$storage.get("app_token")) {
		// 				await _this.$storage.remove('app_token');
		// 			}
		// 			// 没有勾选记住密码，一次性存储
		// 			await _this.$session.set("app_token", res[0].app_token);
		// 		}
		// 		// 跳转
		// 		_this.$router.replace({path: '/'})
		// 	}
		// }
		_this.$router.replace({path: '/index'})
	}
}
</script>

<style lang="scss" scoped>
	.wrap {
		height: 100vh;
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center;     /* 垂直居中 */
		.bg-img {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 99;
			img {
				width: 100% !important;
			}
		}
		.loginForm {
			@include width-height-lineHeight(415px, 350px);
			@include padding(60px, 40px, 60px, 40px);
			@include background();
			@include text-center();
			position: relative;
			z-index: 120;
			border-radius: 6px;
			.logo {
				display: inline-block;
				@include width(415px);
				@include text-center();
				position: absolute;
				top: -80px;
				left: 0;
				z-index: 120;
				.logo-img {
					@include width(200px);
					@include height(60px);
				}
			}
			.user-icon {
				@include height(16px);
				@include margin-top(12px);

			}
			.loginName,.password {
			.el-input__prefix {
				width: 39px;
			}
			.el-input__inner {
				padding-left: 44px !important;
			}
		}
			.password {
				@include margin(30px, 0px, 0px, 0px);
			}
			.caption {
				@include color($default-title-color);
				@include margin(10px, 0px, 0px, 0px);
				@include fz($font-default-font-size);
				display: flex;
				justify-content: space-between;
				align-items: center;
				.remember-password {
					vertical-align: top;
					.remember-text {
						@include fz($font-default-font-size);
					}
				}
				.forget-password {
					display: inline-block;
				}
			}
			.btnBg {
				@include width(100%);
				@include margin(50px, 0px, 0px, 0px);
				@include background($primary-color);
				@include color();
			}
		}
	}
</style>
