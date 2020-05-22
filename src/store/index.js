import Vue from 'vue'
import Vuex from 'vuex'
import box from './box'
import * as storage from './../utils/storage'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    imgList: [ { "url": "/api/upload/2020-3-26/122485-5001ece3aede10ba.jpg", "type": "all", "image_type": "jpg", "width": 1920, "height": 600, "remark": "", "create_time": 1585189414550 }, { "url": "/api/upload/2020-3-26/453031-49973d89e01eea1a.jpg", "type": "all", "image_type": "jpg", "width": 1920, "height": 600, "remark": "", "create_time": 1585189414831 }, { "url": "/api/upload/2020-3-26/184730-6723c527a02376df.jpg", "type": "all", "image_type": "jpg", "width": 1920, "height": 600, "remark": "", "create_time": 1585189415098 }, { "url": "/api/upload/2020-3-26/378600-641ad237811404e3.jpg", "type": "all", "image_type": "jpg", "width": 1920, "height": 600, "remark": "", "create_time": 1585189415322 }, { "url": "/api/upload/2020-3-26/373775-052e37f4231a2177.jpg", "type": "all", "image_type": "jpg", "width": 1920, "height": 600, "remark": "", "create_time": 1585189415509 }, { "url": "/api/upload/2020-3-26/447036-569cb95951cb9121.jpg", "type": "all", "image_type": "jpg", "width": 1920, "height": 600, "remark": "", "create_time": 1585189415806 }, { "url": "/api/upload/2020-3-26/67641-82997499215a92a6.jpg", "type": "all", "image_type": "jpg", "width": 1000, "height": 350, "remark": "", "create_time": 1585189415986 }, { "url": "/api/upload/2020-3-26/168477-QQ截图20200325154714.png", "type": "all", "image_type": "png", "width": 1242, "height": 368, "remark": "", "create_time": 1585189416192 }, { "url": "/api/upload/2020-3-26/310673-QQ截图20200325154737.png", "type": "all", "image_type": "png", "width": 1257, "height": 881, "remark": "", "create_time": 1585189416365 }, { "url": "/api/upload/2020-3-26/315962-QQ截图20200325154758.png", "type": "all", "image_type": "png", "width": 1250, "height": 452, "remark": "", "create_time": 1585189416542 } ],
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