<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.xs"
    v-model="dialog"
    max-width="950px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        Изменить профиль
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Изменение профиля
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="editedItem.fullName"
              label="ФИО"
              required
              @input="$v.editedItem.fullName.$touch()"
              @blur="$v.editedItem.fullName.$touch()"
              :error-messages="nameErrors"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="editedItem.phone"
              label="Телефон"
              required
              @input="$v.editedItem.phone.$touch()"
              @blur="$v.editedItem.phone.$touch()"
              :error-messages="phoneError"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="editedItem.phoneSecond"
              label="Телефон"
              required
              @input="$v.editedItem.phoneSecond.$touch()"
              @blur="$v.editedItem.phoneSecond.$touch()"
              :error-messages="phoneSecondError"
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Закрыть
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="save"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, numeric, maxLength } from 'vuelidate/lib/validators'

export default {
  props: ['data'],
  name: 'EditProfile',
  mixins: [validationMixin],
  validations: {
    editedItem: {
      fullName: {required, minLength: minLength(10)},
      phone: {required, numeric},
      phoneSecond: {required, numeric},
    },
  },
  data: () => ({
    dialog: false,
    menu: false,
    manu1: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    editedItem: {
      id: '',
      fullName: '',
      phone: '',
      phoneSecond: '',
    },
    defaultItem: {
      id: '',
      fullName: '',
      phoneSecond: '',
    },
  }),
  computed: {
    datas() {
      return this.$props.data
    },
    nameErrors () {
      const errors = []
      if (!this.$v.editedItem.fullName.$dirty) return errors
      !this.$v.editedItem.fullName.minLength && errors.push('Это поле не должно быть меньше 10. Сейчас ' + this.editedItem.fullName.length)
      !this.$v.editedItem.fullName.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    phoneError () {
      const errors = []
      if (!this.$v.editedItem.phone.$dirty) return errors
      !this.$v.editedItem.phone.numeric && errors.push('Только цифры')
      !this.$v.editedItem.phone.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    phoneSecondError () {
      const errors = []
      if (!this.$v.editedItem.phoneSecond.$dirty) return errors
      !this.$v.editedItem.phoneSecond.numeric && errors.push('Только цифры')
      !this.$v.editedItem.phoneSecond.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
  },
  watch: {
    datas() {
      this.editedItem = { ...this.$props.data }
    },
  },
  methods: {
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
      })
    },
    save() {
      this.$store.dispatch('editProfile', this.editedItem)
        .then(() => {
          this.$emit('save', this.editedItem)
          this.$store.commit('setSnackbars', 'Успешно изменено')
          this.close()
        })
        .catch(e => this.$store.commit('setSnackbars', e.message))
    },
  },
}
</script>

<style scoped>

</style>
