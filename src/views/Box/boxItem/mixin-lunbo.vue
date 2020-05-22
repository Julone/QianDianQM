<script>
import { mapState,mapGetters } from 'vuex'
export default {
  data() {
    return {
      swiperOptionTop: {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
           autoHeight: true,
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    };
  },
  watch:{
    boxType(val,old){
      this.boxData.baseHeight = 100;
    },
     lunboList(val,old){
       console.log(this.boxData);
       if(this.boxData.type != 'lunbo') return;
       this.$nextTick(()=>{
        let swiperTop = this.$refs.swiperTop.swiper
          this.lunboActiveID = this.lunboList[swiperTop.activeIndex].id;
       })
    }
  },
  methods:{
      slideChange(){ 
        let swiperTop = this.$refs.swiperTop.swiper
        this.lunboActiveID = this.lunboList[swiperTop.activeIndex].id;
      },
      swiperLinked(){
          let swiperTop = this.$refs.swiperTop.swiper
          let swiperThumbs = this.$refs.swiperThumbs.swiper
          swiperTop.controller.control = swiperThumbs
          swiperThumbs.controller.control = swiperTop;
      }
  },
  
  computed:{
    ...mapGetters(['lunboActiveID']),
    lunboList(){
      return this.boxData.lunboList;
    },
    lunboListCount(){
      return this.boxData.lunboList.length;
    },
    hasLunboImage(){
      if(this.lunboListCount){
        return this.lunboList[0].image
      }else{
        return ""
      }
    },
   
    lunboActiveID:{
      get(){
        return this.$store.state.box.lunboActiveID
      },
      set(val){
        if(this.lunboList.length)
        return this.$store.commit('SET_LUNBO_ACTIVE_ID',val)
      }
    }

  }
};
</script>