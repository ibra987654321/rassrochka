<template>
  <v-card>
    <v-card-title>Контроль профилями</v-card-title>
    <v-card-text>
      <div class="d-flex">
        <v-text-field
          rounded
          dense
          outlined
          ref="search"
          v-model="search"
          :prepend-inner-icon="icons.mdiMagnify"
          class="app-bar-search flex-grow-0 mb-3"
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
        class="elevation-1"
      >
        <template v-slot:item.actions="item">
          <v-btn
            color="primary"
            small
            class="me-3 mt-4"
            @click="$router.push('/detail/' + item.item.id)"
          >
            Подробнее
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import VerticalChart from '@/components/useDashboard/VerticalChart.vue'
import TableClients from "@/components/table/TableClients";
import {mdiMagnify} from '@mdi/js'
export default {
  name: "ControlClients",
  components: { VerticalChart, TableClients },
  data: () => ({
    data: [],
    icons: {
      mdiMagnify
    },
    fields: [
      {text:'№', value: 'id' },
      {text:'ФИО', value: 'fullName' },
      {text:'ИНН', value: 'passportInn' },
      {text:'Номер', value: 'phone' },
      {text:'Агент', value: 'salesmanLogin' },
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    search: ''
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
    }
  },
  methods: {
    updateData() {
      this.$store.dispatch('getAllProfiles').then(r => {
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

    }
  }
}
</script>

<style scoped>

</style>
