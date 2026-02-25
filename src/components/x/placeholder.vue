<template>
  <view scroll-y>
    <template v-if="!data.length">
      <!-- loading 部分 -->
      <template v-if="loading">
        <template v-if="slotLoading">
          <slot name="loading" />
        </template>
        <x-spin v-else />
      </template>
      <template v-else>
        <template v-if="slotEmpty">
          <slot name="empty" />
        </template>
      </template>
    </template>
    <template v-if="data.length && !loading">
      <slot />
    </template>
  </view>
</template>

<script>
/**
 * @example
 *  <placeholder :loading="false" :data="data">
 *    <component />
 *  </placeholder>
 * @example
 *  <placeholder :loading="false" :data="data" placeholder="empty">
 *    <component />
 *  </placeholder>
 * @example
 *  <placeholder :loading="true" :data="data">
 *    <template #loading> skeleton </template>
 *    <template #placeholder> placeholder </template>
 *    <template #default> <component /> </template>
 *  </placeholder>
 */
// import Empty from './Empty'
export default {
  name: 'Placeholder',
  components: {
    // Empty,
    // Spin,
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    slotLoading() {
      return this.$slots.loading
    },
    slotEmpty() {
      return this.$slots.empty
    }
  }
}
</script>
