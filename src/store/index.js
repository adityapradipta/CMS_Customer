import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    productsList: [],
    currentNotif: '',
    currentErr: '',
    currentCustomer: '',
    currentCart: {
      id: '',
      orders: []
    },
    customerCart: []
  },
  mutations: {
    changeLoginStatus (state) {
      if (localStorage.token) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    },
    setProductsList (state, payload) {
      state.productsList = payload
    },
    changeCurrentNotif (state, payload) {
      state.currentNotif = payload
    },
    changeCurrentErr (state, payload) {
      state.currentErr = payload
    },
    setCurrentCustomer (state, payload) {
      state.currentCustomer = payload
    },
    setCustomerCart (state, payload) {
      state.customerCart = payload
    }
  },
  actions: {
    fetchProductsList (context) {
      server({
        method: 'get',
        url: '/product'
      })
        .then(response => {
          context.commit('setProductsList', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCustomerDetail (context) {
      const customerId = localStorage.currentUserId
      server({
        method: 'get',
        url: `/customer/${customerId}`
      })
        .then(response => {
          context.commit('setCurrentCustomer', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCustomerCart (context) {
      const customerId = localStorage.currentUserId
      server({
        method: 'get',
        url: `/customer/${customerId}/cart`
      })
        .then(response => {
          // console.log(response.data.data)
          context.commit('setCustomerCart', response.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
