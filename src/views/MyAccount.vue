<template>
  <div>
    <Navbar></Navbar>
    <NotifSection></NotifSection>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import NotifSection from '../components/NotifSection'

export default {
  name: 'MyAccount',
  components: {
    Navbar, NotifSection
  }
}
</script>

<style>

</style>
