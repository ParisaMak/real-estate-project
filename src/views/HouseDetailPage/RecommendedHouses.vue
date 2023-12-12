<template >
    <div class="recommended-houses-component">
       <h2>Recommended for you</h2>
       <div class="scaled-card">
        <HousesCard />
       </div>
    </div>
</template>
<script>
import HousesCard from '@/views/HousesPage/HousesCard.vue';


export default {
    name: 'HouseDetailPage',
    components:{
        HousesCard
    },
}
</script>
<style scoped>
    .recommended-houses-component{
        box-sizing: border-box;
        background: firebrick;
    }

    @media only screen and (min-width:768px) {
        .recommended-houses-component{
     width: 260px;
    }
    .scaled-card::v-deep .houses-card {
       width:260px ;
       height: 100px;
       padding: 10px;
    }
    .scaled-card::v-deep .house-detail {
    padding: 0px;
    padding-left:15px ;
    }
    .scaled-card::v-deep .main-img {
      width:80px ;
      height:80px;
    }
    .scaled-card::v-deep p{
        font-size: 10px;
    }

    .scaled-card::v-deep .edit-icons{
       display: none;
    }

    .scaled-card::v-deep img{
        width: 12px;
       height: 12px;
    }

    .scaled-card::v-deep h2{
    font-size: 10px;
    }
    .scaled-card::v-deep .icons-numbers-group{
        gap:10px
    }
}
</style>