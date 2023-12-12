<template >
    <div class="create-listing-page">
        <div class="main-content">
            <div class="header-container">
                <div class="back-to-overview"><img :src="iconArrow" alt="back"><span>Back to overview</span></div>
                <h1 class="header">Create New Listing</h1>
            </div>
             <FormComponent :houseData="house" />
        </div>
    </div>
</template>
<script>
import FormComponent from '@/views/CreateListingPage/FormComponent.vue'
import { ref} from 'vue';
import arrow from '@/assets/ic_back_grey@3x.png';
export default {
    name:'CreateListingPage',
    setup() {
    const iconArrow = ref( arrow );
    const house = ref(null);

    return {
        iconArrow,
        house
    };
},
    components:{
        FormComponent
    }
}
</script>

<style scoped >
.create-listing-page{
     width: 100%;
    height: auto;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center; 
    background: url('~@/assets/img_background@3x.png') center bottom; 
    background-size: contain;
    background-repeat: no-repeat;
    padding-bottom:40px;
}

.main-content {
    width: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    padding: 20px;  
}

p{
  margin: 0;
  padding: 0;
}
.header-container{
   position: relative;
   margin: 20px 0px;
   width: 350px;

}
h1{
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-header-1-mobile);
  font-weight: var(--font-weight-bold);
}
.header-container img{
   position: absolute;
   width: 20px;
   top: 0px;
}
.header-container h1{
    text-align: center;
    margin: 0px;

}

.back-to-overview{
    display: flex;
    gap: 10px;
}

span{
    font-size: var(--font-size-input-field-title-mobile);
    font-weight: var(--font-weight-semibold);
    font-family: var(--font-family-montserrat);
    display: none;
}
@media only screen and (min-width: 768px) {
.main-content {
    width: 70%;
    flex: 1; 
    margin: 20px 0px;
    padding:0px;
}
.create-listing-page{
    background-size: cover;
}

.header-container{
    display: flex;
     flex-direction: column;
     width: 100%;
     align-items: start;
    gap: 30px;
}
.header-container img{
   position:static;
}
.header-container h1{
    text-align: center;
    margin: 0px;
}
span{
    display: block;
    font-size: var(--font-size-input-field-title-desktop);
}
h1{
  font-size: var(--font-size-header-1-desktop);
}
}
</style>