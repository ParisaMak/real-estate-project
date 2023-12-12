import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';
import '@/style/variables.css';
import store from '@/store/index'; 
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBath,faBed ,faSquare,faSearch ,faUser,faHeart,faRightToBracket } from '@fortawesome/free-solid-svg-icons';

library.add(faBath,faBed,faSquare ,faSearch ,faHeart,faUser,faRightToBracket);

const app = createApp(App);
app.use(store);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');