<template>
  <div>
    <vue-apex-charts
      type="pie"
      :width="680"
      :height="680"
      :series="series"
      :options="chartOptions"
    ></vue-apex-charts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    VueApexCharts,
  },
  props: {
    labels: null,
    series: null,
  },
  data() {
    return {
      colors: ['#9155fd', '#9c73e8', '#b497ef'],
    }
  },
  computed: {
    chartOptions() {
      return {
        labels: this.$props.labels,
        colors: this.colors,
      }
    },
  },
}
</script>

<style scoped>

</style>
