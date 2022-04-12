<template lang='pug'>
  card(title='常用服务' :loading='loading')
    template(v-if='serviceCount>=maxCount' v-slot:headRight)
      el-button.p-setting-btn(
        type='text'
        icon='el-icon-edit'
        @click='$router.push({name: "commonServiceEdit"})'
      ) 设置
    .p-service-list
      template(v-for='index in maxCount')
        .u-item(
          v-if='serviceList[index-1] && serviceList[index-1].id && permissions[serviceList[index-1].permissionCode]'
          @click='clickRouteIcon(serviceList[index-1])'
        )
          .u-icon(
            :style='"background-image: url(" + (enumsServiceTag[serviceList[index-1].tag] ? enumsServiceTag[serviceList[index-1].tag].iconUrl : "") + ")"'
          )
          .u-label {{ serviceList[index-1].serviceName }}
        .u-item(v-else-if='serviceList[index-1] && serviceList[index-1].type==="add"')
          router-link.u-add-icon(:to='{name: "commonServiceEdit"}')
        .u-item(v-else)
</template>

<script>
import Card from '@/components/Card'
import { enumsServiceTag } from '@/utils/enumsTag'
import ajaxStore from '@/apis'

export default {
  components: { Card },
  data() {
    return {
      maxCount: 7, // 常用服务的最大个数
      loading: true,
      serviceList: [],
      serviceCount: 0,
    }
  },
  computed: {
    enumsServiceTag() {
      return enumsServiceTag
    },
    permissions() {
      return this.$store.state.permissions
    }
  },
  methods: {
    clickRouteIcon(service) {
      enumsServiceTag[service.tag] && this.$router.push({ name: enumsServiceTag[service.tag].routeName })
    },
    sortWithpermission(serviceList) {
      // const noPermissionList = []
      // let hasPermissionList = []
      if (serviceList && serviceList.length > 0) {
        serviceList.sort((a, b) => a.serviceOrder - b.serviceOrder)
        // serviceList.forEach(item => {
        //   this.permissions[item.permissionCode] ? hasPermissionList.push(item) : noPermissionList.push(item)
        // })
        // hasPermissionList = hasPermissionList.concat(noPermissionList)
      }
      serviceList.push({ type: 'add' })
      return serviceList.slice(0, this.maxCount)
    },
    async getCommonServiceList() {
      this.loading = true
      const res = await ajaxStore.factoryService.home.getCommonServiceList()
      this.loading = false
      if (res && res.data && res.data.code === '0') {
        const list = res.data.data || []
        this.serviceCount = list.length
        this.serviceList = this.sortWithpermission(list)
      }
    }
  },
  mounted () {
    this.getCommonServiceList()
  },
  // watch: {
  //   permissions() {
  //     this.serviceList = this.sortWithpermission(this.serviceList)
  //   }
  // }
}
</script>

<style lang='stylus' scoped>
.p-setting-btn
  margin-right 20px
.p-service-list
  display flex
  justify-content space-between
  .u-item
    width 74px
    height 86px
    &:hover
      .u-icon
        opacity .8
      .u-label
        color #3C5DA4
    .u-icon
      margin 0 auto
      width 60px
      height 60px
      border-radius 60px
      cursor pointer
      background-size 100%
      background-color #8ca8d6
      transition opacity 300ms
    .u-add-icon
      display block
      position relative
      width 60px
      height 60px
      border-radius 60px
      border 1px dashed #A8A8A8
      cursor pointer
      transition opacity 300ms
      &:before,&:after
        content ''
        position absolute
        background #A8A8A8
      &:before
        left 29px
        top 18px
        margin-left -1px
        width 2px
        height 24px
      &:after
        left 18px
        top 29px
        margin-top -1px
        width 24px
        height 2px
      &:hover
        opacity .8
    .u-label
      margin-top 10px
      font-size 12px
      text-align center
      color #494949
</style>
