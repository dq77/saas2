<template lang="pug">
.page-main.p-precise-list
  .p-edit
    el-button(style='margin-bottom: 20px' type='primary' @click='() => modalState.openHandle()') 新建评估企业
    Popover
  .p-title
    .p-left 企业总数：{{boardInfo.companyNum}}
    .p-right
      img(:src="`${$assetsBaseUrl}/customerGuard/amount.png`")
      .desc
        .desc-label 评估率
        .desc-value {{ Number(boardInfo.evaluateRate) ? (Number(boardInfo.evaluateRate) * 100).toFixed(2) + '%' : '- -' }}
  CardCharts(:baseInfo='boardInfo')
  //- form
  Form.golbal_search_box(
    ref="formRef"
    :formData="formState.formData",
    :formConfig="formState.formConfig"
  )
    .global-search-btn-feed
      el-button.search-button(
        type="primary"
        @click="searchFormHandle"
        :loading="tableState.loading"
      ) 搜索
      el-button.search-button(@click="resetFormHandle") 重置
  div(style="background: #fff;")
    //- table
    div(style="padding: 20px")
      Table(
        :dataSource="tableState.dataSource"
        :columns="columns"
        :loading="tableState.loading"
      )
        template(slot='operate' slot-scope='{row, $index}')
          //- 操作
          .u-nowrap
            el-button.u-btn(type='text' @click='clickToDetail(row)') 查看
            el-button.u-btn(type='text' @click='clickToEdit(row)' v-if='row.status==="0"') 编辑
            el-button.u-btn(type='text' @click='clickToReApply(row)' v-if='row.status && row.status!=="0" && row.status!=="1"') 重新发起
            //- el-button.u-btn(type='text' @click='clickToRefresh(row, $index)' ) 刷新评估结果
    Pagination(:pagination="tableState.pagination")
    //- 添加评估客户
    //- 弹窗
    Modal(
      :visible="modalState.visible"
      :title="modalState.title"
      @cancleHandle="modalState.cancleHandle"
      @successHandle="successHandle"
    )
