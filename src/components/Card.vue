<template functional>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'Card'
    }
</script>

<style lang="scss" scoped>
.card {
    width: 100%;
    min-width: 180px;
    min-height: 100px;
    border-radius: 4px;
    box-shadow: 0px 4px 8px 2px rgba(43,43,43,0.16);
}
</style>