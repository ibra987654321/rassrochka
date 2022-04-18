<template>
  <div id="chart">
    <apexchart
      type="area"
      height="500"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'NegativeChart',
  components: {
    apexchart: VueApexCharts,
  },
  props: ['lables', 'data'],
  data() {
    return {
      listOfData: [],
    }
  },
  computed: {
    series() {
      return this.$props.data
    },
    chartOptions() {
      return {
        chart: {
          height: 500,
          type: 'area',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: this.$props.lables,
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      }
    },
  },
  created() {
  },
}
</script>

<style scoped>

</style>
