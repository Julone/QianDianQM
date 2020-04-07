import { format  } from "element-ui/lib/utils/date";
export const timeFormat = (val, param = 'yyyy/M/d HH:mm:ss') =>{
    console.log(new Date(val))
    return format(new Date(val),param)
};
