<template>
  <div>
    <div v-if="onGoingOrder.length !== 0" class="container">
      <h4>Current Order</h4>
      <table class="highlight">
        <thead>
          <tr>
              <th class="center-align">Product Name</th>
              <th class="center-align">Image</th>
              <th class="center-align">Quantity</th>
              <th class="center-align">Total Price</th>
              <th class="center-align">Order Date</th>
              <th class="center-align">Status</th>
              <th class="center-align">Date Updated</th>
          </tr>
        </thead>
        <tbody v-for="product in onGoingOrder" :key="product.id">
          <tr>
            <td class="center-align">{{ product.Product.name }}</td>
            <td class="center">
              <img :src="product.Product.image_url">
            </td>
            <td class="center-align">{{ product.quantity }}</td>
            <td class="center-align">{{ priceConverter(product.Product.price * product.quantity) }}</td>
            <td class="center-align">{{ dateConverter(product.createdAt) }}</td>
            <td class="boldStatus center-align">{{ product.status.toUpperCase() }}</td>
            <td class="center-align">{{ dateConverter(product.updatedAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentOrder',
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
  .boldStatus {
    font-weight: bold;
    color: green;
  }
</style>
