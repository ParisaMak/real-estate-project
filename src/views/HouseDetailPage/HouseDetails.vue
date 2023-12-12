<template >
    <div class="house-detail-component">
       <div class="header">
        <h1>name</h1>
        <div>
            <img :src="iconDelete" alt="">
            <img :src="iconEdit" alt="">
        </div>
       </div>
       <div class="icon-label-group">
          <img :src="iconLocation" alt="">
          <p> amsterdam</p>
       </div>
       <div class="icons-row-group">
          <div v-for="(item, key) in detailsLoaction" :key="key" class="icon-label-group">
            <img :src="item.imgSrc" alt="Icon">
            <p>{{ item.number }}</p>
         </div> 
      </div>
      <div class="icons-row-group" >
         <div v-for="(item, key) in detailInterior" :key="key" class="icon-label-group">
            <img :src="item.imgSrc" alt="Icon">
            <p>{{ item.number }}</p>
        </div>
      </div>

      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, accusantium facere. Laudantium labore, dolorum voluptatibus soluta accusantium omnis beatae incidunt ipsum eum eos? Placeat numquam sint laudantium veritatis fugiat ea.</p>

    </div>
</template>


<script>
import { ref, reactive, onMounted } from 'vue';
import Bath from '@/assets/ic_bath@3x.png';
import Bed from '@/assets/ic_bed@3x.png';
import Size from '@/assets/ic_size@3x.png';
import Location from '@/assets/ic_location@3x.png';
import Price from '@/assets/ic_garage@3x.png';
import Construction from '@/assets/ic_construction_date@3x.png';
import Garage from '@/assets/ic_garage@3x.png';
import Delete from '@/assets/ic_delete@3x.png';
import Edit from '@/assets/ic_edit_color@3x.png';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  name: 'HouseDetail',
  setup() {
    const iconLocation = ref(Location);
    const iconPrice = ref(Price);
    const iconSize = ref(Size);
    const iconConstruction = ref(Construction);
    const iconBed = ref(Bed);
    const iconBath = ref(Bath);
    const iconGarage = ref(Garage);
    const iconDelete = ref(Delete);
    const iconEdit = ref(Edit);
    const house = ref();
    const route = useRoute();
    const houseId = ref(route.params.id);

    const detailsLoaction = reactive({
      price: { imgSrc: iconPrice, number: 0 },
      size: { imgSrc: iconSize, number: '0 m2' },
      constructionYear: { imgSrc: iconConstruction, number: '0' },
    });

    const detailInterior = reactive({
      bedrooms: { imgSrc: iconBed, number: 0 },
      bathrooms: { imgSrc: iconBath, number: 0 },
      hasGarage: { imgSrc: iconGarage, number: 'false' },
    });

    const fetchHouseById = async () => {
      try {
        console.log(houseId.value)
        const response = await axios.get(`http://localhost:8000/houses/${houseId.value}`);
        house.value = response.data;

        detailsLoaction.price.number = house.value.price;
        detailsLoaction.size.number = house.value.size;
        detailsLoaction.constructionYear.number = house.value.constructionYear;

        detailInterior.bedrooms.number = house.value.bedrooms;
        detailInterior.bathrooms.number = house.value.bathrooms;
        detailInterior.hasGarage.number = house.value.hasGarage;

        console.log('Fetched House:', house.value.price);
      } catch (error) {
        console.error('Error fetching house:', error);
      }
    };

    onMounted(fetchHouseById);
    return {
      detailsLoaction,
      detailInterior,
      iconLocation,
      iconDelete,
      iconEdit,
      house,
      houseId
    };
  },
};
</script>

<style scoped>
    img{
      width: 15px;
      height: 15px;
    }
    .house-detail-component{
      flex: 1;
      background: yellow;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      padding: 20px;
      box-sizing: border-box;
    }
    .icon-label-group{
      display: flex;
      flex-direction:row;
      background: green;
      align-items: center;
      gap: 10px;
    }
    .icons-row-group{
      display: flex;
      flex-direction:row;
      background: rgb(149, 232, 149);
      align-items: center;
      gap: 10px;
    }
    .header{
      display: flex;
      flex-direction:row;
      justify-content:space-between;
      align-items: center;
    }
</style>