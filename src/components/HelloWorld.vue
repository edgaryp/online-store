<template>
  <div class="hello">
    <h3 v-if="currentProduct">{{currentProduct.name || currentProduct.message}}</h3>
  </div>
</template>

<script>
// import {mapGetters} from 'vuex'
// import * as getterTypes from '../store/getter-types'

export default {
  name: 'HelloWorld',
  props: {
    currentProduct: {
      type: Object,
      default: () => {
        return {message: 'waiting for data to load...'};
      }
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
