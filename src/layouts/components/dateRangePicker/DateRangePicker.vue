<template>
  <div class="date_range">
    <v-datetime-picker
      v-model="$store.state.start"
      label="Start"
      date-format="dd-MM-yyyy"
      time-format="HH:mm:ss"
      :dialog-width="Number(400)"
      :time-picker-props="dateTimeOptions"
    >
      <template slot="dateIcon">
        Дата
      </template>
      <template slot="timeIcon">
        Вермя
      </template>
      <template
        slot="actions"
        slot-scope="{ parent }"
      >
        <v-btn
          color="error lighten-1"
          @click.native="parent.clearHandler"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success darken-1"
          @click="parent.okHandler"
        >
          Done
        </v-btn>
      </template>
    </v-datetime-picker>
    <v-datetime-picker
      v-model="$store.state.end"
      label="End"
      date-format="dd-MM-yyyy"
      time-format="HH:mm:ss"
      :dialog-width="Number(400)"
      :time-picker-props="dateTimeOptions"
    >
      <template slot="dateIcon">
        Дата
      </template>
      <template slot="timeIcon">
        Вермя
      </template>
      <template
        slot="actions"
        slot-scope="{ parent }"
      >
        <v-btn
          color="error lighten-1"
          @click.native="parent.clearHandler"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success darken-1"
          @click="parent.okHandler"
        >
          Done
        </v-btn>
      </template>
    </v-datetime-picker>
  </div>
</template>

<script>
export default {
  name: 'DateRangePicker',
  data: () => ({
    dateTimeOptions: {
      format: '24hr',
    },
  }),
  created() {
    // eslint-disable-next-line no-unused-expressions
    this.$store.getters.createdDate
  },
}
</script>

<style scoped>
div {
  display: flex;
}

.v-input__slot {
  margin-bottom: 0 !important;
}

</style>
