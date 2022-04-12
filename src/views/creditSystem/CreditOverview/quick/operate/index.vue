<template lang="pug">
div
  Header(:title="'场景操作'" :left="20")
  el-scrollbar(style="height: 100%; width: 100%;")
    .operate_box
      web-card(
        v-for="(item, index) in dataSource"
        :key="index"
        :url="item.url"
        :title="item.title"
        :info="item.info"
        :bg="item.bg"
        v-show="menuPermisssions[item.menuTag]"
      )
        web-button(@click="() => jumpHandle(item)") 点击发起
</template>
<script>
import store from '@/store'
import Header from '@/components/qjd/header'
import { dataSource } from './config'

export default {
  components: {
    Header
  },
  setup(props, { root: { $router } }) {
    // store
    const { state: { menuPermisssions } } = store
    // 跳转
    const jumpHandle = item => $router.push({ name: item?.name })

    return {
      jumpHandle,
      dataSource,
      menuPermisssions
    }
  }
}
</script>
<style lang="stylus" scoped>
.operate_box
  width: 845px
  padding: 20px
  display: flex
  overflow hidden
</style>
