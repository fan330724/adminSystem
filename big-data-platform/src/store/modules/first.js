export default {
  state: {
    provinceId: "140000",
    cityId: "",
  },
  mutations: {
    SET_CITYID(state, active) {
      state.cityId = active;
    },
    SET_PROVINCEID(state, active) {
      state.provinceId = active;
    }
  },
}