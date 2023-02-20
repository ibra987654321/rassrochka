<template>
<table-for-users :data="data"
:fields="fields" :edit-items="editItem" :put-dispatch="'putUsers'"></table-for-users>
</template>

<script>
// eslint-disable-next-line import/extensions
import TableForUsers from '@/components/table/TableForUsers'

export default {
  name: 'UserControl',
  components: {
    TableForUsers,
  },
  data: () => ({
    data: [],
    fields: [
      { text: 'Пользователь', value: 'username' },
      { text: 'Статус', value: 'status' },
      { text: 'Номер', value: 'phoneNumber' },
      { text: 'Дата', value: 'date' },
      { text: 'Админ', value: 'adminLogin' },
      { text: 'Действия', value: 'actions', sortable: false },
    ],
    editItem: {
      username: '',
      password: '',
      phoneNumber: '',
    },
  }),
  created() {
    this.$store.dispatch('getUsers').then(r => {
      this.data = r
    })
  },
}
</script>

<style scoped>

</style>
