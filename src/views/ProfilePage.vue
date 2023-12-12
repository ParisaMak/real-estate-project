<template >
    <div>
    </div>
</template>
<script>
import { useStore } from 'vuex';
import { computed ,onMounted  } from 'vue';

export default {
    name: 'ProfilePage',
    setup() {
        const store = useStore();
        const user = computed(() => store.getters.getUser);
        onMounted(() => {
            console.log(user.value);
        });

        return {
            user
        }
    }
}
</script>
<style >
    
</style>