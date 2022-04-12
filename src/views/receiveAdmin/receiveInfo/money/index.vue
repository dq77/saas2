<template lang="pug">
.info_content(v-loading="loading")
  Card(
    v-for="(item, index) in cardConfigs"
    :key="index"
    :title="item.title"
    :money="dataSource[item.key]"
    :unit="item.unit"
  )
</template>
<script lang='ts'>
import { computed } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Card from '@/views/receiveAdmin/components/card/index.vue'
import { cardConfigs } from './config'
import { percent2 } from '@/utils/qjd'

export default {
  components: {
    Card
  },
  setup() {
    // ajax
    const { receive: { getRepaymentStatixDataByTime } } = ajaxStore
    // 接口
    const { result, loading } = useAsync({ request: getRepaymentStatixDataByTime })
    // 结果处理
    const dataSource = computed(() => {
      result.value && Object.keys(result.value).forEach(key => {
        result.value[key] = percent2(result.value[key])
      })
      return result.value ?? {}
    })

    return {
      loading,
      cardConfigs,
      dataSource
    }
  }
}
</script>
<style lang="stylus" scoped>
.info_content
  background #fff
  padding 20px 10px
  display: flex
  margin-bottom: 10px
</style>
