<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {db} from '../config/firestore'
import {mapState} from 'vuex'
import * as actionTypes from '../store/action-types'
import {mapActions} from 'vuex'

db.settings({ timestampsInSnapshots: true });

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      message: 'mother fucking cunt',
      // product: null
    };
  },
  computed: {
    ...mapState([
      'products'
    ])
  },
  methods: {
    ...mapActions([
      actionTypes.GET_PRODUCTS
    ])
  },
  created() {
    this.GET_PRODUCTS(this.message);
  }
}
</script>
