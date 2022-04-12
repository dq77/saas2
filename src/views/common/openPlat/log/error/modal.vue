<template lang="pug">
  Modal(
    :title="title"
    :visible="visible"
    :width="'700px'"
    :sureTxt="'提交'"
    :footer=" title === '错误处理' ? 'default' : null "
    :loading="loading"
    @cancleHandle="cancleHandle"
    @sureHandle="sureHandle"
  )
    .log-title 日志信息：
    .log-info 对应模块：{{ detail && detail.moduleCnName ? detail.moduleCnName : '- -' }}
    .log-info 错误场景：{{ detail && detail.businessCase ? detail.businessCase : '- -' }}
    .log-info 错误内容：{{ detail && detail.errorInfo ? detail.errorInfo : '- -' }}
    .log-info 日志级别：错误
    .log-info(style="margin-bottom: 10px")
      .log-info-label 关键信息：
      .log-info-content {{ detail && detail.errorDesc ? detail.errorDesc : '- -' }}
    .log-title 还款信息：
    .login-table
      Table(:dataSource="dataSource", :columns="modalColumns", :loading="tableLoading")
</template>
<script>
import { watch } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import Modal from '@/components/qjd/modal'
import ajaxStore from '@/apis'
import { Message } from 'element-ui'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import { modalColumns } from '../config'

export default {
  components: {
    Table,
    Modal
  },
  props: {
    visible: Boolean,
    title: String,
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const { solveError, getPayInfo } = ajaxStore.common.openPlat
    // table
    const {
      dataSource,
      searchHandle,
      loading: tableLoading,
      clearHandle
    } = useTable({
      request: getPayInfo,
      isInit: false,
      isPage: false
    })

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          const { detail } = props
          const { destId } = detail || {}
          searchHandle({ destId })
        }
      }
    )
    // 取消
    const cancleHandle = () => {
      clearHandle()
      emit('cancleHandle')
    }
    // 成功回调
    const successCallBack = ({ code }) => {
      if (code === '0') {
        Message.success('处理成功')
        clearHandle()
        emit('successHandle')
        emit('cancleHandle')
      }
    }
    // 提交接口
    const { doResult, loading } = useAsync({
      request: solveError,
      init: false,
      successCallBack
    })
    // 确定
    const sureHandle = () => doResult({ errorLogCode: props.detail ? props.detail.errorLogCode ? props.detail.errorLogCode : '' : '' })

    return {
      modalColumns,
      dataSource,
      tableLoading,
      sureHandle,
      cancleHandle,
      loading
    }
  },
}
</script>
<style lang="stylus" scoped>
.log-title
  font-size 14px
  font-weight 700
  margin-bottom 10px
.log-info
  display flex
  padding-left 20px
  margin-bottom 10px
  .log-info-content
    flex 1
    line-height 24px
.login-table
  padding 20px
.log-btns
  padding-top 20px
  display flex
  align-items center
  justify-content center
</style>
