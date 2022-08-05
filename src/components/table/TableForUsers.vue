<template>
  <v-data-table
    :headers="header"
    :items="desserts"
    class="elevation-1"
    item-key="user"
  >
    <template v-slot:top="item">
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Изменение</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                >
                  <v-text-field
                    v-model="editedItem.username"
                    label="Логин"
                    required
                    dense
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                >
                  <v-text-field
                    v-model="editedItem.password"
                    label="Пароль"
                    dense
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                >
                  <v-text-field
                    v-model="editedItem.phoneNumber"
                    label="Номер"
                    dense
                    outlined
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
    </template>
    <template v-slot:item.status="item">
     {{item.item.status | status}}
    </template>
    <template v-slot:item.date="item">
      {{item.item.date | date}}
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
// import { required, minLength } from 'vuelidate/lib/validators'
import {mdiDelete, mdiPencil} from "@mdi/js";

export default {
  props: {
    data: Array,
    fields: Array,
    putDispatch: String,
    editItems: Object
  },
  // validations: {
  //   USER: {
  //     username: {required, minLength: minLength(5)},
  //     password: {required, minLength: minLength(5)},
  //     phoneNumber: {required},
  //   },
  // },
  name: "TableForUsers",
  components: {
  },
  data: () => ({
    statusType: 0,
    icons: {mdiDelete, mdiPencil},
    dialog: false,
    dialogDelete: false,
    headers: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {},
  }),
  computed: {
    header() {
      this.initialize()
      this.editedItem.password = ''
      return this.headers = this.$props.fields
    },
    // nameErrors () {
    //   const errors = []
    //   if (!this.$v.USER.username.$dirty) return errors
    //   !this.$v.USER.username.minLength && errors.push('Это поле не должно быть меньше 5. Сейчас ' + this.USER.username.length)
    //   !this.$v.USER.username.required && errors.push('Поле не должно быть пустым.')
    //   return errors
    // },
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


    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },


    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        const users = Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.$store.dispatch(this.$props.putDispatch, users)
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
