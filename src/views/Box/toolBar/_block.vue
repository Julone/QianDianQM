<template>
  <div>
    <h3 class="form-title">背景图</h3>
    <div class="form-item" label="图片选择">
      <el-select
        v-model="boxActiveItem.bgUrl.url"
        size="mini"
        placeholder="请选择背景图"
      >
        <el-option
          v-for="(el,index) in blockImageList"
          :key="el.url"
          :value="el.url"
          style="margin: 10px 0"
          v-preview="el.url"
        >
          <div style="display:flex;align-items:center;justify-content:space-around;">
            <el-image :src="el.url" fit="cover" style="width:50px;height:30px"></el-image>
            <span>{{'图片 ' + (index + 1)}}</span>
          </div>
        </el-option>
      </el-select>
    </div>

    <h3 class="form-title">热点区域</h3>
    <el-alert title="操作提示" type="warning" description="鼠标左键拖拽创建区域, 鼠标右键可以删除区域!" show-icon></el-alert>
    <div class="form-item" label="当前区域ID">
      <h6 class="label" style="line-height:18px;vertical-align:middle;margin-right:10px">
        <span class="activeID">{{mapActiveID == -1 ? '未选中' : mapActiveID}}</span>
      </h6>
    </div>
    <template v-if="mapActiveID > 0 && boxActiveItem.mapList.length">
      <div class="form-item" label="事件绑定">
        <el-select v-model="activeMapItem.action.type" @change="changeSelector"
          clearable size="mini" placeholder="事件绑定" >
          <el-option value="hotActivity" label="热门活动"></el-option>
          <el-option value="payCoupon" label="优惠券领取"></el-option>
          <el-option value="itemCategory" label="商品分类"></el-option>
          <el-option value="itemDetail" label="商品详情"></el-option>
          <el-option value="linkUrl" label="网址链接"></el-option>
        </el-select>
      </div>
      <div class="form-item" label="热门活动" v-if="curActionType == 'hotActivity'">
          <el-button type="text" @click="changeRouter('activity')">选择热门活动</el-button>
      </div>
      <div class="form-item" label="优惠券" v-if="curActionType == 'payCoupon'">
          <el-button type="text" @click="changeRouter('coupon')">选择优惠券</el-button>
      </div>
      <div class="form-item" label="商品分类" v-if="curActionType == 'itemCategory'">
          <el-button type="text" @click="changeRouter('itemCategory')">选择商品分类</el-button>
      </div>
      <div class="form-item" label="商品详情" v-if="curActionType == 'itemDetail'">
          <el-button type="text" @click="changeRouter('itemDetail')">选择商品详情</el-button>
      </div>
      <div class="form-item" label="链接地址" v-if="curActionType == 'linkUrl'">
        <el-input v-model="activeMapItem.action.data.url" placeholder="请输入链接地址"></el-input>
      </div>
      <div class="form-item" label="事件参数">{{activeMapItem.action.data}}</div>
    </template>
    <el-dialog
        title="提示"
        top="10vh"
        append-to-body
        lock-scroll
        :visible.sync="selectorVisible"
        width="60%"
        @close="closeSelector"
      >
        <router-view></router-view>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import { getRouterList } from "./../api";
export default {
  data: () => ({
    selectorVisible: false
  }),

  methods: {
    ...mapMutations(["SET_MAP_ACTION_ITEM_ACTION_DATA", "REMOVE_BOX_MAP"]),
    
    changeSelector() {
      this.activeMapItem.action.data = {};
    },
    changeRouter(keyname){
      this.selectorVisible = true;
      this.$router.push({name: 'dialog', params: {key: keyname}});
      this.prevRouterParams = this.$route.query;
      console.log(this.prevRouterParams)
    },
    closeSelector() {
      this.selectorVisible = false;
      console.log(this.$router)
      this.$router.go(-1)
      // this.$router.replace("/box/block");
    },
  },
  computed: {
    curActionType(){
      return this.activeMapItem ? this.activeMapItem.action.type : ""
    },
    ...mapState({
      boxList: state => state.box.boxList
    }),
    ...mapGetters([
      "boxActiveItem",
      "mapActiveID",
      "activeMapItem",
      "boxActiveID",
      "blockImageList"
    ])
  }
};
</script>