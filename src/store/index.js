import Vue from 'vue'
import Vuex from 'vuex'
import {getPodcasts, getPodcast} from '@/services';
import {savePodcasts, savePodcastDetails} from '@/utils/helpers';
const { parse } = require('rss-to-json');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    podcasts: [],
    currentPodcast: {},
    loadingStatus: false,
    collection: [],
    podcastsInDetails: []
  },
  getters: {
    listLoader: (state) => state.loadingStatus,
    totalList: (state) => state.podcasts.length,
    podcasts: (state) => state.podcasts,
    currentPodcast: (state) => state.currentPodcast,
    collection: (state) => state.collection
  },
  mutations: {
    SET_PODCAST(state, podcast) {
      state.currentPodcast = podcast
    },
    SET_ALL_PODCASTS(state, podcasts) {
      state.podcasts = podcasts;
    },
    SET_LOADER(state, status) {
      state.loadingStatus = status
    },
    SET_COLLECTION(state, collection) {
      state.collection = collection
    }
  },
  actions: {
    async GET_COLLECTION(context, url) {
      context.commit("SET_LOADER", true);
      context.commit("SET_COLLECTION", [])
      return parse(url)
      .then(response => {
        if(response) {
          context.commit("SET_COLLECTION", response.items)
          context.commit("SET_LOADER", false);
        }
      })
      .catch((error) => console.error(`GET_COLLECTION error details: ${error}`));
    },
    async GET_PODCAST(context, podcastId) {
      context.commit("SET_LOADER", true);
      context.commit("SET_PODCAST", {});
      return getPodcast({id: podcastId})
      .then((response) => {
        if(response.data && response.data.results.length > 0) {
          let podcast = response.data.results[0];
          context.commit("SET_PODCAST", podcast);
          savePodcastDetails(podcast)
          context.commit("SET_LOADER", false);
        }
      })
      .catch((error) => console.error(`GET_PODCAST error details: ${error}`));
    },
    async GET_ALL_PODCASTS(context) {
      context.commit("SET_LOADER", true);
      return getPodcasts()
        .then((response) => {
          if(response.data && response.data.feed) {
            let {entry} = response.data.feed;
            context.commit("SET_ALL_PODCASTS", entry);
            savePodcasts(entry)
            context.commit("SET_LOADER", false);
          }
        })
        .catch((err) => console.error(`GET_ALL_PODCASTS error details: ${err}`));
    },
    GET_ALL_PODCASTS_FROM_LOCALSTORAGE(context) {
      const data = JSON.parse(localStorage.getItem('pods')) || undefined
      if(data && data.podcasts.length > 0) {
        context.commit("SET_ALL_PODCASTS", data.podcasts);
        context.commit("SET_LOADER", false);
        return;
      }
      console.error('GET_ALL_PODCASTS_FROM_LOCALSTORAGE got undefined or empty data')
    },
    GET_PODCAST_FROM_LOCALSTORAGE(context, podcastId) {
      const data = JSON.parse(localStorage.getItem('podInDetails')) || undefined
      if(data && data.podcastsInDetails.length > 0) {
        let podcast = data.podcastsInDetails.find(p => p.trackId == podcastId)
        context.commit('SET_PODCAST', podcast);
        context.commit("SET_LOADER", false);
        return;
      }
      console.error('GET_PODCAST_FROM_LOCALSTORAGE got undefined or empty data')
    }
  }
})
