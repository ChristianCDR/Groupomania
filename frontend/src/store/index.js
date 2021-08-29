import { createStore } from 'vuex';
const axios = require('axios');

export default createStore({
  state: {
    postOrUpdateMode: "",
    id:"",
    containsImage: false,
    file:""
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
    }
  },
  actions: {
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

    signUserUp: ({commit}, userInfos)=>{
      return new Promise((resolve, reject)=>{
        commit;
        axios.post('http://localhost:3000/auth/signup', userInfos)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },

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
