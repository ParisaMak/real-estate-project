<template>
     <HeaderComponent /> 
     <router-view></router-view>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'

export default {
  name: 'App',
  components:{
    HeaderComponent
  }
}
</script>

<style>
html{
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
}
#app ,body{
  width: 100%;
  height: 100%;
  background: var(--background-1);
  margin: 0px;
  padding: 0px;
}

</style>
