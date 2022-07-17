<template>
  <v-card
    flat
    class="pa-3 mt-2"
  >
    <h2>Дилер</h2>
    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="owner.deviceOwner"
              label="Название дилера"
              required
              @input="$v.owner.deviceOwner.$touch()"
              @blur="$v.owner.deviceOwner.$touch()"
              :error-messages="OwnerError"
              dense
              outlined
            ></v-text-field>
          </v-col>

          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="owner.deviceOwnerIp"
              label="ИП дилера"
              required
              @input="$v.owner.deviceOwnerIp.$touch()"
              @blur="$v.owner.deviceOwnerIp.$touch()"
              :error-messages="OwnerIpError"
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
              @click="resetForm"
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
  name: "Form4",
  mixins: [validationMixin],
  validations: {
    owner: {
      deviceOwner: {required, minLength: minLength(3), maxLength: maxLength(15)},
      deviceOwnerIp: {required,  minLength: minLength(3), maxLength: maxLength(20)},
    },
  },
  data:() => ({
    owner: {
      deviceOwner: 'center',
      deviceOwnerIp: 'ugyguyguyg686876876',
      deviceId: ''
    },
  }),
  computed: {
    OwnerError () {
      const errors = []
      if (!this.$v.owner.deviceOwner.$dirty) return errors
      !this.$v.owner.deviceOwner.minLength && errors.push('Это поле не должно быть меньше 3. Сейчас ' + this.owner.deviceOwner.length)
      !this.$v.owner.deviceOwner.maxLength && errors.push('Это поле нe должно быть больше 15. Сейчас ' + this.owner.deviceOwner.length)
      !this.$v.owner.deviceOwner.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
    OwnerIpError () {
      const errors = []
      if (!this.$v.owner.deviceOwnerIp.$dirty) return errors
      !this.$v.owner.deviceOwnerIp.minLength && errors.push('Это поле не должно быть меньше 3. Сейчас ' + this.owner.deviceOwnerIp.length)
      !this.$v.owner.deviceOwnerIp.maxLength && errors.push('Это поле нe должно быть больше 20. Сейчас ' + this.owner.deviceOwnerIp.length)
      !this.$v.owner.deviceOwnerIp.required && errors.push('Поле не должно быть пустым.')
      return errors
    },
  },
  methods: {
    save() {
      this.owner.deviceId = this.$store.state.profiles.deviceId.id
      this.$store.dispatch('postForm4', this.owner)
      this.$emit('next')
    },
    resetForm() {
      this.owner.deviceOwnerIp = ''
      this.owner.deviceOwner = ''
    }
  },
}
</script>

<style scoped>

</style>
