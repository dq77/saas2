import store from '@/store'
const modules = require('vue-dynamic-modules')

export const getModules = () => {
  let moduleChildren = []
  const asyncModules = []
  modules.forEach(item => {
    item.keys().map(key => {
      const { module, children } = item(key)?.default ?? {}
      if (module) {
        asyncModules.push(module)
        moduleChildren = [...moduleChildren, ...children]
      }
    })
  })
  store.commit('SET_ASYNCMODULES', asyncModules)
  return moduleChildren
}
