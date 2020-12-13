/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import router from '../router'
import createPersistedState from "vuex-persistedstate"
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: null,
    accessToken: null || localStorage.getItem('accessToken'),
    refreshToken: null || localStorage.getItem('refreshToken'),
    intervalSocketIo: null
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
    REMOVE_ALL_LOCAL_STORAGE() {
      localStorage.removeItem('vuex')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('dataUser')
    },
    SET_FROM_IO(state, payload) {
      state.userData = payload
    },
    SET_INTERVAL_SOCKET_IO(state, payload) {
      state.intervalSocketIo = payload
    },
    CLEAR_INTERVAL_SOCKET_IO(state, payload) {
      clearInterval(state.intervalSocketIo)
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
      context.commit('CLEAR_INTERVAL_SOCKET_IO')
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
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/transfers`, payload)
          .then(results => {
            resolve(results)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    async getDetailTransferById(context, payload) {
      return new Promise((resolve, reject) => {
        try {
          const result = axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/transfers/${payload}`)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },
    async getDetailTransferByFirstName(context, payload) {
      return new Promise((resolve, reject) => {
        try {
          const result = axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/transfers/search?firstName=${payload.firstName}&type=transfers`)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },
    async getReceiver (context, payload) {
      return new Promise((resolve, reject) => {
        try {
          const dataReceiver = axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/users/${payload}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
          })
          resolve(dataReceiver)
        } catch (error) {
          reject(error)
        }
      })
    },
    deletePhoneNumber(context, payload) {
      return new Promise((resolve, reject) => {
        try {
          const deleteResult = axios.patch(`${process.env.VUE_APP_SERVICE_API}/v1/users/${payload.idUser}`, payload.phoneNumber)
          resolve(deleteResult)
        } catch (error) {
          reject(error)
        }
      })
    },
    deleteTransactionTransferById (context, payload) {
      return new Promise((resolve, reject) => {
        axios.delete(`${process.env.VUE_APP_SERVICE_API}/v1/transfers/${payload}`, {
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
    interceptorRequest() {
      axios.interceptors.request.use(function (config) {
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(function (response) {
        const responseStatus = response.data.statusCode
        const responseMessage = response.data.result.message
        if (responseStatus === 200) {
          if (responseMessage === 'transfer successfully') {
            Swal.fire({
              icon: 'success',
              title: 'transfer successfully',
              showConfirmButton: false,
              timer: 1500
            })
            return router.push({ name: 'StatusSucceed', query: { idTransfer: response.data.result.idTransfer, idReceiver: response.data.result.idReceiver } })
          }
        }
        return response
      }, function (error) {
        const errorStatus = error.response.data.status
        const errorMessage = error.response.data.err.message

        if (errorStatus === 404) {
          if (errorMessage === 'Email or password you entered is incorrect.') {
            alert('Email or password invalid')
          }
        } else if (errorStatus === 500) {
          if (errorMessage === 'Sender Balance is not enough for transfer') {
            alert('Oops! Your balance is not enough')
          } else {
            alert('Oops! Sorry Looks like server having trouble')
            return router.push('/home')
          }
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
            context.commit('CLEAR_INTERVAL_SOCKET_IO')
            router.push('/auth/login')
          } else if (errorMessage === 'Forbidden: Token cannot be empty') {
            context.commit('REMOVE_USERDATA')
            context.commit('REMOVE_ALLTOKEN')
            context.commit('REMOVE_ALL_LOCAL_STORAGE')
            context.commit('CLEAR_INTERVAL_SOCKET_IO')
            router.push('/auth/login')
          } else if (errorMessage === 'email must be verified first, check the email we have sent') {
            alert('sorry your email has not been verified, please verify it first')
          }
        } else if (errorStatus === 400) {
          if (errorMessage === 'Sorry, Your PIN is wrong') {
            alert('Sorry, Your PIN is wrong')
          } else if (errorMessage === 'Data Transfer User not Found..') {
            alert('Id user is wrong')
            router.push('/home/home')
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
      return state.userData.pin !== "not exists"
    }
  },
  modules: {
  }
})
