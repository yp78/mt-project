import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login/inLogin.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/zhuce',
      name: 'zhuce',
      component: () => import('../views/zhuce/zhuCe.vue'),
      meta: { title: '注册' }
    },
    {
      path: '/user/patient',
      name: 'patient',
      component: () => import('../views/User/PatientList.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/fast',
      name: 'fast',
      component: () => import('../views/consult/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/consult/dep',
      name: 'dep',
      component: () => import('../views/consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/illness',
      name: 'illness',
      component: () => import('../views/consult/ConsultIllness.vue'),
      meta: { title: '图文问诊' }
    },
    {
      path: '/user/consult',
      name: 'consult',
      component: () => import('../views/User/UserConsult.vue'),
      meta: { title: '问诊记录' }
    },
    {
      path: '/user/consult/:id',
      name: 'consultId',
      component: () => import('../views/User/ConsultId.vue'),
      meta: { title: '问诊详情' }
    },
    {
      path: '/consult/pay',
      name: 'pay',
      component: () => import('../views/consult/ConsultPay.vue'),
      meta: { title: '支付' }
    },
    {
      path: '/order/pay/result',
      name: 'result',
      component: () => import('../views/Order/OrderPayResult.vue'),
      meta: { title: '支付状态' }
    },
    {
      path: '/order/pay',
      name: 'orderPay',
      component: () => import('../views/Order/OrderPay.vue'),
      meta: { title: '药品支付' }
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('../views/Room/index.vue'),
      meta: { title: '医生问诊室' }
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
            title: '消息通知'
          }
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/User/index.vue'),
          meta: {
            title: '个人中心'
          }
        }
      ]
    }
  ]
})

export default router
