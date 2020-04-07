<script>
  export default {
    data() {
      return {
        listDragFlag: false,
        listX: 0
      }
    },
    created(){

    },
    watch:{
listDragFlag(val){
  if(!val){
    this.scrollToTop();
  }

}
    },
    methods: {
      listScroll(e) {
        e.preventDefault();
        var direction = e.wheelDelta < 0 ? "down" : "up";
        var scrollDistance = 120
        switch (direction) {
          case "up": {
           this.listX += scrollDistance
          };
          break;
        case "down": {
          this.listX -= scrollDistance
        }
        break;
        };
        this.scrollToTop(false);
      },
      listDragStart(e) {
        this.listDragFlag = true;
        this.listXY = {
          x: e.pageX
        }
        this.prev = this.listX
        // console.log(arguments);
      },
      listDrag(e) {
        if (this.listDragFlag) {
          this.listX = this.prev + e.pageX - this.listXY.x;
          // this.handleDistance(e.pageX - this.listXY.x)
          // console.log(e.pageX - this.listXY.x);
          //  var listItem = this.$refs.itemList;
          // listItem.dataset.x = (e.pageX - this.listXY.x) 
          // listItem.style.transform = `translate(${listItem.dataset.x}px,0)`
        }
        // console.log(arguments);

      },
      scrollToTop(aniBool = true) {
        var listItem = this.$refs.itemList;
        var outterWidth = this.baseWidth;
        var {
          width: innerWidth
        } = getComputedStyle(listItem);
        innerWidth = parseInt(innerWidth);
        // if(this.listX > 0) this.scrollToTop(this.listX, 0);
        // if(this.listX <= outterWidth - innerWidth ){
        //   this.listX = outterWidth - innerWidth - 100;
        // }
        if (this.listX > 0) {
          console.log(1);
          if(!aniBool){ this.listX = 0}
          this.listX = this.listX - 10;
          
          window.requestAnimationFrame(this.scrollToTop);
        }
        if (this.listX <= outterWidth - innerWidth - 100) {
          {
            if(!aniBool){ this.listX = outterWidth - innerWidth - 100}
            this.listX = this.listX + 10;
            window.requestAnimationFrame(this.scrollToTop);
          }

        }
      },
      listDragEnd(e) {
        if (this.listDragFlag) {
          // console.log(e.pageX - this.listXY.x);
          this.listDragFlag = false;
          

        }
        // console.log(arguments);

      }
    },
    computed: {
      hasListItem() {
        return this.boxData.listDetail && this.boxData.listDetail.length

      }
    }
  };
</script>