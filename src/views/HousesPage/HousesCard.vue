<template>
  <div v-for="house in houses" :key="house.id" class="houses-card">
      <img :src="house.image" alt="House Image" class="main-img">
      
      <div class="house-detail">
          <h2>{{ house.streetName }}</h2> 
          <p class="price">{{ house.price }}</p>
          <p>{{ house.streetName }}, {{ house.city }} {{ house.zip }}</p>
          
          <div class="icons-numbers-group">
              <div v-for="(item, index) in getIconData(house)" :key="index" class="icon-number">
                  <img :src="item.icon" :alt="item.alt" class="icons">
                  <p>{{ item.value }}</p>
              </div>
          </div>
      </div>
      
      <div class="edit-icons">
        <img :src="iconEdit" alt="edit"  @click="openEditPage(house.id)">
        <img :src="iconDelete" alt="delete" @click="openDeletePopup(house.id)">
      </div>
  </div>
   <DeleteHouse :isOpen="isPopupOpen" :houseId="selectedHouseId"   @cancel="isPopupOpen = false" />

  
</template>
<script>
import { ref} from 'vue';
import Bath from '@/assets/ic_bath@3x.png';
import Bed from '@/assets/ic_bed@3x.png';
import Size from '@/assets/ic_size@3x.png';
import Delete from '@/assets/ic_delete@3x.png';
import Edit from '@/assets/ic_edit_color@3x.png';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import DeleteHouse from '@/views/HousesPage/DeleteHouse.vue';
import { computed ,onMounted } from 'vue';
import axios from 'axios';
export default {
    name: 'HousesCard',

    props: {
  //   height: {
  //     type: String,
  //     default: 'auto',
  //   },
  //   imageHeight: {
  //   type: String,
  //   default: '100px',
  // },
  // imageWidth: {
  //   type: String,
  //   default: '100px',
  // },
  },
  components: {
    DeleteHouse
  },
    setup() {
    const iconBath = ref( Bath );
    const iconBed = ref( Bed );
    const iconSize = ref( Size );
    const iconDelete = ref( Delete );
    const iconEdit = ref( Edit );
    const isPopupOpen = ref(false);
    const selectedHouseId = ref(null);
    const store = useStore();
    const router = useRouter();
    const houses = ref([]);
    const filteredHouses = computed(() => store.getters.filteredHouses);

    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/houses');
        houses.value = response.data;
        console.log('Fetched Houses:', houses.value);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    onMounted(fetchHouses);

const openDeletePopup = (houseId) => {
    selectedHouseId.value = houseId;
    isPopupOpen.value = true;
 };
 const openEditPage = (houseId) => {
    selectedHouseId.value = houseId;
    router.push({ name: 'CreateListingPage', query: { id: houseId } });
 }

//  const handleConfirm = async (houseId) => {
//   await store.dispatch('deleteHouse', houseId);
//   isPopupOpen.value = false;
// };

function getIconData(house) {
            return [
                { icon: iconBed.value, alt: 'bed', value: house.bedrooms },
                { icon: iconBath.value, alt: 'bath', value: house.bathrooms },
                { icon: iconSize.value, alt: 'size', value: `${house.size} m2` }
            ];
        }
    return {
        getIconData,
        iconDelete,
        iconEdit,
        isPopupOpen,
        openDeletePopup,
        selectedHouseId,
        openEditPage,
        filteredHouses,
        houses,
    };
  },
}
</script>
<style scoped>
.houses-card{
    width: 100%;
    height: 150px;
    background: var(--background-2);
    border-radius: 10px;
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    font-family:var(--font-family-open-sans) ;
    font-size: var(--font-size-listing-information-mobile);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.main-img{
    border-radius: 10px;
    width: 120px;
    height: 120px;
}  
.icons{
    width: 15px;
    height: 15px;
}

.house-detail{
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  padding-left: 15px;
  box-sizing: border-box;
  color: var(--secondary-text-color);
}

h2{
    font-weight:var( --font-weight-bold);
    font-family:var( --font-family-montserrat) ;
    color: var(--primary-text-color);    font-size: var(--font-size-listing-information-mobile);
    margin: 0px;
}
.price{
    font-weight:var( --font-weight-semibold);
}
.icons-numbers-group{
    display: flex;
    flex-direction:column;
}
.icon-number{
    display: flex;
    flex-direction:row;
    gap: 5px;
}
.edit-icons{
    flex: 1;
    text-align: end;
}
.edit-icons img{
  width: 15px;
  height: 15px;
  object-fit: contain;
  padding-right: 10px;
}
p{
  color: var(--secondary-text-color);
  margin: 0px;

}

@media only screen and (min-width:768px) {

h2,p{
    font-size: var(--font-size-listing-information-desktop);
}
.houses-card{
    height: 200px;
    padding-left: 15px;
}
.edit-icons img{
  width: 20px;
  height: 20px;
  object-fit: contain;
  padding-right: 20px;
}
.icons{
    width: 20px;
    height: 20px;
}
.house-detail{
    padding: 15px;
}
.main-img{
    border-radius: 10px;
    width: 160px;
    height: 160px;
} 
}


@media only screen and (min-width:450px) {
.icons-numbers-group{
    display: flex;
    flex-direction:row;
    gap: 20px;
}
}
</style>