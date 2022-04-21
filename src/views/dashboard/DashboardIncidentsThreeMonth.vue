<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Массовые инциденты за 3 месяца</span>
    </v-card-title>

    <v-card-text>
      <!-- Chart -->
      <VerticalChart
        :data="incidents.count"
        :value="incidents.name"
      />
      <v-btn
        block
        color="primary"
        class="mt-6"
        outlined
        @click=""
      >
        подробнее
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import VerticalChart from "@/components/useDashboard/VerticalChart";
export default {
  name: "DashboardIncidentsThreeMonth",
  components: {
    VerticalChart
  },
  data: () => ({
    incidents: {
      name: null,
      count: null,
    }
  }),
  mounted() {
    this.getIncidentsThreeMonth()
  },
  methods: {
    async getIncidentsThreeMonth() {
      const data = await this.$store.dispatch('GetIncidentsThreeMonth')
      this.incidents.count = data.map(i => i.amount)
      this.incidents.name = data.map(i => i.date)
    }
  }
}
</script>

<style scoped>

</style>
