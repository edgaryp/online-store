<template>
  <v-flex class="pt-3">
      <v-text-field placeholder="Search gifts" append-icon="search" v-model="textSearch"></v-text-field>
  </v-flex>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import * as mutationTypes from '@/store/mutation-types'

export default {
  name: 'SearchFilter',
  data() {
    return {
      text: null
    };
  },
  computed: {
    ...mapState([
      'appliedFilters'
    ]),
    textSearch: {
      set(value) {
        this.text = value;
        this.setAppliedFilters({type: 'search', filter: value});
      },
      get() {
        return this.text;
      }
    }
  },
  methods: {
    ...mapMutations({
      setAppliedFilters: mutationTypes.SET_APPLIED_FILTERS
    }),
    clearAllFilters() {
      this.text = null;
    }
  }
}
</script>
