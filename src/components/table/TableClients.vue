<template>
  <v-data-table
    :headers="header"
    :items="desserts"
    class="elevation-1"
  >
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
                  sm="12"
                >
                  <v-textarea
                    v-model="editedItem.comment"
                    label="Комментарии"
                    dense
                    outlined
                  ></v-textarea>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-select
                    v-model="editedItem.statusType"
                    :items="[ 'Оплачен', 'Ожидание']"
                    label="Статус"
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="editedItem.debtReport"
                    label="Оплата"
                    dense
                    outlined
                    aria-required="true"
                    numeric
                  ></v-text-field>
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
      <v-dialog
        v-model="dialogDelete"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5">
            Вы уверены что хотите удалить?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="closeDelete"
            >
              Отмена
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="deleteItemConfirm"
            >
              Да
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.statusType="item">
        {{ item.item.statusType | status }}
    </template>
    <template v-slot:item.actions="item">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item.item, item.index + 1)"
      >
        {{ icons.mdiPencil }}
      </v-icon>
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
  name: 'TableClients',
  props: {
    data: Array,
    fields: Array,
    getDispatch: String,
    putDispatch: String,
    postDispatch: String,
    editItems: Object,
  },
  data: () => ({
    icons: { mdiDelete, mdiPencil },
    dialog: false,
    dialogDelete: false,
    headers: [],
    desserts: [],
    editedIndex: -1,
    currentDept: '',
    editedItem: {
      comment: '',
      statusType: '',
      debtReport: '',
    },
    items: [
      {
        Неплательщик: 'DEFAULTER',
      },
      {
        Истекший: 'EXPIRED',
      },
      {
        Оплачен: 'DONE',
      },
      {
        Задержан: 'DELAY',
      },
      {
        Ожидание: 'WAIT',
      },
    ],
  }),
  computed: {
    header() {
      // eslint-disable-next-line no-return-assign,vue/no-side-effects-in-computed-properties
      return this.headers = this.$props.fields
    },
  },

  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete()
    },
  },

  created() {
    // eslint-disable-next-line array-callback-return
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = this.$props.data
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      this.currentDept = this.editedItem.debtReport
      this.editedItem.debtReport = ''
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },
    isAN(value) {
      if (value instanceof Number)
      // eslint-disable-next-line no-param-reassign,brace-style
      { value = value.valueOf() }

      // eslint-disable-next-line no-restricted-globals
      return isFinite(value) && value === parseInt(value, 10)
    },
    save() {
      const regexp = /[а-яё]/i
      // eslint-disable-next-line no-restricted-globals
      if (regexp.test(this.editedItem.statusType) && !isNaN(Number(this.editedItem.debtReport))) {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          const localSelect = this.items.filter(item => item[this.editedItem.statusType]) // нахожу нужный элемент из массива
          const CurrentSelect = Object.values(localSelect[0]) // получаю только его значение
          const creditData = Object.assign(this.desserts[this.editedIndex], this.editedItem)
          const data = {
            comment: creditData.comment,
            debt: creditData.debt,
            id: creditData.id,
            debtReport: Number(creditData.debtReport),
            payDate: creditData.payDate,
            statusType: CurrentSelect[0],
          }
          this.$store.dispatch('putCreditInformation', data).then(() => {
            // Number(this.editedItem.debtReport) + this.currentDept
            // Object.assign(this.desserts[this.editedIndex], this.editedItem)
            this.close()
          })
        } else {
          this.desserts.push(this.editedItem)
        }
      } else {
        this.$store.commit('setSnackbars', 'Выберите статус и пишите сумму оплаты')
      }
    },
  },
}
</script>

<style scoped>

</style>
