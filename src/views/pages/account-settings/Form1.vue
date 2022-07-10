<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
<!--    <v-card-text class="d-flex">-->
<!--      <v-avatar-->
<!--        rounded-->
<!--        size="120"-->
<!--        class="me-6"-->
<!--      >-->
<!--        <v-img :src="account.avatarImg"></v-img>-->
<!--      </v-avatar>-->

<!--      &lt;!&ndash; upload photo &ndash;&gt;-->
<!--      <div>-->
<!--        <v-btn-->
<!--          color="primary"-->
<!--          class="me-3 mt-5"-->
<!--          @click="$refs.refInputEl.click()"-->
<!--        >-->
<!--          <v-icon class="d-sm-none">-->
<!--            {{ icons.mdiCloudUploadOutline }}-->
<!--          </v-icon>-->
<!--          <span class="d-none d-sm-block">Upload new photo</span>-->
<!--        </v-btn>-->

<!--        <input-->
<!--          ref="refInputEl"-->
<!--          type="file"-->
<!--          accept=".jpeg,.png,.jpg,GIF"-->
<!--          :hidden="true"-->
<!--        />-->

<!--        <v-btn-->
<!--          color="error"-->
<!--          outlined-->
<!--          class="mt-5"-->
<!--        >-->
<!--          Reset-->
<!--        </v-btn>-->
<!--        <p class="text-sm mt-5">-->
<!--          Allowed JPG, GIF or PNG. Max size of 800K-->
<!--        </p>-->
<!--      </div>-->
<!--    </v-card-text>-->
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
              @input="$v.account.fullName.$touch()"
              @blur="$v.account.fullName.$touch()"
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
              v-model="account.phone"
              label="Телефон"
              required
              @input="$v.account.phone.$touch()"
              @blur="$v.account.phone.$touch()"
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
              v-model="account.factAddress"
              label="Адресс прожвания"
              dense
              required
              @input="$v.account.factAddress.$touch()"
              @blur="$v.account.factAddress.$touch()"
              :error-messages="factAddressError"
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="account.passportSeries"
              dense
              label="Серия паспорта"
              outlined
              required
              @input="$v.account.passportSeries.$touch()"
              @blur="$v.account.passportSeries.$touch()"
              :error-messages="passportSeriesError"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="account.passportInn"
              dense
              label="ИНН"
              outlined
              required
              @input="$v.account.passportInn.$touch()"
              @blur="$v.account.passportInn.$touch()"
              :error-messages="passportInnError"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="account.passportAddress"
              dense
              outlined
              label="Адресс по паспорту"
              required
              @input="$v.account.passportAddress.$touch()"
              @blur="$v.account.passportAddress.$touch()"
              :error-messages="passportAddressError"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="account.passportDepartment"
              dense
              outlined
              label="Орган выдавший паспорт"
              required
              @input="$v.account.passportDepartment.$touch()"
              @blur="$v.account.passportDepartment.$touch()"
              :error-messages="passportDepartmentError"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="account.workAddress"
              dense
              outlined
              label="Место работы"
              required
              @input="$v.account.workAddress.$touch()"
              @blur="$v.account.workAddress.$touch()"
              :error-messages="workAddressError"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="account.passportDate"
                  label="Дата выдачи "
                  readonly
                  dense
                  outlined
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="account.passportDate"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <!-- alert -->
          <v-col cols="12">
            <v-alert
              color="warning"
              text
              class="mb-0"
            >
              <div class="d-flex align-start">
                <v-icon color="warning">
                  {{ icons.mdiAlertOutline }}
                </v-icon>

                <div class="ms-3">
                  <p class="text-base font-weight-medium mb-1">
                    Заполните все поля
                  </p>
                  <a
                    href="javascript:void(0)"
                    class="text-decoration-none warning--text"
                  >
                    <span class="text-sm">Resend Confirmation</span>
                  </a>
                </div>
              </div>
            </v-alert>
          </v-col>

          <v-col cols="12">
            <v-btn
              color="primary"
              class="me-3 mt-4"
              :disabled="$v.$invalid"
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
import {mdiAlertOutline, mdiCloudUploadOutline} from "@mdi/js";
import { validationMixin } from 'vuelidate'
import { required, minLength, numeric, maxLength } from 'vuelidate/lib/validators'


