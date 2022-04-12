<template lang="pug">
  canvas(:id='id' :width='config.width || 400' :height='config.height || 200')
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 'myCanvas'
    },
    config: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    drawRoundRectPath(ctx, width, height, radius) {
      ctx.beginPath(0)
      // 从右下角顺时针绘制，弧度从0到1/2PI
      ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2)

      // 矩形下边线
      ctx.lineTo(radius, height)

      // 左下角圆弧，弧度从1/2PI到PI
      ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)

      // 矩形左边线
      ctx.lineTo(0, radius)

      // 左上角圆弧，弧度从PI到3/2PI
      ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)

      // 上边线
      ctx.lineTo(width - radius, 0)

      // 右上角圆弧
      ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)

      // 右边线
      ctx.lineTo(width, height - radius)
      ctx.closePath()
    },
    fillRoundRect(ctx, x, y, width, height, radius, /* optional */ fillColor) {
      // 圆的直径必然要小于矩形的宽高
      if (2 * radius > width || 2 * radius > height) { return false }

      ctx.save()
      ctx.translate(x, y)
      // 绘制圆角矩形的各个边
      this.drawRoundRectPath(ctx, width, height, radius)
      ctx.fillStyle = fillColor || '#000' // 若是给定了值就用给定的值否则给予默认值
      ctx.fill()
      ctx.translate(3, 3)
      this.drawRoundRectPath(ctx, 3, 3, 2)
      ctx.fillStyle = '#fff'
      ctx.fill()
      ctx.restore()
    },
    goBarChart(dataArr) {
      const that = this
      // 声明所需变量
      let ctx
      // 图表属性
      let cWidth, cHeight, cMargin, cSpace
      let originX, originY
      // 柱状图属性
      let bMargin, tobalBars, bWidth, maxValue
      let totalYNomber
      let gradient

      // 运动相关变量
      let ctr, numctr, speed
      // 鼠标移动
      const mousePosition = {}

      // 获得canvas上下文
      const canvas = document.getElementById(that.id)
      if (canvas && canvas.getContext) {
        ctx = canvas.getContext('2d')
      }
      initChart() // 图表初始化
      drawLineLabelMarkers() // 绘制图表轴、标签和标记
      drawBarAnimate() // 绘制柱状图的动画
      // 检测鼠标移动
      let mouseTimer = null
      canvas.addEventListener('mousemove', function(e) {
        e = e || window.event
        if (e.layerX || e.layerX === 0) {
          mousePosition.x = e.layerX
          mousePosition.y = e.layerY
        } else if (e.offsetX || e.offsetX === 0) {
          mousePosition.x = e.offsetX
          mousePosition.y = e.offsetY
        }

        clearTimeout(mouseTimer)
        mouseTimer = setTimeout(function() {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          drawLineLabelMarkers()
          drawBarAnimate(true)
        }, 10)
      })

      // 点击刷新图表
      // canvas.onclick = function() {
      //   initChart() // 图表初始化
      //   drawLineLabelMarkers() // 绘制图表轴、标签和标记
      //   drawBarAnimate() // 绘制折线图的动画
      // }

      // 图表初始化
      function initChart() {
        // 图表信息
        that.config.cHeightDeviation = that.config.cHeightDeviation || 0
        cMargin = that.config.cMargin || 30
        cSpace = that.config.cSpace || 20
        cHeight = canvas.height - cMargin * 2 - cSpace + that.config.cHeightDeviation
        cWidth = canvas.width - cMargin * 2 - cSpace + that.config.cWidthDeviation
        originX = that.config.originX || cMargin + cSpace
        originY = cMargin + cHeight
        // 柱状图信息
        bMargin = 15
        tobalBars = dataArr.length
        bWidth = parseInt(cWidth / tobalBars - bMargin)
        maxValue = 0
        for (let i = 0; i < dataArr.length; i++) {
          const barVal = parseInt(dataArr[i][1])
          if (barVal > maxValue) {
            maxValue = barVal
          }
        }
        maxValue = maxValue * 1.2
        const numLength = parseInt(maxValue).toString().length
        if (numLength > 3) {
          let zeros = ''
          for (let i = 0; i < numLength - 2; i++) {
            zeros += '0'
          }
          maxValue = (maxValue / parseInt(`1${zeros}`)).toFixed(0) * parseInt(`1${zeros}`)
        }
        maxValue = that.config.maxValue || maxValue
        totalYNomber = maxValue > 4 ? 4 : parseInt(maxValue)
        // 运动相关
        ctr = 1
        numctr = 100
        speed = 10

        // fillRoundRect(ctx, 20, 0, 10, 100, 5, gradient)

        // gradient = ctx.createLinearGradient(0, 0, 0, 300);
        // gradient.addColorStop(0, 'green');
        // gradient.addColorStop(1, 'rgba(67,203,36,1)');
      }

      // 绘制图表轴、标签和标记
      function drawLineLabelMarkers() {
        ctx.translate(0.5, 0.5) // 当只绘制1像素的线的时候，坐标点需要偏移，这样才能画出1像素实线
        ctx.font = '12px Arial'
        ctx.lineWidth = 1
        ctx.fillStyle = '#7A869E'
        ctx.strokeStyle = '#E3E5E8'
        // y轴
        // drawLine(originX, originY, originX, cMargin)
        // x轴
        drawLine(originX, originY, originX + cWidth, originY)

        // 绘制标记
        drawMarkers()
        ctx.translate(-0.5, -0.5) // 还原位置
      }

      // 画线的方法
      function drawLine(x, y, X, Y) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(X, Y)
        ctx.stroke()
        ctx.closePath()
      }

      // 绘制标记
      function drawMarkers() {
        let markerVal
        let xMarker
        let yMarker
        ctx.strokeStyle = '#E3E5E8'
        // 绘制 y
        const oneVal = parseInt(maxValue / totalYNomber)
        ctx.textAlign = 'right'
        for (let i = 0; i <= totalYNomber; i++) {
          markerVal = i * oneVal
          xMarker = originX - 5
          yMarker = parseInt(cHeight * (1 - markerVal / maxValue)) + cMargin
          ctx.fillText(markerVal, xMarker, yMarker + 3, cSpace) // 文字
          if (i > 0) {
            drawLine(originX, yMarker, originX + cWidth, yMarker)
          }
        }
        // 绘制 x
        ctx.textAlign = 'center'
        for (let i = 0; i < tobalBars; i++) {
          markerVal = dataArr[i][0]
          xMarker = parseInt(originX + cWidth * (i / tobalBars) + bMargin + bWidth / 2)
          yMarker = originY + 15
          ctx.fillText(markerVal, xMarker, yMarker, cSpace) // 文字
        }
        // 绘制标题 y
        ctx.save()
        ctx.rotate(-Math.PI / 2)
        // ctx.fillText("产 量", -canvas.height/2, cSpace-10);
        ctx.restore()
        // 绘制标题 x
        // ctx.fillText("年份", originX+cWidth/2, originY+cSpace/2+10);
      };

      // 绘制柱形图
      function drawBarAnimate(mouseMove) {
        for (let i = 0; i < tobalBars; i++) {
          // let oneVal = parseInt(maxValue / totalYNomber)
          const barVal = parseFloat(dataArr[i][1])
          const barH = parseInt(cHeight * barVal / maxValue * ctr / numctr)
          const y = originY - barH
          // const x = originX + (bWidth + bMargin) * i + bMargin
          // const x = originX + (bWidth + bMargin) * i + bMargin
          // const barX = that.config.barX || 5
          const barX = parseInt(originX + cWidth * (i / tobalBars) + bMargin + bWidth / 2) - 3
          // const textX = that.config.textX || 10
          const textX = parseInt(originX + cWidth * (i / tobalBars) + bMargin + bWidth / 2)
          const digit = that.config.digit || 0
          // 柱状图渐变色
          // console.log(barH)
          gradient = ctx.createLinearGradient(0, 0, 0, barH)
          if (dataArr[i][2] === 1) {
            gradient.addColorStop(0, '#6FCAFC') // 定义渐变色颜色
            gradient.addColorStop(1, '#3F67E0')
          } else {
            gradient.addColorStop(0, '#8E70F9') // 定义渐变色颜色
            gradient.addColorStop(1, '#437FFC')
          }
          drawRect(barX, y, bWidth, barH, mouseMove) // 高度减一避免盖住x轴
          ctx.fillStyle = '#7A869E'
          ctx.fillText(parseFloat(barVal * ctr / numctr).toFixed(digit), textX, y - 8) // 文字
          ctx.fillStyle = gradient // 设置fillStyle为当前的渐变对象
        }
        if (ctr < numctr) {
          ctr++
          setTimeout(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawLineLabelMarkers()
            drawBarAnimate()
          }, speed)
        }
      }

      // 绘制方块
      function drawRect(x, y, X, Y, mouseMove) {
        ctx.beginPath()
        ctx.rect(x, y, X, Y)
        if (mouseMove && ctx.isPointInPath(mousePosition.x, mousePosition.y)) { // 如果是鼠标移动的到柱状图上，重新绘制图表
          ctx.fillStyle = '#7A869E'
        } else {
          ctx.fillStyle = gradient
          ctx.strokeStyle = gradient
        }
        that.fillRoundRect(ctx, x, y, 9, Y, 4.5, gradient)
        // ctx.fill();
        ctx.closePath()
      }
    }
  },
  created() {

  },
  mounted() {
    this.goBarChart(this.data)
  },
  watch: {

  }
}
</script>

<style lang="stylus" scoped>
</style>
