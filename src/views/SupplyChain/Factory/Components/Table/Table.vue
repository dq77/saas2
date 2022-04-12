<template lang="pug">
  el-table(:data='dataSource' v-loading='loading')
    //- el-table-column(type='index' label='序号')
    template(v-for="(item, index) in columnList")
      el-table-column(
        :key='item.key ? item.key : index'
        :prop='item.key'
        :label='item.label'
        :width='item.width'
        :align='item.align ? item.align : "left"'
        :type='item.type'
        v-bind='item'
      )
        template(slot='header' slot-scope='scope')
          column-Render(v-if='item.renderHeader' :scope='scope' :render='item.renderHeader')
          span(v-else) {{ scope.column.label }}
        template(slot-scope='scope')
          div(v-if='item.key !== "operate"')
            column-Render(:scope='scope' :render='item.render')
          div(v-if='item.key === "operate"')
            el-button(
              v-for='(btn, index) in item.options'
              :key='index'
              type='text'
              @click='oprateBtnClick(scope.row, btn)'
            ) {{btn.render ? btn.render(scope.row) : btn.label}}
</template>

<script>
import _forcedRender from './forcedRender'
import ColumnRender from './render'

export default {
  props: {
    cloumns: {
      type: Array,
      default: () => ([])
    },
    dataSource: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columnList: []
    }
  },
  components: {
    ColumnRender
  },
  methods: {
    oprateBtnClick(row, btn) {
      this.$emit('oprateBtnClick', row, btn)
    },
    renderColumn() {
      const { cloumns } = this
      this.columnList = cloumns.map(column => {
        if (column.type) { // 多选：selection  索引：index  展开的按钮：expand
          column.renderHeader = _forcedRender[column.type].renderHeader
          column.render = _forcedRender[column.type].renderCell
        }
        if (column.formatter) {
          column.render = (h, scope) => {
            const {row, column, $index} = scope
            const str = row[column.property] ? column.formatter(row, column, row[column.property], $index) : '--'
            return (
              <span>{str} </span>
            )
          }
        }
        if (!column.render) {
          column.render = (h, scope) => {
            const content = scope.row[scope.column.property] ? scope.row[scope.column.property] : '--'
            return <span> {content}</span>
          }
        }
        return column
      })
    }
  },
  watch: {
    cloumns: {
      handler: 'renderColumn',
      immediate: true
    }
  },
  mounted() {
    // console.log(this.cloumns, 'cloumns')
    // console.log(this.dataSource, 'dataSource')
  }
}
</script>

<style lang="stylus" scoped>
</style>
