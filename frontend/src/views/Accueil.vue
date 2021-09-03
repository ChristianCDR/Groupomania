//L'accueil propose de choisir le type de post que l'on souhaite faire
<template>
  <body>
    <p class='welcomeMsg'> Bienvenue sur le réseau social <span> interne de Groupomania</span>
    </p>
    <div class="post">
      <div class="textPost">
        <button type="button" @click="driveToTextPost">Partagez ce que vous pensez...</button>
      </div>
      <div class="imagePost">
        <button type="button" @click="driveToPostPage">Partagez vos plus belles photos...</button>
      </div>
    </div>
  </body>
</template>
<script>

  export default{
    name:'accueil',
    components:{
    },
    methods:{
      driveToPostPage: function(){
        this.$router.push('/imagePost');
      }, 
      driveToTextPost: function(){
        this.$router.push('/textPost');
      }
    }
  }
</script>
<style scoped>
  *{
    border-radius: 15px;
  }
  .welcomeMsg,.imagePost,.textPost{
    margin: auto;
  }
  body{
    background: url('../assets/groupomania_logos/icon.svg') no-repeat;
    background-position:center;
    background-size: 60vw;
    margin:0;
  }
  .post{
    width: 80%;
    height: 80vh;
    margin: 50px auto;
    border: 2px solid #ff9393;
    padding: 20px 0;
    display:flex;

  }
  .textPost, .imagePost{
    border: 2px solid #ff9393;
    height: 40%;
    width: 320px;
  }
  .welcomeMsg{
    margin-top: 30px;
    font-size: 3vw;
    font-weight: bold;
    padding: 0 7px;
    width: 75%;
  }
  button{
    width: 80%;
    position: relative;
    left: 10%;
    margin-top: 22%;
    border: 2px solid black;
    color: black;
    background-color:#ebb8b8; 
  }
   
  @media screen and (max-width: 900px){
    body{
      background-size: 100%;
    }
    .post{
      flex-direction: column;
    }
    button{
      margin-top: 35%;
    }
  }
  @media screen and (max-width: 501px){
    body{
      background-size: 150%;
    }
    .post{
      border: none;
      margin:0;
      width:100%;
    }
    .textPost, .imagePost{
      width: 310px;
      margin:auto;
    }
    .welcomeMsg{
      font-size: 5.5vw;
    }  
    p span{
      display:block;
      width: 65vw;
      margin: auto;  
    }
  }
</style> 