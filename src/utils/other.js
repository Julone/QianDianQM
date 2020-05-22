import { format  } from "element-ui/lib/utils/date";
export const timeFormat = (val, param = 'yyyy/M/d HH:mm:ss') =>{
    return format(new Date(val),param)
};

export function isObject(target){
    return Object.prototype.toString.call(target) === '[object Object]'
}
export default {
    isObject
}
