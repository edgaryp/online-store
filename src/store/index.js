import Vue from 'vue'
import Vuex from 'vuex'
import {actions} from './actions'
import {mutations} from './mutations'
import {getters} from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    currentProductName: null,
    loadingErros: [],
    appliedFilters: [],
    priceFilterRange: [
      { type: 'price', filter: '$30 and under', min: 0, max: 30 },
      { type: 'price', filter: '$30 - $50', min: 30, max: 50 },
      { type: 'price', filter: '$50 - $100', min: 50, max: 100 },
      { type: 'price', filter: '$100 - $500', min: 100, max: 500 },
      { type: 'price', filter: '$500 - $2000', min: 500, max: 2000 },
      { type: 'price', filter: '$2000+', min: 2000, max: 9999999 }
    ],
    sortOptions: ['A-Z', 'Z-A', 'Price low to hgigh', 'Price high to low'],
    appliedSort: 'Z-A', // change default sort here
    attributes: [
      {
        title: 'Post me a card',
        description: `
          <p>Your World Vision Gift will be delivered to you as a heart-warming greeting card, ready for you to add your own message.</p>
          <p>Your printed gift order will be processed and dispatched as soon as possible. We use Australia Post's “Priority” service, but delivery times vary by address so please allow 10-12 working days.</p>
        `,
        slide: 1
      },
      {
        title: 'Send as an email',
        description: `
          <p>Your gift can be sent immediately anywhere in the world via email. Simply add your personalised message and an email will be sent to your loved one's inbox.</p>
        `,
        slide: 2
      },
      {
        title: 'Print your own card',
        description: `
          <p>Want to give something in person but need it now? Printing your own gift is a quick and easy way to give a World Vision Gift.</p>
          <p>Once you've paid, you'll see a link to download an A4-sized printable PDF. We'll also send the link to you via email. You'll need Adobe Reader to open and print the PDF.</p>
        `,
        slide: 3
      },
      {
        title: 'No sent gift',
        description: `
          <p>We won't send you a gift at all. But we will send your donation to communities in need. Thank you for your generosity!</p>
        `,
        slide: 0
      }
    ],
    selectedAttribute: null,
    activatedSlide: null
  },
  mutations,
  actions,
  getters
})
