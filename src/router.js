import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home/index.vue'
import Home from './views/home/'
import Login from './views/login/'
import Mr from './views/home/moren/mr'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Mr
        },
        {
          path: 'comment',
          // component: Comment
          component: () => import('./views/home/comment/comment.vue')
        },
        {
          path: 'material',
          // component: Material
          component: () => import('./views/home/material')
        },
        {
          path: 'articles',
          component: () => import('./views/home/articles')
        },
        {
          path: 'publish',
          component: () => import('./views/home/publish')
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')// 按需加载
  //   }
  ]
})
