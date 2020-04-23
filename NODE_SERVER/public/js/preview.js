function init(){
    handleData([...data],function(){
        var swiper = new Swiper('.swiper-container',{
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    });
}
//sdfsa
window.onload = ()=>{
    init();
}
function handleData(data, callback){
    var result = data.reduce((t,el) => {
        el.ratio = document.body.clientWidth / el.baseWidth;
        el.baseWidth = document.body.clientWidth;
        el.baseHeight = el.baseHeight * el.ratio;
        switch (el.type) {
            case 'block': t += templateBlock(el);break;
            case 'lunbo': t += templateLunbo(el);break;
            case 'video': t += templateVideo(el);break;
            default:break;
        }
        return t;
    }, '')
    document.querySelector('#root').innerHTML = result;
    callback();
}
function templateLunbo(data){
    var source = document.querySelector('#lunboTemplate').innerHTML;
    var t = Handlebars.compile(source);
    data.lunboList.forEach(el=>{
        el.image = el.image.replace('/api/','/');
    })
    return t(data);
}
function templateBlock(data){
    data.bgUrl.url = data.bgUrl.url.replace('/api/','/');
    var source = document.querySelector('#blockTemplate').innerHTML;
    var t = Handlebars.compile(source);
    var ratio = data.ratio;
    // data.baseHeight = ratio * data.baseHeight;
    data.mapList.forEach(mel => {
        var { x, y, width, height } = mel;
        mel.x = (x * ratio);
        mel.y = (y * ratio);
        mel.width =  width * ratio;
        mel.height = height * ratio;
    })
    return t(data);
}
function templateVideo(data) {
    var source = document.querySelector('#videoTemplate').innerHTML;
    var t = Handlebars.compile(source);
    data.videoInfo.videoImage = data.videoInfo.videoImage.replace('/api/','/')
    return t(data);
}
