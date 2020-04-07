import axios from 'axios'
export const getRouterList = ({queryString}) =>{
    return axios({
        method:'get',
        url: '/api/router-list',
        params: {
            queryString
        }
    })
}
export const postPreviewData = data => {
    
    return axios({
        method: 'post',
        url: '/api/api/postPreviewData',
        data: {data: data},
        
    })
}
export const getPreviewData = data => {
    return axios({
        method: 'get',
        url: '/api/api/getPreviewData',
    })
}
export const postTemplateData = ({data,title}) => {
    return axios({
        method: 'post',
        url: '/api/api/postTemplateData',
        data: {data,title},       
    })
}
export const getTemplateData = templateID => {
    return axios({
        method: 'get',
        url: '/api/api/getTemplateData',
        params: {
            templateID
        }
    })
}
export const getTemplateList = () => {
    return axios({
        method: 'get',
        url: '/api/api/getTemplateList'
    })
}
export const removeTemplate = (templateID)=>{
    return axios({
        method: 'post',
        url: "/api/api/removeTemplateByID",
        params: {
            templateID
        }
    })
}
export const updateTemplate = (templateID,data) => { 
    return axios({
        method: 'post',
        url: "/api/api/updateTemplate",
        data:{
            data,
            templateID,

        }
    })
}
export const getShopitemList = (params={})=>{
    return axios({
        url:'http://localhost:3000/api/getShopitemList',
        method: 'get',
        params
    })
}