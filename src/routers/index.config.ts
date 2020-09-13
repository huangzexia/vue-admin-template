import { RouteConfig } from 'vue-router';
export const indexConfig: RouteConfig[] = [
	{
		path: '/',
		name: 'login',
		component: () => import(/* webpackChunkName: "home" */ '@/views/login.vue'),
	},
	{
		path: '/index',
		name: 'index',
		redirect: '/home',
		component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue'),
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
			}
		]
	}
];
