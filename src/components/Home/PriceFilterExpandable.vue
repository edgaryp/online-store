<template>
  <v-list class="price-filter-expandable">
    <v-list-group>
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>Price range</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-for="priceRange in priceRangelist" :key="priceRange" @click="priceSelected(priceRange)">
        <v-list-tile-action @click="priceSelected(priceRange)">
          <v-checkbox v-model="selectedPriceRange" :value="priceRange" color="primary"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{priceRange}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>
  </v-list>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
import * as getterTypes from '@/store/getter-types'
import * as mutationTypes from '@/store/mutation-types'

export default {
  name: 'PriceFilterExpandable',
  data() {
    return {
      selectedPriceRange: []
    };
  },
  computed: {
    ...mapState([
      'priceFilterRange',
      'appliedFilters'
    ]),
    ...mapGetters({
      priceRangelist: getterTypes.GET_PRICE_RANGE_LIST
    })
  },
  watch: {
    selectedPriceRange() {
      this.setAppliedFilters({type: 'price', filters: [...this.selectedPriceRange]});
    }
  },
  methods: {
    ...mapMutations({
      setAppliedFilters: mutationTypes.SET_APPLIED_FILTERS
    }),
    clearAllFilters() {
      this.selectedPriceRange = [];
    },
    priceSelected(priceRange) {
      if(typeof priceRange === 'string') {
        // this method gets called twice
        // frist time returns component, second time returns passed argument
        if(this.selectedPriceRange.includes(priceRange)) {
          this.selectedPriceRange = this.selectedPriceRange.filter(item => item != priceRange);
        } else {
          this.selectedPriceRange.push(priceRange);
        }
      }
    }
  }
}
</script>

<style lang="less">
.price-filter-expandable {
  .v-input__slot {
    margin-bottom: 0 !important;
  }
  .v-list__tile__action {
    min-width: 40px;
  }
}
</style>
