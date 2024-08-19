import { createStore } from 'vuex'
import axios from 'axios'
// import { toast } from 'vue3-toastify';
// import 'vue3-toastify/dist/index.css';
import {useCookies} from 'vue-cookies'

axios.defaults.withCredentials =true
axios.defaults.headers = $cookies.get('token')

export default createStore({
  state: {
    user: null,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    addUser({commit},info){
      let data = axios.post('http://localhost:5050/users',info)
      if(data){
        toast("New User Has Been Added", )
      }
    },
    async loginUser({commit}, info){
      let {data} = await axios.post('http://localhost:5050/users/login',info)
      console.log(data);
      $cookies.set('token',data.token)
      if (data.message){
        toast("Logged in successfully!!", {
          "theme": "auto",
          "type": "default",
          "dangerouslyHTMLString": true
        })
      }
    },
   async getFruits({comit}){
      let data = await axios.get('http://localhost:5050/fruits')
      console.log(data); 
    }
  },
  modules: {
  }
})











