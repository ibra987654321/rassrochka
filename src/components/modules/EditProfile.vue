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
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="editedItem.factAddress"
              label="Адрес проживания"
              dense
              required
              @input="$v.editedItem.factAddress.$touch()"
              @blur="$v.editedItem.factAddress.$touch()"
              :error-messages="factAddressError"
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="editedItem.passportSeries"
              dense
              label="Серия паспорта"
              outlined
              required
              @input="$v.editedItem.passportSeries.$touch()"
              @blur="$v.editedItem.passportSeries.$touch()"
              :error-messages="passportSeriesError"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="editedItem.passportInn"
              dense
              label="ИНН"
              outlined
              required
              @input="$v.editedItem.passportInn.$touch()"
              @blur="$v.editedItem.passportInn.$touch()"
              :error-messages="passportInnError"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="editedItem.passportAddress"
              dense
              outlined
              label="Адрес по паспорту"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="editedItem.passportDepartment"
              dense
              outlined
              label="Орган выдавший паспорт"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="editedItem.workAddress"
              dense
              outlined
              label="Место работы"
              required
              @input="$v.editedItem.workAddress.$touch()"
              @blur="$v.editedItem.workAddress.$touch()"
              :error-messages="workAddressError"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
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
                  v-model="editedItem.passportDate"
                  label="Дата выдачи паспорта"
                  readonly
                  dense
                  outlined
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editedItem.passportDate"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="save"
        >
          Сохранить
        </v-btn>
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
      factAddress: {required, minLength: minLength(5)},
      passportSeries: {required, minLength: minLength(5), maxLength: maxLength(15)},
      passportInn: {required, minLength: minLength(14), maxLength: maxLength(14)},
      workAddress: {required, minLength: minLength(5)},
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
      birthday: '',
      factAddress: '',
      passportAddress: '',
      passportDate: '',
      passportDepartment: '',
      passportInn: '',
      passportSeries: '',
      phone: '',
      workAddress: '',
    },
    defaultItem: {
      id: '',
      fullName: '',
      birthday: '',
      factAddress: '',
      passportAddress: '',
      passportDate: '',
      passportDepartment: '',
      passportInn: '',
      passportSeries: '',
      phone: '',
      workAddress: '',
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
    factAddressError () {
      const errors = []
      if (!this.$v.editedItem.factAddress.$dirty) return errors
      !this.$v.editedItem.factAddress.minLength && errors.push('Это поле нe должно быть меньше 5. Сейчас ' + this.editedItem.factAddress.length)
      !this.$v.editedItem.factAddress.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    passportSeriesError () {
      const errors = []
      if (!this.$v.editedItem.passportSeries.$dirty) return errors
      !this.$v.editedItem.passportSeries.minLength && errors.push('Это поле нe должно быть меньше 5. Сейчас ' + this.editedItem.passportSeries.length)
      !this.$v.editedItem.passportSeries.maxLength && errors.push('Это поле нe должно быть больше 15. Сейчас ' + this.editedItem.passportSeries.length)
      !this.$v.editedItem.passportSeries.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    passportInnError () {
      const errors = []
      if (!this.$v.editedItem.passportInn.$dirty) return errors
      !this.$v.editedItem.passportInn.minLength && errors.push('Это поле нe должно быть меньше 14. Сейчас ' + this.editedItem.passportInn.length)
      !this.$v.editedItem.passportInn.maxLength && errors.push('Это поле нe должно быть больше 14. Сейчас ' + this.editedItem.passportInn.length)
      !this.$v.editedItem.passportInn.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    workAddressError () {
      const errors = []
      if (!this.$v.editedItem.workAddress.$dirty) return errors
      !this.$v.editedItem.workAddress.minLength && errors.push('Это поле нe должно быть меньше 5. Сейчас ' + this.editedItem.workAddress.length)
      !this.$v.editedItem.workAddress.required && errors.push('Поле не должно быть пустым.')
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
          this.close()
        })
        .catch(e => this.$store.commit('setSnackbars', e.message))
    },
  },
}
</script>

<style scoped>

</style>
