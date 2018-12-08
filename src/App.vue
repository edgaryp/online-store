<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Edgar</span>
        <span class="font-weight-light">Pan</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="info" @click="uploadProducts" disabled>Upload products</v-btn>
    </v-toolbar>
    <router-view :key="$route.fullPath" />
  </v-app>
</template>

<script>
import {db} from './config/firestore'
import {mapState, mapMutations} from 'vuex'
import * as mutationTypes from '@/store/mutation-types'

db.settings({ timestampsInSnapshots: true });

export default {
  name: 'App',
  computed: {
    ...mapState([
      'products',
      'loadingErros',
      'sessionStatus'
    ])
  },
  methods: {
    ...mapMutations({
      setSessionDetails: mutationTypes.SET_SESSION_DETAILS
    }),
    uploadProducts() {
    }
  }
}
</script>
<style>

</style>
