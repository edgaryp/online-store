<template>
  <v-content>
    <v-container v-if="currentProduct">
      <v-layout row wrap>
        <Carousel :currentProduct="currentProduct" :currentSlide="currentSlide" v-on:updateCurrentSide="updateCurrentSide"/>
        <v-flex md6 sm12 xs12>
          <v-container>
            <h1 class="display-1">{{ currentProductName }}</h1>
            <h2 class="display-1 primary--text mt-2 mb-4">${{ currentProduct.price }}</h2>
            <p class="body-1">{{ currentProduct.description }}</p>
            <v-select class="pt-0" :items="attributes" item-text="title" item-value="slide" v-model="selectedAttributes" prepend-icon="card_giftcard" menu-props="auto" hide-details label="Suspendisse accumsan" single-line return-object>
            </v-select>
            <div v-html="description"></div>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
import * as mutationTypes from '../store/mutation-types'
import * as getterTypes from '../store/getter-types'
import Carousel from '@/components/ProductPage/Carousel.vue'


export default {
  data() {
    return {
      currentProduct: null,
      currentSlide: null,
      description: null
    };
  },
  props: [
    'currentProductName' // from router
  ],
  components: {
    Carousel
  },
  computed: {
    ...mapState([
      'products',
      'attributes'
    ]),
    ...mapGetters({
      getCurrentProduct: getterTypes.GET_CURRENT_PRODUCT_P
    }),
    getAttributesList() {
      return this.attributes.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.title);
      }, []);
    },
    selectedAttributes: {
      get() {
        return null;
      },
      set(selectedAttribute) {
        this.currentSlide = selectedAttribute.slide;
        this.description = selectedAttribute.description;
      }
    }
  },
  watch: {
    getCurrentProduct(promise) {
      promise.then(result => this.currentProduct = result);
    }
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
    updateCurrentSide(value) {
      // update current slide from child component when thumbnails clicked
      this.currentSlide = value;
    }
  },
  created() {
    this.setCurrentProductName(this.currentProductName);
  }
}
</script>
