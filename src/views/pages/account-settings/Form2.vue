<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="device.deviceImei"
              label="IMEI"
              required
              :error-messages="ImeiError"
              dense
              outlined
              @input="$v.device.deviceImei.$touch()"
              @blur="$v.device.deviceImei.$touch()"
            ></v-text-field>
          </v-col>

          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="device.deviceModel"
              label="Марка и модель телефона "
              required
              :error-messages="ModelError"
              dense
              outlined
              @input="$v.device.deviceModel.$touch()"
              @blur="$v.device.deviceModel.$touch()"
            ></v-text-field>
          </v-col>

          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
            <v-select
              v-model="device.deviceMemory"
              :items="items"
              label="Память телефона"
              required
              :error-messages="MemoryErrors"
              dense
              outlined
              @input="$v.device.deviceMemory.$touch()"
              @blur="$v.device.deviceMemory.$touch()"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="device.devicePrice"
              label="Цена телефона"
              required
              :error-messages="PriceError"
              dense
              outlined
              @input="$v.device.devicePrice.$touch()"
              @blur="$v.device.devicePrice.$touch()"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="device.cloudLogin"
              label="Логин аккаунта"
              required
              :error-messages="loginError"
              dense
              outlined
              @input="$v.device.cloudLogin.$touch()"
              @blur="$v.device.cloudLogin.$touch()"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="device.cloudPass"
              label="Пароль аккаунта"
              required
              :error-messages="PassError"
              dense
              outlined
              @input="$v.device.cloudPass.$touch()"
              @blur="$v.device.cloudPass.$touch()"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="device.zeroPayment"
              dense
              label="Первоначальный взнос"
              outlined
              required
              :error-messages="zeroPaymentError"
              @input="$v.device.zeroPayment.$touch()"
              @blur="$v.device.zeroPayment.$touch()"
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
              :error-messages="selectedMonthError"
              @input="$v.selectedMonth.$touch()"
              @change="$v.selectedMonth.$touch()"
            ></v-select>
          </v-col>
          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
            <v-select
              v-model="device.paymentType"
              :items="$store.state.paymentType"
              label="Способ оплаты"
              dense
              outlined
              :error-messages="paymentTypeError"
              @input="$v.device.paymentType.$touch()"
              @change="$v.device.paymentType.$touch()"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="device.allowance"
              dense
              label="Ежемесячный платеж"
              outlined
              required
              :error-messages="allowanceError"
              @input="$v.device.allowance.$touch()"
              @blur="$v.device.allowance.$touch()"
            ></v-text-field>
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
  required, minLength, numeric, maxLength,
} from 'vuelidate/lib/validators'
import {
  getObject2, getProfileId, removeObject2, setObject2,
} from '@/helpers/helpers'

