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
          <div>
            <button @click="updatePost(post.id)" v-show="post.userId==this.loggedUserId">Mettre à jour</button>
            <button @click="deletePost(post.id)" v-show="post.userId==this.loggedUserId || isAdmin== 'true' ">Supprimer</button>
            <button type="submit" @click="commenter(post.id)"> Commenter </button>
            <button type="submit" @click="getComments(post.id)">Commentaires</button>
          </div>
        </div>
      </div>
      <div class="comments" v-show="showComments && onePostComments==post.id" v-for="comment in comments" :key="comment.commentaire">
        <div class="singleComment">
          {{comment.commentaire}}
        </div>  <br>
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
        posts:"",
        loggedUserId:'',
        showComments: false,
        comments:"",
        onePostComments:"",
        isAdmin: JSON.parse(localStorage.getItem("admin"))
      } 
    },
    methods:{
      goToPostPage: function(){
        store.commit('image');
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
      },
      commenter: function(id){
        store.commit('comments',{
          commentaire: true,
          postId:id
          });
        this.$router.push('/post');
      },
      getComments: function(id){
        this.showComments=true;
        this.onePostComments=id;
        store.dispatch('getComments',{postId: id})
        .then(response=>{
          console.log(response)
          this.comments= response.data.comments;
        })
        .catch(error=>{
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
        this.loggedUserId= JSON.parse(localStorage.getItem("datas")).userId;
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