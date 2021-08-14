import { createStore } from 'vuex'
const axios = require('axios');
const instance = axios.create({
  baseURL: '?#'
});
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    logUserIn:({commit}, userInfos)=>{
      return new Promise((resolve, reject)=>{
        commit;
        instance.post('/login', userInfos)
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
        instance.post('/signup', userInfos)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
      })
    }
  },
  modules: {
  }
})
