export const getY = (val: number) => {
  let max = 120
  let splitNumber = 4
  if (val > 120) {
    splitNumber = Math.floor(val / 30) + 1
    max = splitNumber * 30
  }
  return {
    max,
    splitNumber
  }
}
