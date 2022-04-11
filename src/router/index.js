import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/podcast/:podcastId',
    component: () => import(/* webpackChunkName: "about" */ '../views/podcast/PodcastDetailsView.vue'),
    beforeEnter: (to, from, next) => {
      let value = `${to.params.podcastId}`
      if(/^[0-9]+$/.test(value)) {
        return next();
      }
      next({name: 'home'})
    },
    children: [
      {
        path: '',
        name: 'podcastDetails',
        component: () => import(/* webpackChunkName: "about" */ '../views/podcast/episode/EpisodeView.vue'),
      },
      {
        path: 'episode/:episodeId',
        name: 'episosodeDetails',
        component: () => import(/* webpackChunkName: "about" */ '../views/podcast/episode/EpisodeDetailsView.vue'),
        beforeEnter: (to, from, next) => {
          let value = `${to.params.episodeId}`
          if(/^[0-9]+$/.test(value)) {
            return next();
          }
          next({name: 'home'})
        },
      }
    ]
  },
  {
    path: '*',
    beforeEnter: (to, from, next) => {
      if(!to.name) {
        next({name: 'home'})
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if(to.name == 'podcastDetails') {
      return { x: 0, y: 0 }
    }
  }
})

export default router
