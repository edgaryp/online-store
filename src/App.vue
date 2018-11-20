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
    <router-view/>
  </v-app>
</template>

<script>
import {db} from './config/firestore'
import {mapState} from 'vuex'

db.settings({ timestampsInSnapshots: true });

export default {
  name: 'App',
  computed: {
    ...mapState([
      'products',
      'loadingErros'
    ])
  },
  methods: {
    uploadProducts() {
      this.$store.dispatch('UPLOAD_PRODUCT');
    }
  }
}
</script>
<style>

</style>
