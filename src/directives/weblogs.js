import { weblogsDom } from '@/utils/qjd/weblogs'

export default function(Vue) {
  let handler = null
  const options = {
    bind(el, { value, modifiers: { click } }) {
      handler = e => value && weblogsDom(value)
      click && el.addEventListener('click', handler)
    },
    unbind(el, { modifiers: { click } }) {
      click && el.removeEventListener('click', handler)
    }
  }
  Vue.directive('weblogs', options)
}
