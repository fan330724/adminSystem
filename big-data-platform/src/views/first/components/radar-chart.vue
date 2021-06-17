<template>
  <div>
    <div class="search-part">
      <input type="text" class="search-input" @keyup.enter="submit" placeholder="请输入车牌号搜索停车轨迹" v-model="license"/>
    </div>
    <cum-modal :visible.sync="modalVisi" :title="modalTitle" width="75vw">
      <div slot="content" class="map-bg">
        <track-map :cdata="mapData" :height="'90vh'" id="trackCity"></track-map>
      </div>
    </cum-modal>
    <Chart :cdata="cdata" height="22vh" />
  </div>
</template>

<script>
import Chart from "@/components/echart/radar/index.vue";
import modal from "@/components/modal/index"
import trackMap from '@/components/echart/map/city.vue';
import { mapGetters } from "vuex";
import { queryAreaParking ,ParkReferQuery} from "@/api/first";
export default {
  data() {
    return {
      cdata: {
        title: "停车分布区域",
        seriesData: []
      },
      mapData: {
        citys:[]
      },
      modalVisi:false,
      modalTitle:'行车轨迹',
      license:'' //车牌号
    };
  },
  components: {
    Chart,
    cumModal:modal,
    trackMap
  },
  computed: {
    ...mapGetters(["cityId", "provinceId"]),
    cityid() {
      return { cityId: this.cityId, provinceId: this.provinceId };
    },
  },
  watch: {
    cityid(newV) {
      if (newV) {
        this.getData();
      }
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      queryAreaParking({
        provinceId: this.cityid.provinceId,
        cityId: this.cityid.cityId,
      }).then((res) => {
        // console.log(res.data);
        this.cdata.seriesData = res.data.map((v) => {
          return { value: v.city, name: v.REGION_NAME };
        });
      });
    },
    //搜索行车轨迹
    submit(){
      let params = {
        number: this.license
      }
      this.$loading.show();
      ParkReferQuery(params).then((res) => {
        let list = res.data;
        this.mapData.citys = res.data.map((v) => {
          return {
            name: v.name,
            value: [v.lon, v.lat],
            symbolSize: 30,
             symbol: 'pin',
            itemStyle: { normal: { color: "#FF7DA1" } },
          }
        });
        let moveLines = [];
        for(let i=0;i<(list.length-1);i++){
          let item= {
            coords: [
              [list[i].lon, list[i].lat],
              [list[i+1].lon, list[i+1].lat],
            ]
          }
          moveLines.push(item);
        }
        this.mapData.moveLines = moveLines;
        this.$loading.hide();
         this.modalVisi = true;
      });
     
    }
  },
};
</script>

<style lang="scss" scoped>
  .search-part {
    .search-input {
      padding:5px 10px;
      background-color: transparent;
      color:#fff;
      font-size: 14px;
      outline: none;
      border:1px solid #038BC0;
      &::-webkit-input-placeholder{
        color:#fff;
      }
    }
  }
  .map-bg {
    background-color: rgba(0,0,0,.7);
  }
</style>