<template>
    <img :src="imageUrl" alt="thumbnail" class="app-image">
</template>

<script>
    export default {
        name: 'AppImage',
        props: {
            imgUrl: {
                default: 'https://i.imgur.com/Wcr77n5.jpg',
                type: String
            }
        },
        computed: {
            imageUrl() {
                return this.imgUrl
            }
        },
    }
</script>

<style lang="scss" scoped>
.app-image {
  width: 100%;
  max-width: 500px;
  object-fit: cover;
  object-position: center;
}
</style>