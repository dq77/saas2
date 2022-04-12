// import { toDateStr } from '@/utils/util'
import moment from 'moment'
import {
  preciseLevel,
  preciseStatus,
  // preciseComplete
} from '@/utils/enums'

export const columns = [
  { label: '企业名称', key: 'companyName', minWidth: 100 },
  { label: '统一社会信用代码', key: 'creditCode', minWidth: 100 },
  { label: '法人代表', key: 'legalPersonName', width: 100 },
  { label: '评估状态', key: 'status', minWidth: 80, render: (row, item) => item ? preciseStatus[item] : '- -' },
  { label: '分数分段', key: 'grade', minWidth: 80, render: (row, item) => item ? preciseLevel[item] : '- -' },
  { label: '价值分数', key: 'score', width: 100 },
  // 本期不涉及资料完整逻辑
  // { label: '资料是否完整', key: 'remainingAmount1', minWidth: 80, render: (row, item) => item ? preciseComplete[item] : '- -' },
  { label: '添加时间', key: 'createTime', minWidth: 100, render: (row, item) => item ? moment(item).format('YYYY-MM-DD HH:mm:ss') : '- -' },
  { label: '操作', key: 'operate', minWidth: 100 },
]

export const cFormData = {
  companyName: undefined,
  grade: undefined,
  time: undefined,
}

export const cFormConfig = [
  { type: 'input', key: 'companyName', label: '企业名称' },
  { type: 'select', key: 'status', label: '评估状态', options: Object.keys(preciseStatus).map(key => ({ label: preciseStatus[key], value: key })) },
  { type: 'select', key: 'grade', label: '分数分段', options: Object.keys(preciseLevel).map(key => ({ label: preciseLevel[key], value: key })) },
  // { type: 'select', key: 'creditType', label: '资料是否完整', options: Object.keys(preciseComplete).map(key => ({ label: preciseComplete[key], value: key })) },
  { type: 'datePicker', key: 'time', label: '添加日期', kind: 'daterange' },
]

export const getAddFormConfig = (remoteMethod) => {
  return [
    { type: 'select', key: 'name', label: '企业名称', loading: false, options: [], filterable: true, remote: true, otherKeys: { label: 'name', value: 'name' }, remoteMethod },
    { type: 'input', key: 'creditCode', label: '统一社会信用代码', span: 6, disabled: true },
    { type: 'input', key: 'legalPersonName', label: '法人代表姓名', span: 6, disabled: true },
  ]
}
export const addFormData = { name: undefined, creditCode: undefined, legalPersonName: undefined }
export const addFormRules = {
  name: [
    { required: true, message: '请输入经销商名称', trigger: ['blur', 'change'] }
  ],
}

export const chartConfigOne = {
  tooltip: {
    show: true,
    trigger: 'item',
    className: 'echarts-tooltip-point',
    formatter: function (params) {
      return `
        <div class="toolbox">
            <div class="left-box">
            <div class="icon" style="background-color:${params.color}"></div>
            <div class="text">${params.data.name}</div>
            </div>
            <div class="num">${params.data.value}</div>
        </div>
        `
    },
    position: function (point, params, dom, rect, size) {
      return [point[0] + 10, point[1] + 10]
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['70%', '90%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '12',
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 0
      },
      color: ['#3B68F0', '#3B88EF', '#3BB5EF', '#3BDDEF', '#00B4CC', '#7885AB'],
      data: []
    }
  ]
}
export const chartConfigTwo = {
  tooltip: {
    show: true,
    trigger: 'item',
    className: 'echarts-tooltip-point',
    formatter: function (params) {
      return `
        <div class="toolbox">
            <div class="left-box">
            <div class="icon" style="background-color:${params.color}"></div>
            <div class="text">${params.data.name}</div>
            </div>
            <div class="num">${params.data.value}</div>
        </div>
        `
    },
    position: function (point, params, dom, rect, size) {
      return [point[0] + 10, point[1] + 10]
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['70%', '90%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '12',
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 0
      },
      color: ['#3B68F0', '#3B88EF', '#3BB5EF', '#3BDDEF', '#00B4CC', '#7885AB'],
      data: []
    }
  ]
}
export const chartConfigThree = {
  tooltip: {
    show: true,
    trigger: 'item',
    className: 'echarts-tooltip-point',
    formatter: function (params) {
      return `
        <div class="toolbox">
            <div class="left-box">
            <div class="icon" style="background-color:${params.color}"></div>
            <div class="text">${params.data.name}</div>
            </div>
            <div class="num">${params.data.value}</div>
        </div>
        `
    },
    position: function (point, params, dom, rect, size) {
      return [point[0] + 10, point[1] + 10]
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['0%', '90%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '12',
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 0
      },
      color: ['#3B68F0', '#3B88EF', '#3BB5EF', '#3BDDEF', '#00B4CC', '#7885AB'],
      data: []
    }
  ]
}
