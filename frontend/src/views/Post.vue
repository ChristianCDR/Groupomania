//Le template contient 3 formulaires à afficher selon la situation
<template>
  <body>
    <pageHeader/>
    <main>
      <form @submit.prevent="publier" v-if="$store.state.containsImage">
        <input type='file' accept='image/*' @change='openFile' id="inputFile" ref="inputFile" >
        <br>
        <img id='output' :src="imageUrl" height="150">
        <textarea class="description" v-model="description" placeholder="Commentez votre photo">
        </textarea>
        <button type="submit">Publier votre photo</button>
      </form>

      <form  v-else-if="$store.state.commentaire">  
        <textarea class="description" v-model="commentaire" placeholder="Commenter ce post">
        </textarea>
        <button type="submit" @click="commenter"> Commenter </button>
      </form>

      <form v-else>  
        <textarea class="description" v-model="textToPublish" placeholder="Partagez vos idées">
        </textarea>
        <button type="submit" @click="publishText"> Publier votre texte</button>
      </form>
    </main>
    
    <pageFooter/>
    <PostUpdateStyle/>

  </body>
</template>
<script>
  import pageHeader from "@/components/Header";
  import pageFooter from "@/components/Footer";
  import postUpdateStyle from "@/components/PostUpdateStyle";
  
  export default{
    name:'post',
    components:{
      pageFooter,
      pageHeader,
      postUpdateStyle
    },
    data: function(){
      return{
        textToPublish:"",
        imageUrl:"",
        description: "",
        image: "",
        userId:"",
        commentaire:""
      }
    },
    methods:{
      //Publication avec image
      publier: function(){   
        const userId = JSON.parse(localStorage.getItem("datas")).userId;
        this.userId  = userId;
      //On récupère la saisie du user grâce à FormData
        let formData = new FormData();
        formData.append('inputFile', this.image);
        formData.append('description', this.description);
        formData.append('userId', this.userId);   
     
        this.$store.dispatch('publier', formData)
        .then((response) => { 
           console.log(response);
           this.$router.push('/imagePost');
          })
          .catch((error)=>{
            console.log(error);
          })
      },
    //Publication Texte
      publishText: function(){
        const datas = JSON.parse(localStorage.getItem("datas"));
        this.$store.dispatch('publishText', {
          textToPublish: this.textToPublish,
          userId: datas.userId
          })
        .then((response) => { 
           console.log(response);
           this.$router.push('/textPost');
          })
          .catch((error)=>{
            console.log('errorFromPublishText:', error);
          })
      },
      //Appel de l'action permettant de poster des commentaires
      commenter: function(){
        const datas = JSON.parse(localStorage.getItem("datas"));
        const postId = this.$store.state.postToCommentId;

        this.$store.dispatch('commenter', {
          commentaire: this.commentaire,
          userId: datas.userId,
          postId: postId
          })
        .then((response) => { 
           console.log(response);
          })
          .catch((error)=>{
            console.log('errorFromCommentaire:', error);
          })
      },
      //Fonction permettant d'afficher l'image que le user a sélectionné
      openFile: function(event) { 
        const files = event.target.files;
        let filename = files[0].name;
        if (filename.lastIndexOf('.')<=0){
         return alert('Veuillez sélectionner un fichier valide.');
        }
        const fileReader = new FileReader();
        fileReader.addEventListener('load',()=>{
          this.imageUrl=fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image=files[0];
      }   
    }
  }
</script>
