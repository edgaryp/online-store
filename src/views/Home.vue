<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm2>
          <v-container>
            <h2>filter goes here</h2>
          </v-container>
        </v-flex>
        <v-flex xs12 sm10>
          <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex md3 sm6 xs12 d-flex v-for="(product, index) in products" :key="index" exact>
                  <v-card flat :to="`/product/${getProductUrl(product.name)}`">
                    <!-- <router-link :to="`/product/${getProductUrl(product.name)}`" exact> -->
                    <v-card-text primary>
                      <h3>{{product.name}}</h3>
                      <p>{{product.shortDescription}}</p>
                      <p>{{product.price}}</p>
                    </v-card-text>
                    <!-- </router-link> -->
                  </v-card>
                </v-flex>
              </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>

  </v-content>
</template>

<script>
// @ is an alias to /src[]
// import HelloWorld from '@/components/HelloWorld.vue'
import {mapState} from 'vuex'
import ProductNameFormat from '../helpers/product-urls.js'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      message: 'mother fucking cunt',
    };
  },
  computed: {
    ...mapState([
      'products',
      'loadingErros'
    ])
  },
  methods: {
    getProductUrl: ProductNameFormat.getProductUrl
  }
}
</script>
