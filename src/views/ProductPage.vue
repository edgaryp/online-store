<template>
  <div class="about">
    <h1>Product: {{currentProductName}}</h1>
    {{currentProduct}}
    <HelloWorld :currentProduct="currentProduct"/>
  </div>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
import * as mutationTypes from '../store/mutation-types'
import * as getterTypes from '../store/getter-types'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  props: [
    'currentProductName' // from router
  ],
  components: {
    HelloWorld
  },
  computed: {
    ...mapState([
      'products'
    ]),
    ...mapGetters({
      currentProduct: getterTypes.GET_CURRENT_PRODUCT
    })
  },
  methods: {
    ...mapMutations({
      setCurrentProductName: mutationTypes.SET_CURRENT_PRODUCT_NAME
    })
  },
  created() {
    this.setCurrentProductName(this.currentProductName);
  }
}
</script>