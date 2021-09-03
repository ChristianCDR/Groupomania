import { createStore } from 'vuex';
const axios = require('axios');
//axios permet de faire des appels Backend
//le token permet d'authentifier chaque requête
export default createStore({
  state: {
    postOrUpdateMode: "",
    id:"",
    containsImage: false,
    file:"",
    commentaire: false,
    postToCommentId:""
  },
  mutations: {
    setId: function(state, idRecup){
      state.id=idRecup.postId;
    },
    image: function(state){
     state.containsImage= true;
    },
    noImage: function(state){
      state.containsImage= false;
    },
    setFile: function(state, file){
      state.file= file;
    },
    comments: function(state, postToComment){
      state.commentaire = postToComment.commentaire;
      state.postToCommentId = postToComment.postId;
      state.containsImage= false;
    }
  },
  actions: {
    //Appel Backend pour log In
    logUserIn:({commit}, userInfos)=>{
      return new Promise((resolve, reject)=>{
        commit;
        axios.post('http://localhost:3000/auth/login', userInfos)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour Inscrire le user
    signUserUp: ({commit}, userInfos)=>{
      return new Promise((resolve, reject)=>{
        commit;
        axios.post('http://localhost:3000/auth/signup', userInfos)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          let signUpErrorMsg=error.response.data.message;

          if(error.response.status==400){
            reject(signUpErrorMsg);
          }
          else{
            reject('Erreur: Cet email est déjà utilisé!');
          }          
        });
      })
    },
    //Appel Backend pour faire un post contenant une image
    publier: ({commit}, formData)=>{
      return new Promise((resolve, reject)=>{
        commit;
        
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.post('http://localhost:3000/post/',
          formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour faire un post contenant uniquement du texte
    publishText: ({commit}, postContent)=>{
      return new Promise((resolve, reject)=>{
        commit;
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.defaults.headers = {'Authorization': `Bearer ${token}`};

        axios.post('http://localhost:3000/post/', postContent)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour commenter un post
    commenter: ({commit, state}, postContent)=>{
      return new Promise((resolve, reject)=>{
        commit;
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.defaults.headers = {'Authorization': `Bearer ${token}`};

        axios.post(`http://localhost:3000/post/${state.postToCommentId}`, postContent)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour afficher les posts contenant uniquement du texte
    textPost: ({commit})=>{
      return new Promise((resolve, reject)=>{
        commit;
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.defaults.headers = {'Authorization': `Bearer ${token}`};

        axios.get('http://localhost:3000/post/')
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour afficher les posts contenant des images
    imagePost: ({commit})=>{
      return new Promise((resolve, reject)=>{
        commit;
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.defaults.headers = {'Authorization': `Bearer ${token}`};

        axios.get('http://localhost:3000/post/')
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour récupérer les commentaires laissés sur un post
    getComments: ({commit}, post)=>{
      return new Promise((resolve, reject)=>{
        commit;
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.defaults.headers = {'Authorization': `Bearer ${token}`};

        axios.get(`http://localhost:3000/post/${post.postId}`)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour update les posts contenant une image
    updateImagePost:({commit},postContent)=>{
      return new Promise((resolve,reject)=>{
        commit;
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.defaults.headers = {'Authorization': `Bearer ${token}`};

        axios.put(`http://localhost:3000/post/${postContent.id}`,postContent.formData)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour update les posts contenant uniquement du texte
    updateTextPost:({commit},postContent)=>{
      return new Promise((resolve,reject)=>{
        commit;
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.defaults.headers = {'Authorization': `Bearer ${token}`};

        axios.put(`http://localhost:3000/post/${postContent.id}`,postContent)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour update un commentaire
    updateComment:({commit, state},postContent)=>{
      return new Promise((resolve,reject)=>{
        commit;
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.defaults.headers = {'Authorization': `Bearer ${token}`};

        axios.put(`http://localhost:3000/post/comments/${state.postToCommentId}`,postContent)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour supprimer un post
    deletePost:({commit}, postToDeleteId)=>{
      return new Promise((resolve,reject)=>{
        commit;
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.defaults.headers = {'Authorization': `Bearer ${token}`};

        axios.delete(`http://localhost:3000/post/${postToDeleteId.postId}`)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour supprimer un commentaire
    deleteComment:({commit}, commentToDeleteId)=>{
      return new Promise((resolve,reject)=>{
        commit;
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.defaults.headers = {'Authorization': `Bearer ${token}`};

        axios.delete(`http://localhost:3000/post/comments/${commentToDeleteId.postId}`)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    //Appel Backend pour supprimer un user
    deleteUser:({commit}, userToDeleteId)=>{
      return new Promise((resolve,reject)=>{
        commit;
        const token= JSON.parse(localStorage.getItem("datas")).token; 
        axios.defaults.headers = {'Authorization': `Bearer ${token}`};
        
        axios.delete(`http://localhost:3000/auth/${userToDeleteId.user}`)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    }
  }
})
