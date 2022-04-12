<template lang="pug">
  div
    Card(noTitle :loading='loading')
      div(v-for='(item, i) in list' :key='i')
        .title-con
          h3 {{item.title}}
          el-tooltip(placement="top-start" :content='item.info')
            i.el-icon-info
        .main-con
          span {{item.title}}
          el-select(v-model="selectKeys[item.key]" @change='selectChange($event, item.key)' :disabled='item.key !== "isUsed" && disabled')
            el-option(
              v-for="(child, i) in status[i]"
              :key="i"
              :label="child.label"
              :value="child.value"
            )
    .p-btns
      el-button(type='primary' :loading='btnLoading' @click='clickSave' :disabled='btnDisabled') 保存
</template>

<script>
import { reactive, toRefs, watchEffect, watch } from '@vue/composition-api'
import Card from '@/components/Card'
import { Message } from 'element-ui'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { status, list } from './config'

export default {
  components: {
    Card,
  },
  setup() {
    // state，默认都是关闭
    const state = reactive({
      selectKeys: {
        isUsed: 0,
        negativeInventoryFlag: 0,
        isShowQuantity: 0,
      },
      disabled: false,
      btnDisabled: true,
    })

    // 获取详情
    const { result, loading } = useAsync({
      request: ajaxStore.factory.setBase.getSysconfig,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          const { isUsed, negativeInventoryFlag, isShowQuantity } = data
          state.selectKeys = {
            isUsed,
            negativeInventoryFlag,
            isShowQuantity,
          }
        }
      }
    })
    // 保存
    const { doResult: createSysconfig, loading: btnLoading } = useAsync({
      request: ajaxStore.factory.setBase.createSysconfig,
      init: false
    })

    // 点击保存
    const clickSave = async () => {
      const res = await createSysconfig({ id: result?.value?.id, ...state.selectKeys })
      if (res?.code === '0') {
        Message.success('保存成功')
      }
    }

    const selectChange = (v, type) => {
      state.btnDisabled = false
      if (type === 'isUsed' && v === 0) {
        state.disabled = true
      } else {
        state.disabled = false
      }
    }

    watch(
      () => state.selectKeys.isUsed,
      val => {
        // 关闭后其他两个选项也自动改为关闭
        if (val === 0) {
          state.selectKeys = {
            isUsed: 0,
            negativeInventoryFlag: 0,
            isShowQuantity: 0,
          }
        }
      }
    )
    // 是否允许超可用库存量下单关闭时，下面的两个选项不可编辑
    watchEffect(() => {
      state.disabled = !state.selectKeys.isUsed
    })

    return {
      loading,
      btnLoading,
      status,
      list,
      clickSave,
      selectChange,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="stylus" scoped>
.title-con
  display flex
  align-items center
  border-bottom 1px solid #EAEBEE
  padding-bottom 4px
h3
  color #494949
  font-size 14px
  line-height 28px
  margin 0 10px 0 0
  padding-left 6px
  &:before
    content ""
    width 2px
    height 14px
    background #3B68F0
    display inline-block
    position relative
    top 2px
    left -6px
.main-con
  margin-bottom 20px
  padding 20px 0
  span
    color #494949
    margin-right 12px
.el-input--small .el-input__inner
  height: 30px
.p-btns
  margin-top 22px
  text-align center
</style>
