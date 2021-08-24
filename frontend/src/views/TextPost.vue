<template>
  
  <pageHeader/>
  <main>
    <button @click="driveToPostPage" > Publier vos idées </button>
    <div class="publications" v-for="post in posts" :key="post.description">
      <div>
      {{ post.description }} <br>
      <span>par un User le {{post.updatedAt}}</span>
      <button @click="updatePost(post.id)">Mettre à jour</button>
      <button @click="deletePost(post.id)">Supprimer</button>
      </div>
    </div>
  </main>
  <pageFooter/>

</template>

<style scoped>
  main{
    height: 700px;
    border-left: 2px solid black;
    border-right: 2px solid black;
    width: 65%;
    margin: 0 auto;
  }
  main button{
    margin: 15px;
  }
  button:active{
    border: 2px solid #ffd7d7;
  }
  button{
    width: 10em;
    background-color:#4a4e6e; 
    color: white;
  }
  .publications{
    border: 2px solid black;
    width: 90%;
    margin: 10px auto;
  }
  .publications span{
    color: grey;
    font-size: 14px;
  }
  .publications button{
    width: 7em;
    height: 2em
  }
</style>
<script>
  import pageHeader from "@/components/Header";
  import pageFooter from "@/components/Footer";
  import store from "@/store/index";
  export default{
    name:'textPost',
    components:{
      pageHeader,
      pageFooter
    },
    data: function(){
      return{
        posts:''
      }
    },
    methods:{
      driveToPostPage: function(){
        store.commit('noImage');
        this.$router.push('/post');
      },
      updatePost:function(id){
        store.commit('setId',{postId:id});
        this.$router.push('/update');
      },
      deletePost:function(id){
        this.$store.dispatch('deletePost',{postId: id})
        .then(response =>{
          console.log(response)
          window.location.reload();
        })
        .catch(error =>{
          console.log(error)
        });
      }
    },
    mounted(){
      this.$store.dispatch('textPost')
      .then((response) => {       
        this.posts= response.data.posts ;
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }
</script>