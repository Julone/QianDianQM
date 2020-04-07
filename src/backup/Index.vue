<script>
  import data from './data.js'
  // import { url } from 'inspector';
  export default {
    mounted() {
      // console.log(data); 
    },
    methods: {
      defaultJump(url) { //默认跳转
        this.$router.push(url);
      },
      complexJump({url,params,query,name}){ //复杂跳转
        this.$router.push({url,params,query});
      },
      info(params) {//自定义事件
        return new Promise((res,rej) => {
            setTimeout(() => {
              res(params)
            },1000)
        }).then(r=>{
          alert(JSON.stringify(r));;
        })
      },
      handleEvent(item){
        if(!item.events) return { //如果没有自定义事件
          click: this.defaultJump.bind(this,item.url) //默认跳转
        };
        let list = {};
        for(let e in item.events){
          let {funName,data} =item.events[e]; 
          list[e] = () => this[funName](data); //将事件和参数进行板顶进行绑定
        }
        return list;
      },
      handleChildren(children,createElement){ //处理点击区域模块
          let arr = [];
          for(let el in children){ //遍历子元素
            let hasChild, curItem = children[el];
            if(curItem.children) { //如果有子元素内还有子元素
              hasChild= this.handleChildren(curItem.children,createElement);//递归自己，结果用于39行
            }
            let node = createElement(curItem.tag || 'div',{
              style: curItem.css,//绑定样式
              class: curItem.className,//绑定类名
              on:  this.handleEvent(curItem)//绑定事件
            },hasChild);//绑定内部元素
            arr.push(node)//将结果推给数组中
          }
          return arr;//返回递归结果
      }
    },
    render(createElement) {
      return createElement('div',{te},this.handleChildren(data,createElement))
    }
  }
</script>
<style lang="less">
  a{
    background: rgba(255,0,0,.1);
    border: 1px solid blue;
  }
  .item{
    background-position:left top;
    background-size:100% 100%;
    background-repeat:no-repeat;
    position: relative;
  }
</style>