<script>
export default {
  data(){
    return {
      showBG: true,
      dragBool: false,
      startXY: {
        x: 0,
        y: 0
      },
      controllStart: false,
    }
  },
  computed:{
    bgSrc() {
      return this.boxData.bgUrl.url;
    },
    mapActiveID: {
      get() {
        return this.$store.getters.mapActiveID;
      },
      set(val) {
        this.$store.commit("SET_MAP_ACTIVE_ID", val);
      }
    },
    mapList() {
      return this.boxData.mapList;
    },
    mapListCount() {
      return this.boxData.mapList.length;
    },
  },
  mounted() {
    document.body.addEventListener("keydown", this.keyEvents);
  },
   destroyed() {
    document.body.removeEventListener("keydown", this.keyEvents);
  },
  methods: {
    finishLoadImage(e) {
      this.baseHeight = e.target.height;
    },
    mousedown(e) {
      this.SET_BOX_ACTIVE_ID(this.boxID);
      if (!this.dragBool && this.bgSrc) {
        this.dragBool = true;
        this.startXY = { x: e.offsetX, y: e.offsetY };
        this.dragEle = document.createElement("div");
        this.dragEle.classList.add("dragElement");
        Object.assign(this.dragEle.style, {
          left: e.offsetX + "px",
          top: e.offsetY + "px",
          width: 0,
          height: 0
        });
        this.$refs.dragArea.appendChild(this.dragEle);
      }
    },
    mousemove(e) {
      if (this.dragBool) {
        var w = e.offsetX - this.startXY.x;
        var h = e.offsetY - this.startXY.y;
        if( w < 0 && h > 0 ){ //西南
          this.dragEle.style.left =e.offsetX + "px";
        }
        if(w>0 && h > 0){ //东南
        }
        if(w>0 && h<0){ //东北
          this.dragEle.style.top = e.offsetY + "px";
        }
        if(w<0 && h<0){ //西北
          this.dragEle.style.left = e.offsetX + "px";
          this.dragEle.style.top = e.offsetY + "px";
        }
        this.dragEle.style.width = Math.abs(w) + "px";
        this.dragEle.style.height = Math.abs(h) + "px";
        var classList = this.dragEle.classList;
        (Math.abs(w) > 20 && Math.abs(h) > 20 ? classList.add("enabled") : classList.remove("enabled"))
        this.$refs.dragArea.style.zIndex = 10;
      }
    },
    mouseup(e) {
      e.stopPropagation()
      if (this.dragBool) {
        var { top, left, width: w = 0, height: h = 0 } = this.dragEle.style;
        var x = parseInt(left),
          y = parseInt(top),
          width = parseInt(w),
          height = parseInt(h);
        this.ADD_BOX_MAP({ x, y, width, height });
        this.$refs.dragArea.style.zIndex = 0;
        this.$refs.dragArea.innerHTML = "";
        this.dragBool = false;
      }
    },
    keyEvents(e) {
      // console.log(e);
      // e.stopPropagation();
      if (this.activeMapItem) {
        var { x, y, width, height } = this.activeMapItem;
        switch (e.keyCode) {
          case 8:
          case 46:
            return this.REMOVE_BOX_MAP({
              mapID: this.mapActiveID,
              boxID: this.boxID
            }); //shanchu
          case 38:
            return this.DRAG_BOX_MAP({
              mapID: this.mapActiveID,
              boxID: this.boxID,
              x,
              y: y - 10
            }); //UP
          case 40:
            return this.DRAG_BOX_MAP({
              mapID: this.mapActiveID,
              boxID: this.boxID,
              x,
              y: y + 10
            }); //DOWN
          case 37:
            return this.DRAG_BOX_MAP({
              mapID: this.mapActiveID,
              boxID: this.boxID,
              x: x - 10,
              y
            }); //LEFT
          case 39:
            return this.DRAG_BOX_MAP({
              mapID: this.mapActiveID,
              boxID: this.boxID,
              x: x + 10,
              y
            }); //RIGHT
          case 17:
            return this.controllStart = true; //CONTROL
        }
      }
    }
  }
};
</script>