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
/* eslint-disable */
import {db} from './config/firestore'
import {mapState, mapMutations} from 'vuex'
import * as firebase from 'firebase'
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
      this.$store.dispatch('UPLOAD_PRODUCT');
    }
  },
  created() {
    // this.$store.dispatch('UPDATE_IMAGE_URL');
    firebase.auth().signInAnonymously().catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const {isAnonymous, uid} = user;
        this.setSessionDetails({user, isAnonymous, uid});
        // ...
      } else {
        // User is signed out.
        console.log('User is signed out.');
        // ...
      }
      // ...
    });
  }
}
</script>
<style>

</style>
