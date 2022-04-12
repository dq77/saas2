import {ref} from '@vue/composition-api'
import useForm from 'hooks/useForm'
import {surveyFormData, surveyFormConfig} from './const.js'

export default () => {
  const formRef = ref()
  const {
    formData,
    formConfig,
    loopFormConfig,
    loopFormData,
    setFormItem,
    setConfig,
  } = useForm({
    formRef,
    formData: surveyFormData,
    formConfig: surveyFormConfig,
  })
  const handerSurveyForm = (data) => {
    loopFormConfig((item) => {
      if (item.key === 'projectDuration') {
        setFormItem(item.key, [data.startTime || '', data.endTime || ''])
      } else {
        setFormItem(item.key, data[item.key] || data[item.key] === 0 ? data[item.key] : undefined)
      }
    })
  }
  const datePickerChange = ({value, key, item}) => {
    const d = (new Date(value[1]) - new Date(value[0])) / 86400000
    loopFormConfig((item) => {
      if (item.key === 'projectCycle') {
        setFormItem(item.key, d + 1)
      }
    })
  }
  return {
    formRef,
    formData,
    formConfig,
    loopFormConfig,
    loopFormData,
    setFormItem,
    setConfig,
    handerSurveyForm,
    datePickerChange,
  }
}
