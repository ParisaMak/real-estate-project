import { auth, db } from '@/firebase/firebase'; 
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const state = {
  user: null
};

const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  }
};

const actions = {async fetchUser({ commit }) {
  const userId = auth.currentUser.uid;
  const userDocRef = doc(db, 'users', userId);
  const userSnapshot = await getDoc(userDocRef);
  if (userSnapshot.exists()) {
    console.log('User found:', userSnapshot.data());
    commit('SET_USER', userSnapshot.data());
  } else {
    console.error('User not found in Firestore');
  }
},
async addToFavorites({ state, commit }, itemId) {
  const userId = auth.currentUser.uid;
  const userDocRef = doc(db, 'users', userId);
  await updateDoc(userDocRef, {
    favorites: arrayUnion(itemId)
  });
  if (state.user) {
    const updatedFavorites = [...state.user.favorites, itemId];
    commit('SET_USER', { ...state.user, favorites: updatedFavorites });
  }
},
async removeFromFavorites({ state, commit }, itemId) {
  const userId = auth.currentUser.uid;
  const userDocRef = doc(db, 'users', userId);
  await updateDoc(userDocRef, {
    favorites: arrayRemove(itemId)
  });
  if (state.user) {
    const updatedFavorites = state.user.favorites.filter(item => item !== itemId);
    commit('SET_USER', { ...state.user, favorites: updatedFavorites });
  }
}
};

const getters = {
  userFavorites: state => state.user ? state.user.favorites : [],
  getUser: state => state.user
};

export default {
  state,
  mutations,
  actions,
  getters
};