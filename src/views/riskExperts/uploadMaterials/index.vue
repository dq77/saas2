<template lang="pug">
.page-main
  //- 标准评估
  Standard(v-if='mode === "standard"')
  //- 精准评估
  Accurate(v-if='mode === "accurate"')
</template>

<script>
import Standard from './standard'
import Accurate from './accurate'
export default {
  components: {
    Standard,
    Accurate
  },
  setup(props, { root }) {
    const { mode } = root.$route.query
    return {
      mode
    }
  }
}

</script>

<style lang='stylus' scoped>

</style>
