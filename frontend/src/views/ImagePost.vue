//Cette page sert à afficher les posts contenant des images
<template>
  <pageHeader/>
  <main>
    <button @click="goToPostPage" > Publier vos belles photos </button>
    <div class="publications" v-for="post in posts" :key="post.description">
      <div class="pub">
        <img :src='post.imageUrl' alt="Photo publiée">
        <div class="photoDesc">
          {{ post.description }} <br>
           <span>par le User {{ post.userId }} le {{post.updatedAt.split('T')[0]}} à {{post.updatedAt.split('T')[1].split('.')[0]}}</span> <br>
          <div class="div__buttons">
            <div>
              <button @click="updatePost(post.id)" v-show="post.userId==this.loggedUserId">Mettre à jour</button>
              <button @click="deletePost(post.id)" v-show="post.userId==this.loggedUserId || isAdmin== 'true' ">Supprimer</button>
            </div>
            <div>
              <button type="submit" @click="commenter(post.id)"> Commenter </button>
              <button type="submit" @click="getComments(post.id)">Commentaires</button>
            </div>
          </div>
        </div>
      </div>
      <div class="comments" v-show="showComments && onePostComments==post.id" v-for="comment in comments" :key="comment.commentaire">
        <div class="singleComment">
          {{comment.commentaire}} <br>
          <span>par le User {{ comment.userId }} le {{comment.updatedAt.split('T')[0]}} à {{comment.updatedAt.split('T')[1].split('.')[0]}}</span> <br>
          <button type="submit" @click="updateComment(comment.id)" v-show="comment.userId==this.loggedUserId">Modifier</button>
          <button type="submit" @click="deleteComment(comment.id)" v-show="comment.userId==this.loggedUserId || isAdmin== 'true'">Supprimer</button>
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
    //Importation de components
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
      },
      updateComment: function(id){
        store.commit('comments',{
          commentaire: true,
          postId:id
          });
        this.$router.push('/update');
      },
      deleteComment: function(id){
        store.dispatch('deleteComment',{ postId:id })
        .then((result)=>{
           console.log(result)
           window.location.reload();
        })
        .catch((error)=>{
          console.log(error)
        })
      }
    },

    //Au chargement de la page
    mounted(){
      this.$store.dispatch('imagePost')
      .then((response) => {  
        let textImageTab=[];
        //Apres la réponse du backend on sélectionne les posts contenant des images
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
  @media screen and (max-width: 900px){
  main{
    border: none;
    width:100%;
  }
  .div__buttons, .div__buttons div{
    display:flex;
  }
  .div__buttons div{
  flex-direction: column;
  margin: 10px auto;
  }
  .div__buttons div button{
    justify-content: space-around
  }
}
  @media screen and (max-width:555px){
    .pub{
      flex-direction:column;
      margin: 10px auto;
    }
    img{
      margin: 10px auto;
    }
    .photoDesc{
      margin: 10px auto;
      width: 90%;
    }
  }
</style>