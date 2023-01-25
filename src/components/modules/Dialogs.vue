<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="950px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          Погасить
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Погашение кредита
        </v-card-title>

        <v-card-text>
          <table-clients :data="datas" :fields="fields" :edit-items="editItem"></table-clients>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import TableClients from '@/components/table/TableClients';

export default {
  name: 'Dialogs',
  props: ['data'],
  components: {
    TableClients,
  },
  data:() => ({
    dialog: false,
    fields: [
      { text: 'Оплачен', value: 'debtReport' },
      { text: 'Оплата', value: 'debt' },
      { text: 'Дата закрытия', value: 'payDate' },
      { text: 'Статус', value: 'statusType' },
      { text: 'Комментарии', value: 'comment' },
      { text: 'Действия', value: 'actions', sortable: false},
    ],
    editItem: {
      payDate: '',
      debt: '',
      debtReport: 0,
      debtClosedDate: '',
      statusType: '',
      comment: '',
    },
  }),
  computed: {
    datas() {
      return this.$props.data
    },
  },
}
</script>

<style scoped>

</style>
