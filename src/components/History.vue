<template>
  <div>
    <Navbar></Navbar>
    <div v-if="onGoingOrder.length !== 0" class="container">
      <h3>On Going Order</h3>
      <table class="highlight">
        <thead>
          <tr class="center">
              <th>Cart ID</th>
              <th>Product Name</th>
              <th>Product Img</th>
              <th>Quantity</th>
              <th>Price per Product</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Date Updated</th>
          </tr>
        </thead>
        <tbody v-for="product in onGoingOrder" :key="product.id">
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
    <div v-if="finishedOrder.length !== 0" class="container">
      <h3>Order History</h3>
      <table class="highlight">
        <thead>
          <tr>
              <th>Cart ID</th>
              <th>Product Name</th>
              <th>Product Img</th>
              <th>Quantity</th>
              <th>Price per Product</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Finished Date</th>
          </tr>
        </thead>
        <tbody v-for="product in finishedOrder" :key="product.id">
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

export default {
  name: 'History',
  components: {
    Navbar
  },
  computed: {
    customerCart () {
      return this.$store.state.customerCart
    },
    onGoingOrder () {
      var detail = []
      for (let i = 0; i < this.customerCart.length; i++) {
        if (this.customerCart[i].status === 'Paid' || this.customerCart[i].status === 'On Process' || this.customerCart[i].status === 'Shipping') {
          detail.push(this.customerCart[i])
        }
      }
      return detail
    },
    finishedOrder () {
      var detail = []
      for (let i = 0; i < this.customerCart.length; i++) {
        if (this.customerCart[i].status === 'Finish') {
          detail.push(this.customerCart[i])
        }
      }
      return detail
    }
  },
  methods: {
    priceConverter (number) {
      return new Intl.NumberFormat('in-IN', { style: 'currency', currency: 'IDR' }).format(number)
    },
    dateConverter (newDate) {
      const fullDate = new Date(newDate)
      const date = fullDate.getDate()
      const month = fullDate.getMonth() + 1
      const year = fullDate.getFullYear()
      return `${date} - ${month} - ${year}`
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
