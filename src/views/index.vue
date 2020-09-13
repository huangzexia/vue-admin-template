<template>
		<div class="main-container" ref="indexWrapRef">
			<aside class="aside-container">
				<el-scrollbar style="height:100%">
					<el-aside width="208px">
						<el-menu
							router
							:default-active="$route.name"
							class="el-menu-vertical-demo"
						
							text-color="#fff"
							active-text-color="#fff"
						>
							<el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>
							<el-submenu index="1">
								<template slot="title"><i class="el-icon-message"></i>导航一</template>
								<el-menu-item index="1-1">选项1</el-menu-item>
								<el-menu-item index="1-2">选项2</el-menu-item>
							</el-submenu>
						</el-menu>
					</el-aside>
				</el-scrollbar>
			</aside>
			<section class="router-view-wrap">
				<header class="main-header">
					<div class="main-header-inner">
						<div style="flex: 1 1 0%;"></div>
						<div class="header-right">右侧</div>
					</div>
				</header>
				<div class="router-view">
					<router-view></router-view>
				</div>
			</section>
		</div>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator';

	@Component({
		components: {}
	})
	export default class IndexPage extends Vue {}
</script>
<style lang="scss" scoped>
	.main-container {
		display: flex;
		.aside-container {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			height: 100vh;
			@include width(208px);
			@include background($primary-color);
		}
		.router-view-wrap {
			position: relative;
			min-height: 100vh;
			@include width(100%);
			@include background(#f0f2f5);
			@include padding-left(208px);
			overflow-x: hidden;
			.router-view {
				@include margin(68px,20px,20px,20px);
				@include background();
				@include padding(20px);
				min-height: calc(100vh - 88px);
			}
		}
		.main-header {
			position: fixed;
			padding: 0px;
			@include width(48px);
			@include  line-height(48px);
			@include background();
			width: calc(100% - 208px);
			z-index: 9;
			right: 0px;
			.main-header-inner {
				position: relative;
				display: flex;
				align-items: center;
				height: 100%;
				padding: 0 16px;
				box-shadow: 0 1px 4px rgba(0,21,41,.08);
				.header-right {
					display: flex;
					float: right;
					@include height(48px);
					margin-left: auto;
					overflow: hidden;
				}
			}
			
		}
	}
</style>
