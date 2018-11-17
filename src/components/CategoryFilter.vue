<template>
  <v-flex>
    <v-select label="Categories" :items="categories" v-model="selectedCategories" multiple chips :deletable-chips="true" :clearable="true"></v-select>
  </v-flex>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
import * as getterTypes from '../store/getter-types'
import * as mutationTypes from '../store/mutation-types'

export default {
  name: 'CategoryFilter',
  data() {
    return {
      selectedCategories: []
    };
  },
  computed: {
    ...mapState([
      'appliedFilters'
    ]),
    ...mapGetters({
      categories: getterTypes.GET_CATEGORY
    })
  },
  watch: {
    selectedCategories() {
      this.setAppliedFilters({type: 'category', filters: [...this.selectedCategories]});
    }
  },
  methods: {
    ...mapMutations({
      setAppliedFilters: mutationTypes.SET_APPLIED_FILTERS
    }),
    clearAllFilters() {
      this.selectedCategories = [];
    }
  }
}
</script>
