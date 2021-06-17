export default {
  data() {
    return {
      pageParam: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageParam.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageParam.current = val;
      this.getList();
    }
  },
}