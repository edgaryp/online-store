<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-flex lg2 md3 xs12 class="side-bar">
          <v-container>
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
                <Sort class="hidden-md-and-up" />
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex lg10 md9 xs12>
          <v-container grid-list-md>
              <v-layout justify-end mb-3 class="hidden-sm-and-down">
                <v-flex xl2 lg3 md5>
                  <Sort />
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <ProductsGrid v-for="(product, index) in filteredProducts" :key="index" :product="product" />
              </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import * as mutationTypes from '@/store/mutation-types'
import * as getterTypes from '@/store/getter-types'
import ProductNameFormat from '@/helpers/product-urls.js'
import PriceFilterExpandable from '@/components/Home/PriceFilterExpandable.vue'
// import PriceFilterChip from '@/components/Home/PriceFilterChip.vue'
import CategoryFilterExpandable from '@/components/Home/CategoryFilterExpandable.vue'
// import CategoryFilterChip from '@/components/Home/CategoryFilterChip.vue'
import ProductsGrid from '@/components/Home/ProductsGrid.vue'
import SearchFilter from '@/components/Home/SearchFilter.vue'
import Sort from '@/components/Home/Sort.vue'

export default {
  name: 'home',
  components: {
    PriceFilterExpandable,
    // PriceFilterChip,
    CategoryFilterExpandable,
    // CategoryFilterChip,
    ProductsGrid,
    SearchFilter,
    Sort
  },
  computed: {
    ...mapState([
      'products',
      'loadingErros'
    ]),
    ...mapGetters({
      filteredProducts: getterTypes.GET_FILTERED_PRODUCTS
    })
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

<style lang="less" scoped>
.side-bar .container {
  @media (min-width: 960px) {
    padding-right: 0px;
    padding-left: 0px;
  }
}
</style>
