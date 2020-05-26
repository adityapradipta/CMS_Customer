<template>
  <div>
    <Navbar></Navbar>
    <h3>Customer Detail</h3>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Customer',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
