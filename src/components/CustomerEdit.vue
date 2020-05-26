<template>
  <div>
    <h3>CustomerEdit</h3>
    <section id="customerEditForm">
      <div class="container">
        <div class="col s12 m4">
          <NotifSection></NotifSection>
          <ErrorSection></ErrorSection>
          <div class="input-field">
            <input id="newName" v-model="editedCustomer.name" type="text" class="validate" required>
            <label for="newName">Name</label>
          </div>
          <div class="input-field">
            <input id="newAddress" v-model="editedCustomer.address" type="text" class="validate" required>
            <label for="newAddress">Address</label>
          </div>
          <div class="input-field">
            <input id="newPhone" v-model="editedCustomer.phone" type="number" class="validate" required>
            <label for="newPhone">Phone</label>
          </div>
          <div class="input-field">
            <input id="newEmail" v-model="editedCustomer.email" type="email" class="validate" readonly>
            <label for="newEmail">Email</label>
          </div>
          <button type="submit" class="btn blue darken-3" @click.prevent="">Save</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import server from '../api/index'
import NotifSection from '../components/NotifSection'
import ErrorSection from '../components/ErrorSection'

export default {
  name: 'CustomerEdit',
  components: {
    NotifSection, ErrorSection
  },
  data () {
    return {
      editedCustomer: {
        name: '',
        address: '',
        email: '',
        phone: '',
        password: ''
      }
    }
  },
  computed: {
    currentCustomer () {
      return this.$store.state.currentCustomer
    }
  },
  methods: {
    getCustomerDetail () {
      // server({
      //   method: 'post',
      //   url: '/customer/register',
      //   data: {
      //     name: this.newCustomer.name,
      //     address: this.newCustomer.address,
      //     phone: this.newCustomer.phone,
      //     email: this.newCustomer.email,
      //     password: this.newCustomer.password
      //   }
      // })
      //   .then(response => {
      //     this.$store.commit('changeCurrentErr', '')
      //     this.$store.commit('changeCurrentNotif', response.data.notif)
      //     this.$router.push({ name: 'Login' })
      //     this.newCustomer = {
      //       name: '',
      //       address: '',
      //       email: '',
      //       phone: '',
      //       password: ''
      //     }
      //   })
      //   .catch(err => {
      //     this.$store.commit('changeCurrentNotif', '')
      //     this.$store.commit('changeCurrentErr', err.response.data.err)
      //     console.log(err.response.data.err)
      //   })
    }
  }
}
</script>

<style>

</style>
