<template>
  <div class="col s12 m4">
    <div class="card hoverable">
      <div class="card-image">
        <img :src="product.image_url">
      </div>
      <div class="card-content center">
        <p>{{product.name}}</p>
        <p>Price: {{product.price}}</p>
        <p>Stock: {{product.stock}}</p>
        <button>See Detail</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product']
}
</script>

<style scoped>
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
</style>
