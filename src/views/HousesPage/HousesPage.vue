<template >
    <div class="houses-page">
        <main class="main-content">
        <div class="header">
             <h1>Houses</h1>
             <button class="create-new-btn">
                <img :src='iconPlus' alt="plus" class="icon-plus">
                 <span> + CREATE NEW</span>
            </button>
         </div>
         <div class="search-section">
              <HousesSearchBar />
             <HousesFilterTab  />
         </div>
         <div class="house-list">
            <HousesList  />
         </div>
        </main>
    </div>   
</template>
<script>
import HousesFilterTab from '@/views/HousesPage/HousesFilterTab.vue';
import HousesSearchBar  from '@/views/HousesPage/HousesSearchBar.vue';
import HousesList from '@/views/HousesPage/HousesList.vue'
import { ref} from 'vue';
import Plus from '@/assets/ic_plus_grey@3x.png';


export default {
    name: 'HousesPage',
    setup() {
    const iconPlus = ref( Plus );

    return {
        iconPlus,
    };
},
    components: {
        HousesFilterTab,
        HousesSearchBar,
        HousesList
    }

}
</script>
<style scoped>
.houses-page{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center; 
    padding: 20px;
}
.main-content {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 30px ;
    box-sizing: border-box;
    gap: 30px;
}

.header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    font-weight: var(--font-weight-bold);
    font-family: var(--font-family-montserrat);
}
.icon-plus{
    width: 30px;
}
.create-new-btn{
    position: absolute;
    right: 60px;
    height: 100%;
    font-size: 10px;
    color:var(--primary-text-color);
    border: none;
    border-radius: 10px;
    background: none;
    font-size: var(--font-size-mobile-buttons-tabs)
}
span{
  display: none;
}

h1{
    height: 100%;
    font-size: var(--font-size-header-1-mobile);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.search-section{
    width: 100%;
    display: flex; 
    gap: 20px;
    flex-direction: column;
}
.house-list{
    width: 100%;
    flex: 1;
}

@media only screen and (min-width: 768px) {

.main-content {
    width: 75%;
    flex: 1; 
    margin: 20px 0px;
    padding-top:30px;
}
.search-section{
    width: 100%;
    flex-direction: row;
}
.create-new-btn{
    width: 250px;
    font-size: var(--font-size-desktop-buttons-tabs);
    background:var(--primary-color);
    position: static;
    color: white;
}
h1{
    justify-content: start;
    font-size: var(--font-size-header-1-desktop);
}
span{
    display: inline-block;
    font-size: var(--font-size-desktop-buttons-tabs);
}
.icon-plus{
 display: none;
}
}
</style>