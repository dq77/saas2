const maritalStatus = {
  1: '已婚',
  2: '未婚',
  3: '离异'
}

const houseOwnerStatus = {
  1: '法人',
  2: '法人配偶',
  3: '共有'
}

export const baseConfig = [
  { key: 'name', label: '实控人姓名', },
  { key: 'idCardNo', label: '实控人证件号', },
  { key: 'contactPhone', label: '实控人联系号码', },
  { key: 'maritalStatus', label: '婚姻状况', render: (val) => maritalStatus[val] }
]
export const spouseBaseConfig = [
  { key: 'name', label: '配偶姓名', },
  { key: 'idCardNo', label: '配偶证件号', },
  { key: 'contactPhone', label: '配偶联系号码', },
]

export const columns = [
  { label: '房产资料', key: 'fileKey', type: 'text', width: 200, fixed: 'left' },
  { label: '房产编号', key: 'ownershipNumber', type: 'text', width: 200 },
  { label: '房屋所有人', key: 'rightHolder', type: 'text', width: 200, render: (item, val) => houseOwnerStatus[val] },
  { label: '房屋地区', key: 'locateLocationCode', type: 'text', width: 260 },
  { label: '房屋详细地址', key: 'locateLocation', type: 'text', width: 200 },
  // { label: '房屋楼层', key: 'houseFloor', text: 'input', width: 200 },
  { label: '建筑面积(平方米)', key: 'buildingArea', type: 'text', precision: 2, align: 'center', width: 200 },
  { label: '房产价值(万元)', key: 'houseValue', type: 'text', precision: 2, align: 'center', width: 200 },
  { label: '规划用途', key: 'planningUse', type: 'text', width: 200 },
  { label: '房屋性质', key: 'houseNature', type: 'text', width: 200 },
]
