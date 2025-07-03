<template>
  <div class="loading-content" :style="{ 'min-height': height }">
    <x-loading v-if="loading" :theme="theme" :background="background" />
    <uni-transition :show="!loading">
      <slot />
    </uni-transition>
  </div>
</template>

<script>
import XLoading from './loading.vue'
export default {
  name: 'XContent',
  components: {
    XLoading
  },
  props: {
    height: {
      type: String,
      default: '100vh'
    },
    background: {
      type: String,
      default: 'transparent'
    },
    theme: String,
    loading: Boolean
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
<style lang="scss" scoped>
.loading-content {
  position: relative;
  /* min-height: 100vh; */
  /* background: #f7f7f9; */
}
</style>
