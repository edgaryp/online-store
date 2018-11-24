<template>
  <v-flex lg3 md4 sm6 xs12 d-flex exact mb-3 class="product-grid">
    <div v-if="product.badge" class="badge pt-1 pb-1 pl-2 pr-2 text-uppercase font-weight-bold" :style="`background-color: ${product.badgeColour};`">{{product.badge}}</div>
    <!-- Image modal start -->
    <v-dialog v-model="dialog" class="image-modal" color="red" width="600">
      <v-btn depressed fab flat icon small slot="activator" class="button">
        <v-icon size="28" color="rgba(255, 255, 255, 0.6)" class="zoom-icon">zoom_in</v-icon>
      </v-btn>
      <v-img v-for="url in imageUrl" :src="url" :key="url" width="100%" />
    </v-dialog>
    <!-- Image modal end -->
    <v-card flat :to="`/product/${getProductUrl(product.name)}`">
      <img :src="imageUrl[0]" width="100%" />
      <v-container class="pt-2">
        <v-layout column>
            <h3 class="primary--text text-capitalize">{{product.name}}</h3>
            <p class="mb-0 title mt-2 mb-3 font-weight-bold">${{product.price}}</p>
            <p class="mb-0">{{product.howItHelps}}</p>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import {mapState} from 'vuex'
import ProductNameFormat from '@/helpers/product-urls.js'
import {mixin} from '@/helpers/mixin.js'

export default {
  name: 'ProductsGrid',
  props: {
    product: Object
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapState([
      'products',
      'loadingErros'
    ])
  },
  mixins: [mixin],
  methods: {
    getProductUrl: ProductNameFormat.getProductUrl
  },
  created() {
    this.renderImageUrl(`${this.product.imageUrl}${this.product.imageIndex}`, 1);
  }
}
</script>

<style lang="less">
.badge {
    position: absolute;
    z-index: 1;
    transform: translate(-4px, -4px);
    color: white;
}

.product-grid {
  position: relative;
  .image-modal {
    position: absolute;
    top: 2px;
    right: 1px;
    z-index: 1;
    cursor: pointer;
    .button {
      color: rgba(255, 255, 255, 0);
      .zoom-icon:hover {
        color: rgba(255, 255, 255, 1) !important;
      }
    }
  }
}
</style>
