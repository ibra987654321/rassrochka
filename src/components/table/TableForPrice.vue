<template>
  <v-data-table
    :headers="headers"
    :items="formTitle"
    class="elevation-1"
  >
    <template v-slot:item.division="item">
      {{ item.item.division }} сом
    </template>
    <template v-slot:item.date="item">
      {{ item.item.date.slice(0, 10) }}
    </template>
    <template v-slot:item.status="item">
      {{ status[item.index] ? 'Погашен' : 'Должен' }}
    </template>

    <template v-slot:top="item">
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Погашение</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.division"
                    label="Сумма"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  {{ item }}
                  <v-checkbox
                    v-model="status[item.index]"
                    class="mt-3"
                    label="Статус "
                    hide-details
                  ></v-checkbox>
                </v-col>
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
              Отмена
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Вы уверены что хотите удалить?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Да</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Обновить
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mdiDelete, mdiPencil } from '@mdi/js'

export default {
  props: {
    data: Array,
  },
  name: 'TableForPrice',
  data: () => ({
    icons: {
      mdiDelete,
      mdiPencil,
    },
    status: [false, false, false],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Период',
        value: 'percent',
      },
      {
        text: 'Дата',
        value: 'date',
      },
      {
        text: 'Сумма',
        value: 'division',
      },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      percent: '',
      date: 0,
      division: 0,
    },
    defaultItem: {
      percent: '',
      date: 0,
      division: 0,
    },
  }),

  computed: {
    formTitle() {
      // eslint-disable-next-line no-return-assign
      return this.desserts = this.$props.data
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = this.$props.data
    },

    editItem(item, event) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>

</style>
