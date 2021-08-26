<template>
  <pageHeader/>
  
  <form @submit.prevent="updateImagePost" enctype="multipart/form-data" v-if="$store.state.containsImage">
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
      <button type="submit" @click="updateTextPost"> Publier votre texte</button>
    </form>

  <pageFooter/>
  <PostUpdateStyle/>
</template>
<script>
  import pageHeader from "@/components/Header";
  import pageFooter from "@/components/Footer";
  import postUpdateStyle from "@/components/PostUpdateStyle";
  export default{
    name:'updatePost',
    components:{
      pageHeader,
      pageFooter,
      postUpdateStyle
    },
    data: function(){
      return{
        description: "",
        textToPublish:"",
        imageUrl:"",
        image: null,
        formData: null
      }
    },
    methods:{
      updateImagePost:function(){
        
        const formData = new FormData();
        formData.append("inputFile", this.image);
        formData.append("description", this.description);
        this.formData= formData;

        this.$store.dispatch('updateImagePost',{
          formData: this.formData,
          id: this.$store.state.id
        })
        .then(response =>{
          console.log(response)
          this.$router.push('/imagePost');
        })
        .catch(error =>{
          console.log(error)
        });
      },
      updateTextPost:function(){
        this.$store.dispatch('updateTextPost',{
          textToPublish: this.textToPublish,
          id: this.$store.state.id
        })
        .then(response =>{
          console.log(response)   
          this.$router.push('/textPost');       
        })
        .catch(error =>{
          console.log(error)
        });
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
      },   
    }
  }
</script>