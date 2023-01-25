<template>
  <v-card>
    <v-card-title>
      Отчет
    </v-card-title>
    <v-card-subtitle>
      <v-row class="align-center">
        <v-col
          cols
          md="6"
          sm="12"
        >
          <DateRangePicker/>
        </v-col>
        <v-col md="3">
          <v-select
            v-model="$store.state.paymentTypeList"
            dense
            hide-details
            outlined
            multiple
            :items="$store.state.paymentType"
          >
            <template v-slot:prepend-item>
              <v-list-item
                ripple
                @mousedown.prevent
                @click="toggle()"
              >
                <v-list-item-action>
                  <v-icon :color="$store.state.paymentTypeList.length > 0 ? 'indigo darken-4' : ''">
                    {{ likesAllFruit ? icons.mdiCloseBox : icons.mdiMinusBox }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Выбрать все
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>
        <v-col
          cols
          md="3"
          sm="12"
        >
          <v-select
            v-model="$store.state.selectedUser"
            dense
            hide-details
            outlined
            multiple
            :items="$store.state.userList"
          >
            <template v-slot:prepend-item>
              <v-list-item
                ripple
                @mousedown.prevent
                @click="toggle1()"
              >
                <v-list-item-action>
                  <v-icon :color="$store.state.selectedUser.length > 0 ? 'indigo darken-4' : ''">
                    {{ likesAllFruit1 ? icons.mdiCloseBox : icons.mdiMinusBox }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Выбрать все
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-text>
      <v-tabs
        v-model="tab"
        centered
        icons-and-text
      >
        <v-tab :class="$vuetify.breakpoint.mobile ? 'fontSize' : ''" href="#tab-2">
          Первоначальный взнос
        </v-tab>
        <v-tab :class="$vuetify.breakpoint.mobile ? 'fontSize' : ''" href="#tab-1">
          Месячные платежи
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
            :loading="$store.state.report.loading"
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
import { mdiCloseBox, mdiMinusBox } from '@mdi/js'

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
    likesAllFruit() {
      return this.$store.state.paymentTypeList.length === this.$store.state.paymentType.length
    },
    likesAllFruit1() {
      return this.$store.state.selectedUser.length === this.$store.state.userList.length
    },
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
      { text: 'Месяц', value: 'countMonth' },
      { text: 'Способ оплаты', value: 'paymentType' },
      { text: 'Продавец', value: 'salesmanLogin' },
    ],
    headersZero: [
      { text: 'ФИО', value: 'fullName' },
      { text: 'Первоначальный взнос', value: 'zeroPayment' },
      { text: 'Дата получения взноса', value: 'registrationDate' },
      { text: 'Способ оплаты', value: 'paymentType' },
      { text: 'Продавец', value: 'salesmanLogin' },
    ],
    tab: null,
    icons: {
      mdiCloseBox,
      mdiMinusBox,
    },
  }),
  mounted() {
    this.getUserList()
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
    '$store.state.selectedUser': function () {
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
          this.$store.state.userList = r
          this.getReports()
          this.getReportsZeroPayment()
        })
        .catch(e => this.$store.commit('setSnackbars', e.message))
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.$store.state.paymentTypeList = []
        } else {
          this.$store.state.paymentTypeList = this.$store.state.paymentType.slice()
        }
      })
    },
    toggle1() {
      this.$nextTick(() => {
        if (this.likesAllFruit1) {
          this.$store.state.selectedUser = []
        } else {
          this.$store.state.selectedUser = this.$store.state.userList.slice()
        }
      })
    },
  },
}
</script>

<style scoped>
.fontSize {
  font-size: 10px;
}
</style>
