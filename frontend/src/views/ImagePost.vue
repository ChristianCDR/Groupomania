<template>
  <pageHeader/>
  <main>
    <button @click="goToPostPage" > Publier vos belles photos </button>
    <div class="publications" v-for="post in posts" :key="post.description">
      <div class="pub">
        <img :src='post.imageUrl' alt="Photo publiée">
        <div class="photoDesc">
        {{ post.description }} <br>
        <span>par un User le {{post.updatedAt}}</span>
        <button @click="updatePost(post.id)">Mettre à jour</button>
        <button @click="deletePost(post.id)">Supprimer</button>
        </div>
      </div>
    </div>
  </main>
  <pageFooter/>
  <showPostStyle/>
</template>
<script>
  import pageHeader from "@/components/Header";
  import pageFooter from "@/components/Footer";
  import showPostStyle from "@/components/ShowPostStyle";
  import store from "@/store/index";

  export default{
    name:'imagePost',
    components:{
      pageHeader,
      pageFooter,
      showPostStyle
    },
    data: function(){
      return{
        posts:""
      } 
    },
    methods:{
      goToPostPage: function(){
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
      this.$store.dispatch('imagePost')
      .then((response) => {  
        let textImageTab=[];
        for(let post of response.data.posts){
          if(post.imageUrl){
            textImageTab.unshift(post)
          }
        }
        this.posts= textImageTab;
      })
      .catch((error)=>{
        console.log(error);
      })
      store.commit('image');
    }
  }
        
</script>
<style scoped>
  img{
    height: 200px;
    width: 200px;
    margin: 5px;
  }
  .pub,.photoDesc{
    display: flex;
  }
  .photoDesc{
    flex-direction: column;
    justify-content:space-around;
    margin: 5px 30px;
  }
</style>