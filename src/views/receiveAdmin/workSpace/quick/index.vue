<template lang="pug">
.quick(v-if='hasMenu')
  Header(title='场景操作' :left='20')
  .quick__card
    el-scrollbar(style="height: 100%; width: 100%;")
      Card.quick__card-li(v-for='item in dataSource' :key='item.name' :info='item' v-show="menuPermisssions[item.menuTag]")
</template>
<script>
import { ref } from '@vue/composition-api'
import store from '@/store'
import Header from '@/components/qjd/header'
import Card from './card'
import { dataSource } from './config'

export default {
  components: {
    Header,
    Card
  },
  setup(props, { root: { $router } }) {
    // data
    const hasMenu = ref(false)
    // store
    const { state: { menuPermisssions } } = store
    // 初始化数据
    const initData = () => {
      for (let index = 0; index < dataSource.length; index++) {
        const item = dataSource[index]
        if (item.menuTag in menuPermisssions) {
          hasMenu.value = true
          return
        }
      }
    }
    initData()
    return {
      hasMenu,
      dataSource,
      menuPermisssions
    }
  }
}
</script>
<style lang="stylus" scoped>
.quick
  background #fff
  &__card
    padding 20px
    &-li + &-li
      margin-left 20px
/deep/ .el-scrollbar__view
  display flex
</style>
