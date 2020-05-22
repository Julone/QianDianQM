<template>
  <div style="width:100%;height:100%; display:flex;flex-flow:column nowrap">
    <el-menu
      router
      :default-active="$route.path"
      style="display:flex;flex:none"
      class="el-menu-demo"
      mode="horizontal"
    >
      <div style="width:50px" class="flex-center">
        <img src="./../../assets/logo.svg" width="40" alt />
      </div>
      <el-menu-item index="/box/template">模板中心</el-menu-item>
      <el-menu-item index="/box/picture">图片中心</el-menu-item>
      <el-menu-item index="/box/block">板块中心</el-menu-item>
      <el-menu-item
        id="menuExtend"
        style="width:50%;flex:1;display:flex;justify-content:flex-end;align-items:center"
      ></el-menu-item>
    </el-menu>
    <div class="main-content" ref="mainContent" style="flex:1;overflow-x:hidden;">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {};
</script>
