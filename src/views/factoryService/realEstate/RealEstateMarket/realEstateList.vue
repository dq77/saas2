<template lang="pug">
div
  Card(noTitle style='margin-bottom: 10px;')
    Form(
      ref="formRef"
      :formData="formData",
      :formConfig="formConfig"
    )
      .global-search-btn
        el-button.search-button(type="primary", @click="searchFormHandle", :loading="loading") 搜索
        el-button.search-button(@click="resetFormHandle") 重置
  Card(noTitle noWrap)
    div(style="padding: 20px;")
      Table(:dataSource="dataSource", :columns="companyColumns", :loading="loading")
        template(slot='comName' slot-scope='{row}')
          .p-company-name(@click='toDetailPage(row)') {{row.comName}}
        template(slot='operate' slot-scope='{row}')
          .p-btn-flex
            .u-operate-btn(@click='toDetailPage(row)' weblogs-anchor='factory-customerEvaluation-home-view') 查看
            .u-operate-btn.p-cancel(v-if='hasFollow[row.comWholeName]' @click='unFollow(row.comWholeName)' weblogs-anchor='factory-customerEvaluation-home-unFollow') 取消关注
            .u-operate-btn.p-follow(v-else @click='follow(row.comWholeName)' weblogs-anchor='factory-customerEvaluation-home-follow') 关注
    Pagination(:pagination="pagination")
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { companyColumns } from './config'
import Card from '@/components/Card'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
import useFollow from '../hooks/useFollow'

export default {
  props: {
    mode: {
      type: String,
      default: 'all'
    },
  },
  components: {
    Form,
    Table,
    Pagination,
    Card
  },
  setup(props, { root, emit }) {
    const hasFollow = ref({})
    const formRef = ref()
    const { getEnterpriseCompanyTop } = ajaxStore.factoryService.realEstate
    // form
    const {
      formData,
      formConfig,
      submitHandle,
      resetHandle,
      setFormItem
    } = useForm({
      formRef,
      formData: { companyName: undefined },
      formConfig: [
        { type: 'input', key: 'companyName', label: '企业名称' }
      ]
    })

    // 关注/取消关注/关注状态显示
    const {
      checkHasFollowed,
      unFollowCompany,
      followCompany,
      followCompanyList,
      getFollowCompanyList
    } = useFollow()

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      searchInfo,
      // resetHandle: resetTableHandle
    } = useTable({
      request: getEnterpriseCompanyTop,
      isInit: false,
    })

    const _handleCompanyList = () => {
      const companyList = []
      followCompanyList.value.map((item) => {
        companyList.push(item.companyName)
      })
      return props.mode === 'follow' ? companyList.join() : ''
    }

    // 查询
    const searchFormHandle = async () => {
      const companyList = _handleCompanyList()
      setFormItem('companyList', companyList)
      submitHandle(searchHandle)
    }
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      // resetTableHandle()
      const companyList = _handleCompanyList()
      setFormItem('companyList', companyList)
      initTable('reset')
    }

    // 前往开发商详情页
    const toDetailPage = (item) => {
      root.$router.push({
        name: 'realEstateDetail',
        query: {
          companyName: item.comWholeName
        }
      })
    }

    // 关注后刷新列表并触发事件
    const follow = async (companyName) => {
      await followCompany(companyName)
      // updateHasFollow(dataSource.value)
      initTable()
      emit('changeFollow')
    }

    // 检查是否有关注eventBus事件
    const { emitEvent } = useEventBus({
      event: busStore.checkRecommend,
    })

    // 取消关注后刷新列表并触发事件
    const unFollow = async (companyName) => {
      await unFollowCompany(companyName)
      // updateHasFollow(dataSource.value)
      initTable()
      emit('changeFollow')
      // 触发事件，判断是否需要显示推荐关注弹窗
      emitEvent()
    }

    const updateHasFollow = async (tableList) => {
      const newHasFollow = {}
      await tableList.map(async (item, key) => {
        newHasFollow[item.comWholeName] = await checkHasFollowed({
          companyName: item.comWholeName,
          cache: true
        })
        hasFollow.value = newHasFollow
      })
    }

    const { initEvent } = useEventBus({
      event: busStore.reloadTopList
    })
    initEvent((data) => {
      initTable()
    })

    const _getSearchInfo = async (type) => {
      await getFollowCompanyList({cache: true})
      const companyList = _handleCompanyList()
      const params = type === 'reset' ? null : searchInfo.value
      return {
        ...params,
        companyList: props.mode === 'follow' ? companyList : '',
      }
    }

    const initTable = async (type) => {
      await getFollowCompanyList({cache: true})
      if (props.mode === 'all' || followCompanyList.value.length) {
        searchHandle(await _getSearchInfo(type))
      } else {
        dataSource.value = []
      }
    }

    initTable()

    watch(
      () => dataSource.value,
      async (value) => {
        updateHasFollow(value)
      }
    )
    watch(
      () => props.mode,
      async (value) => {
        initTable()
      }
    )

    return {
      formRef,
      formData,
      formConfig,
      searchFormHandle,
      resetFormHandle,
      loading,
      dataSource,
      pagination,
      companyColumns,
      toDetailPage,
      hasFollow,
      unFollow,
      follow,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-btn-flex
  display flex
  align-items center
.p-company-name
  color #3C5DA4
  cursor pointer
  font-weight bold
.p-company-name:hover
  color #409EFF
.p-follow-status
  margin-left 5px
.u-operate-btn
  color #3C5DA4
  cursor pointer
  font-weight bold
  margin 0 5px 5px 0
.u-operate-btn:hover
  color #409EFF
.p-follow
  color #25BECD
.p-cancel
  color #738A9E
</style>
