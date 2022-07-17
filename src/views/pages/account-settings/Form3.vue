<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <h2>Телефон</h2>
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
              @input="$v.device.deviceImei.$touch()"
              @blur="$v.device.deviceImei.$touch()"
              :error-messages="ImeiError"
              dense
              outlined
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
              @input="$v.device.deviceModel.$touch()"
              @blur="$v.device.deviceModel.$touch()"
              :error-messages="ModelError"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
            <v-select
              :items="items"
              v-model="device.deviceMemory"
              label="Память телефона"
              required
              @input="$v.device.deviceMemory.$touch()"
              @blur="$v.device.deviceMemory.$touch()"
              :error-messages="MemoryErrors"
              dense
              outlined
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
              @input="$v.device.devicePrice.$touch()"
              @blur="$v.device.devicePrice.$touch()"
              :error-messages="PriceError"
              dense
              outlined
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
              @input="$v.device.cloudLogin.$touch()"
              @blur="$v.device.cloudLogin.$touch()"
              :error-messages="loginError"
              dense
              outlined
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
              @input="$v.device.cloudPass.$touch()"
              @blur="$v.device.cloudPass.$touch()"
              :error-messages="PassError"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              color="primary"
              class="me-3 mt-4"
              @click="save()"
              :disabled="$v.$invalid"
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
import { required, minLength, numeric, maxLength } from 'vuelidate/lib/validators'
export default {
  name: "Form3",
  mixins: [validationMixin],
  validations: {
    device: {
      deviceImei: {required,numeric, minLength: minLength(12), maxLength: maxLength(20)},
      deviceMemory: {required,  minLength: minLength(2)},
      deviceModel: {required, minLength: minLength(3)},
      devicePrice: {required, minLength: minLength(3)},
      cloudLogin: {required, minLength: minLength(3)},
      cloudPass: {required, minLength: minLength(3)},
    },
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
  data:() => ({
    device: {
      deviceImei: '',
      deviceMemory: '',
      deviceModel: '',
      devicePrice: '',
      cloudLogin: '',
      cloudPass: '',
      profileId: '',
    },
    items: ['4гб','8гб','16гб','32гб','64гб','128гб','256гб','512гб','1тб',]


  }),
  computed: {
    MemoryErrors () {
      const errors = []
      if (!this.$v.device.deviceMemory.$dirty) return errors
      !this.$v.device.deviceMemory.minLength && errors.push('Это поле не должно быть меньше 2. Сейчас ' + this.device.deviceMemory.length)
      !this.$v.device.deviceMemory.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    ImeiError () {
      const errors = []
      if (!this.$v.device.deviceImei.$dirty) return errors
      !this.$v.device.deviceImei.numeric && errors.push('Только цифры')
      !this.$v.device.deviceImei.minLength && errors.push('Это поле не должно быть меньше 12. Сейчас ' + this.device.deviceImei.length)
      !this.$v.device.deviceImei.maxLength && errors.push('Это поле нe должно быть больше 20. Сейчас ' + this.device.deviceImei.length)
      !this.$v.device.deviceImei.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    ModelError () {
      const errors = []
      if (!this.$v.device.deviceModel.$dirty) return errors
      !this.$v.device.deviceModel.minLength && errors.push('Это поле не должно быть меньше 3. Сейчас ' + this.device.deviceModel.length)
      !this.$v.device.deviceModel.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    PriceError () {
      const errors = []
      if (!this.$v.device.devicePrice.$dirty) return errors
      !this.$v.device.devicePrice.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    loginError () {
      const errors = []
      if (!this.$v.device.cloudLogin.$dirty) return errors
      !this.$v.device.cloudLogin.minLength && errors.push('Это поле не должно быть меньше 3. Сейчас ' + this.device.cloudLogin.length)
      !this.$v.device.cloudLogin.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    PassError () {
      const errors = []
      if (!this.$v.device.cloudPass.$dirty) return errors
      !this.$v.device.cloudPass.minLength && errors.push('Это поле не должно быть меньше 3. Сейчас ' + this.device.cloudPass.length)
      !this.$v.device.cloudPass.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
  },
  methods: {
    save() {
      this.device.profileId = this.$store.state.profiles.profileId.id
      this.$store.dispatch('postForm3', this.device)
      this.$emit('next')
    },
    resetForm() {
      this.device = {
        deviceImei: '',
          deviceMemory: '',
          deviceModel: '',
          devicePrice: '',
      }
    }
  },
}
</script>

<style scoped>

</style>
