<template>
  <div></div>
</template>

<script>
  export default{
    name:'textPost',
    components:{
    },
    mounted(){
      this.$store.dispatch('textPost')
      .then((response) => {
           console.log(response);
          })
          .catch((error)=>{
            console.log(error);
          })
    }
  }
</script>