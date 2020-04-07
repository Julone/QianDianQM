<template>
  <div style="display:flex;height:100%;flex-direction:column;">
    <div class="logo" style="flex:none;height:100px">
      <i class="el-icon-goods" style="font-size:30px"></i>千店千面
    </div>
    <el-scrollbar style="flex:1">
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/lunbo">
          <i class="el-icon-picture-outline-round"></i>
          <span>轮播图</span>
        </el-menu-item>
        <el-menu-item index="/box">
          <i class="el-icon-files"></i>
          <span slot="title">板块</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">更多</span>
        </el-menu-item>
        <el-menu-item index="4" v-for="(item, index) in 100" :key="index">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    console.log(this.$store);
  }
};
</script>
<style lang="less" scoped>
.logo{
    display:flex;
    align-items:center;
    padding:15px;
    // background:red;
    font-size: 12px;
    // border-bottom: 1px solid gray;
    justify-content:center;
    vertical-align:bottom
}
/deep/.el-menu{
    border-right:none
}
</style>