import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/box',
  },
  {
    path: '/box',
    component: () => import('@/views/Box/index-container.vue'),
    children: [{
      path: '',
      component: () => import('@/views/Box/index-wrapper.vue'),
      children: [{
          path: '',
          redirect: '/box/block'
        },
        {
          path: 'block',
          component: () => import('@/views/Box/module/block.vue'),
          children: [{
            path: 'dialog',
            name: 'dialog',
            component: () => import('@/views/Box/toolBar/dialog_coupon.vue'),
          }]
        },
        {
          path: 'picture',
          component: () => ({
            component: import('@/views/Box/module/picture.vue'),
            // loading: `<div>loading</div>`,
            // error: `<div>loading</div>`,
            // delay: 200,
            // timeout: 3000
          })
        },
        {
          path: 'template',
          component: () => import('@/views/Box/module/template.vue'),
        }
      ]

    }]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router