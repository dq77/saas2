<template lang="pug">
Card2(title='快速操作' noWrap v-if='isShow')
  el-scrollbar(style='height: 100%; width: 100%;')
    .p-blocks
      Block(
        v-for='(item, index) in dataSource'
        :key='index'
        :index='index'
        :title='item.title'
        :info='item.info'
        :bgColor='item.bgColor'
        :bgImg='item.bgImg'
        :hasPermission='item.hasPermission'
        :routeName='item.routeName'
        :weblogs='item.weblogs'
      )
</template>

<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import store from '@/store'
import Card2 from './../card2'
import Block from './block'
import { getDataSource } from './config'
export default {
  components: {
    Card2,
    Block,
  },
  setup() {
    const state = reactive({
      dataSource: getDataSource(),
      isShow: false
    })
    watch(
      () => store.state.menuPermisssions,
      () => {
        state.dataSource.forEach(item => {
          const index = item.menuTags.findIndex(mt => store.state.menuPermisssions[mt])
          if (index >= 0) {
            item.hasPermission = true
            item.routeName = item.routeNames[index]
          }
        })
        state.isShow = !state.dataSource.every(item => item.hasPermission === false)
      },
      {
        immediate: true
      }
    )
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-blocks
  display flex
  padding 20px
  width max-content
  /deep/.p-block
    margin-right 20px
    &:last-child
      margin-right 0
</style>
