import Vue from 'vue'
import Vuex from 'vuex'
import {getPodcasts} from '@/services';
import {savePodcasts} from '@/utils/helpers';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    podcasts: [],
    loadingStatus: false,
  },
  getters: {
    listLoader: (state) => state.loadingStatus,
    totalList: (state) => state.podcasts.length,
    podcasts: (state) => state.podcasts
  },
  mutations: {
    SET_ALL_PODCASTS(state, podcasts) {
      state.podcasts = podcasts;
    },
    SET_LOADER(state, status) {
      state.loadingStatus = status
    }
  },
  actions: {
    GET_ALL_PODCASTS(context) {
      context.commit("SET_LOADER", true);
      getPodcasts()
        .then((response) => {
          if(response.data && response.data.feed) {
            let {entry} = response.data.feed;
            context.commit("SET_ALL_PODCASTS", entry);
            savePodcasts(entry)
          }
          context.commit("SET_LOADER", false);
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
    }
  },
  modules: {
  }
})
