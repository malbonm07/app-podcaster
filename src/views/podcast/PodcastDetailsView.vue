<template>
    <div class="podcast-details">
        <AppHeader></AppHeader>
        <div class="podcast-details__wrapper">
            <aside>
                <Card v-if="podcast">
                    <div class="podcast-sidebar__header">
                        <AppImage
                            class="image" 
                            :img-url="podcast.artworkUrl600"
                        ></AppImage>
                    </div>
                    <div class="podcast-sidebar__body">
                        <hr class="line">
                        <h1>{{podcast.trackName || ''}}</h1>
                        <p>by {{podcast.artistName || ''}}</p>
                    </div>
                    <div class="podcast-sidebar__footer">
                        <hr class="line">
                        <p class="title">Description</p>
                        <p class="summary">{{podcast.summary ? podcast.summary.label : ''}}</p>
                    </div>
                </Card>
            </aside>
            <main>
                <router-view/>
            </main>
        </div>
    </div>
</template>

<script>

import Card from '@/components/Card.vue';
import AppImage from '@/components/AppImage.vue';
import AppHeader from '@/components/AppHeader.vue';
import { mapActions, mapGetters } from "vuex";
import {isEmptyOrExpired, noExistOrExpired} from '@/utils/helpers';

export default {
    name: 'PodcastDetailsView',
    components: {
        Card,
        AppImage,
        AppHeader
    },
    data() {
        return {
            podcast: null
        }
    },
    methods: {
        ...mapActions(["GET_PODCAST", "GET_ALL_PODCASTS", "GET_ALL_PODCASTS_FROM_LOCALSTORAGE", "GET_COLLECTION", "GET_PODCAST_FROM_LOCALSTORAGE"]),
        mergePodcast() {
            const self = this;
            const findPodcast = [...this.podcasts].filter(p => p.id.attributes['im:id'] == self.currentPodcast.trackId)[0]
            const fetchedPodcast = this.currentPodcast
            const podcast = {...fetchedPodcast, ...findPodcast}
            this.podcast = podcast;
        },
    },
    computed: {
        ...mapGetters(["currentPodcast", "podcasts"])
    },
    async mounted() {
        let {podcastId} = this.$route.params;
        isEmptyOrExpired() ? 
        await this.GET_ALL_PODCASTS() : this.GET_ALL_PODCASTS_FROM_LOCALSTORAGE();
        noExistOrExpired(podcastId) ?
        await this.GET_PODCAST(podcastId) : this.GET_PODCAST_FROM_LOCALSTORAGE(podcastId);
        this.mergePodcast();
        await this.GET_COLLECTION(this.podcast.feedUrl);
    }
}
</script>

<style lang="scss" scoped>
.podcast-details {
    &__wrapper {
        display: flex;
        justify-content: space-between;
        padding: 0px 14px;
        aside {
            width: 40%;
            max-width: 400px;
            display: flex;
            align-items: flex-start;
            .card {
                max-width: 300px;
                box-sizing: border-box;
                position: sticky;
                top: 16px;
            }
        }
        main {
            width: 60%;
        }
    }
}

.podcast-sidebar {
    border-radius: 2px;
    &__header {
        padding: 40px 40px 16px 40px;
        .image {
            width: 200px;
            height: 200px;
            border-radius: 4px;
        }
    }
    &__body {
        text-align: left;
        padding-left: 6px;
        padding: 0px 12px 0px 12px;
        h1 {
            font-size: 1.2rem;
            color: #333;
            font-weight: bold;
            margin-bottom: 4px;
            padding-left: 8px;
        }
        p {
            margin-top: 0px;
            font-style: italic;
            font-size: 1rem;
            padding-left: 8px;
        }
    }
    &__footer {
        text-align: left;
        padding: 0px 12px;
        .title {
            font-size: 1.2rem;
            color: #333;
            font-weight: bold;
            margin-bottom: 4px;
        }
        .summary {
            font-size: 1rem;
            margin-top: 0px;
            font-style: italic;
        }
    }
}
.line {
    border: none;
    height: 0.1px;
    opacity: 0.1;
    background-color: #333;
}
</style>