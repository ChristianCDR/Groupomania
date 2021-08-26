<template>
  <body>
    <pageHeader/>
    <form enctype="multipart/form-data" @submit.prevent="publier" v-if="$store.state.containsImage">
      <input type='file' accept='image/*' @change='openFile' id="inputFile" name="inputFile" >
      <br>
      <img id='output' :src="imageUrl" height="150">
      <textarea class="description" v-model="description" placeholder="Commentez votre photo">
      </textarea>
      <button type="submit">Publier votre photo</button>
    </form>
    <form  v-else>  
      <textarea class="description" v-model="textToPublish" placeholder="Partagez vos idées">
      </textarea>
      <button type="submit" @click="publishText"> Publier votre texte</button>
    </form>
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
        image: null,
        formData: null
      }
    },
    methods:{
      publier: function(){     

        const formData = new FormData();
        formData.append("description", this.description);
        formData.append("inputFile", this.image);
        this.formData= formData;

        this.$store.dispatch('publier',{formData:this.formData})
        .then((response) => { 
           console.log(response);
          })
          .catch((error)=>{
            console.log(error);
          })
        this.$router.push('/imagePost');
      },

      publishText: function(){
        this.$store.dispatch('publishText', {
          textToPublish: this.textToPublish
          })
        .then((response) => { 
           console.log(response);
           this.$router.push('/textPost');
          })
          .catch((error)=>{
            console.log(error);
          })
      },
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
