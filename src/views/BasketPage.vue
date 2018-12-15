<template>
  <v-content class="basket-page">
    <v-container>
      <v-layout row>
        <h1>Basket</h1>
      </v-layout>
      <v-layout row>
        <BasketItem />
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import BasketItem from '@/components/BasketPage/BasketItem.vue'
import {mapState} from 'vuex'

export default {
  name: 'Basket',
  components: {
    BasketItem
  },
  data() {
    return {
      cunt: 'cunt'
    };
  },
  computed: {
    ...mapState([
      // ''
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
