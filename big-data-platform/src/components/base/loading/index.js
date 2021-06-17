import vueLoading from './index.vue'
let $vm;
export default {
  install(Vue, options){
    if(!$vm){
      const loadingPlugin = Vue.extend(vueLoading);
      $vm = new loadingPlugin({
        el:document.createElement('div')
      })
      document.body.appendChild($vm.$el);
    };
    $vm.show = false;
    let loading = {
      show(txt){
        $vm.show = true;
        $vm.txt = txt;
      },
      hide(){
        $vm.show = false;
      }
    }
    if(!Vue.$loading){
     Vue.$loading=loading;   
    }
    Vue.prototype.$loading = Vue.$loading;
    // Vue.mixin({
    //   created(){
    //     this.loading = Vue.$loading;
    //   }
    // })
  }
}