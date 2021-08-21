<template>
  <body>
    <form>
      <textarea class="description" v-model="description" placeholder="Partagez vos idées">
      </textarea>
      <button type="submit" @click="publier" v-if="post" > Publier </button>
      <button type="submit" @click="updatePost" v-else>Enregistrer la modification </button>

    </form>
  </body>
</template>
<script>
  export default{
    name:'post',
    components:{

    },
    data: function(){
      return{
        description: ""
      }
    },
    methods:{
      publier: function(){
        this.$store.dispatch('publier',{
          description: this.description
        }).then((response) => {
           console.log(response);
          })
          .catch((error)=>{
            console.log(error);
          })
      },
      updatePost:function(){
        this.$store.dispatch('updatePost',{
          description: this.description,
          id: this.$store.state.id
        })
        .then(response =>{
          console.log(response)
        })
        .catch(error =>{
          console.log(error)
        });
      }
    }
  }
</script>
<style scoped>

  .description{
    width:300px;
    height: 100px;
  }
  textarea{
    border: 2px solid black;
  }
  form{
    border: 2px solid #ebb8b8;
  }
  button{
    width: 100px;
    margin: auto;
    color: black;
  }
</style>