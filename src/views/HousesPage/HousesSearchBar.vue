<template >
    <div class="search-bar">
        <input type="text" v-model="searchQuery" >
        <div class="placeholder">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            <p> Search for House</p>
        </div>
    </div>
</template>
<script>
import {  useStore } from 'vuex';
import { computed } from 'vue';
export default {
    name: 'HousesSearchBar',
  setup() {
    const store = useStore();

    const searchQuery = computed({
      get: () => store.state.searchQuery,
      set: (value) => store.dispatch('updateSearchQuery', value)
    });
    
    return {
      searchQuery
    };
  }
}
</script>
<style scoped>
.search-bar {
  width: 100%;
  flex: 1;
  position: relative;
}

input {
  height:30px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  background: var( --tertiary-dark-color);
  padding-left: 40px;

}

.placeholder {
  position: absolute;
  height:30px;
  padding-left:10px ;
  top: 0px;
  display: flex;
  align-items: center;
  font-size: var(--font-size-input-field-title-mobile);
  font-family: var(--font-family-open-sans);
  font-weight: var( --font-weight-regular);
  color: var(--secondary-text-color);
}

.placeholder p {
  margin-left:10px ;
  
}
@media only screen and (min-width:768px) {
    input{
    width: 100%;
    height:50px;
}
.placeholder {
  font-size: var(--font-size-input-field-title-desktop);
  height:50px;
}

}    
</style>