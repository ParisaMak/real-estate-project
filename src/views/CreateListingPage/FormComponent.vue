<template >
    <form class="form-component" @submit.prevent="submitForm">
        <div class="group-label-input"> 
            <label for="street-name">Street Name*</label>
            <input type="text" id="street-name" placeholder="Enter the street name" v-model="formData.streetName" required>
        </div>

        <div class="form-field-group" >
            <div class="group-label-input">
               <label for="house-number">House number*</label>
                <input type="text" id="house-number" placeholder="Enter house number" v-model="formData.houseNumber" required>
            </div>
            <div class="group-label-input">
                <label for="addition">Addition[optional]</label>
                <input type="text" id="name" placeholder="e.g, A" v-model="formData.numberAddition">
            </div>
        </div>

        <div class="group-label-input">
            <label for="postal-code">Postal Code*</label>
            <input type="text" id="postal-code" placeholder="e.g, 1000 AA" v-model="formData.zip" required>
        </div>
        <div class="group-label-input">
            <label for="city">City*</label>
            <input type="text" id="city" placeholder="e.g, utrecht" v-model="formData.city" required>
        </div>

        <div class="group-label-input">
            <p>Upload picture (PNG or JPG)*</p>
            <label for="imageUpload" class="form-label-upload-file"></label>
            <input type="file" class="custom-upload-image" id="imageUpload" name="imageUpload" accept=".png, .jpg, .jpeg" @change="handleFileChange">
          </div>
          <div v-if="imagePreviewUrl" class="image-preview">
                <img :src="imagePreviewUrl" alt="Image preview" class="img-preview" />
           </div>

        <div class="group-label-input">
            <label for="price">Price*</label>
            <input type="text" id="price" placeholder="e.g, $150,000" v-model="formData.price" >
        </div>

        <div class="form-field-group">
            <div class="group-label-input">
                <label for="size">Size*</label>
                <input type="number" id="size" placeholder="e.g, 60m2" v-model="formData.size" >
            </div>
            <div class="group-label-input">
                <label for="garage">Garage*</label>
                <select id="garage" placeholder="select"  class="custom-select" v-model="formData.hasGarage">
                
                   <option value="false">No</option>
                   <option value="true">Yes</option>
        
                 </select>
            </div>
        </div>

        <div class="form-field-group">
            <div class="group-label-input">
                <label for="bedrooms">Bedrooms*</label>
                <input type="number" id="bedrooms" placeholder="Enter amount" v-model="formData.bedrooms" >
            </div>
            <div class="group-label-input">
                <label for="bathrooms">Bathrooms*</label>
                <input type="number" id="bathrooms" placeholder="Enter amount"  v-model="formData.bathrooms">
            </div>
        </div>
        <div class="group-label-input">
           <label for="construction-date">Construction date*</label>
           <input type="number" id="construction-date" placeholder="e.g, 1990"  v-model="formData.constructionYear">
        </div>

        <div class="group-label-input">
           <label for="description">Description*</label>
           <textarea id="description" placeholder="Enter Description" v-model="formData.description"  class="custom-textarea"></textarea>
        </div>
        <div class="btn-container"> <button class="post-btn">Post</button></div>
    </form>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
</template>
<script>
import { ref, onMounted} from 'vue';
import { useStore } from 'vuex';
import { useRoute , useRouter } from 'vue-router';

