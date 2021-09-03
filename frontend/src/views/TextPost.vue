//Cette page sert à afficher les posts contenant uniquement du texte

<template>
  
  <pageHeader/>
  <main>
    <button @click="driveToPostPage" > Publier vos idées </button>
    <div class="publications" v-for="post in posts" :key="post.description">
      <div class="postBody">
        {{ post.textToPublish }} <br>
        <span>par le User {{ post.userId }} le {{post.updatedAt.split('T')[0]}} à {{post.updatedAt.split('T')[1].split('.')[0]}}</span> <br>
        <div class="div__buttons">
          <div>
            <button @click="updatePost(post.id)" v-show="post.userId==this.loggedUserId" >Mettre à jour</button>
            <button @click="deletePost(post.id)" v-show="post.userId==this.loggedUserId || isAdmin== 'true' ">Supprimer</button>
          </div>
          <div>
            <button type="submit" @click="commenter(post.id)"> Commenter </button>
            <button type="submit" @click="getComments(post.id)">Commentaires</button>
          </div>
        </div>
      </div>
      <div class="comments" v-show="showComments && onePostComments==post.id" v-for="comment in comments" :key="comment.commentaire">
        <div class="singleComment">
          {{comment.commentaire}}<br>
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
    name:'textPost',
    components:{
      pageHeader,
      pageFooter,
      showPostStyle
    },
    data: function(){
      return{
        posts:'',
        loggedUserId:'',
        showComments: false,
        comments:"",
        onePostComments:"",
        isAdmin: JSON.parse(localStorage.getItem("admin"))
      }
    },
    methods:{
      driveToPostPage: function(){
        store.commit('comments',{
          commentaire: false
          });
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
    mounted(){
      this.$store.dispatch('textPost')
      .then((response) => {  
        let textPostTab=[];   
        //Au chargement de la page, on sélectionne les posts ne contenant pas d'image
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
<style scoped>
  .postBody{
    width: 80%;
    margin: 0 auto;
  }
  @media screen and (max-width: 527px){
    .div__buttons{
      display: flex;
    }
    main{
        width: 100%;
        border:none;
      }
  }
</style>