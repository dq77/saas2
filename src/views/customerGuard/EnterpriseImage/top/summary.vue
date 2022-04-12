<template lang="pug">
.summary-main
  .summary-ul(v-for='ul in summaryData')
    .summary-item(v-for='item in ul' @click='goPageModule(item)')
      .summary-item-label {{ item.label }}
      // .summary-item-value {{ item.value }}
</template>

<script>
import { summaryItems } from './config'
import { reactive, toRefs, watch, inject } from '@vue/composition-api'
import useTimeout from 'hooks/useTimeout'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
export default {
  props: {
    // moduleRefs: {
    //   type: Object,
    //   default: () => {}
    // },
    triggerClick: {
      type: Function,
      defaulut: () => {}
    }
  },
  setup(props, { root }) {
    const state = reactive({
      summaryData: [],
      moduleRefs: {}
    })
    summaryItems.map((item, index) => {
      if (index % 6 === 0) {
        state.summaryData.push([item])
      } else {
        state.summaryData[state.summaryData.length - 1].push(item)
      }
    })
    const { perTimeout } = useTimeout()

    const { emitEvent } = useEventBus({
      event: busStore.targetTab
    })
    const { initEvent } = useEventBus({
      event: busStore.getRefs
    })

    initEvent((data) => {
      state.moduleRefs = data
    })

    // 点击导航栏，滚动条移动到内容所对应的位置
    const goPageModule = ({tab, name, event}) => {
      props.triggerClick(tab)

      name && tab && perTimeout(() => {
        const target = state.moduleRefs[`${tab}-${name}`]
        const ref = target.$el ? target.$el : target
        window.layoutScrollbar.wrap.scrollTo({
          top: ref.offsetTop,
          behavior: 'smooth'
        })
        // 如果有event，则执行监听方法
        event && emitEvent({
          name: event,
          data: event === 'getRefs' ? ref : {}
        })
      })
    }

    // 基本信息接口加载完毕后，跳转到链接指定模块
    const triggerLink = () => {
      const { link } = root.$route.query
      link && goPageModule({
        tab: link.split('-')[0],
        name: link.split('-')[1],
        event: link.split('-')[2] ? link.split('-')[2] : ''
      })
    }

    const { result: baseInfo } = inject('baseInfo')
    watch(
      () => baseInfo.value,
      (value) => {
        triggerLink()
      }
    )
    watch(
      () => root.$route,
      (value) => {
        triggerLink()
      }
    )

    return {
      goPageModule,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.summary-main
  background #F8F9FD
  padding 20px 30px
  display flex
  .summary-ul
    border-right 1px dashed #EEF0F6
    width 20%
    margin-right 7%
    .summary-item
      display flex
      line-height 30px
      color #6D7278
      cursor pointer
      color #4c6ebc
      .summary-item-label
        margin-right 4px
      .summary-item-value
        color #3B68F0
    .summary-item:hover
      color #3B68F0
    .item-danger
      color #FF6666
  .summary-ul:last-child
    margin-right 0
    border-right none
</style>
