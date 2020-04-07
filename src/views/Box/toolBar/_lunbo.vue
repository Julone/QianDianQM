<template>
  <div>
    <!-- 没有轮播图片集合时候 -->
    <el-dialog custom-class="dialog1" append-to-body title="轮播图选择器" :visible.sync="dialogVisible" width="60%">
      <h3>候选图片</h3>
      <div id="prepareList">
        <el-scrollbar noScrollX style="height:100%">
          <ul>
            <li
              v-for="(el,i) in pickList"
              :key="el.url"
            >
              <img :src="el.url" width="100px" />
              <div class="pick-layer flex-center" v-preview.small="el.url">
                <el-button type="primary" @click.left.prevent="pick(i)" size="mini">选择</el-button>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </div>
      <h3>已选图片</h3>
      <div id="hasPicked">
        <el-scrollbar noScrollX style="height:100px">
          <draggable tag="ul" style :list="lunboActiveList">
            <li v-for="(el,i) in lunboActiveList" :key="el.id" >
              <img :src="el.image" alt />
               <div class="pick-layer flex-center" >
                <el-button type="primary" @click.left.prevent="unPick(i)" size="mini">取消</el-button>
              </div>
            </li>
          </draggable>
        </el-scrollbar>
      </div>
    </el-dialog>

    <h3 class="form-title">当前图片配置</h3>
    <div class="lunboActiveItem" v-if="lunboActiveList.length > 0">
      <div class="form-item" label="图片地址">
        <el-input type="textarea" v-model="lunboActiveItem.image" :rows="1" placeholder="请填写图片地址"></el-input>
      </div>
      <div class="form-item" label="链接地址">
        <el-input type="textarea" v-model="lunboActiveItem.url" placeholder="请填写链接地址"></el-input>
      </div>
      <div class="form-item" label="图片备注">
        <el-input v-model="lunboActiveItem.alt" placeholder="请填写图片备注"></el-input>
      </div>
    </div>
    <div class="form-empty" v-else @click="dialogVisible = true">
      <i class="icon el-icon-info"></i>
      <a class="label">暂无轮播图, 请进行配置!</a>
    </div>
    <!-- 有轮播图片时候 -->
    <div class="lunboConfig">
      <h3 class="form-title">轮播图配置</h3>
      <div class="form-item" label="图片设置">
        <el-button @click="dialogVisible = true" size="mini" type="primary">选择 和 排序</el-button>
      </div>
      <div class="form-item" label="自动播放">
        <el-switch v-model="lunboActiveConfig.autoplay" active-text="开启" inactive-text="关闭"></el-switch>
      </div>
      <div v-if="lunboActiveConfig.autoplay" class="form-item" label="间隔时间">
        <el-input-number v-model="lunboActiveConfig.duration" size="mini" :step="1000" label="描述文字"></el-input-number>(毫秒)
      </div>
      <div class="form-item" label="循环滚动">
        <el-switch v-model="lunboActiveConfig.loop" active-text="开启" inactive-text="关闭"></el-switch>
      </div>
      <div class="form-item" label="懒加载">
        <el-switch v-model="lunboActiveConfig.lazy" active-text="开启" inactive-text="关闭"></el-switch>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false
      // pickList:
    };
  },
  methods: {
    unPick(i) {
      this.lunboActiveList.splice(i, 1);
    },
    pick(i) {
      this.$store.commit("ADD_LUNBO_ITEM", this.pickList[i].url);
    },
    confirmPickList() {
      this.dialogVisible = false;
    }
  },

  computed: {
    ...mapState(["lunboList"]),
    ...mapGetters([
      "lunboActiveList",
      "lunboActiveConfig",
      "lunboActiveItem",
      "lunboActiveID"
    ]),
    pickList() {
      return this.$store.getters.lunboImageList.filter(el => {
        return this.lunboActiveList.every(el2 => el2.image != el.url);
      });
    }
  }
};
</script>
<style lang="less">

.dialog1{
  h3{
    margin: 10px 0;
  }
  .el-dialog__body{
    padding: 5px 20px;;
#hasPicked,
#prepareList {
  height: 100px;
  border: 1px solid gray;
  &#hasPicked{
    height: 150px;
    margin-bottom: 20px;
    li{
      cursor: move;
      .pick-layer{
              // background: unset !important;
        backdrop-filter: unset !important;
      }
    }
  }
  ul {
    display: flex;
    // padding: 10px 0;
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    li {
      list-style-type: none;
      box-sizing: border-box;
      width: 20%;
      height: 50px;
      border: 1px solid rgba(128, 128, 128, 0.143);
      display: flex;
      position: relative;
      justify-content: center;
      &:hover{
        .pick-layer{
          // display: block;
          opacity: 1;
        }
      }
      .pick-layer{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 10;
        background: rgba(0,0,0,.4);
        backdrop-filter:saturate(180%) blur(10px);
        // display: none;
        opacity: 0;
        .el-button{
          transform: scale(.8);
        }
      
      }
      img {
        max-width: 100px;
        user-select: none;
        max-height: 50px;
      }
    }
  }
}
  }

}
</style>