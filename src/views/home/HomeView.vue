<template>
  <div class="home">
    <AppHeader></AppHeader>
    <AppSearcher v-model="search" style="margin-left:auto;"></AppSearcher>
    <div class="podcast-list" v-if="podcasts.length > 0">
      <router-link 
        :to="`/podcast/${podcast.id ? podcast.id.attributes['im:id'] : undefined}`" v-for="(podcast,i) in computedPodcasts" :key="i"
        style="width:100%;">
        <PodcastCard 
          :title="podcast['im:name'].label"
          :author="podcast['im:artist'].label"
          :img-url="podcast['im:image'] ? podcast['im:image'][podcast['im:image'].length - 1] : ''">
        </PodcastCard>
      </router-link>
    </div>
  </div>
</template>

<script>

import AppHeader from '@/components/AppHeader.vue';
import AppSearcher from '@/components/AppSearcher.vue';
import PodcastCard from '@/components/PodcastCard.vue';
import {isEmptyOrExpired} from '@/utils/helpers';
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    AppSearcher,
    PodcastCard
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions(["GET_ALL_PODCASTS", "GET_ALL_PODCASTS_FROM_LOCALSTORAGE"]),
  },
  computed: {
    ...mapGetters(["podcasts"]),
    computedPodcasts() {
      if(this.podcasts) {
        return [...this.podcasts].filter(podcast => {
          let artist = podcast?.['im:artist']?.label
          let name = podcast?.['im:name']?.label
          if(artist?.toLowerCase().includes(this.search.toLowerCase()) || name?.toLowerCase().includes(this.search.toLowerCase())) {
            return podcast
          }
        })
      }
    }
  },
  mounted() {
    if(isEmptyOrExpired()) {
      this.GET_ALL_PODCASTS();
    }
    else {
      this.GET_ALL_PODCASTS_FROM_LOCALSTORAGE();
    }
  },
}
</script>

<style lang="scss" scoped>
.podcast-list {
  margin-top: 120px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 240px));
  justify-content: space-between;
  row-gap: 120px;
}
</style>


