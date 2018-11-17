<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-flex lg2 md3 xs12>
          <v-container class="pr-0 pl-0">
            <v-layout row justify-space-between align-center>
                <h2>Refine</h2>
                <v-tooltip bottom light>
                  <v-btn slot="activator" icon left light @click="clearAllFilters(['searchFilter', 'categoryFilterExpandable', 'priceFilterExpandable'])"><v-icon>clear_all</v-icon></v-btn>
                  <span>Clear all</span>
                </v-tooltip>
            </v-layout>
            <v-divider class="mt-3 mb-2"></v-divider>
            <v-layout column>
                <SearchFilter ref="searchFilter" />
                <CategoryFilterExpandable ref="categoryFilterExpandable" />
                <!-- <CategoryFilterChip ref="categoryFilterChip" /> -->
                <PriceFilterExpandable ref="priceFilterExpandable" />
                <!-- <PriceFilterChip ref="priceFilterChip" /> -->
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
import {mapState} from 'vuex'
import * as mutationTypes from '@/store/mutation-types'
import ProductNameFormat from '@/helpers/product-urls.js'
import PriceFilterExpandable from '@/components/PriceFilterExpandable.vue'
// import PriceFilterChip from '@/components/PriceFilterChip.vue'
import CategoryFilterExpandable from '@/components/CategoryFilterExpandable.vue'
// import CategoryFilterChip from '@/components/CategoryFilterChip.vue'
import ProductsGrid from '@/components/ProductsGrid.vue'
import SearchFilter from '@/components/SearchFilter.vue'

export default {
  name: 'home',
  components: {
    PriceFilterExpandable,
    // PriceFilterChip,
    CategoryFilterExpandable,
    // CategoryFilterChip,
    ProductsGrid,
    SearchFilter
  },
  computed: {
    ...mapState([
      'products',
      'loadingErros'
    ]),
  },
  methods: {
    getProductUrl: ProductNameFormat.getProductUrl,
    clearAllFilters(refs) {
      this.$store.commit(mutationTypes.CLEAR_APPLIED_FILTER);
      refs.forEach(ref => {
        this.$refs[ref].clearAllFilters();
      });
    }
  }
}
</script>
