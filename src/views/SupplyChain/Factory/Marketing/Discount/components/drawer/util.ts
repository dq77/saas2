export const filterCustomer = (list: Array<object> = []): any => {
  if (list.length) {
    const obj = {}
    const data = list.reduce((preVal: Array<any> = [], curVal: any) => {
      (obj[curVal.id] ? '' : obj[curVal.id] = true) && preVal.push(curVal)
      return preVal
    }, [])
    return data || []
  }
  return []
}
