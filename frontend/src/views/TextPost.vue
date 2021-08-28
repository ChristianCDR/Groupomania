<template>
  
  <pageHeader/>
  <main>
    <button @click="driveToPostPage" > Publier vos idées </button>
    <div class="publications" v-for="post in posts" :key="post.description">
      <div>
        {{ post.textToPublish }} <br>
        <span>par un User le {{post.updatedAt}}</span>
        <button @click="updatePost(post.id)" v-show="post.userId==this.loggedUserId" >Mettre à jour</button>
        <button @click="deletePost(post.id)" v-show="post.userId==this.loggedUserId">Supprimer</button>
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
        posts:'',
        loggedUserId:''
      }
    },
    methods:{
      driveToPostPage: function(){
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
            textPostTab.unshift(post)
          }
        }
        this.posts= textPostTab;
        this.loggedUserId= JSON.parse(localStorage.getItem("datas")).userId;    
      })
      .catch((error)=>{
        console.log(error);
      })
      store.commit('noImage');
    }
  }
</script>