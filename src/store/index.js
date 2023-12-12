import { createStore } from 'vuex';
import user from './user';
import houses from './houses';

export default createStore({
  modules: {
    user,
    houses
  }
});
