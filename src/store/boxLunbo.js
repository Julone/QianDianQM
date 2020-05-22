
import {Message} from 'element-ui'
import { boxModel } from './box'
export default ({
  state: {
      lunbo_item_ID: 100,
      lunboActiveID: -1,
  },
  mutations: {
    ADD_LUNBO_ITEM(state, url){
        var item = state.boxList.find(el => el.id === state.boxActiveID);
        if(item.lunboList.some(el => el.image == url)) return Message('图片已存在与轮播列表中');
        var newList =  {
          id: state.lunbo_item_ID++,
          alt: '',
          url: '',
          image: url,
        }
        item.lunboList.push(newList);
        state.lunboActiveID = newList.id;
    },
    SET_LUNBO_CONFIG(state, config){
        
    },
    SET_LUNBO_ACTIVE_ID(state,val){
      state.lunboActiveID = val;
    },
    REMOVE_LUNBO_ITEM(state, url){
      var item = state.boxList.find(el => el.id === state.boxActiveID);
      var index = item.lunboList.findIndex(el=>el.image == url);
      item.lunboList.splice(index,1);
    }
  },
  actions: {
    CREATE_LUNBO_ITEM({state}, {imgList}){
      console.log(imgList)
      var b = new boxModel(state);
      b.type = "lunbo"
      imgList.forEach(element => {
        b.lunboList.push({
          id: state.lunbo_item_ID++,
          alt: '',
          url: '',
          image: element.url,
        })
      })
      state.boxList.push(b);
      Message.success('创建轮播板块成功')
    }
  },
  getters: {
    lunboActiveList(state,getters){
        return state.boxList.find(el =>el.id === state.boxActiveID).lunboList || {}
    },
    lunboActiveConfig(state,getters){
        return state.boxList.find(el =>el.id === state.boxActiveID).lunboConfig || {}
    },
    lunboActiveItem(state,getters){
        return getters.lunboActiveList.find(el => el.id == state.lunboActiveID) || {};
    },
    lunboActiveID(state,getters){
        return state.lunboActiveID
    }
  }
})