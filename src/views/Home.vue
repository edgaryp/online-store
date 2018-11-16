<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-container>
            <h2>filter goes here</h2>
            <v-layout row>
              <v-flex md4 xs12>
                <v-container>
                  <CategoryFilter />
                </v-container>
              </v-flex>
              <v-flex md4 xs12>
                <v-container>
                  <PriceFilter />
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-md>
              <v-layout row wrap>
                <ProductsGrid v-for="(product, index) in products" :key="index" :product="product" />
              </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
// @ is an alias to /src[]
import {mapState} from 'vuex'
// import * as getterTypes from '../store/getter-types'
// import * as mutationTypes from '../store/mutation-types'
import ProductNameFormat from '../helpers/product-urls.js'
import PriceFilter from '@/components/PriceFilter.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import ProductsGrid from '@/components/ProductsGrid.vue'

export default {
  name: 'home',
  components: {
    PriceFilter,
    CategoryFilter,
    ProductsGrid
  },
  data() {
    return {
      message: 'mother fucking cunt'
    };
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
