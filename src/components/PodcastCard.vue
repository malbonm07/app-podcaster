<template>
    <Card class="app-podcast-card">
        <article class="app-podcast">
            <header class="app-podcast__header">
                <AppImage :img-url="imgUrl.label" class="image"></AppImage>
            </header>
            <div class="app-podcast__body">
                <h2 class="title">{{title}}</h2>
                <p class="description">Author: {{author}}</p>
            </div>
        </article>
    </Card>
</template>

<script>

import Card from '@/components/Card.vue';
import AppImage from '@/components/AppImage.vue';
export default {
    name: "PodcastCard",
    props: {
        author: {
            type: String,
            default: '--'
        },
        title: {
            type: String,
            default: 'Podcast title'
        },
        imgUrl: {
            type: [Object, String],
            default: ''
        }
    },
    components: {
        Card,
        AppImage
    },
}
</script>

<style lang="scss">
.app-podcast-card {
    width: 100%;
    max-width: 500px;
    cursor: pointer;
}
.app-podcast {
    width: 100%;
    border: 1px solid transparent;
    &__header {
        position: relative;
        .image {
            width: 146px;
            height: 146px;
            border-radius: 50%;
            position: absolute;
            top: 0%;
            transform: translate(-50%, -50%);
        }
    }
    &__body {
        padding: 70px 14px 0px 14px;
        .description {
            font-size: 1rem;
        }
        .title {
            font-size: 1rem;
            text-transform: uppercase;
            font-weight: bold;
        }
    }
}
</style>