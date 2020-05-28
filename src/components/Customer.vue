<template>
  <div>
    <Navbar></Navbar>
    <h3>Customer Detail</h3>
    <h5>Name</h5>
    <p>{{currentCustomer.name}}</p>
    <h5>Address</h5>
    <p>{{currentCustomer.address}}</p>
    <h5>Email</h5>
    <p>{{currentCustomer.email}}</p>
    <h5>Phone</h5>
    <p>{{currentCustomer.phone}}</p>
    <router-link :to="'/customer/edit'"><button class="btn btn-small">Edit Data</button></router-link>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Customer',
  components: {
    Navbar
  },
  computed: {
    currentCustomer () {
      return this.$store.state.currentCustomer
    }
  },
  created () {
    this.$store.dispatch('fetchCustomerDetail')
  }
}
</script>

<style scoped>
  h5 {
    font-weight: bolder;
  }
</style>
