<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" exact>Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {db} from './config/firestore'
import {mapState} from 'vuex'

db.settings({ timestampsInSnapshots: true });

export default {
  computed: {
    ...mapState([
      'products',
      'loadingErros'
    ])
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
