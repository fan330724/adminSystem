import Vue from 'vue'
const state = Vue.observable({
    addSign:false,
    editStatus:'add',
    item:{
        type:'1',
        existTop:'N',
        status:'N',
        freeTime:0,
        existFreePrice:'Y'
    }
})
export default state;