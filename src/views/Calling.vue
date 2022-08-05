<template>
  <v-card>
    <v-card-title>Просроченные кредиты</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="fields"
        :items="data"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-dialog
            v-model="dialog"
              max-width="770px"
            >
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <TableForEdit @update="update()" :id="editedItem.creditId" :profile-id="editedItem.id"/>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Закрыть
                </v-btn>
              </v-card-actions>
              </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.actions="{item}">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            {{ icons.mdiPencil }}
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
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
      { text: '№', value: 'creditId' },
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
  watch: {
    dialog (val) {
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
      console.log('update')
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
