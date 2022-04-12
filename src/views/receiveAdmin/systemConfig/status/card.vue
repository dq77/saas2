<template lang='pug'>
.config-card(:class='{"config-card--customize" : data.isDefault !== "1"}')
  Table(
    ref="tableRef"
    :dataSource="[data]"
    :columns="columns"
  )
    template(slot="statusCode" slot-scope="{ row }")
      el-select(
        v-model="row.statusCode"
        placeholder="请选择"
        @change='changeHandle(row.statusCode)'
      )
        el-option(
          v-for="item in selectList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
        )
    template(slot="overdueDays" slot-scope="{ row }")
      .config-card__deadline
        template(v-if='row.isDefault === "1"')
          span.config-card__deadline--space {{ row.conditionType }}
          span 计划应收时间
        template(v-else)
          el-select.select-small(
            v-model="row.conditionType"
            placeholder="请选择"
            disabled
          )
            el-option(
              v-for="(item, key) in conditionType"
              :key="item"
              :label="item"
              :value="item"
            )
          span.config-card__deadline-text 计划应收时间
          el-input-number.config-card__deadline-number(
            v-model="row.overdueDays"
            controls-position="right"
            :min="0"
          )
          span.config-card__deadline-day 天
    template(slot="repayStatus" slot-scope="{ row }")
      template(v-if='row.isDefault === "1"')
        span {{ row.repayStatus === 2 ? '完全收回' : '没有完全收回' }}
      template(v-else)
        el-radio-group.config-card--radio(
          v-model="row.repayStatus"
        )
          el-radio(:label="2") 完全收回
          el-radio(:label="3") 没有完全收回
    template(slot="operate" slot-scope="{ row }")
      template(v-if='row.isDefault !== "1"')
        el-button.config-card--delete(type="danger" plain @click="deleteHandle(row)") 删除
      el-button(type="primary" plain @click="confirmHandle(row)" :loading='row.loading') 保存
</template>

<script>
import Table from '@/components/qjd/table'
import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { columns } from './config'
import { MessageBox, Message } from 'element-ui'
import { useEventBus } from '@vueuse/core'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    selectList: {
      type: Array,
      default: () => ([])
    }
  },
  emits: ['cancelHandle', 'resetHandle'],
  components: {
    Table
  },
  setup (props, { emit }) {
    // ajaxStore
    const { receive: { configStatusCreate, configStatusUpdate, configStatusDelete } } = ajaxStore
    // state
    const state = reactive({
      conditionType: ['≤', '<', '=', '>'],
      radio: 1
    })
    // useEventBus
    const busChoose = useEventBus('chooseHandle')
    /** useAsync */
    // 保存 - 创建
    const { doResult: createHandle } = useAsync({
      init: false,
      request: configStatusCreate,
    })
    // 保存 - 编辑
    const { doResult: updateHandle } = useAsync({
      init: false,
      request: configStatusUpdate
    })
    // 删除
    const { doResult: removeHandle } = useAsync({
      init: false,
      request: configStatusDelete
    })
    // useEventBus
    const busInit = useEventBus('initHandle')
    /** methods */
    // 删除
    const deleteHandle = (row) => {
      !row.id && emit('cancelHandle', row?._id)
      row.id && openMessageBox({ saArmStatusConditionId: row.id })
    }
    const openMessageBox = (params) => {
      MessageBox.confirm('是否确认删除当前配置？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            try {
              instance.confirmButtonLoading = true
              const { code } = await removeHandle(params)
              if (code === '0') {
                Message.success('删除成功')
                emit('resetHandle')
                busInit.emit()
              }
            } catch (error) {
              console.error(error)
            }
            instance.confirmButtonLoading = false
          }
          done()
        }
      }).then(() => {
      }).catch(() => {
      })
    }
    // 保存
    const confirmHandle = async (row) => {
      const current = props.selectList.filter(item => row.statusCode === item.dictCode)
      row.statusName = current[0]?.dictName
      const { statusCode, statusName, overdueDays, repayStatus, conditionType, id } = row ?? {}
      // 校验
      if (!statusCode) return Message.warning('请选择收款状态')
      if (row.isDefault !== '1' && (!overdueDays || overdueDays === 0)) return Message.warning('请输入是否到达计划应收时间')
      if (!repayStatus) return Message.warning('请选择是否完全收回')
      // loading
      row.loading = true
      // 创建
      const { code } = !id ? await createHandle({ statusCode, statusName, overdueDays, repayStatus, conditionType }) : await updateHandle({ statusCode, statusName, overdueDays, repayStatus, conditionType, id })
      row.loading = false
      code === '0' && successHandle(row)
    }
    // 保存成功
    const successHandle = (row) => {
      emit('resetHandle')
      Message.success('保存成功')
      busInit.emit()
    }
    const changeHandle = (dictCode) => {
      const current = props.selectList.filter(item => dictCode === item.dictCode)
      // console.log(current)
      busChoose.emit(current[0])
    }

    return {
      columns,
      ...toRefs(state),
      deleteHandle,
      confirmHandle,
      changeHandle
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../components/style.styl'

.select-small
  width 62px
.config-card
  margin-bottom 20px
  &__deadline-text
    margin 0 6px
  &__deadline-day
    margin-left 6px
  &__deadline-number
    width 100px
  &__deadline--space
    margin-right 12px
  &--radio label
    display block
    margin 0
    width 105px
    text-align left
    &:first-child
      margin-bottom 18px
  &--delete
    background #fff
/deep/ .el-table--small td, .el-table--small th
  padding 24px 0
/deep/ .el-table--enable-row-hover .el-table__body tr:hover>td
  background #fff
/deep/ .el-input--small
  font-size 12px
</style>

<style lang="stylus">
.config-card--customize .el-table th.el-table__cell
  background-color #F3F9FF
</style>
