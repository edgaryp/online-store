export const mixin = {
  data() {
    return {
      imageUrl: [],
      i: 0,
      url: null
    };
  },
  methods: {
    async renderImageUrl(url, count) {
      const img = new Image();
      const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
      if (count === 1) {
        this.url = url;
        img.src = this.url;
        img.onload = () => {
          this.imageUrl.push(img.src);
        };
        img.onerror = () => {
          this.renderImageUrl();
        };
      } else {
        while (this.i <= count - 1) {
          this.url = `https://picsum.photos/525/394?image=${Math.floor(Math.random()*(1080-500+1)+500+this.i)}`;
          img.src = this.url;
          img.onload = () => {
            console.log('👍🏻', this.i, this.url); // eslint-disable-line 
            this.imageUrl.push(img.src);
          };
          img.onerror = () => {
            console.log('💩', this.i, this.url); // eslint-disable-line
            this.renderImageUrl(this.url, count);
          };
          await timeoutPromise(2000);
          this.i++;
        }
      }
    }
  }
};
