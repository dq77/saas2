<template lang='pug'>
.list-page
  Form.list-form(
    ref="formRef"
    :formData="formApi.formData",
    :formConfig="formApi.formConfig"
  )
    template(slot='score')
      .list-form__score
        el-input(type='text' v-model='form.startScore' placeholder='最低分' clearable)
        span -
        el-input(type='text' v-model='form.endScore' placeholder='最高分' clearable)
    .global-search-btn
      el-button.search-button(type="primary" @click="searchFormHandle" :loading="tableApi.loading") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
  .list-table
    ButtonGroup(
      :buttonDisabled='buttonDisabled'
      :multipleSelection='multipleSelection'
      :ascs='form.ascs'
      :descs='form.descs'
      :taskCount='taskCount'
    )
    Table(
      ref='tableRef'
      :dataSource="tableApi.dataSource || []"
      :columns="tableColumns"
      :loading="tableApi.loading"
      checkbox
      @selectionHandle='selectionHandle'
      @sortChange='sortChange'
    )
      template(slot='corpName' slot-scope='{row}')
        router-link(:to='{ name: "enterpriseImage", query: { companyName: row.corpName, creditCode: row.regCode} }' weblogs-anchor='customerGuard-worth-view-enterprise') {{ row.corpName }}
      template(slot='modelScore' slot-scope='{row}')
        span(v-if='row.gradeInfo.status !== 6') {{ Math.round(row.modelScore) || '0' }}
        span(v-else) -
        el-popover(
          v-if='row.gradeInfo.status === 6'
          placement='top-start'
          content='模型更新后，原来的等级无法进行展示，请重新跑模型以获取新的模型结果。'
          trigger='hover'
        )
          i.el-icon-warning.u-warning-icon(slot='reference')
      template(slot='enterpriseImage' slot-scope='{row}')
        el-button(type='text' @click='baseApi.toDetail(row)') 查看详情
      template(slot='focusOn' slot-scope='{row, $index}')
        el-button(v-if='baseApi.hasFollow[$index]' type='text' @click='baseApi.unFollow(row.corpName)' weblogs-anchor='customerGuard-worth-view-unFollow') 取消关注
        el-button(v-else type='text' @click='baseApi.follow(row.corpName)' weblogs-anchor='customerGuard-worth-view-follow') 关注
      template(slot='operate' slot-scope='{row, $index}')
        .u-operate-button
          template
            el-button.u-disabled-btn(type='text' disabled v-if='row.gradeInfo.status === 1 || row.gradeInfo.status === 0') 生成中
            el-button(type='text' v-else @click='updateRating(row.id)' :loading='baseApi.updateRatingLoading' weblogs-anchor='customerGuard-worth-view-update') 更新分数
          el-button(type='text' @click='clickRemove(row, baseApi.hasFollow[$index])' :loading='baseApi.removeLoading' weblogs-anchor='customerGuard-worth-view-delete') 移除
          el-button(type='text' @click='getAdviceQuota(row.id)' weblogs-anchor='customerGuard-worth-view-modify' :loading='baseApi.checkCompanyInfoLoading' ) {{row.realControllerId ? '修改信息' : '补充信息'}}
          el-button(type='text' @click='baseApi.setReportName(row)' weblogs-anchor='customerGuard-worth-view-apply-report') 申请报告
  Pagination.list-pagination(:pagination="tableApi.pagination")
  ApplyDialog(:dialogShow='baseApi.applyReportDialogShow' @close='baseApi.applyReport' :companyName='baseApi.reportCompanyName')
</template>

