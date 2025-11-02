import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import ChatPage from '../pages/ChatPage.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import RegisterForm from '../components/RegisterForm.vue'; // <-- use your component as a page

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatPage,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
