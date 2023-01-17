<template>
  <v-card
    flat
  >
    <v-card-text>
      <div
        class="d-flex justify-center align-content-center"
      >
        <div class="text-center">
          <h2>Сохранение прошло успешно</h2>
          <div>
            <v-btn
              color="primary"
              class="me-3 mt-4"
              @click="close"
            >
              Перейти в список
            </v-btn>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Form3',
  methods: {
    close() {
      this.$store.state.steps = 1
      this.$router.push({ name: 'dashboard' })
    },
  },
}
</script>

<style scoped>

</style>
