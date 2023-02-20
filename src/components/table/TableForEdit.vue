<template>
  <v-data-table
    :headers="header"
    :items="desserts"
    class="elevation-1"
    item-key="name"
  >
    <template v-slot:top="item">
      <v-dialog
        v-model="dialog"
        max-width="800px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Обзвон</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="8"
                >
                  <more-info :detailData="detailData"></more-info>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  class="d-flex flex-column align-content-center"
                >
                  <v-select
                    :items="['Истекший', 'Ожидание']"
                    v-model="editedItem.statusType"
                    @change="editSelect = true"
                    label="Статус"
                    dense
                    outlined
                  ></v-select>
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.payDate"
                        label="Дата продления"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.payDate"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
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
    <template v-slot:item.comment="item" >
      {{ item.value }}
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
// eslint-disable-next-line import/extensions
import MoreInfo from '@/components/modules/MoreInfo'

export default {
  props: {
    data: Array,
    fields: Array,
    putDispatch: String,
    editItems: Object,
  },
  name: 'TableForEdit',
  components: {
    MoreInfo,
  },
  data: () => ({
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    editSelect: false,
    statusType: 0,
    icons: { mdiDelete, mdiPencil },
    dialog: false,
    dialogDelete: false,
    headers: [],
    desserts: [],
    detailData: [],
    editedIndex: -1,
    editedItem: {},
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
      },
    ],
  }),
  computed: {
    header() {
      this.initialize()
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties,no-return-assign
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
    this.editItems = this.$props.editItems
  },
  methods: {
    initialize() {
      this.desserts = this.$props.data
    },
    editItem(item) {
      const data = this.$store.dispatch('getBrothersById', item.id)
      // eslint-disable-next-line no-return-assign,prefer-destructuring
      data.then(r => this.detailData = r[0])
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        const localSelect = this.items.filter(item => item[this.editedItem.statusType])
        let CurrentSelect = []
        if (this.editSelect) {
          CurrentSelect = Object.values(localSelect[0])
        } else {
          CurrentSelect = ['WAIT']
        }
        const creditData = Object.assign(this.desserts[this.editedIndex], this.editedItem)
        const data = {
          comment: creditData.comment,
          debt: creditData.debt,
          id: creditData.mcId,
          payDate: creditData.payDate,
          statusType: CurrentSelect[0],
        }
        this.$store.dispatch('putCreditInformation', data)
        this.$emit('update')
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
