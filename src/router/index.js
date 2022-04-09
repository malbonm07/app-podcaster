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
    name: 'podcastDetails',
    component: () => import(/* webpackChunkName: "about" */ '../views/podcast/PodcastDetailsView.vue'),
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "about" */ '../views/podcast/episode/EpisodeView.vue'),
      },
      {
        path: 'episode/:episodeId',
        // name: 'episosodeDetails',
        component: () => import(/* webpackChunkName: "about" */ '../views/podcast/episode/EpisodeDetailsView.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router