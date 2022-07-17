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
                      :items="[ 'Оплачен', 'Ожидание']"
                      v-model="editedItem.statusType"
                      label="Статус"
                      dense
                      outlined
                    ></v-select>
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
    <template v-slot:item.actions="item">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item.item, item.index + 1)"
      >
        {{ icons.mdiPencil }}
      </v-icon>
<!--      <v-icon-->
<!--        small-->
<!--        @click="deleteItem(item.item)"-->
<!--      >-->
<!--        {{ icons.mdiDelete }}-->
<!--      </v-icon>-->
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
import {mdiDelete, mdiPencil} from "@mdi/js";

export default {
  props: {
    data: Array,
    fields: Array,
    getDispatch: String,
    putDispatch: String,
    postDispatch: String,
    editItems: Object
  },
  name: "TableClients",
  data: () => ({
    icons: {mdiDelete, mdiPencil},
    // status: [false, false, false],
    dialog: false,
    dialogDelete: false,
    headers: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {},
    items: [
      {
        Неплательщик: 'DEFAULTER'
      },
      {
        Истекший: 'EXPIRED'
      },
      {
        Оплачен: 'DONE'
      },
      {
        Задержан: 'DELAY'
      },
      {
        Ожидание: 'WAIT'
      }
    ],
    itemsEn: [
      {
        DEFAULTER: 'Неплательщик',
      },
      {
        EXPIRED: 'Истекший',
      },
      {
        DONE: 'Оплачен',
      },
      {
        DELAY: 'Задержан',
      },
      {
        WAIT: 'Ожидание',
      }
    ],
  }),
  computed: {
    header() {
      return this.headers = this.$props.fields
    },
    status: {
      get: function (value) {
        const localSelect = this.itemsEn.filter((item) => item[value]) // нахожу нужный элемент из массива
        const CurrentSelect = Object.values(localSelect[0]) // получаю только его значение
        return CurrentSelect[0]
      },
      // сеттер:
      set: function (newValue) {
        const localSelect = this.items.filter((item) => item[newValue]) // нахожу нужный элемент из массива
        const CurrentSelect = Object.values(localSelect[0]) // получаю только его значение
       return CurrentSelect[0]
      }
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.editItems = this.$props.editItems
    this.initialize()

  },

  methods: {
    initialize () {
      this.desserts = this.$props.data
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        const localSelect = this.items.filter((item) => item[this.editedItem.statusType]) // нахожу нужный элемент из массива
        const CurrentSelect = Object.values(localSelect[0]) // получаю только его значение
        const creditData = Object.assign(this.desserts[this.editedIndex], this.editedItem)
        const data = {
          comment: creditData.comment,
          debt: creditData.debt,
          id: creditData.id,
          payDate: creditData.payDate,
          statusType: CurrentSelect[0]
        }
        this.$store.dispatch('putCreditInformation', data)
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
