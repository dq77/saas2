import { percent2 } from '@/utils/qjd'

export const otherColumns = [
  { label: '库存数量', key: 'stockQuantity', render: (data, item) => percent2(item) },
  { label: '盘点数量', key: 'realQuantity', type: 'inputNumber', min: 0, precision: 2 },
  { label: '盘盈盘亏', key: 'total' }
]

export const otherSample: object = { realQuantity: '', stockQuantity: undefined, total: undefined }
