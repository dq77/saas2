export default () => {
  // 对接口中返回的null值或字符串做初始化处理
  const toFloat = (value) => {
    return value ? parseFloat(value) : 0
  }

  /** 判断是否命中红线
   * @param value 条件值
   * @param standard 标准值
   * @param isReverse 是否相反
   */
  const validResult = ({value, standard, isReverse}) => {
    return isReverse ? value <= standard : value > standard
  }

  /** 计算左半边百分比
   * @param value 条件值
   * @param standard 标准值
   * @param result 是否命中
   */
  const countLeft = ({value, standard, result}) => {
    return result ? 50 : (value * 100 / (standard * 2)).toFixed(2)
  }

  /** 计算右半边百分比
   * @param value 条件值
   * @param standard 标准值
   */
  const countRight = ({value, standard}) => {
    if (value >= standard) {
      const length = value > standard * 2 ? standard : parseFloat(value - standard)
      return (length * 100 / 2).toFixed(2)
    } else {
      return 0
    }
  }

  /** 计算数值位置
   * @param left 左半边百分比
   * @param right 右半边百分比
   * @param text 数值文案
   */
  const textPosition = ({left, right, text}) => {
    const textLength = text.length * 2
    let all = parseFloat(left) + parseFloat(right)
    all = all - textLength < 0 ? 1 : all - textLength
    return parseFloat(all).toFixed(2)
  }

  /** 计算bar背景色
  * @param isReverse 是否相反
  * @param result 结果
  */
  const countColor = ({isReverse, result}) => {
    let isDefault = !result
    isDefault = isReverse ? !isDefault : isDefault
    return isDefault
  }

  /* 生成图表所需要的字段
  * @param value 条件值
  * @param standard 标准值
  * @param isReverse 是否相反
  * @param text 数值展示文案
  */
  const getChartConfig = ({value, standard, isReverse = false, text}) => {
    const result = validResult({
      value,
      standard,
      isReverse
    })
    const left = countLeft({
      value,
      standard,
      result: isReverse ? !result : result,
    })
    const right = countRight({
      value,
      standard
    })
    return {
      value,
      overHalf: result,
      left,
      right,
      text,
      textPosition: textPosition({
        left,
        right,
        text
      }),
      result,
      isDefaultColor: countColor({
        isReverse,
        result,
        text
      })
    }
  }

  return {
    toFloat,
    getChartConfig
  }
}
