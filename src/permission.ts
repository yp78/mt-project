import router from '@/router'
import { useUserStore } from '@/stores/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false
})

const whiteList = ['/', '/zhuce', '/404', '/401']
router.beforeEach((to) => {
  const store = useUserStore()
  NProgress.start()
  if (!store.user?.token && !whiteList.includes(to.path)) return '/'
})

router.afterEach((to) => {
  document.title = '医疗问诊 - ' + to.meta.title
  NProgress.done()
})
