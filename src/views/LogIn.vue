<template>
    <div class="container">

        <div class="login-inner-box">
          <h1 class="header">Login</h1>
          <form class="form"  @submit.prevent="handleSubmit">
            <div class="input-group">
              <label for="email">Email :</label>
              <input
                type="email"
                name="email"
                id="email"
                v-model="email"
                placeholder="Email"
                autoComplete="email"
                required
              />
            </div>
            <div class="input-group">
              <label for="password">Password :</label>
              <input

                type="password"
                name="password"
                id="password"
                v-model="password"
                placeholder="Password"
                autoComplete="current-password"
                required
            />
            </div>
            <button class="login-btn" type="submit" >Login</button>
          </form>
          <div class="other-actions">
            <button class="google-btn" @click.prevent="logGoogleUser">Login with Google</button>
            <router-link to="/signup" class="member-btn">Become a member</router-link>
          </div>
          <div v-if="error" class="error-message">{{ error }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
   import { 
    SignInWithGooglePopup, 
    SignInAuthUserWithEmailAndPassword
   } from '@/firebase/firebase'; 
   import { saveUser } from '@/firebase/firestore';
   import { useStore } from 'vuex';

    export default {
    name:'LogIn',
    setup() {
      const email = ref("");
      const password = ref("");
      const error = ref("");
      const router = useRouter();
      const store = useStore();

      const navigateToMainPage = () => {
        router.push('/')
      }
      const handleSubmit = async () => {

          try {
              const response = await SignInAuthUserWithEmailAndPassword (email.value, password.value);
              if(response.user) {
                console.log(response.user)
                store.dispatch('fetchUser');
                await saveUser(response.user)
                navigateToMainPage();
              }
            } catch (err) {
              if (err.code === 'auth/wrong-password') {
                error.value = 'Incorrect password for email';
                } else if (err.code === 'auth/user-not-found') {
               error.value='No user associated with this email';
               } else if(err.code === 'auth/invalid-login-credentials') {
                error.value='No user associated with this email';
               } else{
                console.log(err)
              }
            }
        };

     const logGoogleUser = async () => {
      try{
         const response = await SignInWithGooglePopup();
         if(response.user) {
            console.log(response.user)
            store.dispatch('fetchUser');
            await saveUser(response.user)
            navigateToMainPage();
         }
      } catch(error) {
        console.log(error)
      }
     }

    return{
      email,
      password,
      error,
      logGoogleUser,
      handleSubmit,
  
    }
  }
}
  </script>
  
  <style scoped>
  .container {
    width: 100vw;
    height:100vh;
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
  
  input {
    height:50px ;
    margin: 10px 0;
    font-family: var(--font-family-open-sans);
    font-size: var(--font-size-input-field-title-mobile);
    font-weight: var(--font-weight-semibold);
    color:var(--secondary-text-color);
    background:var(--background-1);
    border-radius: 5px;
    border:none;
    padding: 10px;
    box-sizing: border-box;
  }
 
  label{
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-input-field-title-mobile);
    font-weight: var(--font-weight-regular);
  }

  .other-actions {
    height:50px ;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
    margin-top: 20px;
  }

  button{
    height: 50px;
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-mobile-buttons-tabs);
    font-weight: var(--font-weight-bold);
    border: none;
    border-radius: 10px;
    text-align: center;
  }
  
  .login-btn {
    background-color: var(--primary-text-color);
    color: var(--tertiary-text-color);
  }

  .google-btn {
    background-color: var(--primary-color);
    color: var(--background-2);
  }
  
  .member-btn {
    background-color: var(--tertiary-dark-color);
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
    color: var(--primary-text-color);
  }
  .invalid-border {
    border: 2px solid red;
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

  .header{
    font-size: var( --font-size-header-1-desktop);
  }
  .input{
    font-size: var( --font-size-input-field-title-desktop);
  }

  label{
    font-size: var( --font-size-input-field-title-desktop);
  }

   button{
    font-size: var(--font-size-desktop-buttons-tabs);
    }

  .login-inner-box {
    width:500px;
    height: 500px;
    box-sizing: border-box;
    padding: 30px;
    border: none; 
    border-radius: 10px;
  }
  .container {
    background: none;
    height: auto;
    min-height: calc(100vh - 60px);
     padding: 20px 0px;

  }
  .login-btn{
    font-size: var(--font-size-desktop-buttons-tabs);
  }

  .member-btn {
    font-size: var(--font-size-desktop-buttons-tabs);
  }
 
}
  </style>