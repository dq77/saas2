<template lang='pug'>
.seeTree-page
  #treeRoot
</template>
<script>
import * as d3 from 'd3'
import ajaxStore from '@/apis'
export default {
  props: {
    upData: {
      type: Array,
      default: () => ([])
    },
    downData: {
      type: Array,
      default: () => ([])
    },
    width: { // svg的宽，px
      type: Number,
      default: 1200
    },
    height: { // svg的高，px
      type: Number,
      default: 700
    },
    companyName: { // 用于下载pdf取到svg dom
      type: String,
    },
    actualCompanyName: {
      type: String,
    },
  },
  data() {
    return {
      treeData: {
        r: {
          companyName: '',
          children: null
        },
        l: {
          companyName: '',
          children: null
        },
      },
      container: null, // 容器svg>g
      duration: 750, // 动画持续时间
      scaleRange: [0.2, 4], // container缩放范围
      direction: ['r', 'l'], // 分为左右2个方向
      centralPoint: [0, 0], // 画布中心点坐标x,y
      root: { r: {}, l: {} }, // 左右2块数据源
      rootNodeLength: 0, // 根节点名称长度
      rootName: [this.companyName], // 根节点名称
      textSpace: 18, // 多行文字间距
      themeColor: '#3c5da4', // 主色
      nodeSize: [40, 300], // 节点间距(高/水平)
      fontSize: 14, // 字体大小，也是单字所占宽高
      rectMinWidth: 50, // 节点方框默认最小，
      textPadding: 5, // 文字与方框间距,注：固定值5
      circleR: 5, // 圆圈半径
    }
  },
  computed: {
    treeMap() { // 树布局
      return d3.tree().nodeSize(this.nodeSize).separation((a, b) => {
        let result = a.parent === b.parent && !a.children && !b.children ? 1 : 2
        if (result > 1) {
          let length = 0
          length = a.children ? (length + a.children.length) : length
          length = b.children ? (length + b.children.length) : length
          result = length / 2 + 0.5
        }
        return 1
      })
    },
  },
  watch: {
    'companyName' (value) {
      if (value) this.rootName = [value]
    },
    'actualCompanyName' (value) {
      if (value) this.rootName = [value]
    },
    'upData' (data) {
      if (data) {
        this.treeData.l.children = data
        this.rootName = [this.actualCompanyName || this.companyName]
        this.treeInit()
      }
    },
    'downData' (data) {
      if (data) {
        this.treeData.r.children = data
        this.treeInit()
      }
    }
  },
  mounted() {
    this.treeInit()
  },
  methods: {
    // 随机数，用于绑定id
    uuid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }

      return (
        s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
      )
    },

    // 画连接线
    diagonal({ source, target }) {
      const s = source; const d = target
      return `M ${s.y} ${s.x}
              L ${(s.y + d.y) / 2} ${s.x},
              L ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`
    },

    // 画百分比
    drawPercent(id, dirRight) {
      dirRight = dirRight > 0// 右为1，左为-1
      return d3.select(`#${id}`).append('text')
        .attr('y', this.textPadding)
        .attr('x', d => dirRight ? this.textPadding - this.nodeSize[1] / 4 : -this.textPadding + this.nodeSize[1] / 4)
        .attr('text-anchor', dirRight ? 'start' : 'end')
        .style('font-size', this.fontSize)
        .style('cursor', 'pointer')
        .text(d => d.data.percent && parseFloat(d.data.percent * 100).toFixed(2) + '%')
    },

    // 画文本
    drawText(id, dirRight) {
      dirRight = dirRight > 0// 右为1，左为-1
      return d3.select(`#${id}`).append('text')
        .attr('y', this.textPadding)
        .attr('x', d => dirRight ? this.textPadding : -this.textPadding)
        .attr('text-anchor', dirRight ? 'start' : 'end')
        .style('font-size', this.fontSize)
        .style('cursor', 'pointer')
        .text(d => d.data.name)
    },

    // 画方框
    drawRect(id, dirRight) {
      const realw = document.getElementById(id).getBBox().width + 10// 获取g实际宽度后，设置rect宽度
      return d3.select(`#${id}`).insert('rect', 'text')
        .attr('x', dirRight > 0 ? 0 : -realw)
        .attr('y', -this.textSpace + this.textPadding)
        .attr('width', realw)
        .attr('height', this.textSpace + this.textPadding * 2)
        .attr('rx', 2) // 圆角
        .style('stroke', 'gray')
        .style('fill', '#ffffff')
        .style('cursor', 'pointer')
    },

    // 画circle
    drawCircle(id) {
      d3.select(`#${id} g`).remove()
      const gMark = d3.select(`#${id}`).append('g')
        .attr('class', 'node-circle')
        .attr('stroke', '#ffa500')
        .style('cursor', 'pointer')
        .attr('stroke-width', 1)

      gMark.append('circle')
        .attr('fill', 'none')
        .attr('r', d => d.depth === 0 ? 0 : this.circleR)// 根节点不设置圆圈
        .attr('fill', '#ffffff')
      const padding = this.circleR - 2
      gMark.append('path').attr('d', `m -${padding} 0 l ${2 * padding} 0`)// 横线

      gMark.append('path')// 竖线，根据展开/收缩动态控制显示
        .attr('d', `m 0 -${padding} l 0 ${2 * padding}`)
        .attr('stroke-width', 1)
        .attr('class', 'node-circle-vertical')
      return gMark
    },
    // 画问号圆圈
    drawQuestionCircle(id) {
      const gMark = d3.select(`#${id}`).append('g')
        .attr('class', 'node-question')
        .attr('stroke', '#ffa500')
        .style('cursor', 'pointer')
        .attr('stroke-width', 1)

      gMark.append('circle')
        .attr('fill', 'none')
        .attr('r', d => d.depth === 0 ? 0 : this.circleR)// 根节点不设置圆圈
        .attr('fill', '#ffffff')
      gMark.append('text').attr('fill', '#ffa500')
        .attr('class', 'node-question-text')
        .attr('y', this.textPadding)
        .attr('text-anchor', 'middle')
        .style('cursor', 'pointer')
        .style('font-size', 12)
        .text('?')

      return gMark
    },

    // 动态创建节点
    createNode(d, direction) {
      const children = d.data.children
      if (children[0]?.data?.id) {
        return children
      }
      children.map((item, key) => {
        children[key] = {
          name: item.name,
          depth: d.depth + 1,
          height: 0,
          parent: d,
          id: direction + this.uuid(),
          data: item,
          type: direction === 'l' ? 'up' : 'down',
          lastNode: !!item.lastNode
        }
      })
      return children
    },

    // 清除问号标识
    clearQuestionSign (d) {
      d3.select(`#g${d.id} .node-question`)
        .remove()
    },

    // 获取标识符移动距离
    getXDistance (d, direction) {
      const dirRight = direction === 'r' ? 1 : -1// 方向为右/左
      const width = d.data.name.length * this.fontSize + this.textPadding * 2 + 10
      const right = dirRight > 0// 右为1，左为-1
      const xDistance = right ? width : -width
      return xDistance
    },

    // 初始化缩放方法
    zoomFn() {
      const zoom = d3.event.transform
      return this.container.attr('transform', zoom)
    },

    // 画根节点
    drawRoot() {
      const title = this.container.append('g')
        .attr('id', 'rootTitle')
        .attr('transform', `translate(${this.centralPoint[1]},${this.centralPoint[0]})`)
      title.append('svg:rect')
        .attr('class', 'rootTitle')
        .attr('y', 0)
        .attr('x', -this.rootNodeLength / 2)
        .attr('width', this.rootNodeLength)
        .attr('height', 0)
        .attr('rx', 5) // 圆角
        .style('fill', this.themeColor)
      this.rootName.forEach((name, index) => {
        title.append('text').attr('fill', 'white')
          .attr('y', index * this.textSpace + 3)
          .attr('text-anchor', 'middle')
          .text(name)

        const lineHeight = (index + 2) * this.textSpace
        // 修改rootTitle rect 的高度
        d3.select('#rootTitle rect').attr('height', lineHeight).attr('y', -lineHeight / 2)
      })
    },

    // 点击某个节点
    async clickNode(d, direction) {
      let children
      if (d.lastNode) {
        children = await this.getChildren(d.name, direction)
        if (!children?.length) {
          d.lastNode = false
          this.clearQuestionSign(d)
          this.update(d, direction)
          return
        }
        d.data.children = children
        this.clearQuestionSign(d)
        this.drawCircle(`g${d.id}`)
        d3.select(`#g${d.id} g`).attr('transform', `translate(${this.getXDistance(d, direction)},0)`)// 修改圆圈
      }
      if (d.depth === 2 || ((d.depth - 1) % 4 === 0 && d.depth > 4)) {
        d.data.children.forEach((item, index) => {
          d.data.children[index].lastNode = true
        })
      }

      d._children = this.createNode(d, direction)
      if (!d._children && !d.children) { // 无子节点
        return
      }
      // 根据当前节点是否有children来判断是展开还是收缩，true收缩，false展开
      // tree会根据节点内是否有children来向下扩展
      d.children = d.children ? null : d._children
      d3.select(`#g${d.id} .node-circle .node-circle-vertical`)
        .transition().duration(this.duration)
        .attr('stroke-width', d.children ? 0 : 1)// 控制节点伸缩时的标识圆圈
      this.update(d, direction)
    },

    // 到最后一层，动态调接口获取数据
    async getChildren(companyName, direction) {
      const { getRelatedCompanyByLevel } = ajaxStore.factoryService.realEstate
      const res = await getRelatedCompanyByLevel({
        dir: direction === 'r' ? 'down' : 'up',
        companyName
      })
      if (res?.data?.code === '0') {
        return res.data.data[0].children
      }
    },

    // 数据处理
    dealData() {
      this.direction.forEach(item => {
        this.root[item] = d3.hierarchy(this.treeData[item])
        this.root[item].x0 = this.centralPoint[0]// 根节点x坐标
        this.root[item].y0 = this.centralPoint[1]// 根节点Y坐标
        this.root[item].descendants().forEach(d => {
          d._children = d.children// 添加_children属性，用于实现点击收缩及展开功能
          d.id = item + this.uuid()// 绑定唯一标识ID
          // 默认只展开第一层级
          if (d.depth > 0) {
            d.children = null
          }
        })
        this.update(this.root[item], item)
      })
    },

    // 开始绘图
    update(source, direction) {
      const dirRight = direction === 'r' ? 1 : -1// 方向为右/左
      const className = `${direction}gNode`
      const tree = this.treeMap(this.root[direction])
      const nodes = tree.descendants()// 返回后代节点数组，第一个节点为自身，然后依次为所有子节点的拓扑排序
      const links = tree.links()// 返回当前 node 的 links 数组, 其中每个 link 定义了 source父节点, target 子节点属性。
      nodes.forEach(d => {
        // 左右2部分，设置以中心点为原点(默认左上角为原点)，第一层节点距离中心位置适当缩短
        d.y = dirRight * (d.y + this.rootNodeLength / 2 - (this.nodeSize[1] * 0.4)) + this.centralPoint[1]
        d.x = d.x + this.centralPoint[0]
      })

      // 根据父节点长度动态调整当前节点的间距
      source && source.children && source.children.forEach(s => {
        if (s?.parent?.data?.name?.length > 8) {
          s.y = s.y + dirRight * (s.parent.data.name.length - 8) * 15
        }
      })

      // 根据class名称获取左或者右的g节点，达到分块更新
      const node = this.container.selectAll(`g.${className}`).data(nodes, d => d.id)

      // 新增节点，tree会根据数据内的children扩展相关节点
      const nodeEnter = node.enter().append('g')
        .attr('id', d => `g${d.id}`)
        .attr('class', className)
        .attr('transform', d => `translate(${source.y0},${source.x0})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)
        .on('click', (d) => {
          d.depth !== 0 && ((d.data.open && d.data.children.length) || d.lastNode) && this.clickNode(d, direction)// 根节点不执行点击事件
        })

      nodeEnter.each(d => {
        if (d.depth > 0) { // 非根节点且无子节点
          this.drawText(`g${d.id}`, dirRight)// 画文本
          this.drawRect(`g${d.id}`, dirRight)// 画方框
          // this.drawPercent(`g${d.id}`, dirRight)// 画文本
        }
        if (d.depth > 0 && d.data.open && d.data.children.length) { // 非根节点且有子节点
          this.drawCircle(`g${d.id}`)// 画圆圈
          d3.select(`#g${d.id} g`).attr('transform', `translate(${this.getXDistance(d, direction)},0)`)// 修改圆圈属性
        }
        if (d.lastNode && !d.data.children.length) { // 非根节点且有子节点
          this.drawQuestionCircle(`g${d.id}`)// 画圆圈
          d3.select(`#g${d.id} g`).attr('transform', `translate(${this.getXDistance(d, direction)},0)`)// 修改圆圈属性
        }
      })

      // 更新节点：节点enter和exit时都会触发tree更新
      // eslint-disable-next-line no-unused-vars
      const nodeUpdate = node.merge(nodeEnter).transition().duration(this.duration)
        .attr('transform', d => `translate(${d.y - dirRight * this.rectMinWidth / 2},${d.x})`)
        .attr('fill-opacity', 1)
        .attr('stroke-opacity', 1)

      // 移除节点:tree移除掉数据内不包含的节点(即，children = false)
      // eslint-disable-next-line no-unused-vars
      const nodeExit = node.exit().transition().duration(this.duration).remove()
        .attr('transform', d => `translate(${source.y},${source.x})`)
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)

      // Update the links 根据 className来实现分块更新
      const link = this.container.selectAll(`path.${className}`).data(links, d => d.target.id)

      // Enter any new links at the parent's previous position.
      // insert是在g标签前面插入，防止连接线挡住G节点内容
      const linkEnter = link.enter().insert('path', 'g')
        .attr('class', className)
        .attr('d', d => {
          const o = { x: source.x0, y: source.y0 }
          return this.diagonal({ source: o, target: o })
        })
        .attr('fill', 'none')
        .attr('stroke-width', 1)
        .attr('stroke', '#dddddd')

      // Transition links to their new position.
      link.merge(linkEnter).transition().duration(this.duration).attr('d', this.diagonal)

      // Transition exiting nodes to the parent's new position.
      link.exit().transition().duration(this.duration).remove()
        .attr('d', d => {
          const o = { x: source.x, y: source.y }
          return this.diagonal({ source: o, target: o })
        })

      // Stash the old positions for transition.
      this.root[direction].eachBefore(d => {
        d.x0 = d.x
        d.y0 = d.y
      })
    },

    // 初始化
    treeInit() {
      d3.select('#treeRoot').selectAll('*').remove()
      const margin = { top: 0, right: 0, bottom: 0, left: 0 }
      const treeWidth = document.body.clientWidth - margin.left - margin.right// tree容器宽
      // const treeHeight = document.getElementById('treeRoot').parentNode.scrollHeight - margin.top - margin.bottom// tree容器高 - margin.top - margin.bottom// tree容器高
      const treeHeight = 700
      // const canvasHeight = document.body.scrollHeight - margin.top - margin.bottom// tree容器高
      const centralY = treeWidth / 2 + margin.left
      const centralX = treeHeight / 2 + margin.top
      this.centralPoint = [centralX, centralY - 150]// 中心点坐标
      // 根节点字符所占宽度
      this.rootNodeLength = this.rootName[0].length * this.fontSize + 30
      // svg标签
      const svg = d3.select('#treeRoot').append('svg')
        .attr('class', 'tree-svg')
        .attr('width', treeWidth)
        .attr('height', treeHeight)
        .attr('font-size', this.fontSize)
        .attr('fill', '#555')

      // g标签
      this.container = svg.append('g')
        .attr('class', 'container')
        .attr('transform', `translate(${margin.left},${margin.top}) scale(1)`)
      // 画出根节点
      this.drawRoot()

      // 指定缩放范围
      const zoom = d3.zoom().scaleExtent(this.scaleRange).on('zoom', this.zoomFn)
      // 动画持续时间
      this.container.transition().duration(this.duration).call(zoom.transform, d3.zoomIdentity)
      svg.call(zoom)
      // 数据处理
      this.dealData()
    },
  }
}
</script>
<style lang="stylus" scoped>
.seeTree-page
  width '100%'
  height '100%'
  background-color white
</style>
