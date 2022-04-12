export const handleQueryStatus = (status) => {
  // console.log('status----', typeof status)
  return (status ?? '').toString()
  // return (typeof status === 'number') ? status.toString() : ''
}
// export const uniqueByKey = (arr, key) => {
//   const m = new Map()
//   return arr.filter(item => {
//     return !m.has(item[key]) && m.set(item[key], true)
//   })
// }
