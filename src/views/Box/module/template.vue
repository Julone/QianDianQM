<template>
  <div>
    <div class="templateList" ref="list">
      <div class="cardWrapper" v-for="el in [...templateArray]" :key="el._id">
        <el-container>
          <el-header height="100px">
            <iframe width="100%" height="100px" :src="'http://192.168.36.119:3000/template?templateID=' + el._id" frameborder="0"></iframe>
          </el-header>
          <el-main>
                <span>标题: {{el.title}}</span>
          <div class="bottom clearfix">
           
            <router-link :to="'/box/block?templateID=' + el._id">
              <el-button type="text" class="button">加载模板</el-button>
            </router-link>
            <el-button type="text" @click="removeTemplate(el._id)">删除模板</el-button>
             <a :href="'/#/box/block?templateID=' + el._id" target="_blank">
              <el-button type="text" class="button">加载模板(新窗口)</el-button>
            </a>
          </div>
      
            <time class="time">{{ timeFormat(new Date(el.addTime)) }}</time>
          </el-main>
        </el-container>
  <!-- <el-card  shadow="hover">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />

        <div style="padding: 14px;">
          <span>标题: {{el.title}}</span>
          <div class="bottom clearfix">
           
            <router-link :to="'/box/block?templateID=' + el._id">
              <el-button type="text" class="button">加载模板</el-button>
            </router-link>
            <el-button type="text" @click="removeTemplate(el._id)">删除模板</el-button>
             <a :href="'/#/box/block?templateID=' + el._id" target="_blank">
              <el-button type="text" class="button">加载模板(新窗口)</el-button>
            </a>
          </div>
          <div>
            <time class="time">{{ timeFormat(new Date(el.addTime)) }}</time>
          </div>
        </div>
      </el-card> -->
      </div>
    
    </div>
  </div>
</template>
<script>
import { getTemplateList,removeTemplate } from "./../api";
import { timeFormat } from "@/utils/other.js";

export default {
  data() {
    return {
      templateArray: []
    };
  },
  methods: {
    timeFormat,
    removeTemplate
  },
  mounted() {
    getTemplateList().then(r => {
      if (r.data.code == 200) {
        this.templateArray = r.data.data;
      }
    });

    // console.log(margin);
  }
};
</script>
<style lang="less" scoped>
.templateList {
  padding: 40px;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  div.cardWrapper{
    width: 25%;
    // border: 1px solid;
    padding: 5px;
    box-sizing: border-box;
        iframe{
      border: 1px solid gray;}
      .el-container{
           border: 1px solid;
           border-radius: 5px;
      }
  }
}
</style>