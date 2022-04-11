<template functional>
    <div class="card" :class="props.class">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            class: {
                type: [String, Object],
                default: ''
            }
        }
    }
</script>

<style lang="scss">
.card {
    width: 100%;
    min-width: 180px;
    min-height: 100px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 2px rgba(43,43,43,0.16);
    box-sizing: border-box;
}
</style>