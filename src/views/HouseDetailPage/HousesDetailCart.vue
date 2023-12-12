<template >
    <div class="house-detail-cart-component">
       <img src="/src/assets/img_placeholder_house@3x.png" alt="">
       <HouseDetails />
    </div>
</template>

<script>
import HouseDetails from '@/views/HouseDetailPage/HouseDetails.vue';
export default {
    name: 'HouseDetailCart',
    components:{
        HouseDetails
    }
}
</script>
<style scoped>
    img{
        width: 100%;
    }
    .house-detail-cart-component{
        display: grid;
        grid-template-rows: 1fr 2fr;
    }
</style>