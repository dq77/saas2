<template lang="pug">
.p-model-block(v-loading='modifyStatusLoading')
  .u-head
    .u-title {{ data.title }}
    .u-switch
      el-switch(
        :active-value='1'
        :inactive-value='0'
        v-model='data.strategyStatus'
        @change='changeStatus(data.id)'
      )
  .u-body
    .u-row(v-if='urgeWay === "STAFF"')
      .u-label 消息推送角色：
      .u-content {{ data.receiverDesc }}
    .u-row
      .u-label 触达渠道：
      .u-content {{ channelTexts }}
    .u-row(v-if='urgeWay === "SYSTEM"')
      .u-label 模型消息：
      .u-content
        el-tooltip(
          effect='light'
        )
          div(slot='content' style='width: 300px;') {{ data.messageText }}
          .u-template-name {{ data.messageText }}
    .u-row
      .u-label 模型策略：
      .u-content
        .u-stage(v-for='item in strategyTexts')
          el-tooltip(
            effect='light'
          )
            div(slot='content' style='width: 300px;') {{ item }}
            span {{ item }}
  .u-foot
    .u-btn(@click='clickChange') 修改
    el-popconfirm.u-btn(
      title='你确定要删除此条策略吗？'
      @confirm='confirmDel(data.id)'
    )
      span(slot='reference') 删除
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import { Message } from 'element-ui'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { collectionChannel } from '@/utils/enumsSaas'

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          isOpen: false,
          channels: [],
          modelStrategy: [],
        }
      }
    },
    urgeWay: String,
  },
  setup(props, { root, emit }) {
    const channelTexts = computed(() => {
      const arr = props?.data?.channels?.map(key => collectionChannel[key]) ?? []
      if (arr && arr.length) return arr.join('、')
    })
    const strategyTexts = computed(() => {
      const res = props?.data?.modelStrategy?.map((item, index) => {
        return (index + 1) + '. ' + item.prefixText + item.compareWay + item.compareValue + item.suffixText
      }) ?? []
      return res
    })

    const clickChange = () => emit('clickChange')

    // api 更新状态
    const { loading: modifyStatusLoading, doResult: modifyModelStatus } = useAsync({
      request: ajaxStore.receive.configuration.modifyModelStatus,
      init: false,
      successCallBack: (res) => {
        if (res?.code === '0') {
          Message.success('修改策略模型成功')
          emit('changeSuccess')
        }
      }
    })
    // api 删除
    const { loading: delModelLoading, doResult: delModel } = useAsync({
      request: ajaxStore.receive.configuration.delModel,
      init: false,
      successCallBack: (res) => {
        if (res?.code === '0') {
          Message.success('删除策略模型成功')
          emit('changeSuccess')
        }
      }
    })

    const changeStatus = (id) => {
      modifyModelStatus({ urgeStrategyId: id })
    }

    const confirmDel = (id) => {
      delModel({ urgeStrategyId: id })
    }

    return {
      modifyStatusLoading,
      delModelLoading,
      channelTexts,
      strategyTexts,
      clickChange,
      changeStatus,
      confirmDel,
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-model-block
  display: inline-block
  width 314px
  border: 1px solid #EAEBEE
  border-left 6px solid #3B68F0
  font-size 12px
  border-radius 4px
  .u-head
    display flex
    justify-content space-between
    padding: 17px 9px 0 15px
  .u-body
    padding 4px 9px 13px 15px
  .u-row
    display: flex
    margin 6px 0
  .u-label
    color #A3ACB8
  .u-content
    flex: 1
    width 0
    color #494949
  .u-template-name
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  .u-stage
    overflow : hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  .u-foot
    display: flex
    background: #F8F9FA
    border-top 1px solid #EAEBEE
    .u-btn
      flex: 1
      height: 40px
      line-height: 40px
      text-align: center
      color #494949
      cursor pointer
      &:first-child
        border-right 1px solid #EAEBEE
      &:hover
        color #3B68F0
      >>>span
        display: block
</style>
