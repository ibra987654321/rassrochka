<template>
  <v-row align="center">
    <v-col
      class=""
      cols="12"
    >

      <v-row>
        <v-col cols="5">
          <v-card class="pb-5">
            <v-card-title>Все ТТ по статусам</v-card-title>
            <v-card-text>
              <PieChart
                :labels="value"
                :series="amount"
              />
              <v-btn
                block
                color="primary"
                class="mt-4"
                max-width="100px"
                outlined
                @click="$router.push({ path: '/GSKO-dashboard/detail' })"
              >
                Подробнее
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="7">
          <v-card>
            <v-card-title>Все ТТ по дням</v-card-title>
            <NegativeChart
              :labels="labels"
              :data="series"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col
      class=""
      cols="12"
    >

      <v-row>
        <v-col cols="5">
          <v-card>
            <v-card-title>Массовые инциденты по статусам</v-card-title>
            <v-card-text>
              <PieChart
                :labels="incidents.value"
                :series="incidents.amount"
              />
              <v-btn
                block
                color="primary"
                class="mt-6"
                outlined
                disabled
                @click="$router.push({ path: '/GSKO-dashboard/detail' })"
              >
                Подробнее
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="7">
          <v-card>
            <v-card-title>Массовые инциденты по дням</v-card-title>
            <NegativeChart
              :labels="incidents.labels"
              :data="incidents.series"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import PieChart from '@/components/useDashboard/PieChart.vue'
import NegativeChart from '@/components/useDashboard/NegativeChart.vue'

export default {
  name: 'GSKODashboard',
  components: {
    PieChart,
    NegativeChart,
  },
  data: () => ({
    value: [],
    amount: [],
    labels: [],
    series: [
      {
        data: [],
        name: 'Создано',
      },
      {
        data: [],
        name: 'Закрыто',
      },
      {
        data: [],
        name: 'Отменены',
      },
    ],
    incidents: {
      value: [],
      amount: [],
      labels: [],
      series: [
        {
          data: [],
          name: 'Создано',
        },
        {
          data: [],
          name: 'Закрыто',
        },
      ]
    }
  }),
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
  watch: {
    done() {
      this.dateRangeText()
      this.getCreatedDaily()
      this.getClosedDaily()
      this.getCancelledDaily()
      this.getCreatedIncidents()
      this.getClosestIncidents()
      this.getIncidentsByStatus()
    },
    start() {
      this.dateRangeText()
      this.getCreatedDaily()
      this.getClosedDaily()
      this.getCancelledDaily()
      this.getCreatedIncidents()
      this.getClosestIncidents()
      this.getIncidentsByStatus()
    },
  },
  mounted() {
    this.dateRangeText()
    this.getCreatedDaily()
    this.getClosedDaily()
    this.getCancelledDaily()
    this.getCreatedIncidents()
    this.getClosestIncidents()
    this.getIncidentsByStatus()
  },
  methods: {
    async dateRangeText() {
      const AllTT = await this.$store.dispatch('AllCreatedTT')
      console.log(AllTT)
      this.value = AllTT.map(i => i.value)
      this.amount = AllTT.map(i => i.amount)
    },
    async getCreatedDaily() {
      const daily = await this.$store.dispatch('CreatedDaily')
      this.labels = daily.map(i => i.date)
      this.series[0].data = daily.map(i => i.amount)
    },
    async getClosedDaily() {
      const daily = await this.$store.dispatch('ClosedDaily')
      this.series[1].data = daily.map(i => i.amount)
    },
    async getCancelledDaily() {
      const daily = await this.$store.dispatch('CancelledDaily')
      this.series[2].data = daily.map(i => i.amount)
    },
    // incidents
    async getClosestIncidents() {
      const data = await this.$store.dispatch('GetIncidents', 'closed')
      this.incidents.series[1].data = data.map(i => i.amount)
    },
    async getCreatedIncidents() {
      const data = await this.$store.dispatch('GetIncidents', 'created')
      this.incidents.labels = data.map(i => i.date)
      this.incidents.series[0].data = data.map(i => i.amount)
    },
    async getIncidentsByStatus() {
      const data = await this.$store.dispatch('GetIncidentsByStatus')
      this.incidents.value = data.map(i => i.value)
      this.incidents.amount = data.map(i => i.amount)
    },
  },
}
</script>

<style scoped>

</style>
