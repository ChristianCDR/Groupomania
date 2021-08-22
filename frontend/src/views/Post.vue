<template>
  <body>
    <pageHeader/>
    <form>
      <input type='file' accept='image/*' @change='openFile'  ref="fileInput"><br>
      <button style="display:none" v-if='$store.state.containsImage'>Ajouter une image</button>
      <img id='output' :src="imageUrl" height="150">
      <textarea class="description" v-model="description" placeholder="Partagez vos idées">
      </textarea>
      <button type="submit" @click="publier" > Publier </button>
      {{image.name}}
    </form>
    <pageFooter/>
    <PostUpdateStyle/>
  </body>
</template>
<script>
  import pageHeader from "@/components/Header";
  import pageFooter from "@/components/Footer";
  import postUpdateStyle from "@/components/PostUpdateStyle";
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
        image: null
      }
    },
    methods:{
      publier: function(){
        this.$store.dispatch('publier',{
          description: this.description,
          image: this.image
        }).then((response) => {
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
      }
    }
  }
</script>
