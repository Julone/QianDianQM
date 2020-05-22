export function appendNodes(target, nodes, clearOld = true){
    var t =  document.querySelector(target);
    if(clearOld) t.innerHTML = "";
    t.appendChild(nodes);
    return nodes;
}

export function scrollTo(target = 'body', {x = 0, y = 0}){
    var domElement = document.querySelector(target);
    domElement.scrollTo({
        top: y,
        left: x,
        behavior: "smooth"
    });
}
export function addStyle(content,target = 'head'){
    var css = document.createElement('style');
    css.innerHTML = content;
    document.querySelector(target).appendChild(css);
    return css;
}

export function randomString(limit = 8 ){
    var pool = /abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890/;
    var pLen = pool.length;
    var output = '';
 　　for (i = 0; i < limit; i++) {
        output += pool.charAt(Math.floor(Math.random() * pLen));
 　　}
 　 return output;
}

export function eventDelegate (parentSelector, targetSelector, events, foo) {
    function triFunction (e) {
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var currentTarget = event.currentTarget;
      if (!Element.prototype.matches) {
        Element.prototype.matches =
          Element.prototype.matchesSelector ||
          Element.prototype.mozMatchesSelector ||
          Element.prototype.msMatchesSelector ||
          Element.prototype.oMatchesSelector ||
          Element.prototype.webkitMatchesSelector ||
          function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
              i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;            
          };
      }
      while (target !== currentTarget) {
        if (target.matches(targetSelector)) {
          var sTarget = target;
          foo.call(sTarget, Array.prototype.slice.call(arguments))
        }
        target = target.parentNode;
      }
    }
    // 如果有多个事件的话需要全部一一绑定事件
    events.split('.').forEach(function (evt) {
      // 多个父层元素的话也需要一一绑定
      Array.prototype.slice.call(document.querySelectorAll(parentSelector)).forEach(function ($p) {
        $p.addEventListener(evt, triFunction);
      });
    });
  }
