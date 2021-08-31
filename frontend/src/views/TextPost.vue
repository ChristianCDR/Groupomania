<template>
  
  <pageHeader/>
  <main>
    <button @click="driveToPostPage" > Publier vos idées </button>
    <div class="publications" v-for="post in posts" :key="post.description">
      <div class="postBody">
        {{ post.textToPublish }} <br>
        <span>par un User le {{post.updatedAt}}</span> <br>
        <button @click="updatePost(post.id)" v-show="post.userId==this.loggedUserId" >Mettre à jour</button>
        <button @click="deletePost(post.id)" v-show="post.userId==this.loggedUserId || isAdmin== 'true' ">Supprimer</button>
        <button type="submit" @click="commenter(post.id)"> Commenter </button>
        <button type="submit" @click="getComments(post.id)">Commentaires</button>
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
<style scoped>
  .postBody{
    width: 80%;
    margin: 0 auto;
  }
</style>