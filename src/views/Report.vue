<template>
  <v-card>
    <v-card-title>
      Отчет
    </v-card-title>
    <v-card-subtitle>
      <v-row class="align-center">
        <v-col md="6">
          <DateRangePicker/>
        </v-col>
        <v-col md="6">
          <v-select
            v-model="selectUser"
            dense
            hide-details
            outlined
            :items="['Все', 'Ibragim', 'Almaz', 'Azamat']"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-text>
      <v-data-table
        dense
        :headers="headers"
        :items="data"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:item.registrationDate="item">
          {{ item.item.registrationDate | date }}
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-text>
      <p style="font-size: 20px;">{{count.length !== 0 ? `Общая сумма: ${ count } сом` : `Нет данных`}}</p>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line import/extensions
import DateRangePicker from '@/layouts/components/dateRangePicker/DateRangePicker'
import { mapState } from 'vuex'
export default {
  name: 'Report',
  components: {
    DateRangePicker,
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
    ...mapState(['snackbars']),
  },
  data: () => ({
    selectUser: 'Все',
    data: [],
    count: [],
    headers: [
      { text: 'ФИО', value: 'fullName' },
      { text: 'Сумма взноса', value: 'debtReport' },
      { text: 'Дата получения взноса', value: 'registrationDate' },
      { text: 'Продавец', value: 'salesmanLogin' },
    ],
  }),
  mounted() {
    this.getReports()
  },
  watch: {
    done() {
      if (this.selectUser === 'Все') {
        this.getReports()
      } else {
        this.getReportsByUser()
      }
    },
    start() {
      if (this.selectUser === 'Все') {
        this.getReports()
      } else {
        this.getReportsByUser()
      }
    },
    selectUser() {
      this.getReportsByUser()
    },
  },
  methods: {
    getReports() {
      this.$store.dispatch('getReportingByDate').then(r => {
        this.data = r
        this.count = []
        r.map(s => {
          this.count.push(s.debtReport)
        })
        if (r.length === 0) {
          this.$store.commit('setSnackbars', 'За выбранный период у этого продавца нет данных')
        } else {
          this.count = this.count.reduce((a, b) => a + b)
        }
      })
    },
    getReportsByUser() {
      this.$store.dispatch('getReportingByDateAndUserName', this.selectUser).then(r => {
        this.data = r
        this.count = []
        r.map(s => {
          this.count.push(s.debtReport)
        })
        if (this.count.length !== 0) {
          this.count = this.count.reduce((a, b) => a + b)
        }
      })
    },
  },
}
</script>

<style scoped>

</style>
