<template>
  <v-flex md4 sm6 xs12 d-flex exact>
    <v-card flat :to="`/product/${getProductUrl(product.name)}`">
      <v-container fill-height>
        <v-layout column fill-height>
            <h3>{{product.name}}</h3>
            <p class="mb-0">{{product.price}}</p>
            <p class="mb-0">Description: {{product.shortDescription}}</p>
            <p class="mb-0">Category: {{product.category}}</p>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import {mapState} from 'vuex'
import ProductNameFormat from '../helpers/product-urls.js'

export default {
  name: 'ProductsGrid',
  props: {
    product: Object
  },
  computed: {
    ...mapState([
      'products',
      'loadingErros'
    ]),
  },
  methods: {
    getProductUrl: ProductNameFormat.getProductUrl
  }
}
</script>

