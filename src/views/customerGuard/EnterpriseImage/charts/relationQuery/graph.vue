<template lang="pug">
.p-relation-graph(v-loading="loading", ref="graph")
  .p-legend(v-if='nodeList.length > 0')
    div
      .u-row-node
        .u-circle(:style="{ 'background-color': colorMap.node[2] }")
        span.u-text 当前企业
      .u-row-node
        .u-circle(:style="{ 'background-color': colorMap.node[3] }")
        span.u-text 目标企业
      .u-row-node
        .u-circle(:style="{ 'background-color': colorMap.node[0] }")
        span.u-text 企业名称
      .u-row-node
        .u-circle(:style="{ 'background-color': colorMap.node[1] }")
        span.u-text 个人
    div
      .u-row-link(v-for="(value, key) in colorMap.link")
        .u-line(:style="{ 'background-color': value }")
        .u-text {{ key }}
    .u-company-person
      div
        img(:src="`${$assetsBaseUrl}/factoryService/realEstate/company.svg`")
        span 企业：{{companyLength}}
      div
        img(:src="`${$assetsBaseUrl}/factoryService/realEstate/person.svg`")
        span 个人：{{personLength}}
</template>
<script>
import * as d3 from 'd3'

class RelationGraph {
  nodeData = []
  linkData = []
  nodeDataMap = {}
  linkDataMap = {}
  svg = null
  links = null // line集合
  linkTexts = null // lineText集合
  nodes = null // circle集合
  forceSimulation = null
  eventStore = {} // 事件集合 clickNode:点击节点
  colorMap = {
    link: {
      法人: '#6AB4FF',
      任职: '#6AB4FF',
      投资: '#6AB4FF',
      // 分支: '#6AB4FF',
      // 诉讼: '#bfbcbf',
      // 竞合: '#bfbcbf',
      // 债务: '#bfbcbf'
    },
    node: {
      0: '#CCE2FF', // 公司
      1: '#FBDE8E', // 自然人
      2: '#3B68F0', // 当前公司
      3: '#FC7E7E' // 目标公司
    }
  }

