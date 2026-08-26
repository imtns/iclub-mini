<template>
  <div class="container">
    <ik-custom-header extra-holder title="肌肤MBTI测试" />
    <x-loading v-if="loading" />
    <div v-else>
      随便请求什么接口，未来替换成你们的接口
      {{ JSON.stringify(testInfo) }}
    </div>
  </div>
</template>

<script>
import { apiTest } from "./api/demo";
export default {
  data() {
    return {
      testInfo: null,
      loading: true,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    apiTest().then((res) => {
      console.log(res);
      setTimeout(() => {
        this.loading = false;
        this.testInfo = res;
      }, 1000);
    });
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
}
</style>
