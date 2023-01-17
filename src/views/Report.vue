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
        <v-col md="3">
          <v-select
            v-model="$store.state.selectedUser"
            dense
            hide-details
            outlined
            :items="userList"
          ></v-select>
        </v-col>
        <v-col md="3">
          <v-select
            v-model="$store.state.paymentTypeList"
            dense
            hide-details
            outlined
            :items="$store.state.paymentType"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-text>
      <v-tabs
        v-model="tab"
        background-color="deep-purple accent-4"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Месячные платежи
        </v-tab>

        <v-tab href="#tab-2">
          Первоначальный взнос
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          :value="'tab-' + 1"
        >
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
          <div>
            <p style="font-size: 20px;">{{count.length !== 0 ? `Общая сумма: ${ count } сом` : `Нет данных`}}</p>
          </div>
        </v-tab-item>
        <v-tab-item
          :value="'tab-' + 2"
        >
          <v-data-table
            dense
            :headers="headersZero"
            :items="dataZero"
            item-key="name1"
            class="elevation-1"
          >
            <template v-slot:item.registrationDate="item">
              {{ item.item.registrationDate | date }}
            </template>
          </v-data-table>
          <div>
            <p style="font-size: 20px;">{{countZero.length !== 0 ? `Общая сумма: ${ countZero } сом` : `Нет данных`}}</p>
          </div>
        </v-tab-item>
      </v-tabs-items>
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
    paymentTypeList: 'Наличные',
    userList: [],
    data: [],
    dataZero: [],
    count: [],
    countZero: [],
    headers: [
      { text: 'ФИО', value: 'fullName' },
      { text: 'Сумма взноса', value: 'debtReport' },
      { text: 'Дата получения взноса', value: 'registrationDate' },
      { text: 'Продавец', value: 'salesmanLogin' },
    ],
    headersZero: [
      { text: 'ФИО', value: 'fullName' },
      { text: 'Первоначальный взнос', value: 'zeroPayment' },
      { text: 'Дата получения взноса', value: 'registrationDate' },
      { text: 'Продавец', value: 'salesmanLogin' },
    ],
    tab: null,
  }),
  mounted() {
    this.getUserList()
    this.getReports()
    this.getReportsZeroPayment()
  },
  watch: {
    done() {
      this.getReports()
      this.getReportsZeroPayment()
    },
    start() {
      this.getReports()
      this.getReportsZeroPayment()
    },
    '$store.state.selectedUser': function() {
      this.getReports()
      this.getReportsZeroPayment()
    },
    '$store.state.paymentTypeList': function() {
      this.getReports()
      this.getReportsZeroPayment()
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
          this.$store.commit('setSnackbars', 'За выбранные параметры нет данных "Месячные платежи"')
        } else {
          this.count = this.count.reduce((a, b) => a + b)
        }
      })
    },
    getReportsZeroPayment() {
      this.$store.dispatch('getReportingZeroPayment').then(r => {
        this.dataZero = r
        this.countZero = []
        r.map(s => {
          this.countZero.push(s.zeroPayment)
        })
        if (this.countZero.length !== 0) {
          this.countZero = this.countZero.reduce((a, b) => a + b)
        } else {
          this.$store.commit('setSnackbars', 'За выбранные параметры нет данных "Первоначальный взнос"')
        }
      })
    },
    getUserList() {
      this.$store.dispatch('getUserList')
        .then(r => {
          this.userList = r
          this.userList.push('Все')
          this.userList.push('anonymousUser')
        })
        .catch(e => this.$store.commit('setSnackbars', e.message))
    },
  },
}
</script>

<style scoped>

</style>
