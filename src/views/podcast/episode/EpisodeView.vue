<template>
    <div class="collection">
        <Card class="collection-header">
            <h3>Episodes: {{collection.length}}</h3>
        </Card>
        <Card class="collection-body">
            <ul class="collection-body-list">
                <li class="collection-body-list__item item-header">
                    <div class="title">
                        Title
                    </div>
                    <div class="date">
                        Date
                    </div>
                    <div class="duration">
                        Duration
                    </div>
                </li>
                <li class="collection-body-list__item" v-for="(episode, i) in collection" :key="i" :class="(i + 1) % 2 == 0 ? 'even-class' : ''"
                @click="$router.push(`/podcast/${currentPodcast.trackId}/episode/${i}`)">
                    <div class="title">
                        {{episode.title}}
                    </div>
                    <div class="date">
                        {{episode.published | timeFormat}}
                    </div>
                    <div class="duration">
                        {{episode.itunes_duration | formatDuration}}
                    </div>
                </li>
            </ul>
        </Card>
    </div>
</template>

<script>

import Card from '@/components/Card.vue';
import { mapGetters } from "vuex";
import dayjs from 'dayjs';

export default {
    name: 'EpisodeView',
    components: {
        Card
    },
    computed: {
        ...mapGetters(["collection", "currentPodcast"])
    },
    filters: {
        timeFormat(value) {
            if (!value) return '';
            const date = dayjs(value).format('DD/MM/YYYY')
            return date;
        },
        formatDuration(value) {
            if (!value) return '--';
            if(typeof value === 'string' && value.includes(":")) return value;
            let minutes = "0" + Math.floor(value / 60);
            let seconds = "0" +  Math.floor(value - minutes * 60);
            let duration = minutes.substr(-2) + ":" + seconds.substr(-2);
            return duration
        }
    }
}
</script>

<style lang="scss" scoped>
.collection {
    .card:first-child {
        min-height: auto;
        padding: 10px 30px;
        margin-bottom: 20px;
        h3 {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
            text-align: left;
            margin: 0px;
        }
    }
}
.collection-body {
    &-list {
        padding-left: 16px;
        padding-right: 16px;
        &__item {
            display: flex;
            align-items: center;
            padding: 10px 30px;
            background-color: #F9F9F9;
            border-bottom: 1px solid #e4e4e4;
            font-size: 0.9rem;
            cursor: pointer;
            .title {
                width: 70%;
                text-align: left;
                color: var(--primary-color);
            }
            .date {
                width: 20%;
                text-align: center;
            }
            .duration {
                width: 20%;
                text-align: center;
            }
        }
    }
}

.item-header {
    padding-top: 20px;
    background-color: #fff;
    cursor: inherit;
    .title,
    .date,
    .duration {
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
    }
}

.even-class {
    background-color: #fff;
}
</style>