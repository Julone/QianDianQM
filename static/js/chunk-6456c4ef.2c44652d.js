(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6456c4ef"],{"88d2":function(t,e,i){"use strict";i.r(e),i("1a8c"),i("4423");var s=i("08c1"),o=i("b54b"),n={data:function(){return{showBG:!0,dragBool:!1,startXY:{x:0,y:0},controllStart:!1}},computed:{bgSrc:function(){return this.boxData.bgUrl.url},mapActiveID:{get:function(){return this.$store.getters.mapActiveID},set:function(t){this.$store.commit("SET_MAP_ACTIVE_ID",t)}},mapList:function(){return this.boxData.mapList},mapListCount:function(){return this.boxData.mapList.length}},mounted:function(){document.body.addEventListener("keydown",this.keyEvents)},destroyed:function(){document.body.removeEventListener("keydown",this.keyEvents)},methods:{finishLoadImage:function(t){this.baseHeight=t.target.height},mousedown:function(t){this.SET_BOX_ACTIVE_ID(this.boxID),!this.dragBool&&this.bgSrc&&(this.dragBool=!0,this.startXY={x:t.offsetX,y:t.offsetY},this.dragEle=document.createElement("div"),this.dragEle.classList.add("dragElement"),Object.assign(this.dragEle.style,{left:t.offsetX+"px",top:t.offsetY+"px",width:0,height:0}),this.$refs.dragArea.appendChild(this.dragEle))},mousemove:function(t){if(this.dragBool){var e=t.offsetX-this.startXY.x,i=t.offsetY-this.startXY.y;e<0&&0<i&&(this.dragEle.style.left=t.offsetX+"px"),0<e&&i<0&&(this.dragEle.style.top=t.offsetY+"px"),e<0&&i<0&&(this.dragEle.style.left=t.offsetX+"px",this.dragEle.style.top=t.offsetY+"px"),this.dragEle.style.width=Math.abs(e)+"px",this.dragEle.style.height=Math.abs(i)+"px";var s=this.dragEle.classList;20<Math.abs(e)&&20<Math.abs(i)?s.add("enabled"):s.remove("enabled"),this.$refs.dragArea.style.zIndex=10}},mouseup:function(t){if(t.stopPropagation(),this.dragBool){var e=this.dragEle.style,i=e.top,s=e.left,o=e.width,n=void 0===o?0:o,a=e.height,r=void 0===a?0:a,l=parseInt(s),u=parseInt(i),c=parseInt(n),d=parseInt(r);this.ADD_BOX_MAP({x:l,y:u,width:c,height:d}),this.$refs.dragArea.style.zIndex=0,this.$refs.dragArea.innerHTML="",this.dragBool=!1}},keyEvents:function(t){if(this.activeMapItem){var e=this.activeMapItem,i=e.x,s=e.y;switch(e.width,e.height,t.keyCode){case 8:case 46:return this.REMOVE_BOX_MAP({mapID:this.mapActiveID,boxID:this.boxID});case 38:return this.DRAG_BOX_MAP({mapID:this.mapActiveID,boxID:this.boxID,x:i,y:s-10});case 40:return this.DRAG_BOX_MAP({mapID:this.mapActiveID,boxID:this.boxID,x:i,y:s+10});case 37:return this.DRAG_BOX_MAP({mapID:this.mapActiveID,boxID:this.boxID,x:i-10,y:s});case 39:return this.DRAG_BOX_MAP({mapID:this.mapActiveID,boxID:this.boxID,x:i+10,y:s});case 17:return this.controllStart=!0}}}}},a=i("623f"),r=Object(a.a)(n,void 0,void 0,!1,null,null,null).exports,l={data:function(){return{swiperOptionTop:{spaceBetween:10,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"fraction"},autoHeight:!0},swiperOptionThumbs:{spaceBetween:10,centeredSlides:!0,slidesPerView:"auto",touchRatio:.2,slideToClickedSlide:!0}}},watch:{boxType:function(){this.boxData.baseHeight=100},lunboList:function(){var t=this;"lunbo"==this.boxData.type&&this.$nextTick((function(){var e=t.$refs.swiperTop.swiper;t.lunboActiveID=t.lunboList[e.activeIndex].id}))}},methods:{slideChange:function(){var t=this.$refs.swiperTop.swiper;this.lunboActiveID=this.lunboList[t.activeIndex].id},swiperLinked:function(){var t=this.$refs.swiperTop.swiper,e=this.$refs.swiperThumbs.swiper;(t.controller.control=e).controller.control=t}},computed:Object(o.a)({},Object(s.c)(["lunboActiveID"]),{lunboList:function(){return this.boxData.lunboList},lunboListCount:function(){return this.boxData.lunboList.length},hasLunboImage:function(){return this.lunboListCount?this.lunboList[0].image:""},lunboActiveID:{get:function(){return this.$store.state.box.lunboActiveID},set:function(t){if(this.lunboList.length)return this.$store.commit("SET_LUNBO_ACTIVE_ID",t)}}})},u={data:function(){return{listDragFlag:!1,listX:0}},created:function(){},watch:{listDragFlag:function(t){t||this.scrollToTop()}},methods:{listScroll:function(t){switch(t.preventDefault(),t.wheelDelta<0?"down":"up"){case"up":this.listX+=120;break;case"down":this.listX-=120}this.scrollToTop(!1)},listDragStart:function(t){this.listDragFlag=!0,this.listXY={x:t.pageX},this.prev=this.listX},listDrag:function(t){this.listDragFlag&&(this.listX=this.prev+t.pageX-this.listXY.x)},scrollToTop:function(t){var e=!(0<arguments.length&&void 0!==t)||t,i=this.$refs.itemList,s=this.baseWidth,o=getComputedStyle(i).width;o=parseInt(o),0<this.listX&&(e||(this.listX=0),this.listX=this.listX-10,window.requestAnimationFrame(this.scrollToTop)),this.listX<=s-o-100&&(e||(this.listX=s-o-100),this.listX=this.listX+10,window.requestAnimationFrame(this.scrollToTop))},listDragEnd:function(){this.listDragFlag&&(this.listDragFlag=!1)}},computed:{hasListItem:function(){return this.boxData.listDetail&&this.boxData.listDetail.length}}},c={mixins:[r,Object(a.a)(l,void 0,void 0,!1,null,null,null).exports,Object(a.a)(u,void 0,void 0,!1,null,null,null).exports],provide:function(){return{innerData:{boxID:this.boxID,bgSrc:this.bgSrc}}},watch:{bgSrc:function(){this.refreshID=Date.now()},baseWidth:function(){this.refreshID=Date.now()},mapListCount:function(){}},methods:Object(o.a)({},Object(s.d)(["ADD_BOX_MAP","DRAG_BOX_MAP","CHANGE_BASE_WIDTH","RESIZE_BOX_MAP","REMOVE_BOX_MAP","ADD_BOXLIST_ITEM","UP_BOXLIST_ITEM","DOWN_BOXLIST_ITEM","REMOVE_BOXLIST_ITEM","SET_BOX_ACTIVE_ID","SET_MAP_ACTIVE_ID","SET_LUNBO_ACTIVE_ID"]),{},Object(s.b)(["SCROLL_TO_BOXID"])),computed:Object(o.a)({},Object(s.c)(["activeMapItem","lunboActiveList","boxActiveItem","boxActiveID","getTypeLabelList"]),{hasVideoImage:function(){return this.boxData.videoInfo.videoImage},boxType:function(){return this.boxData.type},isActive:function(){return this.boxActiveID===this.boxID},baseWidth:{get:function(){return this.$store.getters.baseWidth},set:function(t){this.$store.commit("CHANGE_BASE_WIDTH",{boxID:this.boxID,baseWidth:t})}},baseHeight:{get:function(){return this.$store.getters.baseHeight(this.boxID)},set:function(t){this.$store.commit("CHANGE_BASE_HEIGHT",{boxID:this.boxID,baseHeight:t})}}})},d={mixins:[Object(a.a)(c,void 0,void 0,!1,null,null,null).exports],props:["boxID","boxData"],data:function(){return{refreshID:Date.now(),video_dialogVisible:!1}},methods:{test:function(){alert(1)},onActivated:function(t){var e=this;switch(this.SET_BOX_ACTIVE_ID(this.boxID),this.boxData.type){case"block":this.SET_MAP_ACTIVE_ID(t);break;case"lunbo":this.boxData.lunboList.map((function(t){return t.id})).some((function(t){return t==e.lunboActiveID}))||this.SET_LUNBO_ACTIVE_ID(this.boxData.lunboList.length?this.boxData.lunboList[0].id:-1)}},onDeactivated:function(){this.SET_MAP_ACTIVE_ID(-1)}}},h=(i("9dbc"),Object(a.a)(d,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("li",{key:t.refreshID,ref:"boxRef",staticClass:"item",style:{width:t.baseWidth+"px"}},[i("div",{staticClass:"title"},[i("div",{staticClass:"left"},[i("el-tag",{attrs:{size:"mini",effect:"plain",type:t.getTypeLabelList(t.boxData.type).type}},[t._v(" "+t._s(t.getTypeLabelList(t.boxData.type).label))]),i("span",{staticStyle:{"margin-left":"10px"}},[t._v("ID: "+t._s(t.boxID))])],1),i("div",{staticClass:"right"},[i("div",[i("el-button-group",[i("el-button",{attrs:{plain:"",round:"",size:"mini",icon:"el-icon-top"},on:{click:function(e){e.stopPropagation(),t.UP_BOXLIST_ITEM(t.boxID),t.SCROLL_TO_BOXID(t.boxID)}}}),i("el-button",{attrs:{plain:"",round:"",size:"mini",icon:"el-icon-bottom"},on:{click:function(e){e.stopPropagation(),t.DOWN_BOXLIST_ITEM(t.boxID),t.SCROLL_TO_BOXID(t.boxID)}}})],1),i("el-divider",{attrs:{direction:"vertical"}}),i("el-button",{attrs:{plain:"",circle:"",type:"danger",size:"mini",icon:"el-icon-close"},on:{click:function(e){return e.stopPropagation(),t.REMOVE_BOXLIST_ITEM(t.boxID)}}})],1)])]),i("div",{staticClass:"body",style:{width:t.baseWidth+"px",height:"auto",minHeight:t.baseHeight+"px"}},[t.bgSrc||t.hasLunboImage||t.hasVideoImage||t.hasListItem||t.isActive?i("div",["block"==t.boxType?i("figure",{staticClass:"mapModule",style:{width:t.baseWidth+"px",height:t.baseHeight+"px"}},[i("div",{ref:"dragArea",staticClass:"dragArea",on:{mouseup:[t.onDeactivated,function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.mouseup(e)}],contextmenu:function(t){t.preventDefault(),t.stopPropagation()},mouseleave:t.mouseup,mousedown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.mousedown(e)},mousemove:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.mousemove(e)}}}),t._l(t.mapList,(function(e){return i("vue-draggable-resizable",{key:e.id,class:{"vdr-active":e.id==t.mapActiveID},attrs:{w:e.width,h:e.height,x:e.x,y:e.y,parent:!0,"min-height":5,"min-width":5},on:{dragging:function(i,s){return t.DRAG_BOX_MAP({x:i,y:s,mapID:e.id,boxID:t.boxID})},resizing:function(i,s,o,n){return t.RESIZE_BOX_MAP({x:i,y:s,width:o,height:n,mapID:e.id,boxID:t.boxID})}}},[i("div",{staticClass:"vdr-inner",on:{contextmenu:[function(t){t.preventDefault(),t.stopPropagation()},function(i){return i.stopPropagation(),t.REMOVE_BOX_MAP({mapID:e.id,boxID:t.boxID})}],click:function(i){return!i.type.indexOf("key")&&t._k(i.keyCode,"left",37,i.key,["Left","ArrowLeft"])||"button"in i&&0!==i.button?null:(i.stopPropagation(),t.onActivated(e.id))}}},[e.id==t.mapActiveID?i("i",{staticClass:"el-icon-delete",on:{click:function(i){return t.REMOVE_BOX_MAP({mapID:e.id,boxID:t.boxID})}}}):t._e(),i("i",{class:{"el-icon-check":e.action.type},style:{fontSize:e.height/2+"px"}}),i("span",{style:{fontSize:e.height/2+"px"}},[t._v(t._s(e.id))])])])})),t.bgSrc?i("img",{staticClass:"box_bg_image",attrs:{src:t.bgSrc,width:"100%",alt:t.bgSrc},on:{mousedown:function(t){t.preventDefault()},load:t.finishLoadImage}}):t._e()],2):"lunbo"==t.boxType?i("div",{staticClass:"lunboModule",style:{width:t.baseWidth+"px",minHeight:t.baseHeight+"px"},on:{click:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:(e.stopPropagation(),t.onActivated())}}},[i("swiper",{ref:"swiperTop",attrs:{options:t.swiperOptionTop},on:{slideChange:t.slideChange}},[t._l(t.lunboList,(function(e){return i("swiper-slide",{key:e.image,attrs:{"data-id":e.id},nativeOn:{click:function(e){return t.slideChange(e)}}},[i("img",{staticClass:"lunbo_image",attrs:{src:e.image,width:"100%",alt:""},on:{load:t.finishLoadImage}})])})),i("div",{staticClass:"swiper-button-next swiper-button-white",attrs:{slot:"button-next"},slot:"button-next"}),i("div",{staticClass:"swiper-button-prev swiper-button-white",attrs:{slot:"button-prev"},slot:"button-prev"}),i("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2),i("swiper",{directives:[{name:"show",rawName:"v-show",value:t.isActive,expression:"isActive"}],ref:"swiperThumbs",staticClass:"swiper gallery-thumbs",attrs:{options:t.swiperOptionThumbs},on:{ready:t.swiperLinked}},t._l(t.lunboList,(function(e){return i("swiper-slide",{key:e.image,style:{width:t.baseWidth/4+"px"}},[i("img",{attrs:{src:e.image,width:"100%",alt:""}})])})),1)],1):"video"==t.boxType?i("div",{staticClass:"videoModule",style:{width:t.baseWidth+"px",minHeight:t.baseHeight+"px"}},[t.boxData.videoInfo.videoImage?i("el-image",{staticClass:"box_bg_image",attrs:{src:t.boxData.videoInfo.videoImage,width:"100%",alt:t.bgSrc},on:{mousedown:function(t){t.preventDefault()},load:t.finishLoadImage}}):t._e(),i("el-dialog",{attrs:{title:"视频预览","append-to-body":"",center:"",visible:t.video_dialogVisible,width:"45%"},on:{"update:visible":function(e){t.video_dialogVisible=e}}},[t.video_dialogVisible?i("video",{attrs:{src:t.boxData.videoInfo.videoURL,controls:"",autoplay:"",loop:"",width:"100%"}}):t._e()]),i("div",{staticClass:"play_btn"},[i("div",{staticClass:"el-icon-video-play",style:{fontSize:t.baseHeight/2+"px"},on:{click:function(e){t.video_dialogVisible=!0}}})])],1):"list"==t.boxType?i("div",{staticClass:"listModule",style:{width:t.baseWidth+"px",minHeight:t.baseHeight+"px"},attrs:{id:"listModule"}},[i("div",{staticClass:"itemListContainer"},[i("div",t._b({ref:"itemList",staticClass:"itemList",style:{transform:"translate("+t.listX+"px, 0)"},on:{mousewheel:function(e){return t.listScroll(e)},mousedown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.listDragStart(e)},mousemove:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.listDrag(e)},mouseup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||"button"in e&&0!==e.button?null:t.listDragEnd(e)},mouseleave:function(e){t.listDragFlag=!1}}},"div",{"data-x":0},!1),t._l(t.boxData.listDetail,(function(t){return i("div",{key:t.img,staticClass:"item",style:{backgroundImage:"url("+t.img+")"}})})),0)]),i("div",{staticClass:"itemCountBack"}),i("span",{staticClass:"itemCount"},[t._v(t._s(t.boxData.listDetail.length))])]):i("div",[t._v("未知板块")])]):i("div",{staticClass:"placeholder"},[i("el-button",{attrs:{round:"",plain:"",icon:"el-icon-check"}},[t._v("开始配置")])],1)])])}),[],!1,null,null,null));e.default=h.exports},"9dbc":function(t,e,i){"use strict";var s=i("a57c");i.n(s).a},a57c:function(t,e,i){}}]);