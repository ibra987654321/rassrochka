<template>
  <v-card>
    <v-card-title>Просроченные кредиты</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="fields"
        :items="itemsWithIndex"
        sort-by="calories"
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
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line import/extensions
import TableForEdit from '@/components/table/TableForEdit'
import { mdiPencil } from '@mdi/js'

export default {
  name: 'Calling',
  components: {
    TableForEdit,
  },
  data: () => ({
    dialog: false,
    data: [],
    icons: {
      mdiPencil,
    },
    fields: [
      { text: '№', value: 'index' },
      { text: 'ФИО', value: 'fullName' },
      { text: 'Номер', value: 'phone' },
      { text: 'Модель', value: 'deviceModel' },
      { text: 'Цена', value: 'devicePrice' },
      { text: 'Взнос', value: 'zeroPayment' },
      { text: 'Дейстия', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      fullName: '',
      phone: '',
      deviceModel: '',
      devicePrice: '',
      zeroPayment: '',
    },
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
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      !val ? this.initialize() : true
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$store.dispatch('getCallProfile').then(r => {
        this.data = r
      })
    },
    update() {
      this.initialize()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },
  },
}
</script>

<style scoped>

</style>
