import vue from 'vue';
import {
    addStyle
} from './dom';

var previewFunction = (el, binding) => {
    el.__container = document.querySelector("#previewIMG");
    if (!el.__container) {
        el.__container = document.createElement("div");
        el.__container.id = "previewIMG";
        el.__container.innerHTML = "<img />";
        document.body.appendChild(el.__container);
        addStyle(`
                #previewIMG { position: fixed; top: 20px; min-height: 200px; pointer-events: none; z-index:100000; height: auto; width: auto;left: 20px; opacity: 0; transition: all ease-out .4s; }
                #previewIMG.active{ opacity: 1; }
                #previewIMG.rightPos{ left: unset; right: 20px;; }
                #previewIMG img { max-height: 80vh; max-width: 50vw; box-shadow: 0px 12px 14px -9px #767676; display: block; border-radius: 5px; border: 5px solid rgb(64,158,255); border-image: linear-gradient(240deg,rgb(43, 235, 228),rgb(64,158,255)) 1 stretch; }
            `, `#${el.__container.id}`);
    }
    el.addEventListener("mouseover", e => {
        var x = e.clientX;
        var w = document.body.clientWidth;
        el.__container.classList[x / w < 0.5 ? 'add' : 'remove']('rightPos');
        var img = document.createElement("img");
        img.src = binding.value;
        img.onload = () => {
            var innerImg = el.__container.querySelector("img");
                innerImg.src = binding.value;
                innerImg.style.maxWidth = binding.modifiers.small? '40vw': binding.modifiers.medium? '45vw':'50vw'
        };
        el.__container.classList.add("active");
    });
    el.addEventListener("mouseout", e => {
        el.__container.classList.remove("active");
    });
}

vue.directive('preview', {
    bind(el, binding) {
        previewFunction(el, binding);
        console.log('v-preview bind');
    },
    unbind(el,binding){
        el.__container.classList.remove('active');
    }
})