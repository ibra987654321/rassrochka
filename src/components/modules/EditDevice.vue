<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.xs"
    max-width="950px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
        class="ml-3"
      >
        Изменить девайс
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Изменение девайса
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="data[0].deviceModel"
              label="Модель"
              required
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="data[0].cloudLogin"
              label="Логин "
              required
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="data[0].cloudPass"
              label="Пароль "
              required
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="data[0].deviceImei"
              label="Imei "
              required
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="data[0].deviceMemory"
              label="Память "
              required
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col
            md="6"
            cols="12"
          >
            <v-text-field
              v-model="data[0].devicePrice"
              label="Цена "
              required
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Закрыть
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="save"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditDevice',
  props: ['data'],
  data: () => ({
    dialog: false,
  }),
  methods: {
    close() {
      this.dialog = false
    },
    save() {
      this.$store.dispatch('putDeviceInformation', this.data[0])
        .then(() => {
          this.$emit('save', this.data)
          this.$store.commit('setSnackbars', 'Успешно изменено')
          this.close()
        })
        .catch(e => this.$store.commit('setSnackbars', e.message))
    },
  },
}
</script>

<style scoped>

</style>
