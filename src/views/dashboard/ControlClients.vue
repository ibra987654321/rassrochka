<template>
  <v-card>
    <v-card-title>База клиентов</v-card-title>
    <v-card-text>
      <div class="d-flex">
        <v-text-field
          ref="search"
          v-model="search"
          rounded
          dense
          outlined
          placeholder="Поиск по ФИО и по Коду клиента"
          :prepend-inner-icon="icons.mdiMagnify"
          class="app-bar-search flex-grow-0 mb-3 pr-3"
          hide-details
        ></v-text-field>
        <v-btn
          color="blue darken-1"
          text
          @click="updateData()"
        >
          Сброс
        </v-btn>
      </div>

      <v-data-table
        :headers="fields"
        :loading="$store.state.profiles.loading"
        :items="itemsWithIndex"
        :items-per-page="20"
        item-key="itemKey"
        class="elevation-1"
      >
        <template v-slot:item.actions="item">
          <v-btn
            color="primary"
            small
            @click="$router.push('/detail/' + item.item.profileId)"
          >
            Подробнее
          </v-btn>
        </template>
        <template v-slot:item.registrationDate="item">
          {{ item.item.registrationDate | date }}
        </template>
        <template v-slot:item.statusType="item">
          {{ item.item.statusType | status }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import VerticalChart from '@/components/useDashboard/VerticalChart.vue'
import TableClients from '@/components/table/TableClients'
import { mdiMagnify } from '@mdi/js'
import axios from 'axios'

export default {
  name: 'ControlClients',
  // eslint-disable-next-line vue/no-unused-components
  components: { VerticalChart, TableClients },
  data: () => ({
    data: [],
    date: new Date(Date.now()).toISOString(),
    icons: {
      mdiMagnify,
    },
    fields: [
      { text: '№', value: 'index' },
      { text: 'Код клиента', value: 'profileNumber' },
      { text: 'Дата', value: 'registrationDate' },
      { text: 'ФИО', value: 'fullName' },
      { text: 'Статус', value: 'statusType' },
      { text: 'Модель', value: 'deviceModel' },
      { text: 'Продавец', value: 'salesmanLogin' },
      { text: 'Первоначальный взнос', value: 'zeroPayment' },
      { text: 'Действия', value: 'actions', sortable: true },
    ],
    search: '',
  }),
  computed: {
    itemsWithIndex() {
      return this.data.map(
        (items, index) => ({
          ...items,
          index: index + 1,
        }),
      )
    },
  },
  watch: {
    search(val) {
      if (val !== '') {
        this.searchData(val)
      } else {
        console.log('watch')
        this.updateData()
      }
    },
  },
  mounted() {
    console.log('mounted')
    this.updateData()
  },
  methods: {
    updateData() {
      this.search = ''
      const date = {
        start: new Date(new Date(this.date).setDate(new Date(this.date).getDay() - 30)).toISOString(),
        end: new Date(new Date(this.date).setHours(new Date(this.date).getHours() + 6)).toISOString(),
      }
      this.$store.dispatch('getAllProfiles', date).then(r => {
        this.data = r
      })
    },
    searchData(val) {
      this.$store.dispatch('searchProfilesByName', val).then(r => {
        this.data = r
      })
    },
  },
}
</script>

<style scoped>

</style>
