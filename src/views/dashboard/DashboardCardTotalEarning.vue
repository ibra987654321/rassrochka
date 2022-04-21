<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Общие показатели за указанный период</span>
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

    <v-card-text class="my-7">
      <div class=" mb-9" v-for="count in total" :key="count.id">
        <div class="d-flex align-center">
          <h1 class="text-4xl font-weight-semibold">
            {{ count.amount }}
          </h1>

          <div class="d-flex align-center mb-n3">
            <v-icon
              size="40"
              color="success"
            >
              {{ icons.mdiMenuUp }}
            </v-icon>
            <span class="text-base font-weight-medium success--text ms-n2">36%</span>
          </div>
        </div>

        <h3 class="mt-2 font-weight-medium">
          {{ count.value }}
        </h3>
      </div>

    </v-card-text>

<!--    <v-card-text>-->
<!--      <div-->
<!--        v-for="(earning,index) in total"-->
<!--        :key="earning.id"-->
<!--        :class="`d-flex align-start ${index >0 ? 'mt-8':''}`"-->
<!--      >-->
<!--&lt;!&ndash;        <v-avatar&ndash;&gt;-->
<!--&lt;!&ndash;          rounded&ndash;&gt;-->
<!--&lt;!&ndash;          size="38"&ndash;&gt;-->
<!--&lt;!&ndash;          color="#5e56690a"&ndash;&gt;-->
<!--&lt;!&ndash;          class="me-4"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          <v-img&ndash;&gt;-->
<!--&lt;!&ndash;            contain&ndash;&gt;-->
<!--&lt;!&ndash;            :src="earning.avatar"&ndash;&gt;-->
<!--&lt;!&ndash;            height="20"&ndash;&gt;-->
<!--&lt;!&ndash;          ></v-img>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-avatar>&ndash;&gt;-->

<!--        <div class="d-flex align-center flex-grow-1 flex-wrap">-->
<!--          <div>-->
<!--            <h2 class="font-weight-medium">-->
<!--              {{ earning.value }}-->
<!--            </h2>-->
<!--            <h3 class="text-xs text-no-wrap">{{ earning.amount }}</h3>-->
<!--          </div>-->

<!--          <v-spacer></v-spacer>-->

<!--          <div class="ms-1">-->
<!--            <p class="text&#45;&#45;primary font-weight-medium mb-1">-->
<!--              {{ earning.amount }}-->
<!--            </p>-->
<!--            <v-progress-linear-->
<!--              :value="earning.amount"-->
<!--              color="primary"-->
<!--            ></v-progress-linear>-->
<!--          </div>-->
<!--          <hr>-->
<!--        </div>-->
<!--      </div>-->
<!--    </v-card-text>-->
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiMenuUp, mdiMenuDown } from '@mdi/js'

export default {
  data: () => ({
    total: 0,
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
    start() {
      this.getAllTT()
    },
    done() {
      this.getAllTT()
    },
  },
  created() {
    this.getAllTT()
  },
  methods: {
    async getAllTT() {
      const all = await this.$store.dispatch('GetAllTickets')
      this.total = all
    },
  },
  setup() {
    const totalEarning = [
      {
        avatar: require('@/assets/images/logos/zipcar.png'),
        title: 'INC000000790864',
        subtitle: 'Глоб кейс 1976610',
        earning: '14.04.2022 12:10',
        progress: '85',
        color: 'primary',
      },
      {
        avatar: require('@/assets/images/logos/bitbank.png'),
        title: 'INC000000794844',
        subtitle: 'Глоб кейс 1976514',
        earning: '07.08.2022 12:10',
        progress: '65',
        color: 'info',
      },
      {
        avatar: require('@/assets/images/logos/aviato.png'),
        title: 'INC000000798457',
        subtitle: 'Глоб кейс 1976584',
        earning: '04.02.2022 18:56',
        progress: '30',
        color: 'secondary',
      },
    ]

    return {
      totalEarning,
      icons: { mdiDotsVertical, mdiMenuUp, mdiMenuDown },
    }
  },
}
</script>
