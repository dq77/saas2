<template lang="pug">
  canvas#myCanvas(width='176' height='176')
</template>

<script>
let previousSelectedCircle
const circles = []
let canvas
let context
export default {
  props: {
    // config: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {

    }
  },
  methods: {
    drawCircle(color, beginPoint, radian) {
      canvas.onmousemove = this.onMouseMove
      var ctx = canvas.getContext('2d')
      var myCanvas_rect = canvas.getBoundingClientRect()
      var width = myCanvas_rect.width
      var height = myCanvas_rect.height
      var minSide = width > height ? height : width
      ctx.beginPath()
      ctx.strokeStyle = color
      var circle = {
        x: width / 2,
        y: width / 2,
        r: minSide / 2 * 0.8
      }
      ctx.arc(circle.x, circle.y, circle.r, beginPoint, radian, false)// 此处按照顺时针画饼
      ctx.lineWidth = minSide / 2 * 0.8 * 0.4
      ctx.stroke()
    },
    // 鼠标移动事件
    onMouseMove(e) {
      const canvas = document.getElementById('myCanvas')
      // 清除之前选择的圆圈
      if (previousSelectedCircle != null) {
        previousSelectedCircle.isSelected = false
        previousSelectedCircle = null
      }

      // 取得画布上被单击的点
      var clickX = e.pageX - canvas.offsetLeft
      var clickY = e.pageY - canvas.offsetTop

      // 查找被单击的圆圈
      for (var i = circles.length - 1; i >= 0; i--) {
        var circle = circles[i]
        // 使用勾股定理计算这个点与圆心之间的距离
        var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) +
            Math.pow(circle.y - clickY, 2))
        // 判断这个点是否在圆圈中
        if (distanceFromCenter <= circle.radius) {
          previousSelectedCircle = circle

          // 选择新圆圈
          circle.isSelected = true

          // 停止搜索
          break
        }
      }

      // 更新显示，重绘圆圈
      this.drawCircles()
      // 如果当前鼠标位置有圆圈，还要显示tip
      if (previousSelectedCircle != null) {
        this.drawToolTip('颜色：' + previousSelectedCircle.color, clickX, clickY)
      }
    },
    // 绘制圆圈
    drawCircles() {
      // 清除画布，准备绘制
      // context.clearRect(0, 0, canvas.width, canvas.height)

      // 遍历所有圆圈
      for (var i = 0; i < circles.length; i++) {
        var circle = circles[i]

        // 绘制圆圈
        context.globalAlpha = 0.85
        context.beginPath()
        context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        context.fillStyle = circle.color
        context.strokeStyle = 'black'

        if (circle.isSelected) {
          context.lineWidth = 5
        } else {
          context.lineWidth = 1
        }
        context.fill()
        context.stroke()
      }
    },
    // 绘制tooltip提示文字
    drawToolTip(txtLoc, x, y) {
      context.save()
      var padding = 3
      var font = '16px arial'
      context.font = font
      context.textBaseline = 'bottom'
      context.fillStyle = 'yellow'

      // 绘制ToolTip背景
      var width = context.measureText(txtLoc).width
      var height = parseInt(font, 10)
      context.fillRect(x, y - height, width + padding * 2, height + padding * 2)

      // 绘制ToolTip文字
      context.fillStyle = '#000'
      context.fillText(txtLoc, x + padding, y + padding)

      context.restore()
    },
    init() {
      const canvas = document.getElementById('myCanvas')
      if (canvas.getContext) {
        const data = [{
          quota: '<50万',
          dealerCount: 110,
          usageRate: 0,
          cifCompanyEffectAmount: 0,
          cif_companyEffectAmountUsing: 0
        },
        {
          quota: '50万-100万',
          dealerCount: 339,
          usageRate: 0,
          cifCompanyEffectAmount: 0,
          cif_companyEffectAmountUsing: 0
        },
        {
          quota: '100万-200万',
          dealerCount: 499,
          usageRate: 0,
          cifCompanyEffectAmount: 0,
          cif_companyEffectAmountUsing: 0
        },
        {
          quota: '200万-300万',
          dealerCount: 222,
          usageRate: 0,
          cifCompanyEffectAmount: 0,
          cif_companyEffectAmountUsing: 0
        },
        {
          quota: '300万-500万',
          dealerCount: 137,
          usageRate: 0,
          cifCompanyEffectAmount: 0,
          cif_companyEffectAmountUsing: 0
        },
        {
          quota: '500万-1000万',
          dealerCount: 67,
          usageRate: 0,
          cifCompanyEffectAmount: 0,
          cif_companyEffectAmountUsing: 0
        },
        {
          quota: '>=1000万',
          dealerCount: 12,
          usageRate: 0,
          cifCompanyEffectAmount: 0,
          cif_companyEffectAmountUsing: 0
        }]
        data.sort(function(a, b) {
          return b.dealerCount - a.dealerCount
        })
        const colorList = ['#427FFB', '#6EC9F8', '#916FF9', '#BF4AF1', '#614AEF', '#F05A4A', '#FE8B32']
        let all = 0
        let addUpto = 0
        const spaceWidth = 0.005
        data.map((item, key) => {
          all += item.dealerCount
        })
        data.map((item, key) => {
          data[key].ratio = item.dealerCount / all
          if (key === 0) {
            this.drawCircle(colorList[key], 0, Math.PI * 2 * (data[key].ratio - spaceWidth))
          } else {
            this.drawCircle(colorList[key], Math.PI * 2 * addUpto, Math.PI * 2 * (data[key].ratio - spaceWidth + addUpto))
          }
          addUpto += data[key].ratio
        })
      }
    }
  },
  created() {

  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    canvas = document.getElementById('myCanvas')
    // eslint-disable-next-line no-unused-vars
    context = canvas.getContext('2d')
    this.init()
  },
  watch: {

  }
}
</script>

<style lang="stylus" scoped>
</style>
