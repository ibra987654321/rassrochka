<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="taskList"
      class="table-rounded"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          rounded
          dense
          outlined
          label="Search"
          class="mx-4 pt-4"
        ></v-text-field>
      </template>
      <!-- name -->
      <template
        #[`item.userName`]="{item}"
        class="font-weight-semibold"
      >
        <span class="font-weight-semibold ">{{ item.userName }}</span>
      </template>
      <template #[`item.task`]="{item}">
        <div class="d-flex flex-column">
          <span class="d-block font-weight-semibold ">{{ item.task }}</span>
          <small>{{ item.comments }}</small>
        </div>
      </template>
      <template #[`item.createDate`]="{item}">
        {{ item.createDate.slice(0,10) }}
      </template>
      <template #[`item.expirationDate`]="{item}">
        {{ item.expirationDate.slice(0,10) }}
      </template>
      <!-- status -->
      <template #[`item.status`]="{item}">
        <v-chip
          small
          :color="statusColor[status[item.statusType]]"
          class="font-weight-medium"
        >
          {{ item.statusType }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    search: '',
    loading: false,
    statusColor: {
      CREATED: 'primary',
      IN_PROGRESS: 'info',
      STOPPED: 'warning',
      EXPIRED: 'error',
      DONE: 'success',
      DELETED: 'blue-grey',
    },
    taskList: [],
    status: {
      CREATED: 'CREATED',
      IN_PROGRESS: 'IN_PROGRESS',
      STOPPED: 'STOPPED',
      DONE: 'DONE',
      DELETED: 'DELETED',
      EXPIRED: 'EXPIRED',
      HOLD: 'HOLD',
    },
  }),
  computed: {
    headers() {
      return [
        {
          text: 'ИМЯ',
          align: 'start',
          sortable: false,
          value: 'userName',
        },
        {
          text: 'ЗАДАНИЕ',
          value: 'task',
          filter: value => {
            if (!this.task) return true

            // eslint-disable-next-line radix
            return value < parseInt(this.task)
          },
        },
        { text: 'ДАТА НАЧАЛО', value: 'createDate' },
        { text: 'ДАТА ЗОВЕРШЕНИЕ', value: 'expirationDate' },
        { text: 'STATUS', value: 'status' },
      ]
    },
  },
  async mounted() {
    this.loading = true
    this.taskList = await this.$store.dispatch('getInfo')
    this.loading = false
  },
  methods: {
    filterOnlyCapsText(value, search) {
      return value != null
        && search != null
        && typeof value === 'string'
        && value.toString().toLocaleLowerCase().indexOf(search) !== -1
    },
  },
}
</script>
