<template>
  <v-content class="product-page">
    <v-container v-if="currentProduct">
      <v-layout row wrap>
        <v-flex md6 sm12 xs12 class="product-page-left">
          <Carousel :currentProduct="currentProduct" />
          <v-container class="mt-3 how-it-helps">
            <p class="title">Ut volutpat sapien arcu sed augue:</p>
            <p class="mb-0">{{ currentProduct.howItHelps }}</p>
          </v-container>
        </v-flex>
        <v-flex md6 sm12 xs12 class="product-page-right">
          <v-container>
            <h1 class="display-1">{{ currentProductName }}</h1>
            <h2 class="display-1 primary--text mt-2 mb-4">${{ currentProduct.price }}</h2>
            <p class="body-1">{{ currentProduct.description }}</p>
            <v-select class="pt-0" :items="attributes" item-text="title" item-value="slide" v-model="selectedAttributes" prepend-icon="card_giftcard" menu-props="auto" hide-details label="Suspendisse accumsan" single-line return-object></v-select>
            <div v-html="description" class="mt-4"></div>
            <div>
              <v-btn large class="add-to-cart" :loading="loading" :disabled="loading" color="secondary" @click="loader = 'loading'">
                Add to cart
              </v-btn>
            </div>
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
      description: null,
      loader: null,
      loading: false
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
      'attributes',
      'selectedAttribute',
      'activatedSlide'
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
        return this.selectedAttribute;
      },
      set(selectedAttribute) {
        this.setSelectedAttribute(selectedAttribute);
      }
    }
  },
  watch: {
    getCurrentProduct(promise) {
      promise.then(result => this.currentProduct = result);
    },
    activatedSlide() {
      this.description = this.selectedAttribute.description;
    },
    loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    }
  },
  methods: {
    ...mapMutations({
      setCurrentProductName: mutationTypes.SET_CURRENT_PRODUCT_NAME,
      setSelectedAttribute: mutationTypes.SET_SELECTED_ATTRIBUTE
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

<style lang="less" scoped>
.product-page {
  &-right {
    .container {
      @media (min-width: 960px) {
        padding-top: 0 !important;
      }
    }
    .add-to-cart {

    }
  }
}
.how-it-helps {
  border: 1px solid #c9c9c9;
}
</style>
