import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login/inLogin.vue')
    },
    {
      path: '/zhuce',
      name: 'zhuce',
      component: () => import('../views/zhuce/zhuCe.vue')
    },
    {
      path: '/user/patient',
      name: 'patient',
      component: () => import('../views/User/PatientList.vue')
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/Home/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('../views/Article/index.vue'),
          meta: {
            title: '健康百科'
          }
        },
        {
          path: '/notify',
          name: 'notify',
          component: () => import('../views/Notify/index.vue'),
          meta: {
            title: '消息中心'
          }
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/User/index.vue'),
          meta: {
            title: '我的'
          }
        }
      ]
    }
  ]
})
export default router
