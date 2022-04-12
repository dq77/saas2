<template lang='pug'>
el-dialog(
  width='552px'
  :show-close='true'
  title='触发红线条数'
  :visible.sync='visible'
  :close-on-click-modal='false'
)
  div(v-loading='loading')
    Redline(:dataSource="redlineData" :isDialog='true' id='redline1')
  span(slot='footer')
    el-button(type='primary' @click='visible = false' size='small') 确定
</template>

<script>
import Redline from '../components/redline'
import { ref, watch } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { summaryRedLineList } from '../components/redline/config'

export default {
  props: {
    companyName: {
      type: String,
      default: ''
    }
  },
  components: { Redline },
  setup(props) {
    const visible = ref(false)
    const redlineData = ref([])

    const { getOneByCompanyName } = ajaxStore.risk

    const {
      loading,
      result,
      doResult
    } = useAsync({
      request: getOneByCompanyName,
      init: false
    })

    watch(
      () => visible.value,
      (value) => {
        if (value) doResult({ companyName: props.companyName })
      }
    )

    watch(
      () => result.value,
      (value) => {
        // 获取红线触发次数
        redlineData.value = []
        summaryRedLineList.forEach((item, index) => {
          if (value && Object.keys(value).includes(`${item.key}`)) {
            redlineData.value.push({
              name: item.label,
              count: value[item.key]
            })
          } else {
            redlineData.value.push({
              name: item.label,
              count: undefined
            })
          }
        })
      }
    )

    return {
      loading,
      visible,
      redlineData
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
