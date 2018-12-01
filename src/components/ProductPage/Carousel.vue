<template>
  <div v-if="imageUrl.length >= 5">
    <div class="carousel">
      <vueper-slides ref="carousel" fade :slide-ratio="0.9" :breakpoints="carouselBreakpoints" :bullets="false" :touchable="false" :arrows="false">
          <template v-for="(image, index) in imageUrl">
            <vueper-slide :image="image" :key="index">
              <div slot="slideContent">
                <div v-if="selectedAttribute">
                  <div class="pt-2 pb-2">
                    <p class="subheading mb-0 font-weight-bold">{{ selectedAttribute ? selectedAttribute.title : '' }}</p>
                  </div>
                </div>
              </div>
            </vueper-slide>
          </template>
      </vueper-slides>
    </div>
    <div class="thumbnails mt-3">
      <div v-for="(image, index) in imageUrl" :key="image+index" @click="goSlide(index)">
        <v-img :src="image" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import * as mutationTypes from '@/store/mutation-types'
import {VueperSlides, VueperSlide} from 'vueperslides'
import 'vueperslides/dist/vueperslides.min.css'

export default {
  name: 'Carousel',
  data() {
    return {
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
    'currentProduct'
  ],
  computed: {
    ...mapState([
      'attributes',
      'selectedAttribute',
      'activatedSlide'
    ])
  },
  components: {
    VueperSlides,
    VueperSlide
  },
  watch: {
    selectedAttribute(selectedAttribute) {
      this.setActivatedSlide(selectedAttribute.slide);
    },
    activatedSlide(index) {
      this.$refs.carousel.goToSlide(index);
    }
  },
  methods: {
    ...mapMutations({
      setSelectedAttribute: mutationTypes.SET_SELECTED_ATTRIBUTE,
      setActivatedSlide: mutationTypes.SET_ACTIVATED_SLIDE
    }),
    goSlide(index) {
      if(index >= 1 && index <= 3) {
        this.setSelectedAttribute(this.attributes[index - 1]);
      } else if (index === 0) {
        this.setSelectedAttribute(this.attributes[3]);
      } else {
        this.$refs.carousel.goToSlide(index);
      }
    }
  }
}
</script>

<style lang="less">
.carousel {
  position: relative;
}
.thumbnails {
  display: grid;
  grid-template-columns: repeat(5, auto [col-start]);
  grid-column-gap: 5px;
  z-index: 10;
  > div {
    border: 2.5px solid #acacac;
    cursor: pointer;
  }
}

.vueperslide__content-wrapper {
  height: 100%;
  width: 100%;
}

.vueperslide__content {
  width: 100%;
  bottom: -1px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>