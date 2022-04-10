<template functional>
    <div class="loader loader-active">
        <div class="loader-content loader-radar-small">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AppLoader'
    }
</script>

<style lang="scss" scoped>
.loader {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  text-align: center;
  &::before,
  &::after {
    opacity: 0;
    box-sizing: border-box;
    content: "\0020";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    border: 5px solid var(--primary-color);
    box-shadow: 0 0 5px var(--primary-color), inset 0 0 5px var(--primary-color);
  }
}

.loader-content {
    border-radius: 50%;
    background-color: var(--primary-color);
}

.loader:after {
  z-index: 1;
  -webkit-animation: wave 1s infinite 1s;
}

.loader:before {
  z-index: 2;
  -webkit-animation: wave 1s infinite;
}

@-webkit-keyframes wave {
  0% {
    -webkit-transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.4);
    opacity: 0;
  }
}

.loader-radar-small {
  width: 20px;
  height: 20px;
}
</style>