<template>
    <div :class="[$style.container]">
        <c1></c1>
        <input type="text" v-model="this.item">
        data =>> {{this.item}}
        <br>
          <p class="red blued">
    This should be red
  </p>
  !!{{dataindata}}
        <i  :class="[{ 'el-table--fit': fit },'sdf']" :style="[body]">{{data}}</i>
    </div>
</template>
<style lang="less" module src="./index.less">
</style>
<script>
export default {
    data(){
        return{
            data: [1,2,3],
            fit:true,
            body:{
                background:'red'
            },
            item:23,
            dataindata:'sddf   dfas '
        }
    },
    provide(){
        return {
            datas: this.data
        }
    },
    methods:{
        
    },
    mounted(){
        console.log(this.$style);
        for(let el in [1,2,2]){
            console.log(el);
        }
        // this.$style.red = 'color:blue'
    },
    components:{
        c1:{
            template:`<c2/>`,
            components:{
                c2:{
                    template:'<div>{{datas}}</div>',
                    inject:['datas'],
                    mounted(){
                        this.datas.push('23')
                        console.log(this.datas);
                    }
                }
            }
        }
    }
}
</script>

