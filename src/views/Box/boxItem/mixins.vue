<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import be from "./mixins-block";
import le from "./mixin-lunbo";
import list from "./mixin-list";
export default {
  mixins: [be, le,list],
  provide() {
    return {
      innerData: {
        boxID: this.boxID,
        bgSrc: this.bgSrc
      }
    };
  },
  watch: {
    bgSrc(val) {
      this.refreshID = Date.now();
    },
    baseWidth() {
      this.refreshID = Date.now();
    },
    mapListCount(newVal, oldVal) {
      // this.mapActiveID = -1;
    },
  },
  methods: {
    ...mapMutations([
      "ADD_BOX_MAP",
      "DRAG_BOX_MAP",
      "CHANGE_BASE_WIDTH",
      "RESIZE_BOX_MAP",
      "REMOVE_BOX_MAP",
      "ADD_BOXLIST_ITEM",
      "UP_BOXLIST_ITEM",
      "DOWN_BOXLIST_ITEM",
      "REMOVE_BOXLIST_ITEM",
      "SET_BOX_ACTIVE_ID",
      "SET_MAP_ACTIVE_ID",
      "SET_LUNBO_ACTIVE_ID"
    ]),
    ...mapActions([
      'SCROLL_TO_BOXID'
    ])
  },
  computed: {
    ...mapGetters([
      "activeMapItem",
      "lunboActiveList",
      "boxActiveItem",
      "boxActiveID",
      "getTypeLabelList"
    ]),
    hasVideoImage(){
      return this.boxData.videoInfo.videoImage
    },
    boxType() {
      return this.boxData.type;
    },
    isActive() {
      return this.boxActiveID === this.boxID;
    },
    baseWidth: {
      get() {
        return this.$store.getters.baseWidth;
      },
      set(val) {
        this.$store.commit("CHANGE_BASE_WIDTH", {
          boxID: this.boxID,
          baseWidth: val
        });
      }
    },
    baseHeight: {
      get() {
        return this.$store.getters.baseHeight(this.boxID);
      },
      set(val) {
        this.$store.commit("CHANGE_BASE_HEIGHT", {
          boxID: this.boxID,
          baseHeight: val
        });
      }
    }
  }
};
</script>