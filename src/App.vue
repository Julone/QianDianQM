<template>
  <div id="app">
    <div class="app-container left">
      <!-- <appContainerLeft></appContainerLeft> -->
    </div>
    <div class="app-container right">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    // appContainerLeft:()=>import('./components/app-container-left')
  },
  created(){
      console.log('vue + ' , process.env)

  }
}
</script>
<style lang="less" scoped>
*{
  border: 1px solid red;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display:flex;
  width:100%;
  overflow:hidden;
  height: 100%;
  // border: 1px solid red;
  box-sizing: border-box;
  min-width: 960px;
  div.app-container.left{
    // width: 15%;
    overflow-x:hidden;
    // border-right: 1px solid gray;
    // width: 0 !important;
   // @media screen and (max-width: 800px){
    //   width: 0;
    // }
  }
  div.app-container.right{
    flex:1;
    height:100%;
    
  }
}
</style>