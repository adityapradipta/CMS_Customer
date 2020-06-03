<template>
  <div>
    <h3>CustomerEdit</h3>
    <section id="customerEditForm">
      <div class="container">
        <div class="col s12 m4">
          <NotifSection></NotifSection>
          <ErrorSection></ErrorSection>
          <div class="input-field">
            <input id="newName" v-model="editedCustomer.name" type="text" class="validate" placeholder="Full Name" required>
            <!-- <label for="newName">Name</label> -->
          </div>
          <div class="input-field">
            <input id="newAddress" v-model="editedCustomer.address" type="text" class="validate" placeholder="Address" required>
            <!-- <label for="newAddress">Address</label> -->
          </div>
          <div class="input-field">
            <input id="newPhone" v-model="editedCustomer.phone" type="number" class="validate" placeholder="Phone" required>
            <!-- <label for="newPhone">Phone</label> -->
          </div>
          <div class="input-field">
            <input id="newEmail" v-model="editedCustomer.email" type="email" readonly>
            <!-- <label for="newEmail">Email</label> -->
          </div>
          <button type="submit" class="btn blue darken-3" @click.prevent="editCustomerDetail">Save</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import server from '../api/index'
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
        phone: ''
      }
    }
  },
  computed: {
    currentCustomer () {
      return this.$store.state.currentCustomer
    }
  },
  methods: {
    fetchCustomerDetail () {
      this.editedCustomer.name = this.currentCustomer.name
      this.editedCustomer.address = this.currentCustomer.address
      this.editedCustomer.email = this.currentCustomer.email
      this.editedCustomer.phone = this.currentCustomer.phone
    },
    editCustomerDetail () {
      server({
        method: 'put',
        url: '/customer',
        headers: {
          token: localStorage.token
        },
        data: {
          name: this.editedCustomer.name,
          address: this.editedCustomer.address,
          phone: this.editedCustomer.phone,
          email: this.editedCustomer.email
        }
      })
        .then(response => {
          this.$store.dispatch('fetchCustomerDetail')
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
          this.$router.push({ name: 'Customer' })
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
        })
    }
  },
  mounted () {
    this.fetchCustomerDetail()
  }
}
</script>

<style>

</style>
