<template>
  <v-card>
    <v-card-title class="align-start">
      <span class="font-weight-semibold">Показатели Контакт-Центра</span>
      <v-spacer></v-spacer>
      <v-btn
        icon
        small
        class="me-n3 mt-n2"
      >
        <v-icon>
          {{ icons.mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle class=" mt-n5">
      <span class="font-weight-semibold text--primary me-1">Данные за {{ dateRangeText }}</span>
      <span>😎</span>
    </v-card-subtitle>

    <v-card-text>
      <v-row v-if="statisticsData">
        <v-col
          v-for="data in statisticsData"
          :key="data[0]"
          class="d-flex align-center"
        >
          <v-avatar
            size="44"
            :color="resolveStatisticsIconVariation (data[0]).color"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
            >
              {{ resolveStatisticsIconVariation (data[0]).icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ resolveStatisticsIconVariation (data[0]).title }}
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ data[1]}} {{ data[0] == 'ar' || data[0] == 'lcr' ? '%' : ''}}
            </h3>
          </div>
        </v-col>
      </v-row>
      <h3 v-if="statisticsData == null">Данные за этот период пока нет</h3>
      <v-btn
        small
        color="primary"
        class="mt-4"
        @click="$router.push({ path: '/monitoring' })"
      >
        Подробнее
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiCurrencyUsd, mdiTrendingUp, mdiDotsVertical, mdiLabelOutline } from '@mdi/js'

export default {
  data:() => ({
    statisticsData: '',
    dateRangeText: '',
    icons: {
      mdiDotsVertical,
      mdiTrendingUp,
      mdiAccountOutline,
      mdiLabelOutline,
      mdiCurrencyUsd,
    },
  }),
  mounted() {
    this.getCallsIndicators()
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
  watch: {
    start() {
      this.getCallsIndicators()
    },
    done() {
      this.getCallsIndicators()
    }
  },
  methods: {
    async getCallsIndicators() {
      const data = await this.$store.dispatch('getCallsIndicators')
      this.dateRangeText = data.date
      const filter = (db, keys) => keys.reduce((a, key) => (a[key] = db[key], a), {})
      const list = ['ivrCalls', 'ivrToCC', 'accepted', 'ar', 'lcr']
      this.statisticsData = Object.entries(filter(data, list))
    },
    resolveStatisticsIconVariation (data) {
      if (data === 'ivrCalls') return { icon: mdiTrendingUp, color: 'primary', title: 'Поступившие звонки в IVR' }
      if (data === 'ivrToCC') return { icon: mdiAccountOutline, color: 'success', title: 'Переведенные звонки в КЦ' }
      if (data === 'accepted') return { icon: mdiLabelOutline, color: 'warning', title: 'Принятые звонки в КЦ' }
      if (data === 'ar') return { icon: mdiCurrencyUsd, color: 'info', title: 'AR' }
      if (data === 'lcr') return { icon: mdiCurrencyUsd, color: 'info', title: 'LCR' }

      return { icon: mdiAccountOutline, color: 'success' }
    }
  },
  // setup() {
  //   const statisticsData = [
  //     {
  //       title: 'Поступило в IVR',
  //       total: '12 951 (AR% 63.1)',
  //     },
  //     {
  //       title: 'Поступило',
  //       total: '5241',
  //     },
  //     {
  //       title: 'Принято',
  //       total: '4752',
  //     },
  //     {
  //       title: 'LCR',
  //       total: '7.2%',
  //     },
  //   ]
  //
  //   const resolveStatisticsIconVariation = data => {
  //     if (data === 'Поступило в IVR') return { icon: mdiTrendingUp, color: 'primary' }
  //     if (data === 'Поступило') return { icon: mdiAccountOutline, color: 'success' }
  //     if (data === 'Принято') return { icon: mdiLabelOutline, color: 'warning' }
  //     if (data === 'LCR') return { icon: mdiCurrencyUsd, color: 'info' }
  //
  //     return { icon: mdiAccountOutline, color: 'success' }
  //   }
  //
  //   return {
  //     statisticsData,
  //     resolveStatisticsIconVariation,
  //
  //     // icons
  //     icons: {
  //       mdiDotsVertical,
  //       mdiTrendingUp,
  //       mdiAccountOutline,
  //       mdiLabelOutline,
  //       mdiCurrencyUsd,
  //     },
  //   }
  // },
}
</script>
