<template >
    <div class="house-detail-page">
       <p>back to overview</p>
       <div class="main-content">
            <HousesDetailCart />
            <RecommendedHouses  class="recommended-house"/>
       </div>
    </div>
</template>
<script>
import RecommendedHouses from '@/views/HouseDetailPage/RecommendedHouses.vue';
import HousesDetailCart from '@/views/HouseDetailPage/HousesDetailCart.vue'

export default {
    name: 'HouseDetailPage',
    components:{
        RecommendedHouses,
        HousesDetailCart 
    }
}
</script>
<style scoped>
    .house-detail-page{
        height: auto;
        min-height: calc(100vh - 60px);
        background: red;
        display: flex;
       justify-content: center;
       align-items: center;

    }

    .main-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgb(178, 178, 139);
    justify-content: space-between;
     }
    p{
     display: none;
    }
@media only screen and (min-width:768px) {
 .house-detail-page{
     display: flex;
     flex-direction:column;
    }
    .main-content {
     width: 70%;
     min-height: 100%;
     box-sizing: border-box;
      display: flex;
      flex-direction: row;
      gap: 40px;
     }
     p{
     display: block;
    }

}    
</style>