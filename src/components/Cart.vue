<template>
  <div>
    <Navbar></Navbar>
    <NotifSection></NotifSection>
    <ErrorSection></ErrorSection>
    <h3>Cart</h3>
    <div v-if="currentCart.orders.length !== 0" class="container">
      <table class="highlight">
        <thead>
          <tr class="center">
              <th>Cart ID</th>
              <th>Product Name</th>
              <th>Product Img</th>
              <th>Quantity</th>
              <th>Price per Product</th>
              <th>Total Price</th>
          </tr>
        </thead>
        <tbody v-for="product in currentCart.orders" :key="product.id">
          <tr>
            <td>{{ product.CartId }}</td>
            <td>{{ product.Product.name }}</td>
            <td>
              <img :src="product.Product.image_url">
            </td>
            <td>{{ product.quantity }}</td>
            <td>{{ priceConverter(product.Product.price) }}</td>
            <td>{{ priceConverter(product.Product.price * product.quantity) }}</td>
            <td>{{ product.status }}</td>
            <td>{{ dateConverter(product.updatedAt) }}</td>
          </tr>
        </tbody>
      </table>
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
    currentCart () {
      return this.$store.state.currentCart
    }
  },
  methods: {
    priceConverter (number) {
      return new Intl.NumberFormat('in-IN', { style: 'currency', currency: 'IDR' }).format(number)
    },
    createCart () {
      const customerId = localStorage.currentUserId
      server({
        method: 'post',
        url: `/customer/${customerId}/cart`,
        headers: {
          token: localStorage.token
        },
        data: {
          CustomerId: customerId
        }
      })
        .then(response => {
          this.$store.commit('setCurrentCartId', response.data.data.id)
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    },
    addProductToCart (payload) {
      const customerId = localStorage.currentUserId
      const { id } = this.currentCart
      const { quantity, ProductId } = payload
      server({
        method: 'post',
        url: `/customer/${customerId}/${id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          quantity,
          status: 'Paid',
          CartId: id,
          ProductId
        }
      })
        .then(response => {
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    },
    saveAndPay () {
      this.createCart()
        .then(() => {
          for (let i = 0; i < this.currentCart.orders.length; i++) {
            this.addProductToCart(this.currentCart.orders[i])
          }
        })
        .then(() => {
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', 'Order(s) successfully paid')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
