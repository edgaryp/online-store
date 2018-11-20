<template>
  <div>
    <!-- mobile -->
    <v-select class="pt-0 hidden-sm-and-down" :items="sortOptions" v-model="selectedSort" prepend-icon="sort" menu-props="auto" hide-details label="Sort by" single-line return-object :filter="true"></v-select>
    <!-- desktop -->
    <v-list class="sort-expandable hidden-md-and-up">
      <v-list-group>
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>Sort by</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="sortOption in sortOptions" :key="sortOption" @click="sortSelected(sortOption)">
          <v-list-tile-action @click="sortSelected(sortOption)">
            <v-radio-group v-model="selectedSort">
              <v-radio :value="sortOption"></v-radio>
            </v-radio-group>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{sortOption}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as mutationTypes from '@/store/mutation-types'

export default {
  name: 'Sort',
  computed: {
    ...mapState([
      'sortOptions',
      'appliedSort'
    ]),
    selectedSort: {
      get() {
        return this.$store.state.appliedSort;
      },
      set(sortOption) {
        this.$store.commit(mutationTypes.SET_APPLIED_SORT, sortOption);
      }
    }
  },
  methods: {
    sortSelected(sortOption) {
      this.$store.commit(mutationTypes.SET_APPLIED_SORT, sortOption);
    }
  }
}
</script>

<style lang="less">
.sort-expandable {
  .v-input__slot {
    margin-bottom: 0 !important;
  }
  .v-list__tile__action {
    min-width: 40px;
  }
}
</style>