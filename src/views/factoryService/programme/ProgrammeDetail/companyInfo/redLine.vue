<template lang="pug">
.p-detail-item(v-loading='loading')
  .p-detail-item-title 三条红线标准
  .p-detail-item-content.p-standard-main
    RedBlueBar(:config='threeRedLineConfig' :data='threeRedLineData')
</template>

<script>
import useRedLine from '@/views/factoryService/realEstate/hooks/useRedLine'
import { watch } from '@vue/composition-api'
import { threeRedLineConfig } from './config'
import RedBlueBar from '@/views/factoryService/realEstate/components/redBlueBar'
export default {
  props: {
    companyName: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'project'
    }
  },
  components: { RedBlueBar },
  setup(props, { root }) {
    const { companyName } = props
    const { loading, doResult, threeRedLineData } = useRedLine({
      threeRedLineConfig
    })

    if (companyName) {
      doResult({ companyName })
    }

    watch(
      () => props.companyName,
      (value) => {
        doResult({ companyName: value })
      }
    )

    return {
      loading,
      threeRedLineData,
      threeRedLineConfig
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-detail-item
  width 49%
  margin-right 20px
  .p-detail-item-title
    font-size 16px
    color #494949
    margin-bottom 10px
    display flex
    justify-content space-between
.p-detail-item:last-child
  margin-right 0
.p-detail-item-content
  .p-table-flex
    display flex
  .p-table-item
    width 25%
    .p-table-item-label
      background #E5E7EF
      color #263862
      text-align center
      padding 18px 0
      font-weight bold
    .p-table-item-num
      background #F3F4F8
      color #494949
      text-align center
      padding 20px 50px
  .p-table-flex.p-single
      width 100%
    .p-table-item
      width 100%
.p-standard-main
  padding 30px
  border 1px solid #F2F2F6
  box-shadow 4px 7px 13px 0px rgba(214, 217, 225, 0.35)
</style>
