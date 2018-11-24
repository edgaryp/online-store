<template>
  <v-flex md6 sm12 xs12>
    <template v-if="imageUrl.length >= 5">
      <div class="carousel">
        <vueper-slides ref="carousel" fade :slide-ratio="0.9" :breakpoints="carouselBreakpoints" :bullets="bullets" >
            <template v-for="(image, index) in imageUrl">
              <vueper-slide :image="image" :key="index" :content="getImageTitle(index)">
              </vueper-slide>
            </template>
        </vueper-slides>
      </div>
      <div class="thumbnails mt-3">
        <div v-for="(image, index) in imageUrl" :key="image+index" @click="goSlide(index)">
          <v-img :src="image" />
        </div>
      </div>
    </template>
  </v-flex>
</template>

<script>

import {mapState} from 'vuex'
import {mixin} from '@/helpers/mixin.js'
import {VueperSlides, VueperSlide} from 'vueperslides'
import 'vueperslides/dist/vueperslides.min.css'

export default {
  name: 'Carousel',
  data() {
    return {
      bullets: false,
      carouselBreakpoints: {
        960: {
          slideRatio: 0.7
        }
      },
      // static images for fast loading
      imageUrl: [
        'https://picsum.photos/525/394?image=730',
        'https://picsum.photos/525/394?image=543',
        'https://picsum.photos/525/394?image=948',
        'https://picsum.photos/525/394?image=769',
        'https://picsum.photos/525/394?image=872',
      ]
    };
  },
  props: [
    'currentProduct',
    'currentSlide'
  ],
  mixins: [mixin],
  computed: {
    ...mapState([
      'attributes'
    ])
  },
  components: {
    VueperSlides,
    VueperSlide
  },
  watch: {
    // don't know why it isn't working anymore so changed to using created()
    // currentProduct(currentProduct) {
    //   console.log(currentProduct); // eslint-disable-line
    //   this.renderImageUrl(currentProduct.imageUrl, 5);
    // },
    currentSlide(currentSlide) {
      // this change coming from parent component via props, dropdown select
      this.goSlide(currentSlide)
    }
  },
  methods: {
    logEvents (eventName, params) {
      console.log({eventName, params}); // eslint-disable-line
      this.events += ` ${eventName},  ${JSON.stringify(params, null, 0)}`
    },
    getImageTitle(index) {
      switch(index) {
        case 1:
          return this.attributes[index].title;
        case 2:
          return this.attributes[index].title;
        case 3:
          return this.attributes[index].title;
        default:
          return this.currentProduct.name;
      }
    },
    goSlide(value) {
      this.$refs.carousel.goToSlide(value);
      this.$emit('updateCurrentSide', value);
    }
  },
  created() {
    // this.renderImageUrl(this.currentProduct.imageUrl, 5);
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
.thumbnails {
  display: grid;
  grid-template-columns: repeat(5, auto [col-start]);
  grid-column-gap: 5px;
  > div {
    border: 2.5px solid #acacac;
    cursor: pointer;
  }
}
</style>