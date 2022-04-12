<template lang='pug'>
.p-tabs
  el-button.p-tab(:type='current === "left" ? "primary" : ""' @click='goLeft') 价值列表
  el-button.p-tab(:type='current === "right" ? "primary" : ""' @click='goRight' :disabled='current === "left" && !companyInfo') 价值详情
</template>

<script>
import useSaveAll from '../../hooks/useSaveAll'
import Router from '@/router'
import { reactive, toRefs } from '@vue/composition-api'
import { EventBus } from '../../event-bus'

export default {
  props: {
    current: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // state
    const state = reactive({
      companyInfo: null
    })
    // useSaveAll
    const { doResult: saveDoResult } = useSaveAll()
    // EventBus
    const firstDetailHandle = (data) => {
      state.companyInfo = data || {}
    }
    EventBus.$on('firstDetailHandle', firstDetailHandle)
    // methods
    const goLeft = () => {
      Router.push({name: 'valueStratification'})
    }
    const goRight = () => {
      if (props.current === 'right') return
      state.companyInfo?.corpName && saveDoResult({ companyName: state.companyInfo?.corpName })
      Router.push({
        name: 'valueDetail',
        query: {
          corpName: state.companyInfo?.corpName,
          id: state.companyInfo?.id
        }
      })
    }

    return {
      ...toRefs(state),
      goLeft,
      goRight,
    }
  }
}
</script>

<style lang='stylus' scoped>
.p-tabs
  padding-bottom 20px
  .p-tab
    margin-right 15px
</style>
