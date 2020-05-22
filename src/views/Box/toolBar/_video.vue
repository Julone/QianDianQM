<template>
  <div>
    <!-- 没有轮播图片集合时候 -->
<!-- {{boxActiveItem}}SF -->
    
    <h3 class="form-title">视频地址</h3>
    <div align="center">
        <video :src="boxActiveItem.videoInfo.videoURL" controls style="max-height:22vh"></video>
    </div>
    <div class="form-item" label="视频地址">
        <el-input v-model="boxActiveItem.videoInfo.videoURL" 
        placeholder="请输入视频地址"

         type="textarea" ></el-input>
    </div>
    <div class="form-item" label="自动播放">
        <el-switch v-model="boxActiveItem.videoInfo.autoplay" active-text="开启" inactive-text="关闭"></el-switch>
    </div>
        <h3 class="form-title">视频图片</h3>
      <div class="form-item" label="视频图片">
          <!-- <el-input v-model="boxActiveItem.videoInfo.videoImage" rows="1" type="textarea" active-text="开启" inactive-text="关闭"></el-input> -->
            <el-select
        v-model="boxActiveItem.videoInfo.videoImage"
        @visible-change="$emit('previewIMG',$event)"
        size="mini"
        placeholder="请选择视频背景图"
        >
        <el-option
          v-for="(el,index) in lunboImageList"
          :key="el.url"
          :value="el.url"
          style="margin: 10px 0"
          @mouseenter.native="$emit('preview_url_change',el.url)"
        >
          <div style="display:flex;align-items:center;justify-content:space-around;">
            <el-image :src="el.url" fit="cover" style="width:50px;height:30px"></el-image>
            <span>{{'图片 ' + (index + 1)}}</span>
          </div>
        </el-option>
      </el-select> 
    </div>
    <div class="form-item" label="懒加载">
        <el-switch v-model="boxActiveItem.videoInfo.lazy" active-text="开启" inactive-text="关闭"></el-switch>
    </div>
   
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
 
    };
  },
  methods: {
  
  },
  mounted(){
    this.boxActiveItem.videoInfo.videoURL = "https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/0cbfeae4294814054051532801/v.f30.mp4?dockingId=245fae21-8dab-44e5-a15d-58ad5d12ee17&storageSource=3"
  },
  computed: {
    ...mapState(["lunboList"]),
    ...mapGetters([
        "boxActiveItem",
        "lunboImageList"
    ])
  }
};
</script>