<template>
  <div>
    <Navbar></Navbar>
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
    if (!localStorage.token) {
      this.$router.push({ name: 'Login' })
    } else {
      this.$store.dispatch('fetchProductsList')
    }
  }
}
</script>

<style>

</style>
