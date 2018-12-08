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
            <v-alert class="mt-5" :value="showAlert" color="error" icon="warning" outline>Oops! Something went wrong. Please <a class="error--text" @click="$router.go($route.fullpath)">reload the page</a> again.</v-alert>
            <v-layout row wrap class="mt-5">
              <v-flex md6 sm6 xs12 class="quantity">
                <p class="mb-0 pr-2">Quantity</p>
                <v-text-field v-model.number="quantityWatch" :min="0" type="number" outline :single-line="true" :hide-details="true" :height="40" @keypress="updateQuantity"></v-text-field>
              </v-flex>
              <v-flex md6 sm6 xs12 class="add-to-cart">
                <v-btn large :loading="loading" :disabled="loading || !quantity || !selectedAttribute" color="secondary" @click="addToCart">
                Add to cart
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
// /* eslint-disable */
import {mapState, mapMutations, mapActions} from 'vuex'
import * as mutationTypes from '../store/mutation-types'
import * as actionTypes from '../store/action-types'
import Carousel from '@/components/ProductPage/Carousel.vue'


export default {
  data() {
    return {
      description: null,
      loading: false,
      quantity: 1,
      showAlert: false
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
      'activatedSlide',
      'sessionStatus'
    ]),
    currentProduct() {
      return this.products.find(product => {
        return product.name === this.currentProductName;
      });
    },
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
    },
    quantityWatch: {
      get() {
        return this.quantity;
      },
      set(quantity) {
        return quantity === 0 ? this.quantity = 1 : this.quantity = quantity;
      }
    }
  },
  watch: {
    activatedSlide() {
      this.description = this.selectedAttribute.description;
    }
  },
  methods: {
    ...mapMutations({
      setSelectedAttribute: mutationTypes.SET_SELECTED_ATTRIBUTE
    }),
    ...mapActions({
      postProductToCart: actionTypes.POST_PRODUCT_TO_CART
    }),
    goBasket() {
      this.$router.push({
        name: 'basketPage',
        params: {
          shit: 'cunt'
        }
      });
    },
    async addToCart() {
      const data = {
        collection: 'baskets',
        currentProduct: this.currentProduct,
        quantity: this.quantity,
        selectedAttributes: this.selectedAttributes.title,
        uid: this.sessionStatus.uid
      }
      try {
        await this.postProductToCart(data);
        this.$router.push('/basket');
      } catch(error) {
        this.showAlert = true;
        throw new Error('Something went wrong!!');
      }
    },
    updateQuantity(data) {
      if(!data.code.includes('Digit')) {
        event.preventDefault();
      }
    }
  }
}
</script>

<style lang="less">
.product-page {
  &-right {
    .container {
      @media (min-width: 960px) {
        padding-top: 0 !important;
      }
    }
    .quantity {
      display: flex;
      align-items: center;
      .v-input {
        max-width: 80px;
      }
      .v-input__slot {
        min-height: 0;
      }
      input {
        margin: 0;
        padding: 0;
      }
      .v-text-field__slot {
        align-items: center;
      }
      @media (max-width: 600px) {
        justify-content: flex-end;
        margin-bottom: 20px;
      }
    }
    .add-to-cart {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .v-btn {
        margin: 0;
      }
    }
  }
}
.how-it-helps {
  border: 1px solid #c9c9c9;
}
</style>
