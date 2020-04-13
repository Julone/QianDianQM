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
          name: 'block',
          component: () => import('@/views/Box/module/block.vue'),
          children: [{
            path: 'dialog',
            name: 'dialog',
            component: () => import('@/views/Box/toolBar/dialog_coupon.vue'),
          }]
        },
        {
          path: 'picture',
          component: () => import('@/views/Box/module/picture.vue'),
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