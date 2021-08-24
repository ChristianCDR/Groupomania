<template>
  <body>
    <pageHeader/>
    <form method="POST" action="http://localhost:3000/post/" enctype="multipart/form-data">
     
      <input type='file' accept='image/*' @change='openFile' v-if="$store.state.containsImage" id="inputFile" name="inputFile" ><br>
      
      <img id='output' :src="imageUrl" height="150" v-if="$store.state.containsImage">
      <textarea class="description" name="description" v-model="description" placeholder="Partagez vos idées">
      </textarea>
      
      <button type="submit" v-if="$store.state.containsImage">Publier votre photo</button>
      <button type="submit" @click="publier" v-else> Publier </button>
    </form>
    <pageFooter/>
    <PostUpdateStyle/>
  </body>
</template>
<script>
  import pageHeader from "@/components/Header";
  import pageFooter from "@/components/Footer";
  import postUpdateStyle from "@/components/PostUpdateStyle";
  //import axios from "axios";
  //const fs = require('fs');
  export default{
    name:'post',
    components:{
      pageFooter,
      pageHeader,
      postUpdateStyle
    },
    data: function(){
      return{
        description: "",
        imageUrl:"",
        image: null,
        formData: null
      }
    },
    methods:{
      publier: function(){
        this.$store.dispatch('publier',{formData:this.formData})
        .then((response) => { 
           console.log(response);
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

        this.$store.commit("image")
        .then((response) => { 
           console.log(response);
          })
          .catch((error)=>{
            console.log(error);
          })
      },

      postquery: function(){
        const formData = new FormData();
        formData.append("inputFile", this.image);
        formData.append("description", this.description);
        this.formData= formData;
      }    
    }
  }
</script>
