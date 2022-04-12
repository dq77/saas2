<template lang="pug">
div(style="padding-bottom: 100px;")
  .pay_title 应收款项
  .pay_info(v-if="!id") 请先添加左侧应收计划
  fragment(v-else)
    //- 添加计划 - 总额 & 剩余
    Money(v-if="kind === 'edit'" :moneyInfo="moneyInfo")
    //- 添加款项 - 金额
    MoneyInfo(v-if="kind === 'addReceive' || kind === 'see'" :moneyInfo="moneyInfo")
    //- 款项列表
    List(
      :kind="kind"
      :dataSource="currentAPis.dataSource"
      :loading="currentAPis.loading"
      @addHandle="() => addModalApis.open(null, 'add')"
      @editHandle="detail => addModalApis.open(detail, 'edit')"
      @deleteHandle="detail => currentAPis.detele(detail)"
      @detailHandle="detail => detailApis.open(detail)"
      @ajustHandle="detail => ajustApis.open(detail)"
      @recordHandle="detail => recordApis.open(detail)"
      @addReceiveHandle="detail => receiveApis.open(detail)"
      @receiveRecordHandle="detail => receiveRecordApis.open(detail)"
    )
  //- 添加款项
  AddModal(
    :title="addModalApis.title"
    :visible="addModalApis.visible"
    :detail="addModalApis.detail"
    :type="addModalApis.type"
    :moneyInfo="moneyInfo"
    @cancleHandle="addModalApis.cancle"
    @successHandle="successHandle"
  )
  //- 计划详情
  Detail(
    :title="detailApis.title"
    :visible="detailApis.visible"
    :detail="detailApis.detail"
    @cancleHandle="detailApis.cancleHandle"
  )
  //- 调整计划
  Ajust(
    :title="ajustApis.title"
    :visible="ajustApis.visible"
    :detail="ajustApis.detail"
    :moneyInfo="moneyInfo"
    :getList="currentAPis.getAjustlist"
    @cancleHandle="ajustApis.cancleHandle"
    @successHandle="() => getList(moneyInfo ? moneyInfo.id : '')"
  )
  //- 调整记录
  Record(
    :title="recordApis.title"
    :visible="recordApis.visible"
    :detail="recordApis.detail"
    @cancleHandle="recordApis.cancleHandle"
  )
  //- 添加收款
  Receive(
    :title="receiveApis.title"
    :visible="receiveApis.visible"
    :detail="receiveApis.detail"
    @cancleHandle="receiveApis.cancleHandle"
    @successHandle="successHandle"
  )
  //- 收款记录
  ReceiveRecord(
    :title="receiveRecordApis.title"
    :visible="receiveRecordApis.visible"
    :detail="receiveRecordApis.detail"
    @cancleHandle="receiveRecordApis.cancleHandle"
  )
</template>
<script>
import { reactive, toRefs, inject, watch } from '@vue/composition-api'
// - 添加计划 - 总额 & 剩余
import Money from './money'
// - 添加款项 - 金额
import MoneyInfo from './moneyInfo'
// 款项列表
import List from '../../list'
// 添加款项
import AddModal from './addModal'
import useAddModal from './addModal/useAddModal'
// 计划详情
import Detail from './detail'
import useDetail from './detail/useDetail'
// 调整计划
import Ajust from './ajust'
import useAjust from './ajust/useAjust'
// 调整记录
import Record from './record'
import useRecord from './record/useRecord'
// 添加收款
import Receive from './receive'
import useReceive from './receive/useReceive'
// 收款记录
import ReceiveRecord from './receiveRecord'
import useReceiveRecord from './receiveRecord/useReceiveRecord'
// 当前逻辑
import useCurrent from './useCurrent'

export default {
  components: {
    Money,
    MoneyInfo,
    List,
    AddModal,
    Detail,
    Ajust,
    Record,
    Receive,
    ReceiveRecord
  },
  props: {
    moneyInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { root: { $route: { query: { id } } }, emit }) {
    // 添加款项
    const addModalApis = useAddModal()
    // 计划详情
    const detailApis = useDetail()
    // 调整计划
    const ajustApis = useAjust()
    // 调整记录
    const recordApis = useRecord()
    // 添加收款
    const receiveApis = useReceive()
    // 收款记录
    const receiveRecordApis = useReceiveRecord()
    // 款项添加成功
    const successHandle = () => {
      const { moneyInfo } = props
      // 更新款项列表
      getList(moneyInfo ? moneyInfo.id : '')
      // 抛出方法，触发更新计划详情（无奈之举）
      emit('successHandle')
    }
    // 当前逻辑
    const currentAPis = useCurrent({ successHandle })
    // 类型
    const kind = inject('kind')
    // state
    const state = reactive({ addModalApis, detailApis, ajustApis, recordApis, receiveApis, receiveRecordApis, currentAPis })
    // 获取款项列表
    const getList = receivablePlanId => currentAPis.getList({ receivablePlanId })
    // 监听计划总金额信息变化
    watch(
      () => props.moneyInfo,
      value => {
        const { id } = value ?? {}
        id && getList(id)
      }
    )

    return {
      id,
      kind,
      getList,
      successHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
