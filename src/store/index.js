/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {},
    accessToken: null || localStorage.getItem('accessToken'),
    refreshToken: null || localStorage.getItem('refreshToken')
  },
  mutations: {
    SET_USERDATA(state, payload) {
      state.userData = payload
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/users/login`, payload)
          .then(results => {
            const result = results.data.result
            const decoded = jwt.verify(result.accessToken, process.env.VUE_APP_JWT_KEY)
            localStorage.setItem('refreshToken', result.refreshToken)
            localStorage.setItem('accessToken', result.accessToken)
            const payload = {
              ...decoded,
              ...result
            }
            localStorage.setItem('dataUser', JSON.stringify(payload))
            context.commit('SET_USERDATA', payload)
            resolve(results)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    interceptorRequest() {
      axios.interceptors.request.use(function (config) {
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return config
      }, function (error) {
        console.log(error)
        return Promise.reject(error)
      })
    },
    interceptorResponse() {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        const errorStatus = error.response.data.status
        const errorMessage = error.response.data.err.message
        if (errorStatus === 404) {
          if (errorMessage === 'Email or password you entered is incorrect.') {
            alert('Email or password invalid')
          }
        } else if (errorStatus === 500) {
          alert('Oops! Sorry Looks like server having trouble')
        }
        return Promise.reject(error)
      })
    }
  },
  getters: {
    getUserData(state) {
      return state.userData
    }
  },
  modules: {
  }
})
