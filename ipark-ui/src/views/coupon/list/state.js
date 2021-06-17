import Vue from 'vue';
export const state = Vue.observable({
  addShow:false,
  addSign:'add',
  item :{}
})

export let mutations = {
  changeAddShow(){
    state.addShow = !state.addShow;
  },
  changeAddSign(sign){
    state.addSign = sign;
  },
  changeItem(item){
    state.item = item;
  }
}