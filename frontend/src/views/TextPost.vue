<template>
  
  <pageHeader/>
  <main>
    <button @click="driveToPostPage" > Publier vos idées </button>
    <div class="publications" v-for="post in posts" :key="post.description">
      <div>
        {{ post.textToPublish }} <br>
        <span>par un User le {{post.updatedAt}}</span>
        <button @click="updatePost(post.id)">Mettre à jour</button>
        <button @click="deletePost(post.id)">Supprimer</button>
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
    name:'textPost',
    components:{
      pageHeader,
      pageFooter,
      showPostStyle
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
        let textPostTab=[];   
        for(let post of response.data.posts){
          if(post.imageUrl==null){
            textPostTab.push(post)
          }
        }
        this.posts= textPostTab;
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }
</script>