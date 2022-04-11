<template>
    <div class="collection-details" v-if="collection.length > 0">
        <Card>
            <h3>{{collection[this.$route.params.episodeId].title}}</h3>
            <div v-html="collection[this.$route.params.episodeId].description" style="font-size:0.9rem; margin-bottom: 40px;"></div>
            <AppAudioPlayer :audio-src="collection[this.$route.params.episodeId] ? collection[this.$route.params.episodeId].enclosures[0].url : null"></AppAudioPlayer>
        </Card>
    </div>
</template>

<script>

import Card from "@/components/Card";
import AppAudioPlayer from "@/components/AppAudioPlayer";
import { mapGetters } from "vuex";

export default {
    name: 'EpisodeDetailsView',
    components: {
        Card,
        AppAudioPlayer
    },
    computed: {
        ...mapGetters(["collection"]),
    }
}
</script>

<style lang="scss" scoped>
.collection-details {
    .card:first-child {
        text-align: left;
        padding: 18px;
        h3 {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
            text-align: left;
            margin: 0px;
            margin-bottom: 8px;
        }
    }
}
</style>