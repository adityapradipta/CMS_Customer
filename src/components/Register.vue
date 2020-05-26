<template>
  <div>
    <section id="registerForm">
      <div class="container">
        <div class="col s12 m4">
          <h4 class="center blue-text text-darken-2">Register</h4>
          <NotifSection></NotifSection>
          <ErrorSection></ErrorSection>
          <div class="input-field">
            <input id="newName" v-model="newCustomer.name" type="text" class="validate" required>
            <label for="newName">Name</label>
          </div>
          <div class="input-field">
            <input id="newAddress" v-model="newCustomer.address" type="text" class="validate" required>
            <label for="newAddress">Address</label>
          </div>
          <div class="input-field">
            <input id="newPhone" v-model="newCustomer.phone" type="number" class="validate" required>
            <label for="newPhone">Phone</label>
          </div>
          <div class="input-field">
            <input id="newEmail" v-model="newCustomer.email" type="email" class="validate" required>
            <label for="newEmail">Email</label>
          </div>
          <div class="input-field">
            <input id="newPassword" v-model="newCustomer.password" type="password" class="validate" required>
            <label for="newPassword">Password</label>
          </div>
          <button type="submit" class="btn blue darken-3" @click.prevent="registerCustomer">Register</button>
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
  name: 'Register',
  components: {
    NotifSection, ErrorSection
  },
  data () {
    return {
      newCustomer: {
        name: '',
        address: '',
        email: '',
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    registerCustomer () {
      server({
        method: 'post',
        url: '/customer/register',
        data: {
          name: this.newCustomer.name,
          address: this.newCustomer.address,
          phone: this.newCustomer.phone,
          email: this.newCustomer.email,
          password: this.newCustomer.password
        }
      })
        .then(response => {
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
          this.$router.push({ name: 'Login' })
          this.newCustomer = {
            name: '',
            address: '',
            email: '',
            phone: '',
            password: ''
          }
        })
        .catch(err => {
          this.$store.commit('changeCurrentNotif', '')
          this.$store.commit('changeCurrentErr', err.response.data.err)
          console.log(err.response.data.err)
        })
    }
  },
  created () {
  }
}
</script>

<style>

</style>