<script>
import ajaxStore from '@/apis'
import { ref, reactive, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import ApplyDialog from '../../components/applyDialog'
import ButtonGroup from './buttonGroup'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useBase from './useBase'
import useAsync from 'hooks/useAsync'
import { cFormData, cFormConfig, tableColumns } from './config'
import { filterGradeInfo } from '@/utils/util'
import { uppertoline } from '@/utils/qjd'
import { Message, MessageBox } from 'element-ui'
import { EventBus } from '../../event-bus'


export default {
  components: {
    Form,
    Table,
    Pagination,
    ButtonGroup,
    ApplyDialog
  },
  props: {
    isInit: Boolean
  },
  emits: ['refreshMethod'],
  setup (props, { emit }) {
    // refs
    const formRef = ref()
    const tableRef = ref()
    // state
    const state = reactive({
      formApi: {},
      tableApi: {},
      baseApi: {},
      form: {
        startScore: undefined,
        endScore: undefined,
        ascs: undefined,
        descs: undefined,
        pageNo: 1,
        pageSize: 10
      },
      ids: [],
      selectItem: {}, // 选中信息
      dialogAddStep3: {
        visible: false,
        loading: false,
        type: 'add',
        form: {
          realControllerName: '',
          realControllerId: '',
          realControllerMobile: ''
        }
      },
      // selection
      multipleSelection: [],
      buttonDisabled: true,
      taskCount: 0
    })
    // apis
    const { getPageCustomized, checkCompanyModelResult } = ajaxStore.risk
    // base - 一些基础事件
    state.baseApi = useBase()
    // form
    state.formApi = useForm({ formRef, formData: cFormData, formConfig: cFormConfig })
    // table & page
    state.tableApi = useTable({ request: getPageCustomized, callback: (data) => listInfo(data) })
    // methods
    // 查询
    const searchFormHandle = () => {
      state.formApi.submitHandle(() => {
        let data = JSON.parse(JSON.stringify(state?.formApi?.formData))
        data = Object.assign(data, state.form)
        state.tableApi.searchHandle({ ...data })
      })
    }
    // 重置
    const resetFormHandle = () => {
      state.form = { startScore: undefined, endScore: undefined, ascs: undefined, descs: undefined }
      state.formApi.resetHandle()
      state.tableApi.resetHandle()
      // sort selection
      tableRef.value.getTableRef().clearSort()
      tableRef.value.clearSelection()
      state.multipleSelection = []
      state.buttonDisabled = true
      // 清除添加的class
      const rows = document.getElementsByClassName('el-table__row')
      for (let i = 0; i < rows.length; i++) {
        rows[i].className = 'el-table__row'
      }
    }
    // 更新分数
    const updateRating = (id) => {
      state.baseApi.updateRating({ id }).then(res => {
        if (res && res.code === '0') {
          Message.success('更新成功')
          state.form.pageNo = state.tableApi.params.pageNo
          searchFormHandle()
        }
      })
    }
    // 删除
    const clickRemove = (row, isFocuse) => {
      const { id, corpName } = row
      MessageBox.confirm('是否确定移除当前企业？', '移除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            try {
              instance.confirmButtonLoading = true
              state.baseApi.removeRating({ id }).then((res) => {
                if (res && res.code === '0') {
                  Message.success('移除成功')
                  // 取消关注
                  isFocuse && unFollow(corpName)
                  resetFormHandle()
                  // 任务列表值
                  initTaskCount()
                }
              })
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
    // 编辑
    const getAdviceQuota = (id) => {
      state.baseApi.checkCompanyInfo({ id }).then(res => {
        if (res && res.code === '0') {
          const data = res.data || {}
          EventBus.$emit('initBasicInfo', { visible: true, selectItem: data, type: 'edit' })
        }
      })
    }
    // 是否生成中
    const { doResult: initCheckGenerating } = useAsync({
      init: false,
      request: checkCompanyModelResult,
      successCallBack: ({ code, data }) => {
        if (code !== '0') return
        const dataSource = state.tableApi.dataSource
        dataSource.forEach((item, i) => {
          data.forEach((item2, j) => {
            if (item.id === item2.id) {
              item = Object.assign(item, item2)
              item.gradeInfo = filterGradeInfo(item)
              state.ids.map((idsItem, index) => {
                if (idsItem === item2.id) {
                  state.ids.splice(index, 1)
                }
              })
            }
          })
        })
        if (state.ids.length) {
          setTimeout(() => {
            initCheckGenerating({ ids: state.ids })
          }, 5000)
        } else {
          emit('refreshMethod')
        }
      }
    })
    // 处理数据
    const listInfo = (data) => {
      state.ids = []
      data.pagedRecords.map((item, key) => {
        data.pagedRecords[key].gradeInfo = filterGradeInfo(item)
        if ([0, 1].includes(data.pagedRecords[key].gradeInfo.status)) {
          state.ids.push(data.pagedRecords[key].id)
        }
      })
      EventBus.$emit('firstDetailHandle', data.pagedRecords[0]) // 通知ValueTabs价值详情按钮
      state.baseApi.initFollowResult(data.pagedRecords)
      if (state.ids.length) {
        setTimeout(() => {
          initCheckGenerating({ ids: state.ids })
        }, 5000)
      }
      return {
        dataSource: data.pagedRecords,
        totalCount: data.totalCount
      }
    }
    // 选中
    const selectionHandle = (val) => {
      state.multipleSelection = val
      if (val && val.length > 0) {
        state.buttonDisabled = false
      } else {
        state.buttonDisabled = true
      }
    }
    // 排序
    const sortChange = (data) => {
      const { order, prop } = data
      console.log(data)
      if (order === 'ascending') {
        state.form.ascs = uppertoline(prop)
        state.form.descs = undefined
      } else if (order === 'descending') {
        state.form.ascs = undefined
        state.form.descs = uppertoline(prop)
      } else {
        state.form.ascs = undefined
        state.form.descs = undefined
      }
      searchFormHandle()
    }

    EventBus.$on('tableInit', (data) => {
      resetFormHandle()
      const { type, selectItem } = data || {}
      if (type === 'add') {
        state.baseApi.saveDoResult({companyName: selectItem.name}) // 跑模型
        setTimeout(() => {
          const rows = document.getElementsByClassName('el-table__row')
          for (let i = 0; i < rows.length; i++) {
            if (rows[i].innerHTML.indexOf(selectItem.name) > -1) {
              console.log(rows[i])
              rows[i].className = rows[i].className + ' u-current-add'
            }
          }
        }, 1500)
      }
    })

    EventBus.$on('initTaskCount', () => initTaskCount())
    const initTaskCount = () => {
      state.baseApi.taskCountDoResult().then(res => {
        if (res && res.code === '0') {
          state.taskCount = res.data
        }
      })
    }
    initTaskCount()

    return {
      formRef,
      tableRef,
      tableColumns,
      searchFormHandle,
      resetFormHandle,
      updateRating,
      clickRemove,
      getAdviceQuota,
      selectionHandle,
      sortChange,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.list-form
  border-radius 4px
  padding 20px 20px 2px
  margin-bottom 10px
  background #fff
  &__score
    display flex
    justify-content space-between
    span
      margin 0 10px
.list-table
  background #fff
  padding 20px
.list-pagination
  margin-top 0
  background #fff

>>> .el-table th.el-table__cell.el-table-column--selection>.cell
  padding-left 15px
  padding-right 14px
</style>
