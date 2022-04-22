<template>
  <v-card>
    <v-card-title>Все Trouble Tickets за 3 месяца</v-card-title>
    <v-card-text>
      <vertical-chart
        :data="threeMonths.data"
        :value="threeMonths.value"
      ></vertical-chart>
      <v-btn
        block
        color="primary"
        class="mt-6"
        outlined
        @click="$router.push({ path: '/GSKO-dashboard' })"
      >
        подробнее
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import VerticalChart from '@/components/useDashboard/VerticalChart.vue'

export default {
  name: 'DashboardMonthlyTT',
  components: { VerticalChart },
  data: () => ({
    threeMonths: {
      data: null,
      value: null,
    },
  }),
  mounted() {
    this.GetMonthlyTT()
  },
  methods: {
    async GetMonthlyTT() {
      const monthly = await this.$store.dispatch('GetThreeMonths')
      this.threeMonths.value = monthly.map(i => i.date)
      this.threeMonths.data = monthly.map(i => i.amount)
    },
  },
}
</script>

<style scoped>

</style>
