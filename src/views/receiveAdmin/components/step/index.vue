<template lang="pug">
.config_box(v-if="dataSource && dataSource.length > 2 && isShow")
  .config_title 操作指引
  .guide-list
    div(v-for='(item, index) in dataSource' :class='{"guide-item": item.name, "between": !item.name}')
      .already-img(v-if='item.state')
        img(:src="`${$assetsBaseUrl}/common/home/already.png`")
      .num(v-else) {{ index/2 + 1 }}
      .guide-title {{ item.name }}
      .already-state(v-if='item.state') 已完成
      .notready-state(v-else @click='jumpHandle(item)') 立即前往
      .icon-area(v-if='!item.name')
        .mid-icon
  .skip_guide(:loading='loading' @click="() => skipHandle()") 跳过
</template>
<script>
import useCurrent from './index.js'

export default {
  setup(props, { root: { $route: { query: { id } } }, emit }) {
    const addHandle = () => emit('addHandle')

    const {
      isShow,
      loading,
      dataSource,
      jumpHandle,
      skipHandle
    } = useCurrent(id, addHandle)

    return {
      isShow,
      loading,
      dataSource,
      jumpHandle,
      skipHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
