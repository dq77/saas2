<template lang="pug">
  .page-main
    card(:noTitle='true' :noWrap='true')
      .p-common-service
        .p-title
          span.u-text 常用服务
          i.el-icon-warning
          span 操作方式：拖动选框调整展示顺序，最多添加7个
        .p-service-list(v-loading='commonSercieLoading')
          .u-item(v-for='(item,index) in selectedList' :key='item.serviceName' @drop='drop($event, index)' @dragover='allowDrop' draggable='true' @dragstart='drag($event, index)')
            .u-icon(
              :style='"background-image: url(" + ( enumsServiceTag[item.tag] ? enumsServiceTag[item.tag].iconUrl : "" ) + ")"'
            )
              .u-close(@click='clickDelete(index)')
                i.el-icon-close
            .u-label {{ item.serviceName }}
      .p-line.u-margin
      .p-config-area
        .p-title
          span.u-text 配置区
          i.el-icon-warning
          span 操作方式：勾选的项目，进入常用服务区域
        .p-config-service
          .u-row(v-for='(row, rowIndex) in new Array(Math.ceil(allService.length/2))')
            template(v-for='service in [allService[rowIndex*2], allService[rowIndex*2 + 1]]')
              .u-service-wrap(v-if='service')
                .u-title {{ service.menuName }}
                .u-list
                  .u-item(v-for='item in service.memberServiceResponseList')
                    .u-icon(
                      :class='{"u-disable": item.permissionChecked === false}'
                      :style='"background-image: url(" + ( enumsServiceTag[item.tag] ? enumsServiceTag[item.tag].iconUrl : "" ) + ")"'
                      @click='clickConfigService(item)'
                    )
                      .u-check.u-checked(v-if='item.commonChecked')
                        i.el-icon-check
                      .u-check(v-else)
                    .u-label {{ item.serviceName }}
              .u-service-wrap(v-else)
      .p-line
      .p-btns
        el-button.u-btn(@click='$router.back()') 取消
        el-button.u-btn(type='primary' :loading='updateLoading' @click='clickUpdate') 确认
</template>

<script>
import Card from '@/components/Card'
import { enumsServiceTag } from '@/utils/enumsTag'
import ajaxStore from '@/apis'

export default {
  components: { Card },
  data() {
    return {
      commonSercieLoading: true,
      configSercieLoading: true,
      updateLoading: false,
      selectedList: [],
      allService: [],
    }
  },
  computed: {
    enumsServiceTag() {
      return enumsServiceTag
    },
  },
  methods: {
    allowDrop(e) {
      e.preventDefault()
    },
    drag(e, index) {
      e.dataTransfer.setData('index', index)
    },
    drop(e, to) {
      e.preventDefault()
      const from = e.dataTransfer.getData('index')
      const selectedList = this.selectedList
      const temp = selectedList[from]
      this.$set(this.selectedList, from, selectedList[to])
      this.$set(this.selectedList, to, temp)
    },
    // 在配置区点击打勾
    clickConfigService(service) {
      if (service.permissionChecked) {
        if (service.commonChecked === false && this.selectedList.length >= 7) {
          this.$message.warning('常用服务最多添加7个')
          return
        }
        service.commonChecked = !service.commonChecked
        // 更新selectedList
        if (service.commonChecked) {
          this.selectedList.push(service)
        } else {
          const index = this.selectedList.findIndex(item => item.permissionCode === service.permissionCode)
          this.selectedList.splice(index, 1)
        }
      }
    },
    // 点击常用服务的删除按钮
    clickDelete(index) {
      const service = this.selectedList.splice(index, 1)
      const allService = this.allService
      for (let i = 0; i < allService.length; i++) {
        const index2 = allService[i].memberServiceResponseList.findIndex(item => {
          return item.permissionCode === service[0].permissionCode
        })
        if (index2 >= 0) {
          allService[i].memberServiceResponseList[index2].commonChecked = false
          break
        }
      }
    },
    // 提交更新
    clickUpdate() {
      this.updateCommonService()
    },
    async getCommonServiceList() {
      this.commonSercieLoading = true
      const res = await ajaxStore.factoryService.home.getCommonServiceList()
      this.commonSercieLoading = false
      if (res && res.data && res.data.code === '0') {
        const list = res.data.data || []
        if (list.length > 0) {
          list.sort((a, b) => a.serviceOrder - b.serviceOrder)
          this.selectedList = list
        }
      }
    },
    async getAllServiceList() {
      this.configSercieLoading = true
      const res = await ajaxStore.factoryService.home.getAllServiceList()
      this.configSercieLoading = false
      if (res && res.data && res.data.code === '0') {
        const data = res.data.data
        data.sort((a, b) => a - b)
        data.forEach(item => {
          if (item.memberServiceResponseList && item.memberServiceResponseList.length > 1) {
            item.memberServiceResponseList.sort((a, b) => a - b)
          }
        })
        this.allService = data
      }
    },
    async updateCommonService() {
      const data = []
      this.selectedList.forEach((item, index) => {
        data.push({
          permissionCode: item.permissionCode,
          serviceOrder: index,
        })
      })
      this.updateLoading = true
      const res = await ajaxStore.factoryService.home.updateCommonService(data)
      this.updateLoading = false
      if (res && res.data && res.data.code === '0') {
        this.$message.success('常用服务更新成功')
        this.$router.back()
      }
    },
  },
  mounted() {
    this.getCommonServiceList()
    this.getAllServiceList()
  }
}
</script>

<style lang="stylus" scoped>
.p-line
  height 1px
  background #E8ECF7
  .u-margin
    margin 0 20px
.p-title
  margin-bottom 20px
  color #A3B2C2
  font-size 12px
  .u-text
    color #494949
    font-size 14px
  i
    margin-left 20px
    margin-right 4px
    color #A3B2C2
.p-common-service,.p-config-area
  padding 20px
.p-service-list
  min-height 110px
  .u-item
    display inline-block
    margin-right 20px
    width 80px
    height 110px
    &:last-child
      margin-right 0
    .u-icon
      position relative
      margin 10px auto
      width 60px
      height 60px
      border-radius 60px
      cursor pointer
      background-size 100%
      background-color #8ca8d6
    .u-label
      font-size 12px
      text-align center
      color #494949
    .u-close
      position absolute
      right -7px
      top -6px
      width 24px
      height 24px
      line-height 20px
      border-radius 24px
      border 2px solid #fff
      text-align center
      color #fff
      background #FF3E00
.p-config-service
  min-height 468px
  .u-row
    display flex
  .u-service-wrap
    flex 1
    margin-left 10px
    &:first-child
      margin-left 0
    .u-title
      height 40px
      border-left 3px solid #25BECD
      line-height 40px
      font-size 12px
      text-indent 17px
      color #494949
      background #F8F9FA
    .u-list
      margin 0 10px 20px
    .u-item
      position relative
      display inline-block
      padding 20px 0 10px
      width 80px
      text-align center
      &:first-child
        margin-left 0
      .u-icon
        margin 0 auto
        width 40px
        height 40px
        border-radius 40px
        cursor pointer
        background-size 100%
        background-color #8ca8d6
        &.u-disable
          opacity .5
          cursor default
      .u-label
        margin-top 10px
        font-size 12px
        color #494949
      .u-check
        position absolute
        top 12px
        right 10px
        width 24px
        height 24px
        border-radius 24px
        background #FFFFFF
        border 2px solid #25BECD
        &.u-checked
          border-color #fff
          background #25BECD
          font-size 14px
          color #fff
          line-height 22px
.p-btns
  margin 20px 0
  text-align center
  .u-btn
    width 76px
</style>
