<template>
  <pageHeader/>
  <form>
      <textarea class="description" v-model="description" placeholder="Partagez vos idées">
      </textarea>
      <button type="submit" @click="updatePost" > Modifier </button>
  </form>
  <pageFooter/>
  <PostUpdateStyle/>
</template>
<script>
  import pageHeader from "@/components/Header";
  import pageFooter from "@/components/Footer";
  import postUpdateStyle from "@/components/PostUpdateStyle";
  export default{
    name:'updatePost',
    components:{
      pageHeader,
      pageFooter,
      postUpdateStyle
    },
    methods:{
        updatePost:function(){
        this.$store.dispatch('updatePost',{
          description: this.description,
          id: this.$store.state.id
        })
        .then(response =>{
          console.log(response)
        })
        .catch(error =>{
          console.log(error)
        });
      }
    }
  }
</script>