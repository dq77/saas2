<template lang='pug'>
.p-relation-graph(v-loading="loading", ref="graph")
  .p-float-layer(
    v-show="floatLayer.isShow",
    v-loading="floatLayer.loading",
    @mouseenter.stop="mouseEnterFloatLayer",
    @mouseleave.stop="mouseLeaveFloatLayer"
  )
    .u-title {{ floatLayer.title }}
    .u-content
      .u-row(v-for="item in floatLayer.content") {{ item }}
  .p-legend
    div
      .u-row-node
        .u-circle(:style="{ 'background-color': colorMap.node[0] }")
        span.u-text 企业
      .u-row-node
        .u-circle(:style="{ 'background-color': colorMap.node[1] }")
        span.u-text 个人
    div
      .u-row-link(v-for="(value, key) in colorMap.link")
        .u-line(:style="{ 'background-color': value }")
        .u-text {{ key }}
</template>

<script>
import * as d3 from 'd3'
import ajaxStore from '@/apis'

class RelationGraph {
  nodeData = []
  linkData = []
  nodeDataMap = {}
  linkDataMap = {}
  svg = null
  floatLayer = null
  links = null // line集合
  linkTexts = null // lineText集合
  nodes = null // circle集合
  forceSimulation = null
  eventStore = {} // 事件集合 clickNode:点击节点
  colorMap = {
    link: {
      投资: '#6AB4FF',
      任职: '#6AB4FF',
      实控: '#6AB4FF',
      分支: '#6AB4FF',
      质押: '#E07272',
      保证: '#E07272',
      采购: '#A36FFF',
      起诉: '#9F9F9F'
    },
    node: {
      0: '#CCE2FF', // 公司
      1: '#FBDE8E' // 自然人
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

    const clientHeight = document.body.clientHeight

    const forceSimulation = d3
      .forceSimulation()
      .force('link', d3.forceLink().id(d => d.name).distance(100))
      .force('charge', d3.forceManyBody().strength(-2000)) // 调整节点间的相互作用力
      .force('center', d3.forceCenter(svgWidth / 2, clientHeight / 2))
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
      .on('mouseenter', e => {
        this.trigger('mouseEnterLink', e)
      })
      .on('mouseleave', e => {
        this.trigger('mouseLeaveLink', e)
      })

    this.nodes = this.nodes
      .data(nodeData, d => d.name)
      .join(enter => {
        const g = enter.append('g')
        g.append('circle')
          .attr('r', d => d.entityType === 0 ? 44 : 30)
          .attr('fill', d => d.color)
        g.append('foreignObject')
          .attr('width', d => d.entityType === 0 ? 64 : 40)
          .attr('height', d => d.entityType === 0 ? 64 : 40)
          .text(d => d.name)
          .style('color', '#10193B')
          .style('text-align', 'center')
        g.append('title')
          .text(d => d.name)
        return g
      })
      .style('cursor', 'pointer')
      .call(this._drag(forceSimulation))
      .on('click', e => {
        this.trigger('clickNode', e)
      })
      .on('mouseenter', e => {
        this.trigger('mouseEnterNode', e)
      })
      .on('mouseleave', e => {
        this.trigger('mouseLeaveNode', e)
      })

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
const nodeDetail = {}
let floatLayerHideTimer = null

export default {
  data() {
    return {
      loading: false,
      firstClickTab: true,
      data: [],
      hasActivedNodeName: [],
      floatLayer: {
        isShow: false,
        loading: false,
        title: '',
        content: []
      },
      colorMap: {
        link: {
          投资: '#6AB4FF',
          任职: '#6AB4FF',
          实控: '#6AB4FF',
          分支: '#6AB4FF',
          质押: '#E07272',
          保证: '#E07272',
          采购: '#A36FFF',
          起诉: '#9F9F9F'
        },
        node: {
          0: '#CCE2FF', // 公司
          1: '#FBDE8E' // 自然人
        }
      }
    }
  },
  props: {
    active: {
      type: String,
      default: ''
    },
    reportType: {
      type: Number,
      default: 11
    },
    rootCompanyName: {
      type: String,
      default: ''
    },
    regCode: {
      type: String,
      default: ''
    },
  },
  computed: {
    nodeList() {
      const uniq = {}
      const list = [{ name: this.rootCompanyName, entityType: 0, level: 0, color: this.colorMap.node['0'] }]
      const colorMap = this.colorMap
      this.data.forEach(item => {
        if (!uniq[item.name]) { // 如果未push到list
          uniq[item.name] = {
            index: list.length, // 该name的node处于list中的序号
            minLevel: item.level
          }
          list.push({
            name: item.name,
            entityType: item.entityType,
            companyName: item.companyName,
            level: item.level,
            color: colorMap.node[item.entityType]
          })
        } else {
          if (item.level < uniq[item.name].minLevel) { // 取最小层级
            uniq[item.name].minLevel = item.level
            list[uniq[item.name].index].level = item.level
            list[uniq[item.name].index].color = colorMap.node[item.entityType]
          }
        }
      })
      return list
    },
    linkList() {
      const list = []

      this.data.forEach(item => {
        list.push(item)
      })
      return list
    }
  },
  methods: {
    // 参数type，0表示公司，1表示自然人，2表示关联关系
    joinFloatLayerData(type, name, data) {
      let title = ''
      const content = []
      if (type === 0) {
        title = name
      } else if (type === 1) {
        title = name
      } else if (type === 2) {
        title = `关联关系：${name}`
      }
      if (data === 'empty' || !data || data.length === 0) {
        content.push('暂无数据')
      } else if (type === 0) { // 公司
        content.push(`法定代表人：${data.legalPersonName || '-'}`)
        content.push(`成立时间：${data.startDate || '-'}`)
        content.push(`注册资本：${data.regCapital || '-'}`)
        content.push(`实缴资本：${data.recCap || '-'}`)
        content.push(`经营状态：${data.status || '-'}`)
        content.push(`吊销时间：${data.endDate || '-'}`)
      } else if (type === 1) { // 自然人
        data.forEach(item => content.push(`${item.job || '任职'}：${item.companyName || '-'}`))
      } else if (type === 2) { // 关系
        if (data.relation === '起诉') {
          content.push(`原告：${data.source.name || '-'}`)
          content.push(`被告：${data.target.name || '-'}`)
          content.push(`立案日期：${data.fundedDate || '-'}`)
          content.push(`案号：${data.caseId || '-'}`)
        } else if (data.relation === '投资') {
          content.push(`出资比例：${data.fundedRatio || '-'}`)
        } else if (data.relation === '任职') {
          content.push(`职位：${data.job || '-'}`)
        } else if (data.relation === '实控') {
          content.push(`出资比例：${data.fundedRatio || '-'}`)
          content.push(`认缴出资额：${data.fundedAmount || '-'}`)
          content.push(`认缴出资时间：${data.fundedDate || '-'}`)
        } else if (data.relation === '质押') {
          content.push(`质押到期日：${data.endDate || '-'}`)
          content.push(`登记时间：${data.startDate || '-'}`)
        } else if (data.relation === '保证') {
          content.push(`担保类型：${data.entityType === 0 ? '企业' : '个人'}`)
          content.push(`登记时间：${data.fundedDate || '-'}`)
        } else if (data.relation === '采购') {
          content.push(`最近采购时间：${data.fundedDate || '-'}`)
        }
      }
      this.floatLayer.title = title
      this.floatLayer.content = content
    },
    async mouseEnterNode(e) {
      floatLayerHideTimer = null
      this.floatLayer.isShow = true
      this.floatLayer.loading = true

      const type = e.entityType
      let res = 'empty'
      if (nodeDetail[e.name]) {
        res = nodeDetail[e.name]
      } else if (e.entityType === 0) {
        res = nodeDetail[e.name] = await this.getCompanyNodeInfo(e.name)
      } else if (e.entityType === 1 && e.companyName) {
        res = nodeDetail[e.name] = await this.getPersonNodeInfo(e.name, e.companyName)
      }
      this.joinFloatLayerData(type, e.name, res)
      this.floatLayer.loading = false
    },
    mouseLeaveNode() {
      floatLayerHideTimer = window.setTimeout(() => {
        if (floatLayerHideTimer) {
          this.floatLayer.isShow = false
          this.floatLayer.loading = false
          floatLayerHideTimer = null
        }
      }, 500)
    },
    mouseEnterLink(e) {
      floatLayerHideTimer = null
      this.floatLayer.isShow = true
      this.floatLayer.loading = true
      this.joinFloatLayerData(2, e.relation, e)
      this.floatLayer.loading = false
    },
    mouseLeaveLink() {
      floatLayerHideTimer = window.setTimeout(() => {
        if (floatLayerHideTimer) {
          this.floatLayer.isShow = false
          this.floatLayer.loading = false
          floatLayerHideTimer = null
        }
      }, 500)
    },
    mouseEnterFloatLayer() {
      floatLayerHideTimer = null
      this.floatLayer.isShow = true
    },
    mouseLeaveFloatLayer() {
      floatLayerHideTimer = window.setTimeout(() => {
        if (floatLayerHideTimer) {
          this.floatLayer.isShow = false
          floatLayerHideTimer = null
        }
      }, 500)
    },
    updateGraph() {
      graphInstance.update(this.nodeList, this.linkList)
    },
    // 合并原始数据，并对连接去重
    mergeOriginData(newData) {
      let originData = this.data
      originData = originData.concat(newData)
      for (let i = 0; i < originData.length; i++) {
        for (let j = i + 1; j < originData.length; j++) {
          if ((originData[i].sourceName === originData[j].sourceName &&
            originData[i].targetName === originData[j].targetName) ||
            (originData[i].targetName === originData[j].sourceName &&
              originData[i].sourceName === originData[j].targetName)
          ) {
            originData.splice(j, 1)
            j--
          }
        }
      }
      this.data = originData
    },
    /**
    * 参数entityType，当前点击的node的类型，0表示企业，1表示自然人
    * 参数entityName，当前点击的node的名字
    * 参数level，当前的扩展层数
    * 参数companyName，如果当前点击的node类型为自然人，则需要传companyName，表示该人所属的企业
    */
    async getData(entityType, entityName, level, companyName) {
      const colorMap = this.colorMap
      const params = {
        reportType: this.reportType,
        creditCode: this.regCode,
        name: this.rootCompanyName,
        entityType,
        first: false
      }
      if (entityType === 0) {
        params.companyName = entityName
      } else {
        if (!companyName) return false
        params.personName = entityName
        params.companyName = companyName
      }
      this.loading = true
      const res = await ajaxStore.customer.enterprise.getRelationMap(params)
      this.loading = false
      if (res.data && res.data.code === '0') {
        this.hasActivedNodeName.push(entityName)
        const originData = res.data.data
        if (originData && originData.length <= 0) this.$message.warning('未查询到数据')
        originData.forEach(item => {
          if (item.direction === 1) { // direction 0表示指向item.name，1表示由item.name指出
            item.source = item.sourceName = item.name // 关系的起始位置
            item.target = item.targetName = entityName
          } else {
            item.source = item.sourceName = entityName
            item.target = item.targetName = item.name
          }
          item.id = `${entityName}${item.direction}${item.relation}${item.name}`
          item.level = level + 1
          item.color = colorMap.link[item.relation]
        })
        this.mergeOriginData(originData)
        this.updateGraph()
      }
    },
    async getCompanyNodeInfo(name) {
      const res = await ajaxStore.customer.enterprise.getCompanyNodeInfo({
        name,
        creditCode: this.regCode,
        companyName: this.rootCompanyName
      })
      if (res.data.code === '0') {
        return res.data.data
      } else {
        return false
      }
    },
    async getPersonNodeInfo(personName, name) {
      const res = await ajaxStore.customer.enterprise.getPersonNodeInfo({
        name,
        creditCode: this.regCode,
        personName,
        companyName: this.rootCompanyName
      })
      if (res.data.code === '0') {
        return res.data.data
      } else {
        return null
      }
    },
    init() {
      let svgWidth = window.document.body.clientWidth - 120
      if (window.document.body.clientHeight < 878) svgWidth -= 20
      const svgHeight = document.getElementsByClassName('p-relation-graph')[0].parentNode.scrollHeight
      graphInstance = new RelationGraph('.p-relation-graph', svgWidth, svgHeight)
        .on('clickNode', e => {
          if (e.level > 3) {
            this.$message.warning('最多展开3层')
          } else {
            this.getData(e.entityType, e.name, e.level, e.companyName)
          }
        })
        .on('mouseEnterNode', e => {
          this.mouseEnterNode(e)
        })
        .on('mouseLeaveNode', e => {
          this.mouseLeaveNode(e)
        })
        .on('mouseEnterLink', e => {
          this.mouseEnterLink(e)
        })
        .on('mouseLeaveLink', e => {
          this.mouseLeaveLink(e)
        })
      this.getData(0, this.rootCompanyName, 0)
    },
  },
  mounted() {
    this.init()
    this.firstClickTab = false
  },
  watch: {
    active(newVal) {
      if (newVal === 'relationMap' && this.firstClickTab) {
        this.init()
        this.firstClickTab = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-relation-graph
  position relative
  background rgba(256, 256, 256, 0.6)
  overflow hidden
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
  width 110px
  color #10193B
  font-size 12px
  background #fff
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
