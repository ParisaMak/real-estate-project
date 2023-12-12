<template >
    <div class="header-component">
        <div class="header-group">
            <div class="header-group-houses-about">
                <img src="" alt="">
                <h1>Houses</h1>
                <h1>About</h1>
            </div>
            <div class="header-group-profile-login">
                <div class="icon-name-group">
                    <font-awesome-icon :icon="['fas', 'user']" />
                    <router-link to="/profile">Profile</router-link>
                </div>
                <div class="icon-name-group">
                    <font-awesome-icon :icon="['fas', 'heart']" />
                    <router-link to="/favorite">Favorite</router-link>
                </div>
                <div v-if="user" class="icon-name-group" @click="handleLogout">
                    <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                    <h1>Logout</h1>
                </div>
                <div v-else class="icon-name-group">
                    <font-awesome-icon :icon="['fas', 'sign-in-alt']" /> 
                    <router-link to="/login">Login</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import { onAuthStateChanged , signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase'

export default {
    name: 'HeaderComponent',
    setup() {
        const user = ref(false);

        onAuthStateChanged(auth, (authUser) => {
                if (authUser) {
                    user.value = true;
                } else {
                    user.value = false;
                }
                });
        const handleLogout = async () => {
            try {
              await signOut(auth);
             } catch (error) {
               console.error("Error signing out:", error);
            }
        };

        return {
            user,
            handleLogout,
        };
    }
}
</script>
<style scoped>
    .header-component{
        width: 100%;
        height: 60px;
        display: flex;
        background: var(--background-2);
        align-items: center;
        justify-content: center;
        display:none;


    }
    .header-group{
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        gap: 30px;
    }

    .header-group-profile-login, .header-group-houses-about{
        display: flex;
        gap: 30px;
        align-items: center;
    }

    .icon-name-group{
       display: flex;
       gap: 10px;
       align-items: center;
    }

    img{
        width: 30px;
        height: 30px;
        background: red;
    }
    h1{
        font-family: var(--font-family-montserrat);
        font-size: var(--font-size-desktop-header-active-menu);
        font-weight: var(--font-weight-bold);
    }
   
    .active{
        color: var(--primary-text-color);
    }
    .inactive{
        color: var(--secondary-text-color);
    }
    @media only screen and (min-width: 768px) {
        .header-component{
         display:block ;
    }
    }
</style>