export default {
  name: "Form1",
  props: ['nextFunction'],
  mixins: [validationMixin],
  validations: {
    account: {
      fullName: {required, minLength: minLength(10)},
      phone: {required, numeric},
      factAddress: {required, minLength: minLength(5)},
      passportSeries: {required, minLength: minLength(5), maxLength: maxLength(15)},
      passportInn: {required, minLength: minLength(14), maxLength: maxLength(14)},
      passportAddress: {required, minLength: minLength(5)},
      passportDepartment: {required, minLength: minLength(5)},
      workAddress: {required, minLength: minLength(5)},
    },
  },
  data:() => ({
    account: {
      fullName: '',
      phone: '',
      factAddress: '',
      passportSeries: '',
      passportInn: '',
      passportAddress: '',
      passportDepartment: '',
      workAddress: '',
      passportDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    },
    menu2: false,
    icons: {
      mdiAlertOutline,
      mdiCloudUploadOutline,
    },

  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.account.fullName.$dirty) return errors
      !this.$v.account.fullName.minLength && errors.push('Это поле не должно быть меньше 10. Сейчас ' + this.account.fullName.length)
      !this.$v.account.fullName.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    phoneError () {
      const errors = []
      if (!this.$v.account.phone.$dirty) return errors
      !this.$v.account.phone.numeric && errors.push('Только цифры')
      !this.$v.account.phone.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    factAddressError () {
      const errors = []
      if (!this.$v.account.factAddress.$dirty) return errors
      !this.$v.account.factAddress.minLength && errors.push('Это поле нe должно быть меньше 5. Сейчас ' + this.account.factAddress.length)
      !this.$v.account.factAddress.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    passportSeriesError () {
      const errors = []
      if (!this.$v.account.passportSeries.$dirty) return errors
      !this.$v.account.passportSeries.minLength && errors.push('Это поле нe должно быть меньше 5. Сейчас ' + this.account.passportSeries.length)
      !this.$v.account.passportSeries.maxLength && errors.push('Это поле нe должно быть больше 15. Сейчас ' + this.account.passportSeries.length)
      !this.$v.account.passportSeries.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    passportInnError () {
      const errors = []
      if (!this.$v.account.passportInn.$dirty) return errors
      !this.$v.account.passportInn.minLength && errors.push('Это поле нe должно быть меньше 14. Сейчас ' + this.account.passportInn.length)
      !this.$v.account.passportInn.maxLength && errors.push('Это поле нe должно быть больше 14. Сейчас ' + this.account.passportInn.length)
      !this.$v.account.passportInn.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    passportAddressError () {
      const errors = []
      if (!this.$v.account.passportAddress.$dirty) return errors
      !this.$v.account.passportAddress.minLength && errors.push('Это поле нe должно быть меньше 5. Сейчас ' + this.account.passportAddress.length)
      !this.$v.account.passportAddress.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    passportDepartmentError () {
      const errors = []
      if (!this.$v.account.passportDepartment.$dirty) return errors
      !this.$v.account.passportDepartment.minLength && errors.push('Это поле нe должно быть меньше 5. Сейчас ' + this.account.passportDepartment.length)
      !this.$v.account.passportDepartment.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    workAddressError () {
      const errors = []
      if (!this.$v.account.workAddress.$dirty) return errors
      !this.$v.account.workAddress.minLength && errors.push('Это поле нe должно быть меньше 5. Сейчас ' + this.account.workAddress.length)
      !this.$v.account.workAddress.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
  },
  mounted() {
  },
  methods: {
    save() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.$store.dispatch('postForm1', this.account)
      this.$emit('next')
    },
    resetForm() {
      this.account = {
        fullName: '',
        phone: '',
        factAddress: '',
        passportSeries: '',
        passportInn: '',
        passportAddress: '',
        passportDepartment: '',
        passportDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      }
    }
  },
}
</script>

<style scoped>
.v-input__prepend-outer {
  display: none !important;
}
</style>
