<template lang="pug">
.page-main(v-loading='loading || disableLoading || enableLoading')
  template(v-for='(item, key) in result')
    .p-module-title {{item.name}}
    .p-module-content
      .p-module-item(v-for='(menu, index) in item.children')
        .p-item-title {{menu.businessName}}
        .p-item-time(v-if='menu.status === null') 暂未配置
        .p-item-time(v-else-if='menu.status === 0') 禁用中
        .p-item-time(v-else-if='menu.createdTime && menu.publishStatus === 1') 上次配置时间：{{menu.createdTime}}
        .p-item-time.p-tips-nosave(v-else) 有保存但未发布的内容
        .p-item-icon
          i.iconfont.iconbianji(@click='toEdit(menu)')
          el-switch(v-if='menu.id && [1, 2].includes(menu.publishStatus)' v-model='menu.status===1' active-color="#3B68F0" @change='switchStatus(menu, key, index)')
</template>

<script>
import useAsync from 'hooks/useAsync'
import ajaxstore from '@/apis'
import useFlow from '@/views/common/processConfig/hooks/useFlow'
export default {
  setup(props, { root }) {
    const { process: { getWorkflowProcessMenu } } = ajaxstore

    const toEdit = ({applicationCode, businessCode, publishStatus, status, businessName, applicationName}) => {
      root.$router.push({
        name: 'processConfigEdit',
        query: {
          applicationCode,
          businessCode,
          publishStatus,
          status,
          businessName,
          applicationName
        }
      })
    }

    const { disabledFlow, disableLoading, enableFlow, enableLoading } = useFlow({
      switchCallBack: () => {
        doResult()
      }
    })

    const switchStatus = (data, key, index) => {
      const { id } = data
      if (data.status) {
        root.$confirm('重要提示 确认禁用此流程？', '提示', {
          type: 'warning',
        }).then(() => {
          disabledFlow({
            id
          })
        }).catch(() => {
          result.value[key].children[index].status = 1
        })
      } else {
        root.$confirm('重要提示 确认启用此流程？', '提示', {
          type: 'warning',
        }).then(() => {
          enableFlow({
            id
          })
        }).catch(() => {
          result.value[key].children[index].status = 0
        })
      }
    }

    const { loading, result, doResult } = useAsync({
      request: getWorkflowProcessMenu,
      callback: (res) => {
        const { data: { data, code } } = res
        const options = []
        if (code === '0') {
          for (const key in data) {
            options.push({
              code: key,
              name: data[key][0].applicationName,
              children: data[key]
            })
          }
        }
        return {
          data: options
        }
      }
    })

    return {
      toEdit,
      loading,
      result,
      switchStatus,
      disableLoading,
      enableLoading
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-main
  margin-top 20px
.p-module-title
  color #494949
  font-size 14px
  margin-bottom 10px
  font-weight bold
.p-module-content
  display flex
  flex-wrap wrap
  .p-module-item
    background #ffffff
    padding 20px
    border-radius 4px
    margin 0 20px 20px 0
    position relative
    min-width 250px
    .p-item-title
      color #494949
      margin-bottom 10px
      font-weight bold
    .p-item-time
      color #848484
    .p-tips-nosave.p-item-time
      color #FEBB27
    .p-item-icon
      color #3B68F0
      position absolute
      top 24px
      right 20px
      display flex
      i
        margin-right 10px
        display block
        cursor pointer
</style>