export default {
    name: 'FormComponent',
    setup() {
    const imagePreviewUrl = ref(null);
    const store = useStore();
     const route = useRoute();
     const router = useRouter();
    const houseId = route.query.id; 
    const houseData = ref(null);
    const errorMessage = ref('');

    const formData= ref({
        streetName: '',
        houseNumber: '',
        numberAddition: '',
        zip: '',
        city: '',
        price: '',
        size: '',
        hasGarage: 'false', 
        bedrooms: '',
        bathrooms: '',
        constructionYear: '',
        description:'',
        image:''
      })


      onMounted(async () => {
       if (houseId !== undefined) {
       try {
         const response = await store.dispatch('fetchHouseById', houseId);
          houseData.value = response[0]; 
           formData.value = {
                streetName: houseData.value.location.street,
                houseNumber: houseData.value.location.houseNumber,
                numberAddition: houseData.value.location.houseNumberAddition || '',
                zip: houseData.value.location.zip,
                city: houseData.value.location.city,
                price: houseData.value.price.toString(), 
                size: houseData.value.size.toString(),
                hasGarage: houseData.value.hasGarage.toString(),
                bedrooms: houseData.value.rooms.bedrooms.toString(),
                bathrooms: houseData.value.rooms.bathrooms.toString(),
                constructionYear: houseData.value.constructionYear.toString(),
                description: houseData.value.description,
                image: houseData.value.image 
            };
                } catch (error) {
                console.error(error);
                }
            }
});
      const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            formData.value.image = file; 
            imagePreviewUrl.value = URL.createObjectURL(file);
            }
        }

        const submitForm = async () => {
        try {
            const dataToSubmit = new FormData();
            for (let key in formData.value) {
            if (key !== 'image') {
                dataToSubmit.append(key, formData.value[key]);
            }
            }
            
            if (houseId && houseData.value.madeByMe === true) {
                try {
            await store.dispatch('editHouse', {
                houseId: houseId,
                formData: dataToSubmit
            });
            router.push('/');
        } catch (error) {
          errorMessage.value = 'An error occurred during submission.';
          console.error(error);
        }
            } else if(houseId && houseData.value.madeByMe === false){
                errorMessage.value = 'You cannot edit this house because it was not made by you.';
                
            }else{
            const creationResponse = await store.dispatch('submitHouseForm', dataToSubmit);
            if (creationResponse) {
                const houseId = creationResponse.id;
                const imageFile = formData.value.image;
                const imageData = new FormData();
                imageData.append('image', imageFile);
                await store.dispatch('uploadHouseImage', {
                houseId: houseId,
                formData: imageData
                });
                router.push('/');
            }
            }
        } catch (error) {
            console.error(error);
        }
        };
    return {
      imagePreviewUrl ,
      formData,
      errorMessage,
      submitForm,
      handleFileChange 
    };
  },
  props: {
  houseData: {
    type: Object,
    default: () => ({}) 
  }
  }
};

</script>
<style scoped>

*, *:before, *:after {
    box-sizing: border-box;
}
.form-component{
    height: 100%;
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap:15px
}
.group-label-input{
    display: flex;
    flex-direction:column;
    gap: 5px;
}
.form-field-group{
    width:100%;
    gap: 10px; 
    display: grid;
    grid-template-columns: 1fr 1fr;

}

p,label{
    font-weight: var(--font-weight-semibold);
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-input-field-title-mobile);
}
input{
    height:45px;
    border-radius: 5px;
    border: none;
    max-width: 100%;
    padding: 0px;

}
input::placeholder{
    font-weight: var(--font-weight-regular);
    font-family: var(--font-family-open-sans);
    font-size: var(--font-size-input-field-title-mobile);
    padding-left:5px ;
    background: var(--background-2);
    color: var(--secondary-text-color);
}

.custom-select{
    height:45px;
    border-radius: 5px;
    border: none;
}
.custom-textarea{
    height:90px;
    border-radius: 5px;
    border: none;
    padding: 10px;
}
.custom-upload-image{
 display: none;

}
.mg-preview{
    width: 20px;
    height: 30px;
}
.form-label-upload-file{
    width: 90px;
    height: 90px;
    border: dashed 1px gray ;
    background: url("/src/assets/ic_plus_grey@3x.png") no-repeat center;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

.post-btn {
    background-color: var(--primary-color);
    color: var(--tertiary-text-color);
    height: 50px;
    font-family: var(--font-family-montserrat);
    font-size: var(--font-size-mobile-buttons-tabs);
    font-weight: var(--font-weight-bold);
    border: none;
    border-radius: 10px;
    text-align: center;
    width: 100%;
  }
.btn-container{
  width: 100%;
  display: flex;
  justify-content:end;
  align-items: end;
}
@media only screen and (min-width: 768px) {

p,label{
    font-size: var(--font-size-input-field-title-desktop);
}

input::placeholder{

    font-size: var(--font-size-input-field-title-desktop);
}
.post-btn {
  width: 50%;
}
.form-component{
    width: 450px;
}

}
</style>