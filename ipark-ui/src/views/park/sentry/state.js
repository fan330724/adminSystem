import Vue from 'vue'
const state = Vue.observable({
    addSign:false,
    carMangSign:false,
    editStatus:'add',
    item:{
        status:'Y',
        exitOnline:'Y'
    }
})
export default state;