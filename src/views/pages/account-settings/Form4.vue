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
              v-model="owner.deviceOwner"
              label="Поставшик"
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
              label="ИП поставшика"
              dense
              outlined
            ></v-text-field>
          </v-col>



          <!--          &lt;!&ndash; alert &ndash;&gt;-->
          <!--          <v-col cols="12">-->
          <!--            <v-alert-->
          <!--              color="warning"-->
          <!--              text-->
          <!--              class="mb-0"-->
          <!--            >-->
          <!--              <div class="d-flex align-start">-->
          <!--                <v-icon color="warning">-->
          <!--                  {{ icons.mdiAlertOutline }}-->
          <!--                </v-icon>-->

          <!--                <div class="ms-3">-->
          <!--                  <p class="text-base font-weight-medium mb-1">-->
          <!--                    Заполните все поля-->
          <!--                  </p>-->
          <!--                  <a-->
          <!--                    href="javascript:void(0)"-->
          <!--                    class="text-decoration-none warning&#45;&#45;text"-->
          <!--                  >-->
          <!--                    <span class="text-sm">Resend Confirmation</span>-->
          <!--                  </a>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </v-alert>-->
          <!--          </v-col>-->

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
export default {
  name: "Form4",
  data:() => ({
    owner: {
      deviceOwner: '',
      deviceOwnerIp: '',
      deviceId: ''
    },
  }),
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
