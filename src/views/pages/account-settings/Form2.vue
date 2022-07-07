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
              dense
              outlined
            ></v-text-field>
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

export default {
  name: "Form2",
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
