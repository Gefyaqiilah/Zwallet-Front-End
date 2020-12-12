/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import router from '../router'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: null,
    accessToken: null || localStorage.getItem('accessToken'),
    refreshToken: null || localStorage.getItem('refreshToken')
  },
  plugins: [createPersistedState()],
  mutations: {
    SET_USERDATA(state, payload) {
      state.userData = payload
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
    },
    REMOVE_USERDATA(state, payload) {
      state.userData = null
    },
    REMOVE_ALLTOKEN(state) {
      state.accessToken = null
      state.refreshToken = null
    },
    REMOVE_ALL_LOCAL_STORAGE(state) {
      localStorage.removeItem('vuex')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('dataUser')
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
    logOut(context) {
      context.commit('REMOVE_ALL_LOCAL_STORAGE')
      context.commit('REMOVE_USERDATA')
      context.commit('REMOVE_ALLTOKEN')
    },
    createPin(context, payload) {
      const pin = { pin: payload.pin }
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_SERVICE_API}/v1/users/${payload.id}`, pin, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
          .then(results => {
            resolve(results)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    async transfer(context, payload) {
      return new Promise((resolve, reject) => {
        try {
          const result = axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/transfers`, payload)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },
    interceptorRequest(context) {
      axios.interceptors.request.use(function (config) {
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse(context) {
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
        } else if (errorStatus === 401) {
          if (errorMessage === 'Access Token expired') {
            // get new accesstoken
            if (!localStorage.getItem('refreshToken')) {
              context.commit('REMOVE_USERDATA')
              context.commit('REMOVE_ALLTOKEN')
              context.commit('REMOVE_ALL_LOCAL_STORAGE')
              return router.push('/auth/login')
            }
            axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/users/token`, {
              token: localStorage.getItem('refreshToken')
            })
              .then(results => {
                const accessToken = results.data.result.accessToken
                const config = error.config
                config.headers.Authorization = `Bearer ${accessToken}`
                console.log(config)
                // request again
                axios.request(config)
                  .then(() => {
                    localStorage.setItem('accessToken', accessToken)
                  })
                  .catch(() => {
                    alert('Looks like server having trouble')
                  })
              })
              .catch(() => {
                alert('server error')
              })
          } else if (errorMessage === 'Invalid Token') {
            context.commit('REMOVE_USERDATA')
            context.commit('REMOVE_ALLTOKEN')
            context.commit('REMOVE_ALL_LOCAL_STORAGE')
            router.push('/auth/login')
          } else if (errorMessage === 'Forbidden: Token cannot be empty') {
            context.commit('REMOVE_USERDATA')
            context.commit('REMOVE_ALLTOKEN')
            context.commit('REMOVE_ALL_LOCAL_STORAGE')
            router.push('/auth/login')
          } else if (errorMessage === 'email must be verified first, check the email we have sent') {
            alert('sorry your email has not been verified, please verify it first')
          }
        }
        return Promise.reject(error)
      })
    }
  },
  getters: {
    getUserData(state) {
      return state.userData
    },
    isLogin(state) {
      return state.accessToken !== null && state.refreshToken !== null
    },
    isPinExist(state) {
      console.log(state.userData.pin !== "not exists")
      return state.userData.pin !== "not exists"
    }
  },
  modules: {
  }
})
