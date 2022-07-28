<template>
  <v-card>
    <v-card-title>
      Отчет
    </v-card-title>
    <v-card-subtitle>
      <DateRangePicker/>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import DateRangePicker from '@/layouts/components/dateRangePicker/DateRangePicker'
export default {
  name: 'Report',
  components: {
    DateRangePicker
  },
  computed: {
    done() {
      return this.date.end
    },
    start() {
      return this.date.start
    },
    date() {
      return this.$store.state
    },
  },
  mounted() {
    this.$store.dispatch('getReportingByDate').then(r => {
      console.log(r)
    })
    this.$store.dispatch('getReportingByDateAndUserName', 'ibragim').then(r => {
      console.log(r)
    })
  },
  watch: {
    done() {
      this.$store.dispatch('getReportingByDate').then(r => {
        console.log(r)
      })
    }
  }
}
</script>

<style scoped>

</style>
