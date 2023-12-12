<template >
    <div class="houses-list">
      <HousesCard  />
    </div>
</template>

<script>
import HousesCard from '@/views/HousesPage/HousesCard.vue'
export default {
    name: 'HousesList',
    components: {
        HousesCard
    },

}
</script>

<style scoped >
.houses-list{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

@media only screen and (max-width: 768px) {

}
</style>