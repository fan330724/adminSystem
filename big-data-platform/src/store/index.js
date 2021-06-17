import Vue from 'vue'
import Vuex from 'vuex'
import first from "./modules/first"
import bpart from "./modules/bpart"
import getters from "./getters"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    first,
    bpart
  },
  getters
})
