<template>
    <header class="header">
        <div class="header-title">
            <router-link to="/"  v-if="currentPage == 'home'">
                <h1 class="header-title__item">Podcaster</h1>
            </router-link>
            <router-link v-else to="/">
                <span class="header-title__item">Podcaster</span>
            </router-link>
        </div>
        <div class="header-loader">
            <AppLoader v-if="loader"></AppLoader>
        </div>
    </header>
</template>

<script>

import AppLoader from '@/components/AppLoader.vue';
import AppSearcher from '@/components/AppSearcher.vue';

export default {
    name: 'AppHeader',
    components: {
        AppLoader,
        AppSearcher
    },
    computed: {
        currentPage() {
            return this.$router.history.current.name
        },
        loader () {
            return this.$store.getters.listLoader
        }
    }
}
</script>

<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    border-bottom: 1px solid #e4e1e1;
    margin-bottom: 20px;
    &-title {
        &__item {
            color: var(--primary-color);
            font-size: 1.2rem;
            font-weight: bold;
            margin: 12px 0px;
            display: block;
        }
    }
    &-loader {
        display: flex;
        align-items: center;
    }
}
</style>