<template>
  <v-card>
    <v-card-title>
      Показатели Контакт-Центра
    </v-card-title>
    <v-card-text>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        class="mt-3"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="datePicker.slice(0, 10)"
            label="Дата"
            class="date"
            prepend-icon="mdi-calendar"
            readonly
            outlined
            dense
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="datePicker"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
      <v-data-table
        :headers="headers"
        :items="monitoringData"
        class="elevation-1"
      >
        <template #item.index="{ item }">
          {{ monitoringData.indexOf(item) + 1 }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "MonitoringTable",
  data:() => ({
    menu: false,
    datePicker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    monitoringData: [],
    headers: [
      { value: 'index', text: '№' },
      { value: 'splitName', text: 'Название спита'},
      { value: 'received', text: 'Полученные'},
      { value: 'accepted', text: 'Принято'},
      { value: 'efficiency', text: 'Эффективность'},
      { value: 'avail', text: 'Avail'},
      { value: 'att', text: 'Att'},
      { value: 'asa', text: 'Asa'},
      { value: 'aht', text: 'Aht'},
      { value: 'date', text: 'Дата'},
    ]
  }),
  async mounted() {
    const lustDate = new Date(new Date(this.datePicker).setDate(new Date(this.datePicker).getDate() - 1)).toISOString().substr(0, 10)
    await this.getMonitoringData(lustDate)
  },
  computed: {
  },
  watch: {
    datePicker() {
      this.getMonitoringData()
    },
  },
  methods: {
    async getMonitoringData(date) {
      if (date) {
        const data = await this.$store.dispatch('getMonitoringData', date)
        this.monitoringData = data
      } else {
        const data = await this.$store.dispatch('getMonitoringData', this.datePicker)
        this.monitoringData = data
      }

    }
  }
}
</script>

<style scoped>
.date {
  max-width: 300px ;
}
</style>
