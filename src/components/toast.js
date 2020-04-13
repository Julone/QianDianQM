
import Vue from 'vue';
import {
    Message
} from 'element-ui'
import _ from '@/utils/other.js'
import './toast.less';
var myToast = function (msg, type = 'info') {
    var obj = {
        offset: 55,
        center: true,
        customClass: 'julone_toast_class',
        type: type == 'loading' ? 'info' : type,
        iconClass: type == 'loading' ? 'el-icon-loading' : null,
        duration: 2000,
        // showClose:true,
        offset: document.body.clientHeight / 3 * 2,
    }
    var temp = _.isObject(msg) ? msg : ({
        message: msg
    })
    myToast.closeAll();
    var inst = Message(Object.assign(obj, temp))
    
    clearAni(inst.$el);
    return inst
}
function clearAni($el){
    $el.style.transition = `opacity .3s,top .4s,transform .4s`;
    setTimeout(() => {
        $el.style.animation = `none`;
    }, 500)
}
var type = ['success', 'info', 'warning', 'error', 'loading', 'plain'];
for (let t of type) {
    myToast[t] = function (msg) {
        let temp = _.isObject(msg) ? msg : ({ message: msg })
        return myToast(temp, t)
    }
}
myToast.close = Message.close;
myToast.closeAll = Message.closeAll;
Vue.prototype.$toast = myToast
export default myToast