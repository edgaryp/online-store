<template>
  <div class="home">
    <ul>
      <li v-for="(product, index) in products" :key="index">
        <router-link :to="`/product/${getProductUrl(product.name)}`" exact>{{product.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src[]
// import HelloWorld from '@/components/HelloWorld.vue'
import {mapState} from 'vuex'
import ProductNameFormat from '../helpers/product-urls.js'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      message: 'mother fucking cunt',
    };
  },
  computed: {
    ...mapState([
      'products',
      'loadingErros'
    ])
  },
  methods: {
    getProductUrl: ProductNameFormat.getProductUrl
  }
}
</script>
