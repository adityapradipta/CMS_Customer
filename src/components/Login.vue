<template>
  <div>
    <section id="loginForm">
      <div class="container">
        <div class="col s12 m4">
          <h4 class="center blue-text text-darken-2">Login</h4>
          <NotifSection></NotifSection>
          <ErrorSection></ErrorSection>
          <div class="input-field">
            <input id="email" v-model="customer.email" type="email" class="validate" required>
            <label for="email">Email</label>
          </div>
          <div class="input-field">
            <input id="password" v-model="customer.password" type="password" class="validate" required>
            <label for="password">Password</label>
          </div>
          <button type="submit" class="btn blue darken-3" @click.prevent="loginCustomer">Login</button>
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
  name: 'Login',
  components: {
    NotifSection, ErrorSection
  },
  data () {
    return {
      customer: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginCustomer () {
      server({
        method: 'post',
        url: '/customer/login',
        data: {
          email: this.customer.email,
          password: this.customer.password
        }
      })
        .then(response => {
          this.$store.commit('changeCurrentErr', '')
          this.$store.commit('changeCurrentNotif', response.data.notif)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('currentUserId', response.data.data.id)
          localStorage.setItem('currentUserName', response.data.data.name)
          this.$router.push({ name: 'Dashboard' })
          this.customer.email = ''
          this.customer.password = ''
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
