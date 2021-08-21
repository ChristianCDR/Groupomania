import { createStore } from 'vuex'
const axios = require('axios');

export default createStore({
  state: {
    postOrUpdateMode: 'post',
    id:''
  },
  mutations: {
    switchToUpdate: function(state, idRecup){
      state.postOrUpdateMode= 'update';
      state.id=idRecup.postId;
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

    publier: ({commit}, postContent)=>{
      return new Promise((resolve, reject)=>{
        commit;
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
        axios.get('http://localhost:3000/post/')
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    },
    updatePost:({commit},postContent)=>{
      return new Promise((resolve,reject)=>{
        commit;
        console.log(postContent);
        axios.put(`http://localhost:3000/post/${postContent.id}`,postContent)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    }
  },
  modules:{

  }
})
