import {Message,MessageBox} from 'element-ui'
import boxMap from './boxMap';
import boxLunbo from './boxLunbo'
import {scrollTo} from '@/utils/dom';
var Model = function(state, url = ""){
    return {
        id: state.boxID ++,
        bgUrl: {
            url: url
        },
        baseWidth: 650,
        baseHeight: 100,
        type: 'block',
        mapList: [],
        lunboList: [],
        lunboConfig: {
            autoplay: true,
            loop: true,
            duration: 3000,
            lazy: true
        },
        videoInfo: {
            lazy: true,
            autoplay: true,
            videoImage: '',
            videoURL: '',
            remarks:'备注信息'
        },
        listInfo: [],
        listDetail:[],
        listConfig: {
            lazy:  true,
            direction: 'vertical',
            rowLimit:2
        },
        previewURL: "",
    }
}
export const boxModel  = Model;

export default {
    state: {
        ...boxMap['state'],
        ...boxLunbo['state'],
        boxList: [],
        boxID: 1,
        boxActiveID: -1,
        globalBaseWidth: 650,
    },
    mutations: {
        ...boxMap['mutations'],
        ...boxLunbo['mutations'],
        CHANGE_BASE_WIDTH(state,{boxID,baseWidth}){
            var oldBaseWidth = state.globalBaseWidth;
            state.globalBaseWidth = baseWidth;
            var ratio = baseWidth / oldBaseWidth;
            state.boxList.forEach(el => {
                el.baseWidth = baseWidth;
                el.mapList.forEach(mel => {
                    var { x, y, width, height } = mel;
                    var {round} = Math;
                    mel.x = round(x * ratio);
                    mel.y = round(y * ratio);
                    mel.width = round(width * ratio);
                    mel.height = round(height * ratio);
                })
            });
        },
        CHANGE_BASE_HEIGHT(state,{boxID,baseHeight}){
            state.boxList.find(el=>el.id == boxID).baseHeight = baseHeight
        },
        ADD_BOXLIST_ITEM(state){
            var box = new Model(state);
            state.boxList.push(box);
        },
        REMOVE_BOXLIST_ITEM(state, boxID){
            var index = state.boxList.findIndex(el=>el.id == boxID);
            if(index == -1){
                Message('删除失败,找不到该板块!')
            }else{
                state.boxList.splice(index,1);
                Message.warning('板块删除成功!')
            }
        },
        UP_BOXLIST_ITEM(state, boxID){
            state.boxActiveID = -1;
            var index = state.boxList.findIndex(el=> el.id == boxID);
            if(index!=0){
                state.boxList[index] = state.boxList.splice(index-1, 1, state.boxList[index])[0];
            }else{
                return Message('已经到顶部了,不能再移动了')
            }
        },
        DOWN_BOXLIST_ITEM(state,boxID){
            state.boxActiveID = -1
            var index = state.boxList.indexOf(state.boxList.find(el=> el.id == boxID));
            if(index!=state.boxList.length-1){
                state.boxList[index] = state.boxList.splice(index+1, 1, state.boxList[index])[0];
            }else{
                 return Message('已经到底部了,不能再移动了')
            }
        },
        SET_BOX_ACTIVE_ID(state, val){
            state.boxActiveID = val;
        },
    },
    actions: {
        ...boxMap['actions'],
        ...boxLunbo['actions'],
        REMOVE_BOXLIST_ITEM({commit,state},boxID){
            MessageBox.confirm('确定要删除这个板块吗?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error',
              }).then(r=>{
                commit('REMOVE_BOXLIST_ITEM', boxID);
                commit('SET_BOX_ACTIVE_ID', -1);
               
              }).catch(e=>e);
        },
        ADD_BOXLIST_ITEM({commit,state}, { data, moveToNewBox = true }){
            if(data) {
                data.forEach(element => {
                    var t=  new Model(state, element.url);
                    state.boxList.push(t);
                });
                console.log(state.boxList)
            }else{
                var box = new Model(state);
                state.boxList.push(box);
                moveToNewBox && commit('SET_BOX_ACTIVE_ID',box.id);
            }
            Message.closeAll();
            Message.success('添加板块成功!')
        },
        EMPTY_BOXLIST_TYPE({commit, state}){
            MessageBox.confirm('此操作将永久删除所有板块, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  state.boxList = [];
              }).catch(() => {
                   
              });
        },
        SCROLL_TO_BOXID({commit,state,dispatch},boxID){
            if (boxID < 0) return;
            var nodes = document.querySelectorAll('#boxList li.item');
            var item = [...nodes].find(el => el.dataset.boxid == boxID);
            var nodes2 = document.querySelectorAll('#preBoxList li');
            var item2 = [...nodes2].find(el => el.dataset.boxid == boxID);
            if( !item ) return;
            else{
                item.classList.add('isBoxMoving');
                item2.classList.add('isBoxMoving');
                setTimeout(() => {
                  scrollTo('#main .el-scrollbar__wrap', {y: item.offsetTop - 100})
                  scrollTo('#toolBar .el-scrollbar__wrap', {y: item2.offsetTop - 100})
                  setTimeout(()=>{
                    item.classList.remove('isBoxMoving');
                    item2.classList.remove('isBoxMoving');
                  },500)
                }, 100);
            }
        },
        SCROLL_TO_TOP({dispatch,commit}){
            var nodes = [...document.querySelectorAll('#boxList li.item')];
            commit('SET_BOX_ACTIVE_ID', -1);
            commit('SET_MAP_ACTIVE_ID', -1);
            if(nodes.length != 0){
                var boxID = nodes[0].dataset.boxid;
                dispatch('SCROLL_TO_BOXID', boxID);
            }
        },
        TOGGLE_BOX_IMAGE({}, bool){
            var allImageItem = document.querySelectorAll(".box_bg_image");
            allImageItem.forEach(el => {
              el.style.opacity = Number(bool);
            });
        }
    },
    getters: {
        ...boxMap['getters'],
        ...boxLunbo['getters'],
        boxActiveID(state){
            return state.boxActiveID
        },
        boxActiveItem(state){
            return state.boxList.find(el => el.id === state.boxActiveID)
        },
        boxItem: (state, getters) => (id) => {
            return state.boxList.find(el => el.id === id)
        },
        boxList(state){
            state.boxList = state.boxList.map(el=>{
                switch(el.type){
                  case 'lunbo': el.previewURL = el.lunboList.length? el.lunboList[0].image : "";break;
                  case 'block': el.previewURL = el.bgUrl.url;break;
                  case 'video': el.previewURL = el.videoInfo.videoImage;break;
                  case 'list': el.previewURL = el.listDetail.length? el.listDetail[0].img : '';break;
                  default: el.previewURL = "";break;
                }
                return el;
              })
            return state.boxList
        },
        bgSrc:(state, getters) => (id) => {
            return  getters.boxItem(id)? getters.boxItem(id).bgUrl: ''
        },
        mapList:(state,getters) => (id) =>{
            return getters.boxItem(id).mapList
        },
        baseWidth:(state,getters) => {
            return state.globalBaseWidth
        },
        baseHeight:(state,getters) => id =>{
            return getters.boxItem(id).baseHeight
        }
    }
}