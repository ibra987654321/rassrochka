<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-uppercase">
            Имя
          </th>
          <th class="text-left text-uppercase">
            Название
          </th>
          <th class="text-center text-uppercase">
            Дата начало
          </th>
          <th class="text-center text-uppercase">
            Дата завершение!
          </th>
          <th class="text-center text-uppercase">
            Статус
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in tasks"
          :key="item.tasks"
        >
          <td class="font-weight-semibold">
            {{ item.userName }}
          </td>
          <td class="text-left">
            <div class="d-flex flex-column">
              <span class="d-block font-weight-semibold  ">{{ item.task }}</span>
              <small>{{ item.comments }}</small>
            </div>
          </td>
          <td class="text-center">
            {{ item.createDate.slice(0,10) }}
          </td>
          <td class="text-center">
            {{ item.expirationDate.slice(0, 10) }}
          </td>
          <td class="text-center">
            <v-chip
              small
              :color="statusColor[status[item.statusType]]"
              class="font-weight-medium"
            >
              {{ item.statusType }}
            </v-chip>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  data: () => ({
    statusColor: {
      Сделать: 'primary',
      Процессе: 'success',
      Просрочено: 'error',
      Удержания: 'warning',
      Выполнено: 'info',
    },
    status: {
      Сделать: 'Сделать',
      Процессе: 'Процессе',
      Просрочено: 'Просрочено',
      Удержания: 'Удержания',
      Выполнено: 'Выполнено',
    },
    tasks: [],
  }),
  async mounted() {
    const user = await this.$store.dispatch('getInfo')
    console.log(user)
    this.tasks = user.map(i => i)
  },
}
</script>
