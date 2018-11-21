<template>
  <v-content>
    <v-container>
      <v-layout>
        <v-flex md6 sm12>
          <div class="about">
            <h1>Product: {{currentProductName}}</h1>
            <p>{{currentProduct}}</p>
            <HelloWorld :currentProduct="currentProduct"/>
            <button @click="test">Checkout</button>
          </div>
        </v-flex>
        <v-flex md6 sm12>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
import * as mutationTypes from '../store/mutation-types'
import * as getterTypes from '../store/getter-types'
import HelloWorld from '@/components/ProductPage/HelloWorld.vue'

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
    }),
    test() {
      this.$router.push({
        name: 'basketPage',
        params: {
          shit: 'cunt'
        }
      });
    }
  },
  created() {
    this.setCurrentProductName(this.currentProductName);
  }
}
</script>