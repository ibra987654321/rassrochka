<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Все задачи сотрудников</span>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        small
        class="mr-5"
        @click="sevenDays"
      >
        7 дней
      </v-btn>
      <v-btn
        color="primary"
        small
        @click="thityDays"
      >
        30 дней
      </v-btn>
      <v-btn
        icon
        small
        class="mt-n2 me-n3"
      >
        <v-icon size="22">
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <!-- Chart -->
      <VerticalChart
        :data="tasks.count"
        :value="tasks.name"
      />
      <div class="d-flex align-center">
        <h3 class="text-2xl font-weight-semibold me-4">
          45%
        </h3>
        <span>Your sales perfomance in 45% 🤩 better compare to last month</span>
      </div>

      <v-btn
        block
        color="primary"
        class="mt-6"
        outlined
        @click="navigate"
      >
        Details
      </v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import router from '@/router'
import VerticalChart from '@/components/useDashboard/VerticalChart.vue'

export default {
  components: {
    VerticalChart,
  },
  data: () => ({
    days: 30,
    tasks: {
      name: null,
      count: null,
    },
  }),
  created() {
    this.getChartReport(30)
  },
  methods: {
    async getChartReport(period) {
      const users = await this.$store.dispatch('getCountTask', period)
      this.tasks.name = users.map(i => i[1])
      this.tasks.count = users.map(i => i[0])
    },
    thityDays() {
      this.getChartReport(30)
    },
    sevenDays() {
      this.getChartReport(7)
    },
    navigate() {
      router.push({ path: '/detaile' })
    },
  },
}
</script>
