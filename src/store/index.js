/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import router from '../router'
import createPersistedState from "vuex-persistedstate"
import Swal from 'sweetalert2'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: null,
    accessToken: null || localStorage.getItem('accessToken'),
    refreshToken: null || localStorage.getItem('refreshToken'),
    intervalSocketIo: null,
    transactionHistory: {
      paginations: null,
      transactions: [],
      chartData: []
    }
  },
  plugins: [createPersistedState()],
  mutations: {
    SET_USERDATA(state, payload) {
      state.userData = payload
      state.accessToken = state.accessToken || payload.accessToken
      state.refreshToken = state.refreshToken || payload.refreshToken
    },
    REMOVE_USERDATA(state, payload) {
      state.userData = null
    },
    REMOVE_ALLTOKEN(state) {
      state.accessToken = null
      state.refreshToken = null
    },
    SET_TRANSACTION_HISTORY (state, payload) {
      state.transactionHistory.pagination = payload.pagination
      state.transactionHistory.transactions = payload.transactions
    },
    SET_CHART_HISTORY (state, payload) {
      state.transactionHistory.chartData = payload
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
        context.dispatch('interceptorRequest')
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/users/login`, payload)
          .then(async (results) => {
            const result = results.data.result
            console.log('result :>> ', result)
            const decoded = jwt.verify(result.accessToken, process.env.VUE_APP_JWT_KEY, result.refreshToken)
            console.log('decoded :>> ', decoded)
            localStorage.setItem('accessToken', result.accessToken)
            const payload = {
              ...decoded,
              ...result
            }
            localStorage.setItem('dataUser', JSON.stringify(payload))
            context.commit('SET_USERDATA', payload)
            await context.dispatch('getDetailUserData')
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
      return new Promise((resolve, reject) => {
        const pin = { pin: payload.pin }
        axios.patch(`${process.env.VUE_APP_SERVICE_API}/v1/users/${payload.id}`, pin, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
          .then(async (results) => {
            await context.dispatch('getDetailUserData')
            resolve(results)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    async transfer(context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/transfers`, payload)
          .then(results => {
            resolve(results)
            context.dispatch('getDetailUserData')
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    async getStatusPin(context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/users/check-pin?option=checkexistpin`)
          .then(results => {
            console.log('results.data.result :>> ', results.data.result)
            context.commit('SET_USERDATA', { ...context.state.userData, pin: results.data.result })
            resolve(results.data.result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    async checkPin(context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/users/check-pin`, payload)
          .then(results => {
            resolve(results.data.result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    async getDetailTransferById(context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        try {
          const result = axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/transfers/${payload}`)
          context.dispatch('getDetailUserData')
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },
    async getDetailTransferByFirstName(context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        try {
          const result = axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/transfers/search?firstName=${payload.firstName}&type=transfers`)
          context.dispatch('getDetailUserData')
          resolve(result)
        } catch (error) {
          reject(error)
        }
      })
    },
    getHistory (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/transfers/search?type=all&limit=${payload.limit}`)
          .then(results => {
            console.log('results history:>> ', results)
            const chartData = results.data.result.transactions.map(el => {
              return [
                moment(el.transferDate).format('L'),
                el.amount
              ]
            }).slice(0, 3)
            context.commit('SET_CHART_HISTORY', chartData)
            console.log('chartData :>> ', chartData)
            context.commit('SET_TRANSACTION_HISTORY', results.data.result)
            context.dispatch('getDetailUserData')
            resolve(results.data.result)
          })
          .catch(error => {
            console.log('error ini:>> ', error)
            reject(error)
          })
      })
    },
    async getReceiver (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        try {
          const dataReceiver = axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/users/${payload}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
          })
          context.dispatch('getDetailUserData')
          resolve(dataReceiver)
        } catch (error) {
          reject(error)
        }
      })
    },
    getDetailUserData ({ dispatch, commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/users/${state.userData.id}?type=all`)
          .then(async (result) => {
            commit('SET_USERDATA', result.data.result)
            await dispatch('getStatusPin')
            resolve(result.data.result[0])
          }).catch((err) => {
            reject(err)
          })
      })
    },
    deletePhoneNumber(context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        try {
          const deleteResult = axios.patch(`${process.env.VUE_APP_SERVICE_API}/v1/users/${payload.idUser}`, payload.phoneNumber)
          context.dispatch('getDetailUserData')
          resolve(deleteResult)
        } catch (error) {
          reject(error)
        }
      })
    },
    deleteTransactionTransferById (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.delete(`${process.env.VUE_APP_SERVICE_API}/v1/transfers/${payload}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
          .then(results => {
            context.dispatch('getDetailUserData')
            resolve(results)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    interceptorRequest() {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(function (response) {
        console.log('response :>> ', response)
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
        console.log('error :>> ', error)
        const errorStatus = error.response.data.status
        const errorMessage = error.response.data.err.message

        if (errorStatus === 404) {
          if (errorMessage === 'Email or password you entered is incorrect.') {
            Swal.fire({
              icon: 'error',
              title: 'Email or password invalid',
              showConfirmButton: true,
              timer: 1000
            })
          }
        } else if (errorStatus === 500) {
          if (errorMessage === 'Sender Balance is not enough for transfer') {
            alert('Oops! Your balance is not enough')
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops! Sorry Looks like server having trouble',
              showConfirmButton: true,
              timer: 1000
            })
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
            // context.commit('REMOVE_USERDATA')
            // context.commit('REMOVE_ALLTOKEN')
            // context.commit('REMOVE_ALL_LOCAL_STORAGE')
            // context.commit('CLEAR_INTERVAL_SOCKET_IO')
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
      return state.userData.pin !== "not exist"
    },
    getTransactionHistory (state) {
      return state.transactionHistory
    }
  },
  modules: {
  }
})
