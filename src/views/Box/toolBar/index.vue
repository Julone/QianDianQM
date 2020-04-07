<template>
  <div class="toolBar-container" style="height:100%" @click.stop>
    <el-scrollbar noScrollX style="height:100%;">
      <div class="toolBar-wrapper" style="height:100%" v-if="boxActiveItem">
        <el-tabs v-model="boxActiveItem.type" style="height:100%" stretch>
          <el-tab-pane name="block" style="height:100%">
            <span slot="label">
              <i class="el-icon-files"></i>&nbsp;板块
            </span>
            <blockModule style="height:100%"></blockModule>
          </el-tab-pane>
          <el-tab-pane name="lunbo">
            <span slot="label">
              <i class="el-icon-picture-outline"></i>&nbsp;轮播
            </span>
            <lunboModule></lunboModule>
          </el-tab-pane>
          <el-tab-pane label="视频" name="video">
            <span slot="label">
              <i class="el-icon-video-camera"></i>&nbsp;视频
            </span>
            <videoModule></videoModule>
          </el-tab-pane>
          <el-tab-pane label="列表" name="list">
            <span slot="label">
              <i class="el-icon-receiving"></i>&nbsp;列表
            </span>
            <listModule />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="entireList" id="preBoxList" v-show="!boxActiveItem">
        <h5 style="margin-left:10px">板块预览</h5>
        <draggable
          class="list-group"
          tag="ul"
          v-bind="dragOptions"
          :list="boxList"
          @start="dragStart"
          @end="dragEnd"
        >
          <transition-group type="transition" mode="out-in" :name="!dragFlag ? 'flip-list' : null">
            <li
              v-for="(el) in boxList"
              @dragstart="dragID = el.id"
              class="list-group-item"
              :class="{actived: dragFlag && dragID == el.id}"
              :key="el.id"
              v-bind="{'data-boxid': el.id}"
            >
              <el-card v-if="!el.hidden" :body-style="{padding: '10px'}">
                <el-row :gutter="2" type="flex" align="middle" justify="space-between">
                  <el-col :span="6" class="flex-center">
                    <el-tag
                      effect="plain"
                      @mouseenter.native="$event.target.classList.remove('el-tag--plain')"
                      @mouseleave.native="$event.target.classList.add('el-tag--plain')"
                      size="medium"
                      :type="typeLabelList.get(el.type).type"
                    >{{el.id}} {{typeLabelList.get(el.type).label}}</el-tag>
                  </el-col>
                  <el-col :span="10" class="flex-center">
                    <el-image class="image-preview" :src="el.previewURL" fit="cover">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline-round"></i>
                        <small>该板块暂无效果图</small>
                      </div>
                    </el-image>
                  </el-col>
                  <el-col :span="8" class="btn flex-center">
                    <el-button
                      size="medium"
                      circle
                      plain
                      icon="el-icon-setting"
                      @click="SET_BOX_ACTIVE_ID(el.id)"
                    ></el-button>
                    <el-button
                      size="medium"
                      circle
                      plain
                      icon="el-icon-close"
                      type="danger"
                      @click="REMOVE_BOXLIST_ITEM(el.id)"
                    ></el-button>
                  </el-col>
                </el-row>
              </el-card>
            </li>
          </transition-group>
        </draggable>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    blockModule: () => import("./_block"),
    lunboModule: () => import("./_lunbo"),
    videoModule: () => import("./_video"),
    listModule: () => import("./_list")
  },
  data() {
    return {
      dragFlag: false,
      dragID: -1
    };
  },
  watch: {
    dragFlag(val) {
      this.$emit("focus_box_item", { dragID: this.dragID, bool: val });
    }
  },
  computed: {
    ...mapGetters(["boxActiveItem", "mapActiveID", "activeMapItem", "boxList"]),
    ...mapState(["typeLabelList"]),
    dragOptions() {
      return {
        animation: 300,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    ...mapActions(["REMOVE_BOXLIST_ITEM"]),
    ...mapMutations(["SET_BOX_ACTIVE_ID", "SET_BOX_LIST_HIDDEN_STATE"]),
    dragEnd(e) {
      this.dragFlag = false;
      this.$emit("changeItemOrder", this.dragID);
    },
    dragStart(e) {
      this.dragFlag = true;
    }
  }
};
</script>
<style lang="less" scoped src="./index.less"></style>