export default {
  name: 'Form3',
  mixins: [validationMixin],
  validations: {
    device: {
      deviceImei: {
        required, numeric, minLength: minLength(12), maxLength: maxLength(20),
      },
      deviceMemory: { required, minLength: minLength(2) },
      deviceModel: { required, minLength: minLength(3) },
      devicePrice: { required, numeric, minLength: minLength(3) },
      cloudLogin: { required, minLength: minLength(3) },
      cloudPass: { required, minLength: minLength(3) },
      paymentType: { required },
      zeroPayment: { required, numeric },
      allowance: { required, numeric },
    },
    selectedMonth: { required },
  },

  // device: {
  //   deviceImei: '123287382730',
  //   deviceMemory: '128гб',
  //   deviceModel: 'Samsung s10',
  //   devicePrice: '40000',
  //   cloudLogin: 'login',
  //   cloudPass: '123456',
  //   profileId: '',
  // },
  data: () => ({
    device: {
      deviceImei: '',
      deviceMemory: '',
      deviceModel: '',
      devicePrice: '',
      cloudLogin: '',
      cloudPass: '',
      profileId: '',
      zeroPayment: '',
      paymentType: '',
      allowance: '',
      monthCreditDbList: [],
    },
    selectedMonth: '',
    items: ['4гб', '8гб', '16гб', '32гб', '64гб', '128гб', '256гб', '512гб', '1тб'],
  }),
  computed: {
    doneCard() {
      return this.$store.state.profiles.doneCard
    },
    MemoryErrors() {
      const errors = []
      if (!this.$v.device.deviceMemory.$dirty) return errors
      !this.$v.device.deviceMemory.minLength && errors.push(`Это поле не должно быть меньше 2. Сейчас ${this.device.deviceMemory.length}`)
      !this.$v.device.deviceMemory.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    ImeiError() {
      const errors = []
      if (!this.$v.device.deviceImei.$dirty) return errors
      !this.$v.device.deviceImei.numeric && errors.push('Только цифры')
      !this.$v.device.deviceImei.minLength && errors.push(`Это поле не должно быть меньше 12. Сейчас ${this.device.deviceImei.length}`)
      !this.$v.device.deviceImei.maxLength && errors.push(`Это поле нe должно быть больше 20. Сейчас ${this.device.deviceImei.length}`)
      !this.$v.device.deviceImei.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    ModelError() {
      const errors = []
      if (!this.$v.device.deviceModel.$dirty) return errors
      !this.$v.device.deviceModel.minLength && errors.push(`Это поле не должно быть меньше 3. Сейчас ${this.device.deviceModel.length}`)
      !this.$v.device.deviceModel.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    PriceError() {
      const errors = []
      if (!this.$v.device.devicePrice.$dirty) return errors
      !this.$v.device.devicePrice.numeric && errors.push('Только цифры')
      !this.$v.device.devicePrice.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    loginError() {
      const errors = []
      if (!this.$v.device.cloudLogin.$dirty) return errors
      !this.$v.device.cloudLogin.minLength && errors.push(`Это поле не должно быть меньше 3. Сейчас ${this.device.cloudLogin.length}`)
      !this.$v.device.cloudLogin.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    PassError() {
      const errors = []
      if (!this.$v.device.cloudPass.$dirty) return errors
      !this.$v.device.cloudPass.minLength && errors.push(`Это поле не должно быть меньше 3. Сейчас ${this.device.cloudPass.length}`)
      !this.$v.device.cloudPass.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    paymentTypeError() {
      const errors = []
      if (!this.$v.device.paymentType.$dirty) return errors
      !this.$v.device.paymentType.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    zeroPaymentError() {
      const errors = []
      if (!this.$v.device.zeroPayment.$dirty) return errors
      !this.$v.device.zeroPayment.numeric && errors.push('Только цифры')
      !this.$v.device.zeroPayment.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    selectedMonthError() {
      const errors = []
      if (!this.$v.selectedMonth.$dirty) return errors
      !this.$v.selectedMonth.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    allowanceError() {
      const errors = []
      if (!this.$v.device.allowance.$dirty) return errors
      !this.$v.device.allowance.required && errors.push('Поле не должно быть пустым.')
      !this.$v.device.allowance.numeric && errors.push('Только цифры')
      return errors
    },
  },
  watch: {
    device: {
      handler(val) {
        if (val === null) {
          setObject2(this.device)
          return
        }
        setObject2(val)
      },
      deep: true,
    },
  },
  mounted() {
    setTimeout(() => {
      if (getObject2() !== null) {
        this.device = getObject2()
        return
      }
      this.device = {
        deviceImei: '',
        deviceMemory: '',
        deviceModel: '',
        devicePrice: 0,
        cloudLogin: '',
        cloudPass: '',
        profileId: '',
        zeroPayment: '',
        paymentType: '',
        allowance: '',
        monthCreditDbList: [],
      }
    }, 0)
  },
  methods: {
    save() {
      this.device.profileId = getProfileId()
      this.countMonth(this.selectedMonth)
      this.device.devicePrice = Number(this.device.devicePrice)
      this.device.zeroPayment = Number(this.device.zeroPayment)
      this.$store.dispatch('postForm3', this.device)
      this.$emit('next')
      removeObject2()
    },
    countMonth(count) {
      for (let i = 1; i <= count; i++) {
        const date = new Date(Date.now())
        const obj = {
          statusType: 'WAIT',
          registrationDate: new Date(Date.now()).toISOString(),
          countMonth: i,
          debt: this.device.allowance,
          payDate: new Date(date.setMonth(date.getMonth() + i)).toISOString().slice(0, 10),
        }
        this.device.monthCreditDbList.unshift(obj)
      }
    },
    resetForm() {
      this.device = {
        deviceImei: '',
        deviceMemory: '',
        deviceModel: '',
        devicePrice: '',
        cloudLogin: '',
        cloudPass: '',
        profileId: '',
        zeroPayment: '',
        paymentType: '',
        allowance: '',
        monthCreditDbList: [],
      }
    },
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$store.state.profiles.doneCard = false
  //   next()
  // },
}
</script>

<style scoped>

</style>
