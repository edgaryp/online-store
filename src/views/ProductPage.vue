<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-flex md6 sm12 xs12>
          <div class="carousel">
            <vueper-slides fixed-height="394px" :bullets="bullets" @slide="logEvents">
                <vueper-slide v-for="(image, index) in images" :key="index" :image="image">
                </vueper-slide>
            </vueper-slides>
            <div class="carousel-caption pt-2 pb-2">
              <p class="mb-0">cunt</p>
            </div>
          </div>
        </v-flex>
        <v-flex md6 sm12 xs12>
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
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.min.css'


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
      bullets: false
    }
  },
  props: [
    'currentProductName' // from router
  ],
  components: {
    VueperSlides,
    VueperSlide
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
    },
    logEvents (eventName, params) {
      console.log({eventName, params});
      this.events += ` ${eventName},  ${JSON.stringify(params, null, 0)}`
    }
  },
  created() {
    this.setCurrentProductName(this.currentProductName);
  }
}
</script>

<style lang="less" scoped>
.carousel {
  position: relative;
  &-caption {
    position: absolute;
    bottom: 0px;
    width: 100%;
    text-align: center;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    p {
      color: white;
    }
  }
}
</style>
