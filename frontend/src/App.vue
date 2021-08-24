<template> 
    
    <router-view/>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  },
  
}

</script>

<style>
 
  body{
    margin:0;
  }
  .login{
    width:80vw;
    margin: auto;
  }
  svg{
    width: 100%;
    margin-top:20%;   
  }
  form{
    border: black 2px solid;
    height: 350px;
    width: 310px;
    margin: 20px auto;
    border-radius: 15px;
    display:flex;
    flex-direction: column;
  }
  .form-2 {
    height: 500px;
  }
  form *{
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    
  }
  input,button{
    height: 40px;
    width: 95%;
    border: 2px solid #000;
    border-radius: 5px;
  }
  .btn-1{
    background-color: #1877f2;
  }
 .btn-2{
    background-color: #42b72a;
  }
  button{
    color: #fff;
  }
  button.disabled{
    background-color: #848682;
  }
  p,h1{
    font-size: 18px;
  }
  a{
    color: blue;
    text-decoration: underline;
  }
</style>