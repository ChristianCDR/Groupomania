<template>
  <pageHeader/>
  <main>
    <button @click="goToPostPage" > Publier vos belles photos </button>
    <div class="publications" v-for="post in posts" :key="post.description">
      <div>
      {{ post.description }}<br>
      {{ post.description }} 
      <span>par un User le {{post.updatedAt}}</span>
      <button @click="updatePost(post.id)">Mettre à jour</button>
      <button @click="deletePost(post.id)">Supprimer</button>
      </div>
    </div>
  </main>
  <pageFooter/>
</template>
<script>
  import pageHeader from "@/components/Header";
  import pageFooter from "@/components/Footer";
  import store from "@/store/index";
  export default{
    name:'imagePost',
    components:{
      pageHeader,
      pageFooter
    },
    data: function(){
      return{

      }
    },
    methods:{
      goToPostPage: function(){
        store.commit('image');
        this.$router.push('/post');
      }
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