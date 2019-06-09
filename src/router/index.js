import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    // meta: {
    //   name: '主页'
    // },
    children: [{
      path: 'index',
      name: '主页',
      component: () => import('@/views/public/index'),
      meta: {
        title: '主页',
        icon: 'dashboard'
      }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'Dashboard',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/users',
    component: Layout,
    redirect: '/users/list',
    // meta: {
    //   roles: ['admin']
    // },
    children: [{
      path: 'list',
      name: '用户管理',
      component: () => import('@/views/users/index'),
      meta: {
        title: '用户管理',
        icon: 'example',
        roles: ['admin']
      }
    }, {
      path: 'info',
      component: () => import('@/views/users/info'),
      // component: () => import('@/components/Region/index'),

      hidden: true,
      meta: {
        title: '用户信息',
        icon: 'example',
        roles: ['admin', 'user']
      }
    }
    ]
  },

  {
    path: '/articles',
    component: Layout,
    redirect: '/articles/list',
    name: '文章',
    // meta: {
    //   roles: ['admin']
    // },
    children: [{
      path: 'list',
      name: '文章管理',
      component: () => import('@/views/articles/index'),
      meta: {
        title: '文章管理',
        icon: 'dashboard', roles: ['admin']
      }
    },
    {
      path: 'create',
      component: () => import('@/views/articles/create'),
      name: '创建文章',
      hidden: true,
      meta: { title: 'Create Article', icon: 'edit', roles: ['admin', 'user'] }
    },
    {
      path: 'edit/:id(\\d+)?*',
      component: () => import('@/views/articles/edit'),
      name: '编辑文章',
      meta: { title: '编辑文章', noCache: true, activeMenu: '/articles/list', roles: ['admin', 'user'] },
      hidden: true
    },

    {
      path: ':id(\\d+)',
      name: '文章详情',
      component: () => import('@/views/articles/detail'),
      hidden: true,
      meta: {
        title: '文章详情',
        icon: 'dashboard', roles: ['admin', 'user']
      }
    }
    ]
  },

  {
    path: '/reads',
    component: Layout,
    redirect: '/reads/list',
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'list',
      name: '阅读记录',
      component: () => import('@/views/reads/index'),
      meta: {
        title: '阅读记录',
        icon: 'nested'
      }
    }]
  },

  {
    path: '/populars',
    component: Layout,
    redirect: '/populars/list',
    meta: {
      roles: ['admin']
    },
    children: [{
      path: 'list',
      name: '流行列表',
      component: () => import('@/views/populars/index'),
      meta: {
        title: '流行列表',
        icon: 'nested'
      }
    }]
  },
  {
    path: '/hadoop',
    component: Layout,
    redirect: '/hadoop/index',
    meta: {
      roles: ['admin', 'user']
    },
    children: [{
      path: 'index',
      name: 'Hadoop',
      component: () => import('@/views/hadoop/index'),
      meta: {
        title: 'Hadoop',
        icon: 'dashboard'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
