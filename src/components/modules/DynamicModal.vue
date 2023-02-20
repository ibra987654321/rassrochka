<template>
  <v-dialog
    v-model="$store.state.dialog.dialog"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ $store.state.dialog.title }}
      </v-card-title>
      <v-card-text>{{ $store.state.dialog.text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="$store.state.dialog.dialog = false"
        >
          Отмена
        </v-btn>
        <v-btn
          color="green darken-4"
          to="/calling"
          @click="routing"
        >
          Ок
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DynamicModal',
  methods: {
    routing() {
      this.$router.push({ name: this.$store.state.dialog.routeName })
      this.$store.state.dialog.dialog = false
    },
  },
}
</script>

<style scoped>

</style>
