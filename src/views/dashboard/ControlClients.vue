<template>
  <v-card>
    <v-card-title>База клиентов</v-card-title>
    <v-card-text>
      <div class="d-flex">
        <v-text-field
          rounded
          dense
          outlined
          placeholder="Поиск по ФИО или ИНН"
          ref="search"
          v-model="search"
          :prepend-inner-icon="icons.mdiMagnify"
          class="app-bar-search flex-grow-0 mb-3"
          hide-details
        ></v-text-field>
        <v-text-field
          rounded
          dense
          outlined
          placeholder="Поиск по IMEI"
          ref="searchImei"
          v-model="searchImei"
          :prepend-inner-icon="icons.mdiMagnify"
          class="app-bar-search flex-grow-0 mb-3 ml-3"
          hide-details
        ></v-text-field>
<!--        <v-btn-->
<!--          color="blue darken-1"-->
<!--          text-->
<!--          @click="searchData()"-->
<!--        >-->
<!--          Поиск-->
<!--        </v-btn>-->
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
        :items="data"
        :items-per-page="20"
        item-key="itemKey"
        class="elevation-1"
      >
        <template v-slot:item.actions="item" >
          <v-btn
            color="primary"
            small
            @click="$router.push('/detail/' + item.item.id)"
          >
            Подробнее
          </v-btn>
        </template>
        <template v-slot:item.registrationDate="item" >
          {{new Date(item.item.registrationDate).toLocaleString('ru', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import VerticalChart from '@/components/useDashboard/VerticalChart.vue'
import TableClients from '@/components/table/TableClients'
import { mdiMagnify } from '@mdi/js'

export default {
  name: 'ControlClients',
  // eslint-disable-next-line vue/no-unused-components
  components: { VerticalChart, TableClients },
  data: () => ({
    data: [],
    date: new Date(Date.now()).toISOString(),
    icons: {
      mdiMagnify
    },
    fields: [
      {text:'№', value: 'id' },
      {text:'Дата', value: 'registrationDate' },
      {text:'ФИО', value: 'fullName' },
      {text:'IMEI', value: 'deviceImei' },
      {text:'Продавец', value: 'salesmanLogin' },
      {text:'Действия', value: 'actions', sortable: true},
    ],
    search: '',
    searchImei: ''
  }),
  created() {
    this.updateData()
  },
  watch: {
    search(val) {
      if (val !== '') {
        this.searchData(val)
      } else {
        this.updateData()
      }
    },
    searchImei(val) {
      if (val !== '') {
        this.searchByImei(val)
      } else {
        this.updateData()
      }
    }
  },
  methods: {
    updateData() {
      const date = {
        start: new Date(new Date(this.date).setDate(new Date(this.date).getDay() - 30)).toISOString(),
        end: this.date
      }
      this.$store.dispatch('getAllProfiles', date).then(r => {
        this.data = r
      })
    },
    searchData(val) {
      const validInp =/^[0-9]+$/;
      if (validInp.test(val)) {
        this.$store.dispatch('searchProfilesByInn', val).then(r => {
          this.data = r
        })
      } else {
        this.$store.dispatch('searchProfilesByName', val).then(r => {
          this.data = r
        })
      }
    },
    searchByImei(val) {
      this.$store.dispatch('searchProfilesByImei', val).then(r => {
        this.data = r
      })
    }
  }
}
</script>

<style scoped>

</style>
