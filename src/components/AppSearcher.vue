<template>
    <div class="app-searcher">
        <div class="app-searcher__total">
            <span>{{podcasts && Array.isArray(podcasts) ? podcasts.length : 0}}</span>
        </div>
        <input class="app-searcher__input" type="text" placeholder="Filter podcasts" :value="value" @input="$emit('input', $event.target.value)">
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: 'AppSearcher',
    props: {
        value: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapGetters(["podcasts"])
    },
}
</script>

<style lang="scss" scoped>
.app-searcher {
    max-width: 300px;
    display: flex;
    justify-content: center;
    padding: 0px 14px;
    &__total {
        display: flex;
        align-items: center;
        margin-right: 10px;
        span {
            font-size: 1.2rem;
            color: #fff;
            font-weight: bold;
            padding: 0px 6px;
            border-radius: 8px;
            background-color: var(--primary-color);
        }
    }
    &__input {
        width: 100%;
        padding: 10px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
}
</style>