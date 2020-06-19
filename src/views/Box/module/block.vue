<template>
  <div class="wh100">
    <div ref="menuAppend">
      <el-button size="mini" type="success" @click="beforeSubmit">预览</el-button>
      <el-button size="mini" @click="saveNewTemplate">保存模板</el-button>
      <el-button v-if="templateID" size="mini" @click="updateTemplate">更新模板</el-button>
      <el-dialog :title="'预览ID:'+ insertedID" top="20px" :visible.sync="dialogVisible" width="50%">
        <!-- <span>这是一段信息</span> -->
        <!-- <el-button @click="submit">上传数据信息</el-button> -->
        <!-- 预览ID: {{insertedID}}
        <hr>-->
        <el-row justify="center" type="flex">
          <iframe :src="'/api/preview?insertedID=' + insertedID" frameborder="0"></iframe>
        </el-row>

        <!-- <el-divider></el-divider> -->
        <hr />
        <el-row>
          <el-col :span="12" align="center">
            二维码预览
            <qrcode :value="'/api/preview?insertedID=' + insertedID"></qrcode>
          </el-col>

          <el-col :span="12" align="center">
            网址预览
            <br />
            <a target="_blank" :href="'/api/preview?insertedID=' + insertedID">
              <el-button>网址预览</el-button>
            </a>
            <br />
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <split-pane :min-percent="5" class="wh100" :default-percent="70" split="vertical">
      <div class="wh100" slot="paneL" id="leftContainer">
        <div id="previewPanel" onselectstart="return false;">
          <div class="topPannel">
            <div class="leftpanelControlBtn flex-center" @click="ADD_BOXLIST_ITEM({moveToNewBox:false})">
              <i class="el-icon-plus"></i>
              <small>新增版块</small>
            </div>
            <div v-if="boxList.length" class="leftpanelControlBtn flex-center" @click="EMPTY_BOXLIST_TYPE">
              <i class="el-icon-delete"></i>
              <small>清空板块</small>
            </div>
            <div v-if="boxList.length" class="leftpanelControlBtn flex-center"
              @click="TOGGLE_BOX_IMAGE(imgToggle = !imgToggle)">
              <i class="el-icon-view"></i>
              <small>隐藏背景</small>
            </div>

            <div class="leftpanelControlBtn flex-center" >
              <baseWidthSelector v-slot="scope">
                <div class="flex-center" style="flex-direction:column">
                  <i class="el-icon-view"></i>
                  <small>{{scope.baseWidth}}px</small>
                </div>
              </baseWidthSelector>
            </div>
          </div>
          <div class="bottomPannel">
            <div class="leftpanelControlBtn flex-center" @click="SCROLL_TO_TOP">
              <i class="el-icon-top"></i>
              <small>返回顶部</small>
            </div>
          </div>
        </div>
        <div class="wh100" id="itemPanel">
          <div class="noItemTip" v-if="!boxList.length">
            <img src="./../_assets/original.png" width="300" alt />
            <el-button @click="ADD_BOXLIST_ITEM" round type="primary">添加板块</el-button>
          </div>
          <el-scrollbar v-else id="main" noScrollX @click.stop.native="activateBox(-1)">
            <transition-group name="flip-list" id="boxList" tag="ul">
              <boxItem v-for="(el) of boxList" :key="el.id" :boxID="el.id" :boxData="el" v-bind="{'data-boxid': el.id}"
                :class="{activeBox: boxActiveID == el.id}" :boxType="el.type" ref="boxItem"
                @click.stop.native="activateBox(el)"></boxItem>
            </transition-group>
            <div class="item addOne" :style="{width:baseWidth + 'px'}">
              <div class="addOne-wrapper" @click.stop="ADD_BOXLIST_ITEM">
                <i class="el-icon-plus"></i>
                <label>点击添加一个新的板块</label>
              </div>
            </div>
          </el-scrollbar>
        </div>

      </div>

      <keep-alive slot="paneR">
        <toolBar id="toolBar" @focus_box_item="focus_box_item" ref="toolBar" @changeItemOrder="SCROLL_TO_BOXID">
        </toolBar>
      </keep-alive>
    </split-pane>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapState,
    mapMutations,
    mapActions
  } from "vuex";
  import {
    appendNodes
  } from "@/utils/dom.js";
  import {
    getPreviewData,
    postPreviewData,
    postTemplateData,
    getTemplateData,
    updateTemplate
  } from "./../api";
  export default {
    components: {
      toolBar: () => import("./../toolBar/index.vue"),
      boxItem: () => import("./../boxItem/index"),
      baseWidthSelector: () => import("./../_components/baseWidthSelector.vue")
    },
    computed: {
      ...mapGetters(["baseWidth", "boxList"]),
      boxActiveID: {
        get() {
          return this.$store.getters.boxActiveID;
        },
        set(val) {
          return this.SET_BOX_ACTIVE_ID(val);
        }
      }
    },
    data() {
      return {
        dialogVisible: false,
        insertedID: "NULL",
        imgToggle: true,
        templateID: ""
      };
    },
    watch: {
      boxActiveID(val) {
        this.SCROLL_TO_BOXID(val);
      },
      dialogVisible(bool) {
        if (bool) this.previewSubmit();
      }
    },
    created() {
      this.templateID = this.$route.query.templateID;
      if (this.templateID) {
        const loading = this.$loading({
          // lock: true,
          text: "加载模板中",
          target: ".main-content",
          background: "rgba(0, 0, 0, .3)"
        });
        getTemplateData(this.templateID)
          .then(r => {
            var {
              code,
              data
            } = r.data;
            if (code == 200) {
              this.$store.state.imgList = data.imgList;
              this.$store.state.box = data.box;
              this.$store.commit("SET_CUR_TEMPLATE_ID", this.templateID);
            } else {
              // throw new Error('加载失败')
            }
          })
          .catch(e => {
            this.$message.error(e.message);
          })
          .finally(e => {
            setTimeout(() => {
              loading.close();
            }, 500);
          });
      }
    },
    mounted() {
      this.menu = appendNodes("#menuExtend", this.$refs.menuAppend);
    },
    methods: {
      ...mapMutations(["SET_BOX_ACTIVE_ID", "SET_MAP_ACTIVE_ID", "SET_LUNBO_ACTIVE_ID"]),
      ...mapActions([
        "ADD_BOXLIST_ITEM",
        "SCROLL_TO_TOP",
        "SCROLL_TO_BOXID",
        "EMPTY_BOXLIST_TYPE",
        "TOGGLE_BOX_IMAGE"
      ]),
      activateBox(el) {
        this.boxActiveID = el.id;
        this.SET_MAP_ACTIVE_ID(-1);
      },
      focus_box_item({
        dragID,
        bool
      }) {
        var item = this.$refs.boxItem.find(el => el.boxID == dragID);
        if (!item || !item.$el) return;
        setTimeout(
          () => {
            item.$el.classList[bool ? "add" : "remove"]("isBoxMoving");
          },
          bool ? 0 : 400
        );
      },
      beforeSubmit() {
        if (this.boxList.length == 0)
          return this.$message.info("没有数据, 不允许上传");
        this.dialogVisible = true;
      },
      previewSubmit() {
        var data = this.$store.state.box.boxList;
        console.log(data);
        postPreviewData(data)
          .then(r => {
            this.$message("数据提交成功");
            console.log(r);
            if (r.data.code == 200) {
              this.insertedID = r.data.insertedID;
            }
          })
          .catch(e => e);
      },
      saveNewTemplate() {
        this.$prompt("请输入模板标题")
          .then(({
            value
          }) => {
            postTemplateData({
              data: this.$store.state,
              title: value
            }).then(r => {
              console.log(r);
            });
          })
          .catch(() => {});
      },
      updateTemplate() {
        updateTemplate(this.templateID, this.$store.state).then(r => {
          console.log(r);
          if (r.data.code == 200) {
            this.$message('保存成功')
          }
        });
      }
    }
  };
</script>
<style lang="less" scoped src="./block.less"></style>
<style lang="less">
  .main-content {
    display: flex;
    width: 100%;
    flex: 1;
    overflow-x: hidden;

    #main {
      // width: 70%;
      height: 100%;
      overflow: hidden;
    }

    #toolBar {
      flex: 1;
    
    }
  }

  .wh100 {
    width: 100%;
    height: 100%;
  }

  .flip-list-move {
    z-index: 10;
    transition: transform 0.3s;
  }
</style>