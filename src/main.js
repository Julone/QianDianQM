import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// * custom-config
import '@/assets/global.less'; // global css
import './utils/directive'; // global vue-directives
//draggable
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
//swiper
import swiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
//draggable-for list sortable
import draggable from "vuedraggable";
//splitPane - view split
import splitPane from 'vue-splitpane'
//qrcode - create qrcode for scanning
import QrcodeVue from 'qrcode.vue'

Vue.component('vue-draggable-resizable',VueDraggableResizable)
Vue.component('split-pane', splitPane);
Vue.component('qrcode',QrcodeVue);
Vue.component('draggable',draggable);
Vue.use(swiper);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
