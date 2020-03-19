import router from './router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {

  NProgress.start();
  next();

})

router.afterEach((to, from) => {

  NProgress.done() // 结束Progress

})