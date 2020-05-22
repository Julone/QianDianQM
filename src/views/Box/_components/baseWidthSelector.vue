<template>
  <el-popover placement="right-end" :title="`当前板块宽度:${baseWidth}px`" width="300" trigger="hover">
    <slot slot="reference" :baseWidth="baseWidth">
    </slot>
    <el-slider
      v-model="baseWidth"
      :step="50"
      :min="400"
      :max="750"
      :format-tooltip="v=>v+'px'"
      :marks="marks"
      show-input
      show-stops
    ></el-slider>
  </el-popover>
</template>
<script>
export default {
  props: ["global", "boxID"],
  data() {
    return {
      marks: {
        0: "0°C",
        8: "8°C",
        37: "37°C",
        50: {
          style: {
            color: "#1989FA"
          },
          label: this.$createElement("strong", "50%")
        }
      }
    };
  },
  computed: {
    baseWidth: {
      get() {
        return this.$store.getters.baseWidth;
      },
      set(val) {
        this.$store.commit("CHANGE_BASE_WIDTH", {
          boxID: null,
          baseWidth: val
        });
      }
    }
  }
};
</script>