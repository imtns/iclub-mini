<template>
  <button
    class="x-button"
    :class="[type]"
    :style="{ padding, width, background, borderRadius: radius, height, lineHeight: height, fontSize, border, color, opacity: disabled ? '0.55' : '1' }"
    :loading="loading"
    :disabled="disabled"
    @click.stop="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    disabled: Boolean,
    width: {
      type: String,
      default: '100%'
    },
    padding: {
      type: String,
      default: ''
    },
    border: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: '28rpx'
    },
    height: {
      type: String,
      default: '88rpx'
    },
    radius: {
      type: String,
      default: '16rpx'
    },
    color: {
      type: String,
      default: '#white'
    },
    background: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    onClick() {
      if (!this.loading && !this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.x-button {
  flex: 1;
  font-size: 28rpx;
  &.primary {
    color: white;
    background: #366bd5;
  }
  &.default {
    color: #366bd5;
    background: white;
  }

  @include flex-center;
}
</style>
