// 混入代码
export default {
  data() {
    return {
      seriesDataLen: 0,
    };
  },
  methods: {
    // 开启定时器
    startInterval(map) {
      const _self = this;
      // 应通过接口获取配置时间，暂时写死5s
      const time = 2000;
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        _self.reSelectMapRandomArea(map);
      }, time);
    },
    // 重新随机选中地图区域
    reSelectMapRandomArea(map) {
      const length = this.seriesDataLen;
      this.$nextTick(() => {
        // const map = this.chart;
        let index = Math.floor(Math.random() * length);
        while (index === this.preSelectMapIndex || index >= length) {
          index = Math.floor(Math.random() * length);
        }
        map.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: this.preSelectMapIndex,
        })

        map.dispatchAction({
          type: 'mapUnSelect',
          seriesIndex: 0,
          dataIndex: this.preSelectMapIndex,
        });
        map.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index,
        });
        map.dispatchAction({
          type: 'mapSelect',
          seriesIndex: 0,
          dataIndex: index,
        });
        map.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index,
        });
        this.preSelectMapIndex = index;
      });
    },
    handleMapRandomSelect(map) {
      this.$nextTick(() => {
        // const map = this.chart;
        const _self = this;
        setTimeout(() => {
          _self.reSelectMapRandomArea(map);
        }, 0);
        // 移入区域，清除定时器、取消之前选中并选中当前
        map.on('mouseover', function (params) {
          clearInterval(_self.intervalId);
          map.dispatchAction({
            type: 'mapUnSelect',
            seriesIndex: 0,
            dataIndex: _self.preSelectMapIndex,
          });
          map.dispatchAction({
            type: 'mapSelect',
            seriesIndex: 0,
            dataIndex: params.dataIndex,
          });
          _self.preSelectMapIndex = params.dataIndex;
        });
        // 移出区域重新随机选中地图区域，并开启定时器
        map.on('globalout', function () {
          _self.reSelectMapRandomArea(map);
          _self.startInterval(map);
        });
        this.startInterval(map);
      });
    },
  },
};
