<template>
  <v-flex>
    <v-select label="Price Range" :items="priceRangelist" v-model="selectedPriceRange" multiple chips :deletable-chips="true" :clearable="true"></v-select>
  </v-flex>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
import * as getterTypes from '../store/getter-types'
import * as mutationTypes from '../store/mutation-types'

export default {
  name: 'PriceFilter',
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
    }
  }
}
</script>
