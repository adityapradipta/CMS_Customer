<template>
  <div>
    <Navbar></Navbar>
    <NotifSection></NotifSection>
    <ErrorSection></ErrorSection>
    <div v-if="currentCart.length == 0">
      <img src="https://image.flaticon.com/icons/svg/102/102661.svg">
      <h5>Cart is empty. Please shop first!</h5>
      <router-link :to="'/dashboard'"><button class="btn btn-large white grey-text text-darken-3 z-depth-3">START SHOPPING!</button></router-link>
    </div>
    <div v-else-if="currentCart.length !== 0" class="container">
      <router-link :to="'/dashboard'"><button class="btn btn-large white grey-text text-darken-3 z-depth-3">SHOP MORE!</button></router-link>
      <table class="highlight">
        <thead>
          <tr class="center">
              <th>Product Name</th>
              <th>Product Img</th>
              <th>Quantity</th>
              <th>Price per Product</th>
              <th>Total Price</th>
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in currentCart" :key="product.id">
            <td>{{ product.Product.name }}</td>
            <td>
              <img :src="product.Product.image_url">
            </td>
            <td>
              {{ product.quantity }}
            </td>
            <td>{{ priceConverter(product.Product.price) }}</td>
            <td>{{ priceConverter(product.Product.price * product.quantity) }}</td>
            <td><button class="btn btn-small" @click.prevent="deleteProductFromCart(product.id)"><i class="material-icons">delete</i></button></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>TOTAL PRICE</td>
            <td></td>
            <td>{{ priceConverter(TotalPrice) }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-large" @click.prevent="checkoutAndPay"><i class="material-icons right">payment</i>Checkout and Pay</button>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import server from '../api/index'
import NotifSection from '../components/NotifSection'
import ErrorSection from '../components/ErrorSection'

export default {
  name: 'Cart',
  components: {
    Navbar, NotifSection, ErrorSection
  },
  computed: {
    customerCart () {
      return this.$store.state.customerCart
    },
    currentCart () {
      var detail = []
      const CartId = +localStorage.CartId
      for (let i = 0; i < this.customerCart.length; i++) {
        if (this.customerCart[i].CartId === CartId && this.customerCart[i].status === 'Created') {
          detail.push(this.customerCart[i])
        }
      }
      return detail
    },
    TotalPrice () {
      let totalPrice = 0
      for (let i = 0; i < this.currentCart.length; i++) {
        totalPrice += this.currentCart[i].quantity * this.currentCart[i].Product.price
      }
      return totalPrice
    }
  },
  methods: {
    priceConverter (number) {
      return new Intl.NumberFormat('in-IN', { style: 'currency', currency: 'IDR' }).format(number)
    },
    deleteProductFromCart (CartProductId) {
      const CartId = localStorage.CartId
      const token = localStorage.token
      server({
        method: 'delete',
        url: `/customer/${CartId}/${CartProductId}`,
        headers: {
          token
        }
      })
        .then(response => {
          this.$store.dispatch('fetchCustomerCart')
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    },
    checkoutAndPay () {
      const CartId = localStorage.CartId
      const token = localStorage.token
      var notif = []
      var error = []
      var promises = []
      for (let i = 0; i < this.currentCart.length; i++) {
        promises.push(server({
          method: 'patch',
          url: `/product/${this.currentCart[i].ProductId}`,
          data: {
            stock: Number(this.currentCart[i].Product.stock) - Number(this.currentCart[i].quantity)
          }
        })
          .then(response => {
            notif.push(response.data.notif)
          })
          .catch(err => {
            error.push(err)
          })
        )
      }
      Promise.all(promises)
        .then(() => {
          this.$store.dispatch('fetchProductsList')
          return server({
            method: 'patch',
            url: `/customer/${CartId}`,
            headers: {
              token
            },
            data: {
              status: 'Paid'
            }
          })
        })
        .then(response => {
          localStorage.removeItem('CartId')
          this.$store.dispatch('fetchCustomerCart')
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', 'Order success!')
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    }
  },
  created () {
    this.$store.dispatch('fetchCustomerCart')
  }
}
</script>

<style scoped>
  img {
    height: 100px;
  }
</style>
