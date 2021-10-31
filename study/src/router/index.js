import Vue from  "../../../dist/vue"
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'

const editor = () => import(/* webpackChunkName: 'editor' */ "@/views/editor/index.vue")
const editorList = () => import(/* webpackChunkName: 'editorList' */ "@/views/editor/page/editoLlist.vue")
const test = () => import(/* webpackChunkName: 'test' */ "@/views/test/index.vue")
const testList = () => import(/* webpackChunkName: 'testList' */ "@/views/test/page/list.vue")
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: () => {
      return '/login'
    }
  },
  {
    path: '/login',
    component: resolve => require(['@/views/login.vue'], resolve),
    meta: {
      role: ['admin', 'super_editor']
    }
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: {
      loginAuth: true,
      title: '首页'
    },
    children: [
      {
        path: 'editor',
        name: 'editor',
        icon: 'el-icon-goods',
        component: editor,
        meta: {
          loginAuth: true,
          title: '编辑'
        },
        children: [
          {
            path: 'editorList',
            name: 'editorList',
            icon: 'el-icon-goods',
            component: editorList,
            meta: {
              loginAuth: true,
              title: '编辑列表'
            },
          }
        ]
      },
      {
        path: 'test',
        name: 'test',
        icon: 'el-icon-service',
        component: test,
        meta: {
          loginAuth: true,
          title: '测试'
        },
        children: [
          {
            name: 'testList',
            icon: 'el-icon-service',
            path: 'testList',
            component: testList,
            meta: {
              loginAuth: true,
              title: '测试列表'
            },
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.loginAuth) {
    if (store.state.user.token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router

/*
   路径替换掉  @/view 用alias 替换成  成

*/
