<template>
  <v-card>
    <v-card-title>Контроль кредитами</v-card-title>
    <v-card-text>
      <table-for-edit :data="data" :fields="fields" :edit-items="editItem" :put-dispatch="'putCreditInformation'"></table-for-edit>
    </v-card-text>
  </v-card>
</template>

<script>
import TableForEdit from "@/components/table/TableForEdit";

export default {
  name: "Calling",
  components: {
    TableForEdit
  },
  data: () =>  ({
    data: [],
    fields: [
      {text:'ФИО', value: 'fullName' },
      {text:'Номер', value: 'phone' },
      {text:'Месяц', value: 'countMonth' },
      {text:'Дата', value: 'payDate' },
      {text:'Модель', value: 'deviceModel' },
      {text:'Цена', value: 'devicePrice' },
      {text:'Взнос', value: 'zeroPayment' },
      {text:'Коммент', value: 'comment' },
      {text:'Агент', value: 'salesmanLogin' },
      { text: 'Действия', value: 'actions', sortable: false },
    ],
    editItem: {
      id: '',
      comment: '',
      statusType: '',
      payDate: ''
    }
  }),
  created() {
    this.$store.dispatch('getCallProfile').then(r => {
      this.data = r
    })
  }
}
</script>

<style scoped>

</style>
