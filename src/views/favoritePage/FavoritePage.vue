<template>
    <div class="favorites-container">
      <h2 class="title">Favorite List</h2>
      <div class="items-container">
        <div >
          <HousesCard />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import   HousesCard from '@/views/HousesPage/HousesCard.vue';
  
  export default {
    components: {
      HousesCard
    },
  };
  </script>
  
  <style scoped>
  .favorites-container {
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  
  .title {
    padding-bottom: 16px;
    font-weight: bold;
    font-size: 1.125rem;
  }
  
  .items-container {
    width: 100%;
    height: 100%;
  }
  
  .empty-message {
    text-align: center;
  }
  </style>