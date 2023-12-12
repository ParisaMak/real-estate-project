<template>
  <div class="container">

      <div class="login-inner-box">
        <h1 class="header">Sign Up</h1>
        <form class="form" @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="displayName">Name</label>
            <input
              class="input"
              type="text"
              name="displayName"
              id="displayName"
              v-model="displayName"
              placeholder="Enter your name"
              required
            />
          </div>
          <div class="input-group">
            <label for="email">Email</label>
            <input
              class="input"
              type="email"
              name="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="input-group">
            <label for="password">Create a password:</label>
            <input
              class="input"
              type="password"
              name="password"
              id="password"
              v-model="password"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>
          <div class="input-group">
            <label for="password">Confirm your password</label>
            <input
              class="input"
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              v-model="passwordConfirmation"
              placeholder="repeat your password"
              required
            />
          </div>
          <button class="signUp-btn" type="submit">Sign Up</button>
        </form>
        <router-link to="/login"  class="login-btn" >LogIn</router-link>
        <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { CreateAuthUserWithEmailAndPassword , db } from '@/firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name:'LogIn',
  setup() {
      const displayName = ref("");
      const email = ref("");
      const password = ref("");
      const error = ref("");
      const passwordConfirmation = ref("");
      const router = useRouter();
      const store = useStore();

      const resetForm = () => {
      displayName.value = "";
      email.value = "";
      password.value = "";
      passwordConfirmation.value = "";
      error.value = "";
       };

      const navigateToMainPage = () => {
        router.push('/')
      }
      
      const handleSubmit = async () => {
  try {
    if (password.value !== passwordConfirmation.value) {
      throw new Error('Passwords do not match');
    }

    const { user } = await CreateAuthUserWithEmailAndPassword(email.value, password.value);
    const userData = {
          uid: user.uid,
          email: user.email,
          displayName: displayName.value,
          favorites: []
        };
        await setDoc(doc(db, "users", user.uid), userData);
        await store.dispatch('fetchUser');

    navigateToMainPage();
    resetForm();
  } catch (err) {
    if (err.message === 'Passwords do not match') {
      error.value = err.message;
    } else if (err.code === 'auth/email-already-in-use') {
      error.value = "Cannot create user, email already in use";
    } else if (err.code === 'auth/weak-password') {
      error.value = "Password should be at least 6 characters";
    } else {
      error.value = "User creation encountered an error";
      console.log(err);
    }
  }
};
    return {
      email,
      password,
      error,
      passwordConfirmation,
      displayName,
      handleSubmit
    };
  },
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: auto;
  min-height: 100%;
  background: var(--background-2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-inner-box {
  width: 100%;
  height:auto;
  background: var(--background-2);
  box-sizing: border-box;
  padding: 30px;
}

.header{
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-header-1-mobile);
  font-weight: var(--font-weight-bold);
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap:20px
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input {
  height:50px ;
  margin: 10px 0;
  font-family: var(--font-family-open-sans);
  font-size: var(--font-size-input-field-title-mobile);
  font-weight: var(--font-weight-semibold);
  color:var(--secondary-text-color);
  background:var(--background-1);
  border-radius: 5px;
  border:none;
  padding: 10px ;
  box-sizing: border-box;
}

label{
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-input-field-title-mobile);
  font-weight: var(--font-weight-regular);
}

.signUp-btn{
  background: var(--primary-color);
  color: var( --tertiary-text-color);
  height: 50px;
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-mobile-buttons-tabs);
  font-weight: var(--font-weight-bold);
  border: none;
  border-radius: 10px;
  text-align: center;
}
.login-btn{
    background-color: var(--primary-text-color);
    color: var(--tertiary-text-color);
    height: 50px;
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-mobile-buttons-tabs);
    font-weight: var(--font-weight-bold);
    border: none;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration: none;
    margin-top: 20px;
}
.error-message {
    color: red;
    font-weight: bold;
    margin: 20px 0px;
    text-align: center;
    font-family:var(--font-family-open-sans) ;
    font-size:var(--font-size-error-message-mobile) ;
    font-weight:var(--font-weight-medium) ;
    font-style: italic;
}

@media only screen and (min-width: 768px) {

.login-box{
  max-width: 50%;
  max-height: 50%;
}
.header{
  font-size: var( --font-size-header-1-desktop);
}
.input{
  font-size: var( --font-size-input-field-title-desktop);
}

label{
  font-size: var( --font-size-input-field-title-desktop);
}

.login-inner-box {
  width:500px;
  height: auto;
  box-sizing: border-box;
  padding: 30px;
  border: none; 
  border-radius: 10px;
}
.container {
  background: none;
  padding: 20px;
  height: auto;
  padding: 20px 0px;
}
.signUp-btn{
  font-size: var(--font-size-desktop-buttons-tabs);
}
.login-btn{
    font-size: var(--font-size-desktop-buttons-tabs)
}
}
</style>