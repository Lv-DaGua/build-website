import router from './router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index'
import { Message } from 'element-ui'
import { checkLogin } from '@/api/user'
import { removeToken } from '@/utils/auth'
import { getToken } from './utils/auth'

const notTokenPath = ['/', '/web'];

router.beforeEach(async (to, from, next) => {

  NProgress.start();

  if(notTokenPath.indexOf(to.path) > -1){
    next();
    return
  }

  const token = getToken();
  if(token === '' || token == null){
    Message.error('身份过期，请重新登录')
    NProgress.done();
    removeToken();
    next('/');
    return
  }

  const res = await checkLogin();

  if(res.code === 10000){
    store.commit('SET_USERNAME', res.data.username);
    next();
    return
  }else{
    Message.error('身份过期，请重新登录')
    NProgress.done();
    removeToken();
    next('/');
  }

})

router.afterEach((to, from) => {
  
  NProgress.done() // 结束Progress

})