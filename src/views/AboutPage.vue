<template >
    <div class="about-page">
        <main class="main-content">
        <div class="header">
             <h2 >About</h2>
         </div>
         <div class="pharagraph-section">
             <h2>About DTT Real State</h2>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis aliquam harum necessitatibus, delectus id, porro vero nemo esse tenetur cupiditate magnam ab? Consequuntur dolorum eum harum architecto eveniet ab natus.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis aliquam harum necessitatibus.</p>
              <p> Consequuntur dolorum eum harum architecto eveniet ab natus.Consequuntur dolorum eum harum.</p>
         </div>
         <div class="logo-list">
            <h2>Design and Development</h2>
            <div class="logo">
                <img :src="iconDtt" alt="">
                <div>
                    <p>By DTT</p>
                    <p>www.d-tt.nl</p>
                </div>
            </div>
         </div>
        </main>
    </div>   
</template>
<script>
import { ref } from 'vue';
import icon from '@/assets/img_logo_dtt@3x.png';

export default {
    name: 'AboutePage',
    setup() {
    const iconDtt = ref( icon );
    return {
        iconDtt,
    };
}
}
</script>
<style scoped >
  .about-page{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;  
}
.main-content {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    box-sizing: border-box;

}
.header {
   width: 100%;
   height: 50px;
   display: flex;
   justify-content: center;
   margin: 0px;
   align-items: center;
   

}
h2{
   font-family:var( --font-family-montserrat) ;
   font-size: var( --font-size-header-2-mobile);
   font-weight: var(--font-weight-bold); 
   margin: 0px;
}
p{
   font-family:var(--font-family-open-sans) ;
   font-size: var(--font-size-body-text-mobile);
   font-weight: var( --font-weight-regular); 
   margin: 0px;
}
.pharagraph-section{
     width: 100%;
     display: flex;
     flex-direction: column;
     gap: 20px;
}

.logo-list{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.logo{
    width: 100%;
    display: flex;
    gap: 20px;
}
img{
    width: auto;
    height: 30px;
}

@media only screen and (min-width:768px) {

.header{
    display: none;
}
.main-content {
    width: 70%;
    flex: 1; 
    margin: 40px 0px;
    padding:0px;
}
h2{
   font-size: var(--font-size-header-2-desktop);
}
img{
    width:auto;
    height: 60px;
}
p{
   font-size: var( --font-size-body-text-desktop);
}
}

</style>