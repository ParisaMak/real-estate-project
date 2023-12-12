<template >
    <div class="full-btn">
      <button class="price-btn" @click="sortHouses('price')">Price</button>
      <button class="size-btn" @click="sortHouses('size')">Size</button>
    </div>
</template>
<script >
import { useStore } from 'vuex';
export default {
    name: 'HousesFilterTab',
    setup() {
      const store = useStore();
      const sortHouses = (criterion) => {
      store.dispatch('sortHouses', criterion);
    };

    return { sortHouses };
  }
}
</script>
<style scoped>
   .full-btn{
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    font-weight: var(--font-weight-bold);
    font-family: var(--font-family-montserrat);
   }

   .price-btn{
    border: none;
    width: 50%;
    height: 100%;
    background: var( --primary-color);
    color: var(--tertiary-text-color);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    font-size:var( --font-size-mobile-buttons-tabs);
   }

   .size-btn{
    border: none;
    width: 50%;
    height: 100%;
    background: var(--tertiary-dark-color);
    color: var(--tertiary-text-color);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size:var( --font-size-mobile-buttons-tabs);
   }

   @media only screen and (min-width:768px) {
    .full-btn{
    width: 250px;
    height: 50px;
    display: flex;
    align-items: center;
   }

   .price-btn , .size-btn{
    font-size:var( --font-size-desktop-buttons-tabs);
   }
  }
   @media only screen and (min-width:1024px) {
    .full-btn{
    width: 350px;
   }
}  
</style>