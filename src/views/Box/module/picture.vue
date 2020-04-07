<template>
  <div style="width:100%;height:100%">
    <div ref="sa" jSlot>
      
      <el-button
        v-if="multipleSelection.length"
        @click="createMultipleBlock"
      >创建区域板块</el-button>
      <el-button
        v-if="multipleSelection.length"
        @click="createLunbo"
      >创建轮播板块</el-button>
    </div>
    <split-pane
      class="panel-container fullSize"
      :min-percent="20"
      :default-percent="30"
      split="vertical"
    >
      <div slot="paneL" class="fullSize">
        <!-- 图片预览 -->
        <split-pane :min-percent="20" class="fullSize" :default-percent="30" split="horizontal">
          <div class="panel vertical flex-center" slot="paneL">
            <swiper :options="{zoom:true}" style="width:100%;height:100%">
              <swiper-slide  style="width:100%;height:100%">
                <div class="swiper-zoom-container">
                  <img v-if="prev_image" :src="prev_image" style="max-height:100%;max-width:100%" />
                  <span v-else>图片预览</span>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="panel vertical" slot="paneR">
            <!-- {{imgList}} -->
                 <el-upload
              class="upload-demo"
              action="/api/api/action/upload"
              multiple
              list-type="picture-card"
              :on-success="handelSuccess"
              :file-list="imgList"
              :on-remove="handleRemoveUpload"
            >
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </split-pane>
      </div>
      <div slot="paneR" class="fullSize">
        <!-- <split-pane :min-percent="20" class="fullSize" :default-percent="100" split="horizontal"> -->
          <!-- <div class="panel vertical" slot="paneL"> -->
            <el-table
              @cell-click="cellClick"
              border
              highlight-current-row
              stripe
              :data="imgList"
              style="width: 100%"
              height="100%"
              @selection-change="handleSelectionChange">
              <el-table-column align="center" type="selection" width="40"></el-table-column>
              <el-table-column prop="url" label="图片" align="center" width="120">
                <template slot-scope="scope">
                  <el-image
                    :src="scope.row.url"
                    style="width:100%;height:20px"
                    fit="scale-down"
                  ></el-image>
                </template>
              </el-table-column>
              <el-table-column prop="type" align="center" label="应用范围" width="180">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.type" size="mini" placeholder="请选择">
                    <el-option
                      :key="el.value"
                      v-for="el in typeLabelList.values()"
                      :value="el.value"
                      :label="el.label"
                    >
                      <i :class="el.icon"></i>
                      {{el.label}}板块
                    </el-option>
                    <el-option value="all" label="全部板块">
                      <i class="el-icon-finished"></i>
                      全部板块
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="remark" label="备注" width="200">
                <template slot-scope="scope">
                  <el-input type="textarea" :rows="1" v-model="scope.row.remark"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="width"
                width="70"
                show-overflow-tooltip
                label="宽度"
              ></el-table-column>
              <el-table-column
                align="center"
                prop="height"
                width="70"
                show-overflow-tooltip
                label="高度"
              ></el-table-column>
             
              <el-table-column prop="create_time" show-overflow-tooltip label="上传时间" align="center"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button @click="handleRemove(scope)" type="text" size="small">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          <!-- </div> -->
          <!-- <div class="panel vertical" slot="paneR"> -->
       
          <!-- </div> -->
        <!-- </split-pane> -->
      </div>
    </split-pane>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

import { appendNodes } from "@/utils/dom.js";
export default {
  data() {
    return {
      prev_image: "",
      multipleSelection: []
    };
  },
  computed: {
    ...mapState(["imgList", "typeLabelList"]),
    // fileList(){
    //   return this.imgList.map(el => {
    //     return  {
    //       url: el.,
    //       name: el.
    //     }
    //   })

    // }
  },
  component: {},
  mounted() {
    this.menuBtns = appendNodes("#menuExtend", this.$refs.sa);
  },
  beforeDestroy() {
    this.menuBtns.remove();
  },
  methods: {
    ...mapMutations(["ADD_IMAGE_LIST"]),
    ...mapGetters(["getTypeLabelList"]),
    ...mapActions(["ADD_BOXLIST_ITEM","CREATE_LUNBO_ITEM"]),
    handleRemove(e){
      console.log(e);
      var index = e.$index;
      this.imgList.splice(index,1)
    },
    handleRemoveUpload(f,fl){

      var index = this.imgList.findIndex(el => el.url == f.url);
      this.imgList.splice(index,1);
    },
    createMultipleBlock(){
      this.ADD_BOXLIST_ITEM({data: this.multipleSelection});
      setTimeout(()=> {
        this.$router.push({path: '/box/block'})
      },100)
    },
    createLunbo(){
      this.CREATE_LUNBO_ITEM({imgList: this.multipleSelection})
    },
    hand() {
      console.log(this);
    },
    cellClick(r, c, v, i) {
      console.log(r, c, v, i);
      this.prev_image = r.url;
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    handelSuccess(api, file, fileList) {
      // console.log(arguments);
      console.log(file);
      if (api.code == 200) {
        api.data.url = "/api" + api.data.url;
        this.ADD_IMAGE_LIST(api.data);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.fullSize {
  width: 100%;
  height: 100%;
}
.panel-container {
  .panel {
    padding: 10px;
    box-sizing: border-box;
    &.vertical {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.upload-demo {
  /deep/.el-upload--picture-card,
  /deep/.el-upload-list__item {
    width: 70px;
    height: 70px;
    line-height: 80px;
  }
}
</style>