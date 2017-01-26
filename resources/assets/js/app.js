
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

window.EventBus = new Vue({});

import NavHeader from './components/NavHeader.vue';

import Home from './components/Home.vue';
import Grid from './components/Grid.vue';
import CanvasEngine from './components/CanvasEngine.vue';
import CanvasSignature from './components/CanvasSignature.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
    { path: '/',                component: Home },
    { path: '/Grid',            component: Grid },
    { path: '/CanvasEngine',    component: CanvasEngine },
    { path: '/CanvasSignature', component: CanvasSignature }
];

const app = new Vue({
    router: new VueRouter({ routes }),

    el: '#app',

    components: { NavHeader }
});
