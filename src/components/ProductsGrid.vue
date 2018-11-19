<template>
  <v-flex lg3 md4 sm6 xs12 d-flex exact mb-3 class="product-grid">
    <div v-if="product.badge" class="badge pt-1 pb-1 pl-2 pr-2 text-uppercase font-weight-bold" :style="`background-color: ${product.badgeColour};`">{{product.badge}}</div>
    <v-card flat :to="`/product/${getProductUrl(product.name)}`">
      <img :src="`https://picsum.photos/525/394?image=${Math.floor(Math.random()*(1080-500+1)+500)}`" :onerror="'this.src=`https://picsum.photos/525/394?image=${Math.floor(Math.random()*(1080-500+1)+500)}`'" width="100%">
      <v-container class="pt-2">
        <v-layout column>
            <h3 class="primary--text text-capitalize">{{product.name}}</h3>
            <p class="mb-0 title mt-2 mb-3 font-weight-bold">${{product.price}}</p>
            <p class="mb-0">{{product.howItHelps}}</p>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import {mapState} from 'vuex'
import ProductNameFormat from '@/helpers/product-urls.js'

export default {
  name: 'ProductsGrid',
  props: {
    product: Object
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

<style lang="less" scoped>
.badge {
    position: absolute;
    z-index: 1;
    transform: translate(-4px, -4px);
    color: white;
}

.product-grid {
  position: relative;
}
</style>
