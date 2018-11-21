<template>
  <v-flex lg3 md4 sm6 xs12 d-flex exact mb-3 class="product-grid">
    <div v-if="product.badge" class="badge pt-1 pb-1 pl-2 pr-2 text-uppercase font-weight-bold" :style="`background-color: ${product.badgeColour};`">{{product.badge}}</div>
    <!-- Image modal start -->
    <v-dialog v-model="dialog" class="image-modal" color="red" width="600">
      <v-btn depressed fab flat icon small slot="activator" class="button">
        <v-icon size="28" color="rgba(255, 255, 255, 0.6)" class="zoom-icon">zoom_in</v-icon>
      </v-btn>
      <!-- <v-card> -->
        <v-img v-for="url in imgUrl" :src="url" :key="url" width="100%" />
      <!-- </v-card> -->
    </v-dialog>
    <!-- Image modal end -->
    <v-card flat :to="`/product/${getProductUrl(product.name)}`">
      <img :src="imgUrl[0]" width="100%" />
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

export default {
  name: 'ProductsGrid',
  props: {
    product: Object
  },
  data() {
    return {
      imgUrl: [],
      dialog: false
    };
  },
  computed: {
    ...mapState([
      'products',
      'loadingErros'
    ])
  },
  methods: {
    getProductUrl: ProductNameFormat.getProductUrl,
    imageExists() {
      const img = new Image();
      img.src = `https://picsum.photos/525/394?image=${Math.floor(Math.random()*(1080-500+1)+500)}`;
      img.onload = () => {
        this.imgUrl.push(img.src);
      };
      img.onerror = () => {
        this.imageExists();
      };
    }
  },
  created() {
    this.imageExists();
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
