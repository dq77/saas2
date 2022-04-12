import { percent2 } from '@/utils/qjd'
import moment from 'moment'

export const columns1 = [
  { label: '上传时间', key: 'uploadTime', minWidth: 150, render: (row, item) => item ? moment(item).format('YYYY-MM-DD HH:mm:ss') : '- -'},
  { label: '资料包', key: 'fileTitle', minWidth: 150, },
  { label: '资料包', key: 'filePath', slotName: 'filePath', minWidth: 120, },
]

export const columns2 = [
  { label: '年份', key: 'year', minWidth: 150, },
  { label: '出货金额', key: 'shipment', minWidth: 150, render: (row, item) => item ? percent2(item) + '万元' : '- -'},
]
