<template lang="pug">
.pay_list(
  :style="`left: ${ dataSource && dataSource.length ? '-110px' : '0' }`"
  v-loading="loading"
)
  div(v-if="dataSource && dataSource.length")
    //- 列表容器
    .pay_item(
      v-for="(item, index) in dataSource"
      :key="index"
      :class="kind === 'see' && index === dataSource.length - 1 ? 'pay_item_lastt' : ''"
    )
      .pay_item_title(
        :style="`background: ${ statusInfo[getStatus(item)].color }`"
      )
        //- 标题
        el-popover(
          trigger="hover"
          popper-class="custom_popper_css"
          :content="item.fundTypeName"
        )
          .pay_item_text(slot="reference") {{ item.fundTypeName }}
        .pay_item_status
          //- 状态
          el-popover(
            trigger="hover"
            popper-class="custom_popper_css"
            :content="item.statusName"
          )
            .pay_item_status_text(v-if="item.status" slot="reference") {{ item.statusName || '' }}
          //- 删除按钮
          i.el-icon-delete(
            @click="() => deleteHandle(item)"
            v-if="kind === 'edit' && item.returnedProportion === 0"
          )
      //- 计划应收信息
      .pay_item_content
        .pay_item_info
          .pay_item_label 计划应收时间：
          .pay_item_value {{ getDate(item.planEndDate) }}
        .pay_item_info
          .pay_item_label 计划应收金额：
          .pay_item_value {{ percent2(item.receivableAmount) }}
        .pay_item_info.pay_item_info_last
          .pay_item_label 计划金额占比：
          .pay_item_value {{ percent2(item.receivableProportion) }}%
        //- 调整计划 & 调整记录
        .pay_ajust_plain(
          v-if="kind === 'edit'" @click="() => ajustHandle(item)"
          :class="item.returnedProportion === 100 ? 'pay_ajust_plain-none' : ''"
        ) 调整计划
        .pay_ajust_record(v-if="kind === 'edit' || kind === 'see'" @click="() => recordHandle(item)") 调整记录>
      //- 按钮
      .pay_item_btns
        .pay_btn(v-if="kind === 'edit'" @click="() => editHandle(item)") 修改
        .pay_btn(@click="() => detailHandle(item)") 计划详情
        .pay_btn(v-if="kind === 'addReceive' || kind === 'see'" @click="() => receiveRecordHandle(item)") 收款记录
      //- 装饰空心圆 & 虚线
      .pay_circle_box
        .pay_circle
          .pay_white
        .pay_line(
          v-if="!(kind === 'addReceive' && index === dataSource.length - 1)"
          :class="index === dataSource.length - 1 ? 'pay_line_last' : ''"
        )
      //- 收款操作
      .pay_operate_box(
        :style="`top: ${ kind === 'edit' ? '50px' : '10px' }`"
      )
        .pay_arrow
        div
          .pay_operate(
            :style="`border-radius: ${ kind === 'edit' ? '4px' : '4px 4px 0 0' }`"
          )
            .pay_operate_title 收款操作
            .pay_operate_info(style="margin-bottom: 10px;")
              .pay_operate_info_label 已收金额：
              .pay_operate_info_value {{ percent2(item.returnedAmount) }}
            .pay_operate_info
              .pay_operate_info_label 已收回：
              .pay_operate_info_progress(
                :class="`pay_operate_info_progress-${item.status}`"
              )
                el-progress(
                  :percentage="item.returnedProportion"
                  :color="statusInfo[getStatus(item)].color"
                )
          //- 添加收款
          .pay_add_receive(
            v-if="kind === 'addReceive'"
            :class="item && item.outstandingAmount <= 0 ? 'pay_add_receive-disabled' : ''"
            @click="() => addReceiveHandle(item)"
          ) +添加收款
  div(
    style="padding: 100px 0"
    v-if="!(dataSource && dataSource.length) && (kind === 'addReceive' || kind === 'see')"
  )
    Empty
  //- 添加
  .pay_add_box(v-if="kind === 'edit' || (kind === 'addReceive' && !(dataSource && dataSource.length))")
    .pay_add(@click="addHandle") +添加应收款项
    .pay_circle.pay_circle_single(v-if="kind === 'edit'")
      .pay_white
</template>
<script>
import Empty from '@/components/qjd/empty'
import { statusInfo } from './config'
import { getDate, percent2 } from '@/utils/qjd'
/**
 * @param kind 类型，see: 查看计划，edit: 编辑计划，addReceive: 添加收款
 */
export default {
  components: {
    Empty
  },
  props: {
    kind: String,
    loading: Boolean,
    dataSource: {
      type: Array,
      default: () => ([])
    },
  },
  setup(props, { emit }) {
    // 添加款项
    const addHandle = () => emit('addHandle')
    // 修改款项
    const editHandle = item => emit('editHandle', item)
    // 删除款项
    const deleteHandle = item => emit('deleteHandle', item)
    // 款项详情
    const detailHandle = item => emit('detailHandle', item)
    // 调整计划
    const ajustHandle = item => {
      const { returnedProportion } = item ?? {}
      if (returnedProportion === 100) return
      emit('ajustHandle', item)
    }
    // 调整记录
    const recordHandle = item => emit('recordHandle', item)
    // 添加收款
    const addReceiveHandle = item => {
      if (item?.outstandingAmount === 0) return
      emit('addReceiveHandle', item)
    }
    // 收款记录
    const receiveRecordHandle = item => emit('receiveRecordHandle', item)
    // 判断状态
    const getStatus = item => {
      const { overdueStatus, repayStatus } = item ?? {}
      return repayStatus === 2 ? 2 : overdueStatus === 2 ? 3 : 1
    }

    return {
      getDate,
      percent2,
      getStatus,
      statusInfo,
      addHandle,
      editHandle,
      deleteHandle,
      detailHandle,
      ajustHandle,
      recordHandle,
      addReceiveHandle,
      receiveRecordHandle,
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
