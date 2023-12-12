<template>
    <div v-if="isOpen" class="popup">
      <p>Are you sure you want to delete this item?</p>
      <button @click="$emit('confirm', houseId)">Yes, Delete</button>
      <button @click="$emit('cancel')">Cancel</button>
    </div>
  </template>
  
  <script>  
  export default {
    name: "DeleteHouse",
    props: ['isOpen','houseId']
  };
  </script>
  
  <style scoped>
  .popup {
    border: 1px solid #ccc;
    padding: 20px;
    background-color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  </style>