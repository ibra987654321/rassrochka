<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <h2>Родственник</h2>
    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="brother.fullName"
              label="ФИО"
              required
              @input="$v.brother.fullName.$touch()"
              @blur="$v.brother.fullName.$touch()"
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
              v-model="brother.phoneNumber"
              label="Телефон"
              required
              @input="$v.brother.phoneNumber.$touch()"
              @blur="$v.brother.phoneNumber.$touch()"
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
              v-model="brother.address"
              label="Адресс прожвания"
              required
              @input="$v.brother.address.$touch()"
              @blur="$v.brother.address.$touch()"
              :error-messages="addressError"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="brother.brotherType"
              label="Тип родства"
              required
              @input="$v.brother.brotherType.$touch()"
              @blur="$v.brother.brotherType.$touch()"
              :error-messages="brotherTypeError"
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
import {mdiAlertOutline, mdiCloudUploadOutline} from "@mdi/js";
import { validationMixin } from 'vuelidate'
import { required, minLength, numeric, maxLength } from 'vuelidate/lib/validators'

export default {
  name: "Form2",
  mixins: [validationMixin],
  validations: {
    brother: {
      fullName: {required, minLength: minLength(5), maxLength: maxLength(25)},
      phoneNumber: {required, numeric,  minLength: minLength(9), maxLength: maxLength(15)},
      address: {required, minLength: minLength(9), maxLength: maxLength(50)},
      brotherType: {required, minLength: minLength(3), maxLength: maxLength(20)},
    },
  },
  data:() => ({
    brother: {
      fullName: '',
      phoneNumber: '',
      address: '',
      brotherType: '',
      profileId: ''
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
      if (!this.$v.brother.fullName.$dirty) return errors
      !this.$v.brother.fullName.minLength && errors.push('Это поле не должно быть меньше 5. Сейчас ' + this.brother.fullName.length)
      !this.$v.brother.fullName.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    phoneError () {
      const errors = []
      if (!this.$v.brother.phoneNumber.$dirty) return errors
      !this.$v.brother.phoneNumber.numeric && errors.push('Только цифры')
      !this.$v.brother.phoneNumber.minLength && errors.push('Это поле не должно быть меньше 9. Сейчас ' + this.brother.phoneNumber.length)
      !this.$v.brother.phoneNumber.maxLength && errors.push('Это поле нe должно быть больше 15. Сейчас ' + this.brother.phoneNumber.length)
      !this.$v.brother.phoneNumber.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    addressError () {
      const errors = []
      if (!this.$v.brother.address.$dirty) return errors
      !this.$v.brother.address.minLength && errors.push('Это поле не должно быть меньше 9. Сейчас ' + this.brother.address.length)
      !this.$v.brother.address.maxLength && errors.push('Это поле нe должно быть больше 15. Сейчас ' + this.brother.address.length)
      !this.$v.brother.address.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    brotherTypeError () {
      const errors = []
      if (!this.$v.brother.brotherType.$dirty) return errors
      !this.$v.brother.brotherType.minLength && errors.push('Это поле не должно быть меньше 9. Сейчас ' + this.brother.brotherType.length)
      !this.$v.brother.brotherType.maxLength && errors.push('Это поле нe должно быть больше 15. Сейчас ' + this.brother.brotherType.length)
      !this.$v.brother.brotherType.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
  },
  methods: {
    save() {
      this.brother.profileId = this.$store.state.profiles.profileId.id
      this.$store.dispatch('postForm2', this.brother)
      this.$emit('next')
    },
    resetForm() {
      this.brother = {
        fullName: '',
          phoneNumber: '',
          address: '',
          brotherType: '',
      }
    }
  },
}
</script>

<style scoped>

</style>
