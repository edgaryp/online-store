<template>
  <v-list class="category-filter-expandable">
    <v-list-group>
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>Category</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-for="category in categories" :key="category" @click="categorySelected(category)">
        <v-list-tile-action @click="categorySelected(category)">
          <v-checkbox v-model="selectedCategories" :value="category" color="primary"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{category}}</v-list-tile-title>
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
  name: 'CategoryFilterExpandable',
  data() {
    return {
      selectedCategories: []
    };
  },
  computed: {
    ...mapGetters({
      categories: getterTypes.GET_CATEGORY
    }),
    ...mapState([
      'appliedFilters'
    ])
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
    },
    categorySelected(category) {
      if(typeof category === 'string') {
        // this method gets called twice
        // frist time returns component, second time returns passed argument
        if(this.selectedCategories.includes(category)) {
          this.selectedCategories = this.selectedCategories.filter(item => item != category);
        } else {
          this.selectedCategories.push(category);
        }
      }
    }
  }
}
</script>

<style lang="less">
.category-filter-expandable {
  .v-input__slot {
    margin-bottom: 0 !important;
  }
  .v-list__tile__action {
    min-width: 40px;
  }
}
</style>
