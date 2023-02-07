<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <h2>Профиль</h2>
    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="account.fullName"
              label="ФИО"
              required
              :error-messages="nameErrors"
              dense
              outlined
              @input="$v.account.fullName.$touch()"
              @blur="$v.account.fullName.$touch()"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="account.profileNumber"
              dense
              label="Код клиента"
              outlined
              required
              :error-messages="profileNumberError"
              @input="$v.account.profileNumber.$touch()"
              @blur="$v.account.profileNumber.$touch()"
            ></v-text-field>
          </v-col>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="account.phone"
              label="Телефон"
              required
              :error-messages="phoneError"
              dense
              outlined
              @input="$v.account.phone.$touch()"
              @blur="$v.account.phone.$touch()"
            ></v-text-field>
          </v-col>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="account.phoneSecond"
              label="Второй номер"
              required
              :error-messages="secondPhoneError"
              dense
              outlined
              @input="$v.account.phoneSecond.$touch()"
              @blur="$v.account.phoneSecond.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              color="primary"
              class="me-3 mt-4"
              :loading="loading"
              :disabled="loading"
              @click="save()"
            >
              Сохранить
            </v-btn>
            <v-btn
              color="secondary"
              outlined
              class="mt-4"
              type="reset"
              @click.prevent="resetForm"
            >
              Отмена
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'
import { validationMixin } from 'vuelidate'
import {
  required, minLength, numeric, maxLength,
} from 'vuelidate/lib/validators'
import { getObject1, removeObject1, setObject1 } from '@/helpers/helpers'
import axios from 'axios'

export default {
  name: 'Form1',
  mixins: [validationMixin],
  props: ['nextFunction'],
  validations: {
    account: {
      fullName: { required, minLength: minLength(10) },
      phone: { required, minLength: minLength(7), maxlength: maxLength(50) },
      phoneSecond: { required, minLength: minLength(7), maxlength: maxLength(50) },
      profileNumber: { required, minLength: minLength(1), maxLength: maxLength(20) },
    },
  },
  data: () => ({
    loading: false,
    account: {
      fullName: '',
      phone: '',
      phoneSecond: '',
      delete: false,
      profileNumber: '',
    },
    menu2: false,
    icons: {
      mdiAlertOutline,
      mdiCloudUploadOutline,
    },

  }),
  mounted() {
    setTimeout(() => {
      if (getObject1() !== null) {
        this.account = getObject1()
        return
      }
      this.account = {
        fullName: '',
        phone: '',
        phoneSecond: '',
        delete: false,
        profileNumber: '',
      }
    }, 0)
  },
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.account.fullName.$dirty) return errors
      !this.$v.account.fullName.minLength && errors.push(`Это поле не должно быть меньше 10. Сейчас ${this.account.fullName.length}`)
      !this.$v.account.fullName.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    phoneError() {
      const errors = []
      if (!this.$v.account.phone.$dirty) return errors
      !this.$v.account.phone.required && errors.push('Поле не должно быть пустым.')
      !this.$v.account.phone.minLength && errors.push('Поле не должно быть меньше 7.')
      !this.$v.account.phone.maxlength && errors.push('Поле не должно быть больше 60.')
      return errors
    },
    secondPhoneError() {
      const errors = []
      if (!this.$v.account.phoneSecond.$dirty) return errors
      !this.$v.account.phoneSecond.required && errors.push('Поле не должно быть пустым.')
      !this.$v.account.phoneSecond.minLength && errors.push('Поле не должно быть меньше 7.')
      !this.$v.account.phoneSecond.maxlength && errors.push('Поле не должно быть больше 60.')
      return errors
    },
    profileNumberError() {
      const errors = []
      if (!this.$v.account.profileNumber.$dirty) return errors
      !this.$v.account.profileNumber.required && errors.push('Поле не должно быть пустым.')
      !this.$v.account.profileNumber.minLength && errors.push(`Это поле не должно быть меньше 1. Сейчас ${this.account.profileNumber.length}`)
      !this.$v.account.profileNumber.maxLength && errors.push(`Это поле не должно быть больше 20. Сейчас ${this.account.profileNumber.length}`)
      return errors
    },
  },
  watch: {
    account: {
      handler(val) {
        if (val === null) {
          setObject1(this.account)
          return
        }
        setObject1(val)
      },
      deep: true,
    },
  },
  methods: {
    save() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.loading = true
      this.$store.dispatch('postForm1', this.account)
        .then(data => {
          if (data.id === undefined) {
            this.$store.commit('setError', 'Ошибка! Проверьте интернет')
            this.loading = false
            return
          }
          removeObject1()
          this.loading = false
          this.$emit('next')
        })
    },
    resetForm() {
      this.account = {
        fullName: '',
        phone: '',
        phoneSecond: '',
        delete: false,
        profileNumber: '',
      }
    },
  },
}
</script>

<style scoped>
.v-input__prepend-outer {
  display: none !important;
}
</style>
