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
    height:500px;
  }
</style>