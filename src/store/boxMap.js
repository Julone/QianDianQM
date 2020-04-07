export default {
    state:{
        mapActiveID: -1,
        map_item_ID: 1,
    },
    mutations:{
        ADD_BOX_MAP(state,{ x,y,width,height }){
            if(width < 20 || height < 20) return;
            var item = state.boxList.find(el => el.id === state.boxActiveID).mapList;
            state.mapActiveID = state.map_item_ID;
            item.push({
                id: state.map_item_ID++,
                x,y,width,height,
                action: {
                  type: null,
                  data: {}
                }
            });

        },
        REMOVE_BOX_MAP(state, {boxID,mapID}){
            var mapList = state.boxList.find(el => el.id === boxID).mapList;
            var mapIndex = mapList.indexOf(mapList.find(el=>el.id == mapID));
            if(mapIndex != -1){
                mapList.splice(mapIndex,1);
            }
            state.mapActiveID = -1;
        },
        DRAG_BOX_MAP(state, {boxID,mapID,x,y}){
            var mapList = state.boxList.find(el => el.id === boxID).mapList;
            var mapItem = mapList.find(el => el.id == mapID);
            mapItem = Object.assign(mapItem,{x,y});
        },
        RESIZE_BOX_MAP(state,{ x, y, width, height, mapID,boxID}){
            var mapList = state.boxList.find(el => el.id === boxID).mapList;
            var mapItem = mapList.find(el => el.id == mapID);
            mapItem = Object.assign(mapItem,{x,y,width,height});
        },
        SET_MAP_ACTIVE_ID(state, val){
            state.mapActiveID = val
        },
        SET_MAP_ACTION_ITEM_ACTION_TYPE(state,{boxID,val}){
            var mapList = state.boxList.find(el => el.id === state.boxActiveID).mapList;
            var mapItem = mapList.find(el=>el.id == state.mapActiveID);
            mapItem.action.type = val;
        },
        SET_MAP_ACTION_ITEM_ACTION_DATA(state,val){
            var mapList = state.boxList.find(el => el.id === state.boxActiveID).mapList;
            var mapItem = mapList.find(el=>el.id == state.mapActiveID);
            mapItem.action.data = val;
        }

    },
    actions:{

    },
    getters:{
        activeMapItem:(state,getters)=>{
            if(getters.activeMapList.length && state.mapActiveID > 0){
                return getters.activeMapList.find(el=>el.id == state.mapActiveID)
            }else {
                return null;
            }
        },
        mapActiveID(state,getters){
            return state.mapActiveID
        },
        activeMapItemActionType(state,getters){
            if(getters.activeMapItem){
                return getters.activeMapItem.action.type
            }else {
                return ""
            }
        },
        activeMapList:(state,getters) =>{
            if(getters.boxActiveItem){
                return getters.boxActiveItem.mapList
            }else{
                return [];
            }
        },
    }
}