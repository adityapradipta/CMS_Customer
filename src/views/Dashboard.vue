<template>
  <div>
    <Navbar></Navbar>
    <h3>Dashboard</h3>
    <div>
      <router-link to="/customer"><a>Your Account</a></router-link> |
      <router-link to="/cart"><a>Cart</a></router-link> |
      <router-link to="/current_order"><a>Current Order</a></router-link> |
      <router-link to="/history"><a>History</a></router-link>
    </div>
    <div class="container">
      <div class="row">
        <ProductCard v-for="product in productsList" :key="product.id" :product="product"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'

export default {
  name: 'Dashboard',
  components: {
    ProductCard, Navbar
  },
  computed: {
    productsList () {
      return this.$store.state.productsList
    }
  },
  created () {
    this.$store.dispatch('fetchProductsList')
  }
}
</script>

<style>

</style>
