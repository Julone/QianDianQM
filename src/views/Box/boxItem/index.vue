<template>
  <li class="item" :style="{width: baseWidth+'px'}" ref="boxRef" :key="refreshID">
    <div class="title">
      <div class="left">
        <el-tag size="mini" effect="plain" :type="getTypeLabelList(boxData.type).type">
          {{getTypeLabelList(boxData.type).label}}</el-tag>
        <span style="margin-left:10px">ID: {{boxID}}</span>
      </div>
      <div class="right">
        <div>
          <el-button-group>
            <el-button plain round size="mini" icon="el-icon-top"
              @click.stop="UP_BOXLIST_ITEM(boxID),SCROLL_TO_BOXID(boxID)"></el-button>
            <el-button plain round size="mini" icon="el-icon-bottom"
              @click.stop="DOWN_BOXLIST_ITEM(boxID),SCROLL_TO_BOXID(boxID)"></el-button>
          </el-button-group>
          <el-divider direction="vertical"></el-divider>
          <el-button plain circle type="danger" size="mini" icon="el-icon-close"
            @click.stop="REMOVE_BOXLIST_ITEM(boxID)"></el-button>
        </div>
      </div>
    </div>

    <div class="body" :style="{width: baseWidth +'px',height:'auto',minHeight:baseHeight + 'px'}">
      <!-- {{bgSrc.url}} -->
      <div v-if="!bgSrc && !hasLunboImage && !hasVideoImage && !hasListItem && !isActive" class="placeholder">
        <el-button round plain icon="el-icon-check">开始配置</el-button>
      </div>
      <div v-else>
        <!-- 板块 -->
        <figure v-if="boxType=='block'" class="mapModule" :style="{width: baseWidth +'px',height: baseHeight + 'px'}">
          <!-- dragArea -->
          <div class="dragArea" ref="dragArea" @mouseup="onDeactivated" @contextmenu.prevent.stop @mouseleave="mouseup"
            @mousedown.left="mousedown" @mousemove.left="mousemove" @mouseup.left="mouseup"></div>
          <!-- map -->
          <vue-draggable-resizable v-for="(el) in mapList" :key="el.id" :class="{'vdr-active':el.id == mapActiveID}"
            :w="el.width" :h="el.height" :x="el.x" :y="el.y" :parent="true" :min-height="5" :min-width="5"
            @dragging="(x, y) => DRAG_BOX_MAP({ x,y,mapID:el.id, boxID: boxID})"
            @resizing="(x, y, width, height) => RESIZE_BOX_MAP({ x, y, width, height, mapID:el.id ,boxID:boxID})">
            <div class="vdr-inner" @contextmenu.prevent.stop
              @click.right.stop="REMOVE_BOX_MAP({mapID:el.id, boxID: boxID})" @click.left.stop="onActivated(el.id)">
              <i v-if="el.id == mapActiveID" class="el-icon-delete"
                @click="REMOVE_BOX_MAP({mapID:el.id, boxID: boxID})"></i>
              <i :style="{fontSize: el.height / 2 +'px'}" :class="{
                'el-icon-check': el.action.type
                }"></i>
              <span :style="{fontSize: el.height / 2 +'px'}">{{el.id}}</span>
            </div>
          </vue-draggable-resizable>
          <img :src="bgSrc" v-if="bgSrc" width="100%" @mousedown.prevent class="box_bg_image" @load="finishLoadImage"
            :alt="bgSrc" />
        </figure>
        <!-- 轮播 -->
        <div v-else-if="boxType== 'lunbo'" class="lunboModule"
          :style="{width: baseWidth +'px',minHeight: baseHeight + 'px'}" @click.left.stop="onActivated()">
          <swiper @slideChange="slideChange" :options="swiperOptionTop" ref="swiperTop">
            <swiper-slide @click.native="slideChange" v-for="(el) in lunboList" :data-id="el.id" :key="el.image">
              <img class="lunbo_image" :src="el.image" width="100%" @load="finishLoadImage" alt />
            </swiper-slide>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <swiper v-show="isActive" class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs"
            @ready="swiperLinked">
            <swiper-slide v-for="(el) in lunboList" :style="{width:(baseWidth / 4) +'px'}" :key="el.image">
              <img class :src="el.image" width="100%" alt />
            </swiper-slide>
          </swiper>
        </div>
        <!-- 视频 -->
        <div v-else-if="boxType== 'video'" class="videoModule"
          :style="{width: baseWidth +'px',minHeight: baseHeight + 'px'}">
          <el-image :src="boxData.videoInfo.videoImage" v-if="boxData.videoInfo.videoImage" width="100%"
            @mousedown.prevent class="box_bg_image" @load="finishLoadImage" :alt="bgSrc"></el-image>
          <el-dialog title="视频预览" append-to-body center :visible.sync="video_dialogVisible" width="45%">
            <video v-if="video_dialogVisible" :src="boxData.videoInfo.videoURL" controls autoplay loop
              width="100%"></video>
          </el-dialog>
          <div class="play_btn">
            <div class="el-icon-video-play" :style="{fontSize: baseHeight / 2 +'px'}"
              @click="video_dialogVisible= true"></div>
          </div>
        </div>
        <!-- 列表 -->
        <div class="listModule"   id="listModule"
          v-else-if="boxType == 'list'" :style="{width: baseWidth +'px',minHeight: baseHeight + 'px'}">
<!-- {{boxData.listDetail}} -->
<div class="itemListContainer">
     <div class="itemList" ref="itemList" v-bind="{'data-x': 0}" 
          :style="{transform: `translate(${listX}px, 0)`}"
           @mousewheel="listScroll($event)"
          @mousedown.left="listDragStart" @mousemove.left="listDrag" @mouseup.left="listDragEnd" 
          @mouseleave="listDragFlag=false"
         
         >
<div class="item" v-for="el in boxData.listDetail" :style="{backgroundImage: `url(${el.img})`}" :key="el.img"></div>
          </div>
</div>
     
            
            <!-- <swiper class="itemList" :options="listSwiper">
    <swiper-slide class="item" v-for="el in boxData.listDetail" :key="el.img">
              <img :src="el.img" height="100px" alt />

    </swiper-slide>
  </swiper> -->
          <div class="itemCountBack"></div>
          <span class="itemCount">{{boxData.listDetail.length}}</span>
        </div>
        <div v-else>未知板块</div>
      </div>
    </div>
  </li>
</template>
<script>
  // import VueDraggableResizable from "vue-draggable-resizable";
  import {
    mapState,
    mapActions,
    mapGetters,
    mapMutations
  } from "vuex";
  import mixins from "./mixins.vue";
  import Vue from "vue";
  export default {
    mixins: [mixins],
    props: ["boxID", "boxData"],
    data: function () {
      return {
        refreshID: Date.now(),
        video_dialogVisible: false
      };
    },
    methods: {
      test() {
        alert(1);
      },
      onActivated(mapID) {
        this.SET_BOX_ACTIVE_ID(this.boxID);
        switch (this.boxData.type) {
          case "block":
            this.SET_MAP_ACTIVE_ID(mapID);
            break;
          case "lunbo": {
            var {
              lunboList
            } = this.boxData;
            var idArr = lunboList.map(el => el.id);
            if (!idArr.some(el => el == this.lunboActiveID)) {
              this.SET_LUNBO_ACTIVE_ID(
                this.boxData.lunboList.length ? this.boxData.lunboList[0].id : -1
              );
            }
          }
          default:
            break;
        }
      },
      onDeactivated() {
        this.SET_MAP_ACTIVE_ID(-1);
      }
    }
  };
</script>
<style lang="less" src="./index.less"></style>