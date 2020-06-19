import Vue from 'vue'
import Vuex from 'vuex'
import box from './box'
import * as storage from './../utils/storage'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    imgList: [ { "url": "https://img14.360buyimg.com/cms/jfs/t1/111883/20/2391/38719/5ea1b0f2Ee27cf3fe/5de52ee5d008e65d.jpg",
     "type": "all", "image_type": "jpg", "width": 1920, "height": 600, "remark": "", "create_time": 1585189414550 }, 
     { "url": "https://img10.360buyimg.com/cms/jfs/t1/100141/24/18178/55217/5e8d4501Ed3c42e03/c0c444b912e7e531.jpg", 
     "type": "all", "image_type": "jpg", "width": 1920, "height": 600, "remark": "", "create_time": 1585189414831 }, 
     { "url": "https://img11.360buyimg.com/cms/jfs/t1/128777/36/2712/80911/5ec8ad6dE27a79bbe/e8f9aba130b7f6f8.jpg",
      "type": "all", "image_type": "jpg", "width": 1920, "height": 600, "remark": "", "create_time": 1585189415098 }, 
      { "url": "https://img11.360buyimg.com/cms/jfs/t1/47816/39/11180/155441/5d834bbaEc00cc8a2/16b2f80f833606ed.jpg", 
      "type": "all", "image_type": "jpg", "width": 1920, "height": 600, "remark": "", "create_time": 1585189415322 },
       { "url": "https://img13.360buyimg.com/cms/jfs/t1/114278/20/7735/38758/5ec55169Eb0df7963/080c1c1d612727d9.jpg", 
       "type": "all", "image_type": "jpg", "width": 1920, "height": 600, "remark": "", "create_time": 1585189415509 },],
     typeLabelList: new Map([
      [
        "block",
        {
          label: "板块",
          type: "primary",
          color: "#409EFF",
          value: "block",
          icon: 'el-icon-files'
        }
      ],
      [
        "lunbo",
        {
          label: "轮播",
          type: "success",
          color: "#67c23a",
          value: "lunbo",
          icon: 'el-icon-picture-outline'
        }
      ],
      [
        "video",
        {
          label: "视频",
          type: "warning",
          color: "#e6a23c",
          value: "video",
          icon: 'el-icon-video-camera'
        }
      ],
      [
        "list",
        {
          label: "列表",
          type: "danger",
          color: "#409EFF",
          value: "block",
          icon: 'el-icon-files'
        }
      ],
    ]),
    curTemplateID: storage.getStorage({name: 'templateID'})
  },
  mutations: {
    ADD_IMAGE_LIST(state, val) {
      function ImageModel({
        url,
        type,
        width,
        height
      }) {
        return {
          url: url ? url : '',
          type: 'all',
          image_type: type,
          width: width,
          height: height,
          remark: '', //备注信息 
          create_time: Date.now()
        }
      }
      state.imgList.push(new ImageModel(val));
    },
    SET_CUR_TEMPLATE_ID(state, val){
      state.curTemplateID = val;
      storage.setStorage({name: 'templateID', type:'session', content: val});
    }
  },
  actions: {},
  getters: {
    getTypeLabelList: (state, getters) => val => {
      return state.typeLabelList.get(val);
    },
    imgList(state) {
      return state.imgList
    },
    allImageList(state){
      return state.imgList.filter(el => el.type == 'all')
    },
    lunboImageList(state,getters) {
      return getters.allImageList.concat(state.imgList.filter(el => el.type == 'lunbo'))
    },
    blockImageList(state,getters) {
      return getters.allImageList.concat(state.imgList.filter(el => el.type == 'block'))
    },
    videoImageList(state,getters) {
      return getters.allImageList.concat(state.imgList.filter(el => el.type == 'video'))
    }

  },
  modules: {
    box
  }
})