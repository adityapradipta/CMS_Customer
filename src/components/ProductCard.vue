<template>
  <div class="col s12 m4">
    <div class="card medium hoverable">
      <div class="card-image">
        <img :src="product.image_url" class="materialboxed">
      </div>
      <div class="card-content center">
        <span class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i></span>
        <p id="productTitle" class="left-align">{{product.name}}</p>
        <p class="left-align">Price: {{price}}</p>
        <p class="left-align">Stock: {{product.stock}}</p>
        <div class="center">
          <button class="btn btn-small" @click.prevent="addProductToCart(product.id)">Add to Cart</button>
          <router-link :to="`/product/${product.id}`"><button class="btn btn-small">See Detail</button></router-link>
        </div>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">{{product.name}}<i class="material-icons right">close</i></span>
        <h6 class="left-align">Category:</h6>
        <p class="left-align">{{product.category}}</p>
        <h6 class="left-align">Description:</h6>
        <p class="left-align">{{product.description}}</p>
        <h6 class="left-align">Price:</h6>
        <p class="left-align">{{price}}</p>
        <h6 class="left-align">Stock:</h6>
        <p class="left-align">{{product.stock}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css/dist/js/materialize.min.js'
import server from '../api/index'

export default {
  name: 'ProductCard',
  props: ['product'],
  data () {
    return {
      price: new Intl.NumberFormat('in-IN', { style: 'currency', currency: 'IDR' }).format(this.product.price)
    }
  },
  methods: {
    addProductToCart (ProductId) {
      const token = localStorage.token
      const CustomerId = localStorage.currentUserId
      if (!localStorage.CartId) {
        server({
          method: 'post',
          url: '/customer/cart',
          headers: {
            token
          },
          data: {
            CustomerId
          }
        })
          .then(response => {
            localStorage.setItem('CartId', response.data.data.id)
            const CartId = localStorage.CartId
            return server({
              method: 'post',
              url: `/customer/${CartId}`,
              headers: {
                token
              },
              data: {
                quantity: 1,
                status: 'Created',
                ProductId
              }
            })
          })
          .then(response => {
            this.$store.dispatch('fetchCustomerCart')
            this.$store.commit('changeCurrentErr', '')
            this.$store.commit('changeCurrentNotif', response.data.notif)
          })
          .catch(err => {
            this.$store.commit('changeCurrentNotif', '')
            this.$store.commit('changeCurrentErr', err.response.data.err)
          })
      } else {
        const CartId = localStorage.CartId
        server({
          method: 'post',
          url: `/customer/${CartId}`,
          headers: {
            token
          },
          data: {
            quantity: 1,
            status: 'Created',
            ProductId
          }
        })
          .then(response => {
            this.$store.dispatch('fetchCustomerCart')
            this.$store.commit('changeCurrentErr', '')
            this.$store.commit('changeCurrentNotif', response.data.notif)
          })
          .catch(err => {
            this.$store.commit('changeCurrentNotif', '')
            this.$store.commit('changeCurrentErr', err.response.data.err)
          })
      }
    }
  },
  mounted () {
    const materialbox = document.querySelectorAll('.materialboxed')
    M.Materialbox.init(materialbox)
  }
}
</script>

<style scoped>
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
  #productTitle {
    font-weight: bolder;
    color: blue;
  }
  h6 {
    font-weight: bold;
  }
</style>
