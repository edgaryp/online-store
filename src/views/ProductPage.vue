<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-flex md6 sm12>
            <v-carousel ref="carousel" :cycle="autoplay">
              <v-carousel-item v-for="(image, index) in images" :key="index" :src="image"></v-carousel-item>
            </v-carousel>
            <!-- <h1>Product: {{currentProductName}}</h1>
            <p>{{currentProduct}}</p>
            <HelloWorld :currentProduct="currentProduct"/>
            <button @click="test">Checkout</button> -->
        </v-flex>
        <v-flex md6 sm12>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
/* eslint-disable */
import {mapState, mapMutations, mapGetters} from 'vuex'
import * as mutationTypes from '../store/mutation-types'
import * as getterTypes from '../store/getter-types'
// import HelloWorld from '@/components/ProductPage/HelloWorld.vue'

export default {
  data() {
    return {
      // static for now
      images: [
        'https://picsum.photos/525/394?image=700',
        'https://picsum.photos/525/394?image=1045',
        'https://picsum.photos/525/394?image=878',
        'https://picsum.photos/525/394?image=543',
        'https://picsum.photos/525/394?image=1047'
      ],
      autoplay: false
    }
  },
  props: [
    'currentProductName' // from router
  ],
  components: {
    // HelloWorld
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
    goBasket() {
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