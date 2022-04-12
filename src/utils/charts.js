// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, GaugeChart, LineChart, MapChart, PieChart, RadarChart, ScatterChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
  GraphicComponent,
  DataZoomComponent,
  MarkLineComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import 'echarts-liquidfill'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, LineChart, PieChart, CanvasRenderer, GaugeChart, RadarChart, VisualMapComponent, MapChart, ScatterChart, GraphicComponent, DataZoomComponent, MarkLineComponent]
)

export default echarts
