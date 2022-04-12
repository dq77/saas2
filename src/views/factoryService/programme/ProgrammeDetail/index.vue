<template lang="pug">
.page-main(v-loading='loading')
  //- 页面标题
  PageTitle
  //- 项目基本情况
  Top
  //- 项目基本情况
  Summary
  //- 公司总览
  ProjectInfo
</template>
<script>
import PageTitle from './components/pageTitle'
import Top from './top/'
import Summary from './summary/'
import ProjectInfo from './projectInfo/'
import useProjectInfo from './hooks/useProjectInfo'
import { provide, readonly } from '@vue/composition-api'
export default {
  components: {
    PageTitle,
    Top,
    ProjectInfo,
    Summary
  },
  setup(props, { root }) {
    const { id, companyName, projectCompany, projectId } = root.$route.query
    const { projectInfo, loading } = useProjectInfo({
      id,
      projectCompany,
      projectId,
      realEstateCompany: companyName,
    })

    provide('projectInfo', readonly(projectInfo))

    return {
      loading,
      projectInfo
    }
  },
}
</script>
<style lang="stylus" scoped>
</style>
