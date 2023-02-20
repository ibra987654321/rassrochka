<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
    >
      <control-clients></control-clients>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line import/extensions
import ControlClients from '@/views/dashboard/ControlClients'

export default {
  components: {
    ControlClients,
  },
}
</script>
