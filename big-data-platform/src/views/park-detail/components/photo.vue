<template>
  <div class="siwper-wrap">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,index) in imgList" :key="index">
        <div class="img-area" :style="{backgroundImage:'url('+item+')'}"></div>
      </swiper-slide>
      <!-- <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide> -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper//swiper.min.css";
import { getCarImage } from '@/api/detail'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 4000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      imgList:[]
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    this.getData();
    //console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  },
  methods: {
    /**
    * 获取收入统计数据
    */
    getData(){
      let params = {
        // parkId:'904'
      };
      getCarImage(params).then(res=>{
        this.imgList = res.data.map(i=>{
          return i.source;
        });
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.siwper-wrap {
  text-align: center;
  height: 100%;
  margin-top: 3%;
  .swiper-container{
    width: 85%;
    height: 85%;
    background-color: rgba(240,240,240,0.1);
    .swiper-slide{
      width: 100%;
      color: #000;
      font-size: 16px;
      text-align: center;
    }
    .img-area {
      width:100%;
      height:100%;
      background-size: cover;
    }

    .swiper-button-prev {
      width:34px;
      height:31px;
      position: absolute;
      left: 17px;
      top: 50%;
      background-image: url("../../../assets/images/detail/next-left.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      z-index: 1;
    }

    .swiper-button-next {
      width:34px;
      height:31px;
      position: absolute;
      right: 17px;
      top: 50%;
      background-image: url("../../../assets/images/detail/next-right.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      z-index: 1;
    }

  }  
}
</style>

