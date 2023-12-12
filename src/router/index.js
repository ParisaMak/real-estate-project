import { createRouter, createWebHistory } from 'vue-router';
import HousesPage from '@/views/HousesPage/HousesPage.vue';
import HouseDetails from '@/views/HouseDetailPage/HouseDetails.vue';
import FavoritePage from '@/views/favoritePage/FavoritePage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import AboutPage from '@/views/AboutPage.vue';
import SignUp from '@/views/SignUp.vue';
import LogIn from '@/views/LogIn.vue';

import CreateListingPage from '@/views/CreateListingPage/CreateListingPage.vue'
const routes = [
    { path: '/' , component: HousesPage },
    { path: '/about' , component: AboutPage },
    { path: '/profile' , component: ProfilePage },
    { path: '/houses/:id' , component: HouseDetails },
    { path: '/favorite' , component: FavoritePage },
    { path: '/create' , component: CreateListingPage ,  name: 'CreateListingPage' },
    { path: '/login' , component: LogIn },
    { path: '/SignUp' , component: SignUp },
]
const router = createRouter({
    history: createWebHistory(),
    routes, 
  });
  
  export default router;