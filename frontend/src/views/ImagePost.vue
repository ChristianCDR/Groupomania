<template>
  <pageHeader/>
  <main>
  </main>
  <pageFooter/>
</template>
<script>
  import pageHeader from "@/components/Header";
  import pageFooter from "@/components/Footer";
  export default{
    name:'imagePost',
    components:{
      pageHeader,
      pageFooter
    }
  }
</script>
<style scoped>
  main{
    height: 700px;
    border-left: 2px solid black;
    border-right: 2px solid black;
    width: 65%;
    margin: 0 auto;
  }
  /*main button{
    margin: 15px;
  }*/
</style>