import { percent2 } from '@/utils/qjd'

export const otherColumns = [
  { label: '调出仓当前库存量', key: 'stockQuantity', render: (data, item) => percent2(item) },
  { label: '调拨数量', key: 'goodsQuantity', type: 'inputNumber', min: 0, max: 'stockQuantity', precision: 2 },
]

export const otherSample: object = { stockQuantity: null, goodsQuantity: 0 }
