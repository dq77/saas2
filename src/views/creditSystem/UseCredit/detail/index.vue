<template lang="pug">
  .page-main
    .manageList-content(v-loading="loading")
      .manageList-title 用信详情
      //- 详情
      Descriptions(
        :labelWidth="150"
        :columns="detailColumns"
        :dataSource="result"
      )
        template(slot="creditAmount" slot-scope="{ dataSource }")
          fragment
            span {{ dataSource && dataSource.creditAmount ? toAmountStr(dataSource.creditAmount, 2, true) : '- -' }}
            span.manageList-money(@click="() => seeHandle(dataSource)") 查看额度
    Modal(:visible="visible", :title="title", :detail="detail", @cancleHandle="cancleHandle")
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import useModal from 'hooks/useModal'
import Modal from './modal'
import { toAmountStr } from '@/utils/util'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Descriptions from '@/components/qjd/descriptions'
import { detailColumns } from './config'

export default defineComponent({
  components: {
    Modal,
    Descriptions
  },
  setup(props, { root }) {
    const { $route: { params: { id } } } = root
    // modal
    const {
      visible,
      title,
      detail,
      cancleHandle,
      openHandle,
      setDetail
    } = useModal('查看额度')
    // getCreditorderDetail
    const { credit: { getCreditorderDetail } } = ajaxStore
    // 获取详情信息
    const { result, loading } = useAsync({
      request: getCreditorderDetail,
      params: { creditOrderId: id }
    })
    // 查看额度
    const seeHandle = ({ billNo } = {}) => {
      openHandle()
      setDetail({ billNo })
    }

    return {
      title,
      detail,
      visible,
      result,
      cancleHandle,
      seeHandle,
      toAmountStr,
      detailColumns,
      loading
    }
  }
})
</script>
<style lang="stylus" scoped>
  .manageList-content
    padding 20px
    background #fff
    .manageList-title
      padding 20px 0
      border-bottom 1px solid #f7f7f7
      margin-bottom 20px
    .manageList-money
      cursor pointer
      margin-left 10px
      color #3c5da4
</style>
