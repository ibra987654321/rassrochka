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
              label="Имей"
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
              label="Имя телефона"
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
              label="Память"
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
              label="Цена"
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

export default {
  name: "Form3",
  data:() => ({
    device: {
      deviceImei: '',
      deviceMemory: '',
      deviceModel: '',
      devicePrice: '',
      profileId: '',
    },
    items: ['4гб','8гб','16гб','32гб','64гб','128гб','256гб','512гб','1тб',]


  }),
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
