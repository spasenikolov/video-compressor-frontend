import './assets/main.css'
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { createApp } from 'vue'
import App from './App.vue'
import Home from "@/components/Home.vue";
import Resize from "@/components/Resize.vue";
import ChangeFormat from "@/components/ChangeFormat.vue";
import Advanced from "@/components/Advanced.vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Documentation from "@/components/Documentation.vue";
const routes = [
  { path: '/', component: Home },
  { path: '/resize', component: Resize },
  { path: '/change-format', component: ChangeFormat },
  { path: '/advanced', component: Advanced },
  { path: '/documentation', component: Documentation}
];



const router = createRouter({
  history: createWebHistory(),
  routes,
})
createApp(App).use(router).mount('#app')
