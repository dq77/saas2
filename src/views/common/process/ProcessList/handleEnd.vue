<template lang="pug">
.page-main-process
  list-page(
    ref='listPage'
    :config='listPageConfig'
  )
    template(slot='operate' slot-scope='{row}')
      router-link(
        v-if='row.commonBusVars && row.commonBusVars.pageFlag'
        :to='handleProcessEnums(row)'
      )
        el-button(type='text' weblogs-anchor="common-process-look") 查看
      router-link(
        v-else
        :to='{ name: "handleEnd_" + (row.processDefinitionKey), query: { taskId: row.taskId, processInstanceId: row.processInstanceId } }'
      )
        el-button(type='text' weblogs-anchor="common-process-look") 查看
</template>

<script>
import ListPage from '@/components/ListPage'
// import { accountStatus } from '@/utils/enums'
import { toDateStr, handleProcessEnums } from '@/utils/util'
// import { processEnums } from '@/utils/enumsTag'

export default {
  components: { ListPage },
  data () {
    return {}
  },
  mounted() {},
  computed: {
    listPageConfig () {
      const getHandleEndList = this.ajaxStore.common.process.getHandleEndList
      return {
        headButtonGroup: [],
        searchParams: [
          [
            {
              type: 'text',
              formItemName: 'processInstanceId',
              label: '任务编号',
              placeholder: '请输入任务编号',
              col: 6,
            },
            {
              type: 'text',
              formItemName: 'processDefinitionName',
              label: '任务名称',
              placeholder: '请输入任务名称',
              col: 6,
            },
            {
              type: 'daterange',
              label: '提交日期',
              formItemName_start: 'startTimeFrom',
              formItemName_end: 'startTimeTo',
              placeholder_start: '请选择开始日期',
              placeholder_end: '请选择结束日期',
              col: 12
            },
          ]
        ],
        tableHeader: [
          { name: '任务编号', property: 'processInstanceId', width: 300 },
          { name: '经销商名称', property: 'commonBusVars', formatter: (e) => { return e && e.customerName ? e.customerName : '- -' } },
          { name: '任务名称', property: 'processName'},
          { name: '发起人', property: 'beginnerChName'},
          { name: '处理节点', property: 'taskName'},
          { name: '提交时间', property: 'createTime' },
          { name: '操作', property: 'operate', tdSlotName: 'operate' },
        ],
        getTableList: {
          type: 'component',
          fn: getHandleEndList
        }
      }
    }
  },
  methods: {
    toDateStr,
    handleProcessEnums
  }
}
</script>
