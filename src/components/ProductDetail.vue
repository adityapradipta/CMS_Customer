<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="col s12 m8">
        <h4 class="center">{{product.name}}</h4>
        <div class="row">
          <img :src="product.image_url" class="center materialboxed">
        </div>
        <div>
          <h5 class="left-align">Description</h5>
          <p class="left-align">{{ product.description }}</p>
          <h5 class="left-align">Category</h5>
          <p class="left-align">{{ product.category}}</p>
          <h5 class="left-align">Price</h5>
          <p class="left-align">{{ price }}</p>
          <h5 class="left-align">Stock</h5>
          <p class="left-align" v-if="product.stock == 0">Empty</p>
          <p class="left-align" v-else>{{ product.stock }}</p>
        </div>
        <router-link :to="'/dashboard'"><button class="btn"><i class="material-icons left">arrow_back</i>Back</button></router-link>
      </div>
    </div>
  </div>

</template>

<script>
import server from '../api/index'
import Navbar from '../components/Navbar'
import M from 'materialize-css/dist/js/materialize.min.js'

export default {
  name: 'ProductDetail',
  data () {
    return {
      product: ''
    }
  },
  computed: {
    price () {
      return new Intl.NumberFormat('in-IN', { style: 'currency', currency: 'IDR' }).format(this.product.price)
    }
  },
  components: {
    Navbar
  },
  methods: {
    getProductById () {
      server({
        method: 'get',
        url: `/product/${this.$route.params.id}`
      })
        .then(response => {
          this.product = response.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getProductById()
  },
  mounted () {
    const materialbox = document.querySelectorAll('.materialboxed')
    M.Materialbox.init(materialbox)
  }
}
</script>

<style scoped>
  #productDetail {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  img {
    height: 300px
  }
  p {
    font-weight:100;
  }
  h4, h5 {
    font-weight: bolder;
  }
</style>>
