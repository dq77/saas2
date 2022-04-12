<template lang="pug">
.page-main(v-loading='detailState.loading')
  .p-heade
    span 发货状态：{{deliveryStatus === 1 ? '部分发货' : '全部发货'}}
  el-collapse(v-model='detailState.activedCollapses')
    el-collapse-item(v-for='(item, index) in detailState.bagList' :name='item.id' :key='item.id')
      template(slot='title')
        span.u-title 包裹{{index+1}}
        span {{receiptStatusObj[item.receiptStatus]}}
      .u-head
        .u-head-left
          span.u-title 物流单号
          span {{item.logisticsCode || '- -'}}
          span.u-title(style='margin-left: 20px') 物流公司
          span {{item.logisticsCompany || '- -'}}
        .u-head-right
          el-button(@click='() => signClick(item)' v-if='showReceiptBtn({ bag: item })' type='primary' round) 签收
          el-button(@click='() => downLoadLogisticsFile(item.logisticsFile)' v-if='item.logisticsFile' round ) 查看签收单
          el-button(@click='() => downLoadClick(item.deliverFile)' v-if='item.receiptStatus !== -1 && item.deliverFile' round ) 查看电子签收单
      GoodsTableDetail(:goodsData='item.dataSource' :columns='columns')
  sign-dialog(:title='title' :visible='visible' :detail='detail' @updateList='detailState.getDetail' @cancleHandle='cancleHandle')
</template>

<script>
import { reactive, toRefs, ref, onMounted } from '@vue/composition-api'
import store from '@/store'
import { toPrefixUrl } from '@/utils/util'
import { receiptStatusObj } from '@/utils/enumsSaas'
import Table from '@/components/qjd/table'
import GoodsTableDetail from '@/views/SupplyChain/components/goodsTableDetail2/index'
import useModal from 'hooks/useModal'
import SignDialog from './signDialog.vue'
import useDetail from './useDetail'
import { columns } from './config'

export default {
  components: {
    Table,
    SignDialog,
    GoodsTableDetail,
  },
  setup(props, { root }) {
    const deliveryStatus = root.$route?.query?.deliveryStatus ?? ''

    const detailState = useDetail({
      orderId: root.$route.query?.id
    })

    const signerOfPerson = ref()
    // 是否显示签收按钮
    const showReceiptBtn = ({ bag }) => {
      const customerType = store.state?.curFactory?.customerType
      if (bag && bag.receiptStatus === 0) {
        if (customerType === 1) {
          return signerOfPerson.value?.realNameStatus === 2
        } else {
          return true
        }
      }
      return false
    }

    const state = reactive({
      detailState,
    })

    const signClick = (detail) => {
      openHandle()
      setDetail(detail)
    }
    const downLoadLogisticsFile = (vals) => {
      window.open(toPrefixUrl(`/ofs/weixin/project/loadFile?buzKey=${vals}`))
    }
    const downLoadClick = (vals) => {
      window.open(toPrefixUrl(`/saas-ofc/org/order/downLoad?fileKey=${vals}`))
    }
    const { visible, title, cancleHandle, openHandle, setDetail, detail } = useModal('电子签收')

    onMounted(async () => {
      if (store.state?.curFactory?.customerType === 1) { // 个人用户时
        signerOfPerson.value = await store.dispatch('user/getSignerOfPerson')
        console.log(signerOfPerson)
      }
    })

    return {
      columns,
      showReceiptBtn,
      receiptStatusObj,
      title,
      visible,
      detail,
      deliveryStatus,
      ...toRefs(state),
      signClick,
      downLoadLogisticsFile,
      downLoadClick,
      cancleHandle,
      openHandle,
    }
  },
}
</script>

<style lang="stylus" scoped>
.cloumn-commodity
  display flex
  &_img
    width 60px
    height 60px
    img
      width 100%
  .cloumn-commodity_info
    flex 1
    display flex
    flex-direction column
    margin-left 14px
    .cloumn-commodity-code
      color #9AA6B8
    .no-row
      overflow: hidden
      text-overflow:ellipsis
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
>>>.el-table__footer-wrapper
  tr
    height 60px
    line-height 60px
    td
      background-color #FEF8E1
      &:nth-last-child(1)
        color #F25754
        font-size 14px
.p-heade
  font-size 16px
  margin-bottom 20px
.u-head
  display flex
  justify-content space-between
  margin 20px 0
.u-title
  margin-right 10px
  color #999
 >>>.el-collapse
    padding 20px
    background-color #fff
    border none
>>>.el-table
  color #494949
</style>
