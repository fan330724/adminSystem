
export default {
  created() {
    window.addEventListener('resize', this.setOptions, false);
  },
  beforeDestroy() {
    window.removeEventListener('reisze', this.setOptions);
  },
  methods: {
    autoWidth(size){
      let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
      if (!clientWidth) return size;
      let percent = (clientWidth / 1920);
      return size * percent;
    }
  },
};