</template>
<script>
import { Message, MessageBox } from 'element-ui'
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import CardCharts from './cardCharts'
import Popover from './popover'
import Modal from './modal'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useModal from 'hooks/useModal'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { columns, cFormConfig, cFormData } from './config'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Modal,
    CardCharts,
    Popover
  },
  setup(props, {root}) {
    const formRef = ref()
    const { customer: { precise: { getBoard, getCompanyList, reapply } } } = ajaxStore
    // state
    const state = reactive({
      boardInfo: {},
      boardState: {},
      formState: {},
      tableState: {},
      updateState: {},
      modalState: {},
      reapplyState: {},
      cycleParam: {},
      cycleState: {},
    })
    // modal
    state.modalState = useModal('添加客户评估')
    // 重新发起
    state.reapplyState = useAsync({
      request: reapply,
      init: false
    })
    // form
    state.formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig
    })
    const setBoard = (data) => {
      state.boardInfo = data
    }
    // 获取基础统计信息
    state.boardState = useAsync({
      request: getBoard,
      successCallBack: ({code, data}) => code === '0' && setBoard(data)
    })
    // 单独数据查询更新
    // state.updateState = useAsync({
    //   request: getCompanyList,
    //   init: false,
    // })
    // table & page
    state.tableState = useTable({
      editDataSource: true,
      request: getCompanyList,
      callback: (data = {}) => {
        const { total = 0, records = [] } = data || {}
        records.forEach(item => {
          item.scoreStatus = '成功'
        })
        return {
          totalCount: total,
          dataSource: records || []
        }
      }
    })
    // 重写分页事件，再调用前清空循环查询队列
    const _onChange = state.tableState.pagination.onChange
    state.tableState.pagination.onChange = (...params) => {
      state.cycleParam = {}
      _onChange.call(this, ...params)
    }
    // 查询
    const searchFormHandle = () => {
      state.cycleParam = {}
      state.formState.submitHandle().then(() => {
        const { formData: { time, ...others } } = state.formState
        let params = {}
        if (time && time.length) {
          params.createTimeStart = time[0]
          params.createTimeEnd = time[1]
        }
        params = { ...params, ...others }
        state.tableState.searchHandle(params)
      })
    }
    // 重置
    const resetFormHandle = () => {
      state.cycleParam = {}
      state.formState.resetHandle()
      state.tableState.resetHandle()
    }
    const successHandle = () => {
      state.tableState.searchHandle()
      state.boardState.doResult()
    }
    // 跳转详情页
    const clickToDetail = (row) => {
      root.$router.push({name: 'preciseStratificationDetail', query: {companyBasicCode: row.companyBasicCode}})
    }
    // 跳转到标记页
    const clickToEdit = (row) => {
      root.$router.push({name: 'preciseStratificationEdit', query: {companyBasicCode: row.companyBasicCode}})
    }
    const clickToReApply = (row) => {
      MessageBox.confirm('确认重新发起？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '关闭',
        type: 'warning',
        roundButton: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.message = '发起中，请稍后…'
            state.reapplyState.doResult({
              creditCode: row.creditCode,
              companyName: row.companyName,
            }).then(({code, data}) => {
              instance.confirmButtonLoading = false
              if (code === '0') {
                done()
                Message.success('发起成功')
                root.$router.push({name: 'preciseStratificationEdit', query: {companyBasicCode: data}})
              }
            })
            // setTimeout(() => {
            //   done()
            //   setTimeout(() => {
            //     instance.confirmButtonLoading = false
            //   }, 300)
            // }, 3000)
          } else {
            done()
          }
        }
      }).then(() => {
        // state.reapplyState.doResult({
        //   creditCode: row.creditCode,
        //   companyName: row.companyName,
        // }).then(({code, data}) => {
        //   if (code === '0') {
        //     Message.success('发起成功')
        //     root.$router.push({name: 'preciseStratificationEdit', query: {companyBasicCode: data}})
        //   }
        // })
      })
    }
    // const clickToRefresh = async(row, index) => {
    //   state.cycleParam[index] = {
    //     row,
    //     index,
    //     isRequest: true
    //   }
    //   state.tableState.dataSource[index].scoreStatus = '获取中'
    //   state.tableState.resetDataSource(state.tableState.dataSource)
    //   searchIndex(row, index)
    // }
    // const searchIndex = (row, index) => {
    //   state.updateState.doResult({
    //     pageNo: 1,
    //     companyNameLike: row.customerName,
    //     pageSize: 10,
    //   }).then(({code, data}) => {
    //     if (code === '0' && Object.keys(state.cycleParam).length > 0) {
    //       state.tableState.dataSource[index].scoreStatus = '成功'
    //       state.tableState.resetDataSource(state.tableState.dataSource)
    //       delete state.cycleParam[index]
    //     } else {
    //       state.cycleParam[index].isRequest = false
    //     }
    //   })
    // }
    // const cycleSearch = () => {
    //   setInterval(() => {
    //     Object.keys(state.cycleParam).forEach(key => {
    //       if (state.cycleParam[key].isRequest) return
    //       const {row, index} = state.cycleParam[key]
    //       state.cycleParam[key].isRequest = true
    //       searchIndex(row, index)
    //     })
    //   }, 60000)
    // }
    // cycleSearch()

    return {
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      successHandle,
      clickToDetail,
      clickToEdit,
      clickToReApply,
      // clickToRefresh,
      // cycleSearch
    }
  },
}
</script>
<style lang="stylus">
.popver-width
  max-width 1028px
.p-precise-list
  .custom_modal_footer
    border-top 0
    padding 0
    justify-content center
    left 0
    width 100%
</style>
<style lang="stylus" scoped>
.u-nowrap
  display flex
.p-edit
  margin-top 10px
  .el-icon-warning
    span
      margin-left 5px
.p-title
  height 120px
  padding 20px
  background-image url('//cdn.qjdchina.com/static-online/saas/customerGuard/bg-amount.png')
  background-repeat no-repeat
  background-position center right
  background-size auto 100%
  background-color #fff
  border-radius 4px
  display flex
  justify-content flex-start
  align-items center
  .p-left
    flex 350px 0 0
    height 80px
    line-height 80px
    border-right 1px solid #F2F2F6
    font-size 18px
    font-weight 500
    color #494949
  .p-right
    flex 1
    height 80px
    padding-left 80px
    display flex
    justify-content flex-start
    align-items center
    .desc
      margin-left 10px
      .desc-label
        font-size 12px
        color #494949
      .desc-value
        font-size 26px
        color #494949
        font-weight bold
</style>
