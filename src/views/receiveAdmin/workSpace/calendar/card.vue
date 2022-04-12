<template lang="pug">
.card_box(v-show="visible")
  .card_close(@click="cancleHandle")
    i.el-icon-close
  .card_title {{ title }}
  .card_info(style="color: rgba(59, 104, 240, 1);") 发货单:
    span {{ firstData.extDeliveryCode }}
  .card_info {{ firstData.customerName }}
  .card_info 剩余待还款金额:{{ firstData.debtAmount }}
  .card_info 跟进人:{{ firstData.memberNameList ? firstData.memberNameList.join('，') : '' }}
  .card_fen(v-if="dataSource && dataSource.length > 1")
  .card_btn(v-if="dataSource && dataSource.length > 1")
    el-button(type="primary" size="mini" @click="seeHandle") 查看更多
</template>
<script>
import { computed } from '@vue/composition-api'
export default {
  props: {
    visible: Boolean,
    dataSource: {
      type: Array,
      default: () => ([])
    },
    date: String,
    title: {
      type: String,
      default: '今日还款提醒'
    }
  },
  setup(props, { emit, root: { $router } }) {
    // 查看更多
    const seeHandle = () => $router.push({ name: 'repayMent', query: { date: props.date } })
    // 取消
    const cancleHandle = () => emit('cancleHandle')
    // 获取第一条数据展示
    const firstData = computed(() => props.dataSource?.[0] ?? {})

    return {
      firstData,
      seeHandle,
      cancleHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.card_box
  width: 305px;
  background: #FFFFFF;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #EAEBEE;
  box-sizing: border-box
  position: absolute
  top 40px
  padding 10px 20px
  left: 50%
  transform: translate(-50%, 100px)
  z-index 9
  .card_close
    position: absolute
    right: 20px
    top 10px
    color: rgba(151, 151, 151, 1)
    cursor pointer
  .card_title
    font-size: 14px;
    font-weight: 600;
    color: #494949;
    line-height: 17px;
    margin-bottom: 6px
  .card_info
    font-size: 12px;
    font-weight: 400;
    color: #494949;
    line-height: 17px;
    margin-bottom: 3px
  .card_fen
    width: 264px;
    height: 1px;
    background: #EAEBEE
    border: 1px solid #EAEBEE;
    margin: 8px 0
  .card_btn
    display: flex
    justify-content: flex-end
</style>
