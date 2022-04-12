<template lang="pug">
.page-main
  el-collapse(v-model='activeNames' class='page-container')
    el-collapse-item(title='退货信息' :name='1')
      reverse-detail(ref='ReverseDetailRef' :queryId='queryId' :type='type' :key="myKey" @changeQueryStatus='changeQueryStatus')
    el-collapse-item(title='退货明细' :name='2')
      GoodsTableDetail(:columns='revseseColumns' :goodsData='goodsData')
      GoodsSummary(:summary='summary')
  .page-operate
    el-button(type='primary' plain @click='rejectReverseOrderClick' v-if='queryStatus === 0 || queryStatus === 1' weblogs-anchor="supplyChain-factory-return-handle-reject") 驳回
    el-button(type='primary' @click='confirmReverseOrderClick' v-if='queryStatus === 0 ' weblogs-anchor="supplyChain-factory-return-handle-adopt") 通过
    el-button(type='primary' @click='sucessReverseOrderClick' v-if='queryStatus === 1' :loading='btnLoading') 完成退货

  DialogEdit(
    ref='dialogEditRef'
    :visible='dialogEdit.visible'
    :isSupport='isSupport'
    :loading='btnLoading'
    @close='dialogEdit.visible = false'
    @successClick='successClick'
  )
</template>

<script>
import { ref, reactive, toRefs } from '@vue/composition-api' // reactive onMounted
import ReverseProduct from './Components/ReverseProductList.vue'
import ReverseDetail from './Components/RevserseDetail.vue'
import { Message, MessageBox } from 'element-ui'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import DialogEdit from './Components/dialogEdit/index'
import GoodsTableDetail from '@/views/SupplyChain/components/goodsTableDetail2'
import GoodsSummary from '@/views/SupplyChain/components/goodsSummary'
import { revseseDetailProductColumns, revseseColumns } from './const'

export default {
  components: {
    ReverseProduct,
    ReverseDetail,
    DialogEdit,
    GoodsTableDetail,
    GoodsSummary,
  },
  setup(props, {root}) {
    const dialogEditRef = ref(null)
    const {id, type} = root.$route.query || {}

    const { factory: { rejectReverseOrder, confirmReverseOrder, sucessReverseOrder, checkWarehouseExist, getReverseProductList } } = ajaxStore

    const queryId = id
    const myKey = ref(0)
    const activeNames = ref([1, 2])
    const ReverseDetailRef = ref(null)
    const queryStatus = ref('')
    let fee = ''

    const changeQueryStatus = (val) => { queryStatus.value = val }
    // onMounted(() => changeQueryStatus())

    const goodsData = ref([])
    const summary = ref({
      productSum: 0,
      priceSum: [
        { label: '退货总计', value: 0 }
      ]
    })
    useAsync({
      request: getReverseProductList,
      params: { reverseOrderId: id },
      successCallBack: (res) => {
        if (res?.code === '0' && res?.data?.length) {
          goodsData.value = res.data
          summary.value.productSum = res.data.length
          summary.value.priceSum[0].value = res.data.reduce((s, item) => s + (item?.goodsPayTotalAmount ?? 0), 0)
        }
      }
    })

    const getFee = () => {
      const { loopFormData } = ReverseDetailRef.value || {}
      loopFormData && loopFormData((item, key) => {
        if (key === 'fee') {
          fee = item[key]
        }
      })
      return fee
    }
    const {doResult: _rejectReverseOrder} = useAsync({
      request: rejectReverseOrder,
      init: false,
    })
    const rejectReverseOrderClick = () => {
      MessageBox.confirm('确认对退货申请进行驳回吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        roundButton: true
      }).then(() => {
        _rejectReverseOrder({fee: getFee(), id: queryId}).then(res => {
          const {code, data} = res
          if (code === '0') {
            queryStatus.value = data.status
            myKey.value++
            Message.success('退货申请已驳回')
          }
        })
      })
    }

    const {doResult: _confirmReverseOrder} = useAsync({
      request: confirmReverseOrder,
      init: false,
    })
    const confirmReverseOrderClick = () => {
      MessageBox.confirm('确认对退货单审核通过吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        roundButton: true
      }).then(() => {
        _confirmReverseOrder({fee: getFee(), id: queryId}).then(res => {
          const {code, data} = res
          if (code === '0') {
            queryStatus.value = data.status
            myKey.value++
            Message.success('退货申请已通过')
          }
        })
      })
    }

    // 当前退货允许退回方式
    useAsync({
      request: checkWarehouseExist,
      params: { reverseOrderId: id },
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          const { isSupport, isUsed } = data
          state.isSupport = isSupport // isSupport: 0:都支持（原路退回、退至指定仓库） 1:不支持原路退回 2:只支持原路退回 4:都不支持
          state.isUsed = isUsed // isUsed：仓库是否启用 0:不启用 1:启用,
        }
      }
    })

    // 完成退货接口
    const { doResult: _sucessReverseOrder } = useAsync({
      request: sucessReverseOrder,
      init: false,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          queryStatus.value = data.status
          myKey.value++
          Message.success('已完成退货')
        }
        state.btnLoading = false
      }
    })
    // 完成退货点击
    const sucessReverseOrderClick = () => {
      // 未开启仓库，或者开启仓库但是不支持原路退回、退至指定仓库
      if (!state.isUsed || (state.isUsed && state.isSupport === 4)) {
        MessageBox.confirm('确认完成退货吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          roundButton: true
        }).then(async () => {
          state.btnLoading = true
          await _sucessReverseOrder({ fee: getFee(), id })
        }).catch(() => {
        })
      } else {
        state.dialogEdit.visible = true
      }
    }
    // 完成退货弹窗点击确定
    const successClick = async () => {
      const { formState: { formData: { type, warehouseId } } } = dialogEditRef.value
      let warehouseName = dialogEditRef.value.warehouseName
      if (type === 1) {
        warehouseName = '原路退回'
      }
      state.btnLoading = true
      await _sucessReverseOrder({ fee: getFee(), id, warehouseId, warehouseName })
      state.dialogEdit.visible = false
    }

    const state = reactive({
      dialogEdit: {
        visible: false,
      },
      isSupport: 4,
      isUsed: 0,
      btnLoading: false,
    })

    return {
      dialogEditRef,
      activeNames,
      queryId,
      queryStatus,
      type,
      ReverseDetailRef,
      rejectReverseOrderClick,
      confirmReverseOrderClick,
      sucessReverseOrderClick,
      myKey,
      changeQueryStatus,
      successClick,
      revseseDetailProductColumns,
      revseseColumns,
      goodsData,
      summary,
      ...toRefs(state)
    }
  },
}
</script>

<style lang="stylus" scoped>
.page-container
  background-color #fff
  padding 20px
.page-operate
  text-align center
  margin-top 30px
</style>
