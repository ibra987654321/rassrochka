<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <demo-simple-table-basic></demo-simple-table-basic>
  </v-card>
</template>

<script>
import { ref } from '@vue/composition-api'
// eslint-disable-next-line import/extensions
import DemoSimpleTableBasic from '../../simple-table/demos/DemoSimpleTableBasic.vue'

export default {
  components: {
    DemoSimpleTableBasic,
  },
  props: {
    informationData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const optionsLocal = ref(JSON.parse(JSON.stringify(props.informationData)))

    const resetForm = () => {
      optionsLocal.value = JSON.parse(JSON.stringify(props.informationData))
    }

    return { optionsLocal, resetForm }
  },
}
</script>