  constructor(selector, svgWidth, svgHeight) {
    const svg = d3
      .select(selector)
      .append('svg')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('font-family', 'sans-serif')

    const gZoom = svg.append('g')
    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', () => {
        gZoom.attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`)
      })
    svg.call(zoom)

    const links = gZoom.append('g')
      .selectAll('path')
    const linkTexts = gZoom.append('g')
      .attr('fill', '#666')
      .attr('font-size', 10)
      .style('cursor', 'default')
      .selectAll('text')
    const nodes = gZoom.append('g')
      .attr('stroke-width', 0)
      .selectAll('circle')

    const forceSimulation = d3
      .forceSimulation()
      .force('link', d3.forceLink().id(d => d.name).distance(100))
      .force('charge', d3.forceManyBody().strength(-2000)) // 调整节点间的相互作用力
      .force('center', d3.forceCenter(svgWidth / 2, svgHeight / 2))
    forceSimulation.on('tick', this._ticked.bind(this))

    this.svg = svg
    this.links = links
    this.linkTexts = linkTexts
    this.nodes = nodes
    this.forceSimulation = forceSimulation

    this._createMarkers()
  }

  update(newNodeData, newLinkData) {
    this._filterData(newNodeData, newLinkData)
    const forceSimulation = this.forceSimulation
    const nodeData = this.nodeData
    const linkData = this.linkData
    // const colorMap = this.colorMap
    const { clientWidth, clientHeight } = document.querySelector('.p-relation-graph')
    // fx\fy 固定目标两个节点
    nodeData.forEach((item, index) => {
      if (item.nodeType === 2) {
        nodeData[index].fx = 80
        nodeData[index].fy = clientHeight / 2
      }
      if (item.nodeType === 3) {
        nodeData[index].fx = clientWidth - 200
        nodeData[index].fy = clientHeight / 2
      }
    })
    console.log(nodeData[3])

    forceSimulation.nodes(nodeData)
    forceSimulation.force('link').links(linkData)

    this.links = this.links
      .data(linkData, d => d.id)
      .join('path')
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 1)
      .attr('marker-end', d => `url(#to_${d.target.entityType}_${d.relation})`)

    this.linkTexts = this.linkTexts
      .data(linkData, d => d.id)
      .join(enter => enter
        .append('text')
        .attr('font-size', 10)
        .attr('fill', '#10193B')
        .text(d => d.relation)
      )

    this.nodes = this.nodes
      .data(nodeData, d => d.name)
      .join(enter => {
        const g = enter.append('g')
        g.append('circle')
          .attr('r', d => d.entityType === 0 ? 44 : 30)
          .attr('fill', d => d.color)
        const main = g.append('foreignObject')
          .attr('width', d => d.entityType === 0 ? 64 : 40)
          .attr('height', d => d.entityType === 0 ? 64 : 40)
        const parent = main.append('xhtml:div')
          .style('width', d => this._validNeedMiddle(d))
          .style('height', d => this._validNeedMiddle(d))
          .style('display', 'flex')
          .style('align-items', 'center')
          .style('justify-content', 'center')
        parent.append('xhtml:div')
          .text(d => d.realName)
          .style('color', d => [2, 3].includes(d.nodeType) ? '#fff' : '#10193B')
          .style('text-align', 'center')

        g.append('title')
          .text(d => d.realName)

        return g
      })
      .style('cursor', 'pointer')
      .call(this._drag(forceSimulation))

    forceSimulation.nodes(nodeData)
    forceSimulation.force('link').links(linkData)
    forceSimulation.alpha(1).restart().tick()
  }

  on(eventType, callback) {
    this.eventStore[eventType] = callback
    return this
  }

  async trigger(eventType, e) {
    if (this.eventStore[eventType]) return await this.eventStore[eventType](e)
  }

  _linkArc(d) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)
    return `M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}`
  }

  _createMarkers() {
    const colorMap = this.colorMap
    const svg = this.svg
    for (const nodeType in colorMap.node) {
      for (const linkType in colorMap.link) {
        svg
          .append('defs')
          .append('marker')
          .attr('id', `to_${nodeType}_${linkType}`)
          .attr('viewBox', '0 -5 10 10')
          .attr('refX', nodeType === '0' ? 54 : 40)
          .attr('refY', 0)
          .attr('orient', 'auto')
          .attr('markerWidth', 10)
          .attr('markerHeight', 10)
          .attr('xoverflow', 'visible')
          .append('svg:path')
          .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
          .attr('fill', colorMap.link[linkType])
      }
    }
  }

  // 文字垂直居中判断
  _validNeedMiddle(d) {
    const { realName, entityType } = d
    console.log(realName, realName.length)
    if (realName.length > 15) {
      return 'auto'
    }
    return entityType === 0 ? '64px' : 'auto'
  }

  // 将新的节点与连接与旧的进行对比，相同的就使用原来的，新增的使用新的
  _filterData(newNodeData, newLinkData) {
    const newNodeDataMap = {}
    newNodeData && newNodeData.forEach((item, index) => {
      if (this.nodeDataMap[item.name]) {
        newNodeDataMap[item.name] = newNodeData[index] = this.nodeDataMap[item.name]
      } else {
        newNodeDataMap[item.name] = item
      }
    })

    const newLinkDataMap = {}
    newLinkData && newLinkData.forEach((item, index) => {
      if (this.linkDataMap[item.id]) {
        newLinkDataMap[item.id] = newLinkData[index] = this.linkDataMap[item.id]
      } else {
        newLinkDataMap[item.id] = item
      }
    })
    this.nodeDataMap = newNodeDataMap
    this.nodeData = newNodeData
    this.linkDataMap = newLinkDataMap
    this.linkData = newLinkData
  }

  _ticked() {
    this.links && this.links
      .attr('d', d => `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`)
    // .attr('d', this._linkArc)

    this.linkTexts && this.linkTexts
      .attr('x', d => ((d.source.x + d.target.x) / 2))
      .attr('y', d => ((d.source.y + d.target.y) / 2))

    this.nodes && this.nodes
      .selectAll('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)

    this.nodes && this.nodes
      .selectAll('foreignObject')
      .attr('x', d => d.entityType === 0 ? d.x - 32 : d.x - 20)
      .attr('y', d => d.entityType === 0 ? d.y - 32 : d.y - 10)
  }

  _drag(simulation) {
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  }
}

let graphInstance = null

