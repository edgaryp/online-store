<template>
  <v-content>
    <v-container class="pb-0">
      <v-layout row wrap>
        <v-flex lg2 md3 xs12>
          <v-container>
            <v-layout row justify-space-between align-center>
                <h2>Refine</h2>
                <v-tooltip bottom light>
                  <v-btn slot="activator" icon left light @click="clearAllFilters"><v-icon>clear_all</v-icon></v-btn>
                  <span>Clear all</span>
                </v-tooltip>
            </v-layout>
            <v-divider class="mt-3 mb-2"></v-divider>
            <v-layout column>
                <SearchFilter ref="searchFilter" />
                <CategoryFilter ref="categoryFilter" />
                <PriceFilter ref="priceFilter" />
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex lg10 md9 xs12>
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
import * as mutationTypes from '../store/mutation-types'
import ProductNameFormat from '../helpers/product-urls.js'
import PriceFilter from '@/components/PriceFilter.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import ProductsGrid from '@/components/ProductsGrid.vue'
import SearchFilter from '@/components/SearchFilter.vue'

export default {
  name: 'home',
  components: {
    PriceFilter,
    CategoryFilter,
    ProductsGrid,
    SearchFilter
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
    getProductUrl: ProductNameFormat.getProductUrl,
    clearAllFilters() {
      this.$store.commit(mutationTypes.CLEAR_APPLIED_FILTER);
      this.$refs.categoryFilter.clearAllFilters();
      this.$refs.priceFilter.clearAllFilters();
      this.$refs.searchFilter.clearAllFilters();
    }
  }
}
</script>
