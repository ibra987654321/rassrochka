import { reactive } from '@vue/composition-api'

// import { useField } from './field'

// eslint-disable-next-line no-unused-vars
export function useForm(init = {}) {
  const form = reactive({})

  // const validKey = 'valid'

  // eslint-disable-next-line no-restricted-syntax
  // for (const [key, value] of Object.entries(init)) {
  //   form[key] = useField(value)
  // }
  //
  // const withoutValid = k => k !== validKey
  //
  // form[validKey] = computed(() => Object.keys(form).filter(withoutValid).every(k => form[k].valid))

  return form
}