export default {
  data() {
    return {
      loading: false,
      data: [],
      colorMap: {
        link: {
          法人: '#6AB4FF',
          任职: '#6AB4FF',
          投资: '#6AB4FF',
          // 分支: '#6AB4FF',
          // 诉讼: '#bfbcbf',
          // 竞合: '#bfbcbf',
          // 债务: '#bfbcbf'
        },
        node: {
          0: '#CCE2FF', // 公司
          1: '#FBDE8E', // 自然人
          2: '#3B68F0', // 当前公司
          3: '#FC7E7E' // 目标公司
        }
      },
      companyLength: '',
      personLength: ''
    }
  },
  props: {
    relationData: {
      type: Object,
      default: () => {}
    },
  },
  computed: {
    nodeList() {
      if (!this.relationData.nodes) return []

      const list = this.relationData.nodes.map((item, index) => {
        return {
          nodeType: this.getNodeType(item),
          entityType: item.type === 'Company' ? 0 : 1,
          color: this.colorMap.node[this.getNodeType(item)],
          name: item.id,
          realName: item.name,
          level: 0
        }
      })
      return list
    },
    linkList() {
      if (!this.relationData.relationships) return []
      console.log(this.colorMap.link)
      const list = this.relationData.relationships.map(item => {
        return {
          ...item,
          color: this.colorMap.link[item.typeName],
          entityType: 0,
          // relation: item.label,
          source: item.startNode,
          sourceName: item.startNode,
          target: item.endNode,
          targetName: item.endNode,
          level: 0,
          relation: item.typeName
        }
      })
      return list
    }
  },
  methods: {
    getNodeType(item) {
      const name = item.name
      const { nameFrom, nameTo } = this.relationData.form
      if (name === nameFrom) return 2
      if (name === nameTo) return 3
      return item.type === 'Company' ? 0 : 1
    },
    updateGraph(flag) {
      this.$nextTick(() => {
        let svgWidth
        if (flag) {
          svgWidth = document.documentElement.clientWidth - 500
        } else {
          svgWidth = document.querySelector('.p-relation-graph').clientWidth - 120
        }
        const svgHeight = 700
        const svgDom = document.querySelector('.p-relation-graph svg')
        svgDom && (svgDom.outerHTML = '')
        graphInstance = new RelationGraph('.p-relation-graph', svgWidth, svgHeight)
        graphInstance.update(this.nodeList, this.linkList)
        this.companyLength = this.relationData.nodes.filter(e => e.type === 'Company').length
        this.personLength = this.relationData.nodes.length - this.companyLength
      })
    },
  },
  watch: {
    relationData(newVal) {
      if (Object.keys(newVal).length > 0) {
        this.updateGraph()
      }
    }
  }
}
</script>
<style lang="stylus">
.p-relation-graph
  position relative
  background rgba(256, 256, 256, 0.6)
.p-search-wrap
  padding 20px
  margin-bottom 20px
  background #F9FAFC
  .u-row:first-child
    margin-bottom 15px
  .u-title
    margin-right 30px
    font-size 12px
    color #1E1E1E
  .el-checkbox
    margin-left 0
  .el-checkbox__label
    color #485465 !important
.p-float-layer
  position absolute
  width 220px
  min-height 100px
  padding 15px 25px
  background #F9FAFC
  .u-title
    font-size 14px
    font-weight 500
    color #3B3C5A
  .u-content
    margin-top 10px
    font-size 12px
    color #3B3C5A
    .u-row
      margin 6px 0
      font-size 12px
      line-height 12px
.p-legend
  position absolute
  right 0
  padding 20px
  width 120px
  color #10193B
  font-size 12px
  background #fff
  .u-company-person
    margin-top 10px
    div:first-child
      margin-bottom 10px
    img
      vertical-align middle
      margin-right 5px
      width 14px
      height 14px
  .u-row-node
    margin-top 10px
    &:first-child
      margin-top 0
    .u-circle
      margin-right 8px
      width 20px
      height 20px
      float left
      border-radius 20px
    .u-text
      line-height 20px
  .u-row-link
    position relative
    margin-top 10px
    &:first-child
      margin-top 20px
    .u-line
      position absolute
      top 3px
      width 70px
      height 2px
    .u-text
      position relative
      margin-left 20px
      width 30px
      line-height 12px
      text-align center
      background #fff
</style>
