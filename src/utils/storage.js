const keyName = 'julone-';
/**
 * 判断是否为空
 */
export function validatenull (val) {
    if (typeof val === 'boolean') {
      return false
    }
    if (typeof val === 'number') {
      return false
    }
    if (val instanceof Array) {
      if (val.length == 0) return true
    } else if (val instanceof Object) {
      if (JSON.stringify(val) === '{}') return true
    } else {
      if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true
      return false
    }
    return false
  }
  
export const setStorage = (params = {}) => {
  let {
    name,
    content,
    type,
  } = params;
  name = keyName + name
  let obj = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: new Date().getTime()
  }
  if (type == 'session') window.sessionStorage.setItem(name, JSON.stringify(obj));
  else window.localStorage.setItem(name, JSON.stringify(obj));
}
/**
 * 获取localStorage
 */

export const getStorage = (params = {}) => {
  let {
    name,
    debug
  } = params;
  name = keyName + name
  let obj = {},
    content;
  obj = window.sessionStorage.getItem(name);
  if (validatenull(obj)) obj = window.localStorage.getItem(name);
  if (validatenull(obj)) return;
  try {
    obj = JSON.parse(obj);
  } catch(err){
    return obj;
  }
  if (debug) {
    return obj;
  }
  if (obj.dataType == 'string') {
    content = obj.content;
  } else if (obj.dataType == 'number') {
    content = Number(obj.content);
  } else if (obj.dataType == 'boolean') {
    content = eval(obj.content);
  } else if (obj.dataType == 'object') {
    content = obj.content;
  }
  return content;
}
/**
 * 删除localStorage
 */
export { removeStorage as delStorage, removeStorage }
var removeStorage = (params = {}) => {
  let {
    name,
    type
  } = params;
  name = keyName + name
  if (type == 'session') {
    window.sessionStorage.removeItem(name);
  } else {
    window.localStorage.removeItem(name);
  }

}

/**
 * 获取全部localStorage
 */
export const getAllStorage = (params = {}) => {
  let list = [];
  let {
    type
  } = params;
  if (type == 'session') {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStorage({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStorage({
          name: window.localStorage.key(i),
        })
      })
    }
  }
  return list;
}

/**
 * 清空全部localStorage
 */
export const clearStorage = (params = {}) => {
  let { type } = params;
  if (type == 'session') {
    window.sessionStorage.clear();
  } else {
    window.localStorage.clear()
  }

}
