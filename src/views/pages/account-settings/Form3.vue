<template>
  <v-card
    flat
  >
    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="zeroPayment"
              dense
              label="Первоначальный взнос"
              outlined
              required
              @input="$v.zeroPayment.$touch()"
              @blur="$v.zeroPayment.$touch()"
              :error-messages="zeroPaymentError"
            ></v-text-field>
          </v-col>
          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
            <v-select
              v-model="selectedMonth"
              :items="[1,2,3,4,5,6]"
              label="Месяцы"
              dense
              outlined
              @input="$v.selectedMonth.$touch()"
              @change="$v.selectedMonth.$touch()"
              :error-messages="selectedMonthError"
            ></v-select>
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
import { validationMixin } from 'vuelidate'
import {
  required, numeric,
} from 'vuelidate/lib/validators'

export default {
  name: 'Form3',
  mixins: [validationMixin],
  validations: {
    zeroPayment: { required, numeric },
    selectedMonth: { required },
  },

  data: () => ({
    zeroPayment: '',
    selectedMonth: '',
    dateRange: [],
  }),
  computed: {
    zeroPaymentError() {
      const errors = []
      if (!this.$v.zeroPayment.$dirty) return errors
      !this.$v.zeroPayment.numeric && errors.push('Только цифры')
      !this.$v.zeroPayment.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    selectedMonthError() {
      const errors = []
      if (!this.$v.selectedMonth.$dirty) return errors
      !this.$v.selectedMonth.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
  },
  methods: {
    save() {
      // this.device.profileId = this.$store.state.profiles.profileId.id
      // this.$store.dispatch('postForm3', this.device)
      this.countMonth(this.selectedMonth)
      console.log(this.dateRange)
    },
    countMonth(count) {
      // eslint-disable-next-line for-direction,no-plusplus,no-empty
      for (let i = 1; i <= count; i++) {
        const date = new Date(Date.now())
        const obj = {
          statusType: 'DEFAULTER',
          registrationDate: new Date(Date.now()).toISOString(),
          countMonth: i,
          payDate: new Date(date.setMonth(date.getMonth() + i)).toISOString().slice(0, 10),
        }
        this.dateRange.push(obj)
      }
    },
    resetForm() {
      this.zeroPayment = ''
      this.selectedMonth = ''
    },
  },
}
</script>

<style scoped>

</style>
