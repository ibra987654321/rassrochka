<template>
  <v-row align="center">
    <v-col
      class=""
      cols="6"
    >
      <v-card>
        <v-card-title>По статусам</v-card-title>
        <v-card-text>
          <v-select
            v-model="select"
            class="select"
            :items="['Открытые', 'Закрытые', 'Отмененные']"
            label="Статусы"
            outlined
            @change="GetOwners($event)"
          ></v-select>
          <bar-chart
            :amount="owners.amount"
            :name="owners.name"
          ></bar-chart>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      class=""
      cols="6"
    >
      <v-card>
        <v-card-title>По тематикам</v-card-title>
        <v-card-text>
          <v-select
            v-model="select2"
            class="select"
            :items="['Открытые', 'Закрытые', 'Отмененные', 'Созданные']"
            label="Тематика"
            outlined
            @change="GetTitles($event)"
          ></v-select>
          <bar-chart
            :amount="titles.amount"
            :name="titles.name"
          ></bar-chart>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line import/extensions
import barChart from '@/components/useDashboard/BarChart'

export default {
  name: 'Detaile',
  components: {
    barChart,
  },
  data: () => ({
    select: 'Открытые',
    select2: 'Открытые',
    items: [
      {
        Открытые: 'opened'
      },
      {
        Закрытые: 'closed'
      },
      {
        Отмененные: 'cancelled'
      },
      {
        Созданные: 'created'
      },
    ],
    owners: {
      name: [],
      amount: [],
    },
    titles: {
      name: [],
      amount: [],
    },
  }),
  computed: {
    done() {
      return this.date.end
    },
    start() {
      return this.date.start
    },
    date() {
      return this.$store.state
    },
  },
  watch: {
    start() {
      this.GetOwners(this.select)
      this.GetTitles(this.select2)
    },
    done() {
      this.GetOwners(this.select)
      this.GetTitles(this.select2)
    },
  },
  mounted() {
    this.GetOwners('Открытые')
    this.GetTitles('Открытые')
  },
  methods: {
    async GetOwners(status) {
      const localSelect = this.items.filter((item) => item[status]) // нахожу нужный элемент из массива
      const CurrentSelect = Object.values(localSelect[0]) // получаю только его значение

      const owners = await this.$store.dispatch('GetAllOwners', CurrentSelect)
      this.owners.name = owners.map(i => i.value)
      this.owners.amount = owners.map(i => i.amount)
    },
    async GetTitles(status) {
      const localSelect = this.items.filter((item) => item[status]) // нахожу нужный элемент из массива
      const CurrentSelect = Object.values(localSelect[0]) // получаю только его значение

      const titles = await this.$store.dispatch('GetAllTitles', CurrentSelect)
      this.titles.name = titles.map(i => i.value)
      this.titles.amount = titles.map(i => i.amount)
    },
  },
}
</script>

<style scoped>
select {
  width: 300px;
}
</style>
