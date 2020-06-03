<template>
  <div>
    <div class="slider" id="slider">
      <ul class="slides">
        <li>
          <img src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=622&q=80">
          <div class="caption center-align">
            <h3>Welcome to Digi-Store</h3>
            <h5 class="light grey-text text-lighten-3">The best shopping hall for your gadget</h5>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1548268567-4610dc7a5a16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80">
          <div class="caption center-align">
            <h3>New iPhone!</h3>
            <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80">
          <div class="caption center-align">
            <h3>New Macbook!</h3>
            <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1576&q=80">
          <div class="caption center-align">
            <h3>New iPad!</h3>
            <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1530961915006-1cbd0d169f28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80">
          <div class="caption center-align">
            <h3>Samsung Galaxy S20!</h3>
            <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1587749090881-1ea18126ab3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80">
          <div class="caption center-align">
            <h3>New Galaxy S20 Pro</h3>
            <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
          </div>
        </li>
        <li>
          <img src="https://images.unsplash.com/photo-1461773518188-b3e86f98242f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80">
          <div class="caption center-align">
            <h3>New iMac Pro</h3>
            <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
          </div>
        </li>
        <li>
          <img src="https://gizmologi.id/wp-content/uploads/2019/07/ASUS-ROG-Mothership.jpg">
          <div class="caption center-align">
            <h3>New Mothership</h3>
            <h5 class="light grey-text text-lighten-3">Here's our small slogan.</h5>
          </div>
        </li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min.js'

export default {
  name: 'LandingPage',
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
    const slider = document.querySelectorAll('#slider')
    M.Slider.init(slider, {
      indicators: false,
      height: 600,
      interval: 3000
    })
  }
}
</script>

<style scoped>
  img {
    object-fit: cover;
    /* max-width: 100%;
    height: auto; */
  }
</style>
