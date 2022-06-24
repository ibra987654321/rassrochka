<template>
<table-for-users :data="data" :fields="fields" :edit-items="editItem" :put-dispatch="'putUsers'"></table-for-users>
</template>

<script>
import TableForUsers from "@/components/table/TableForUsers";
// import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: "UserControl",
  // validations: {
  //   USER: {
  //     username: {required, minLength: minLength(5)},
  //     password: {required, minLength: minLength(5)},
  //     phoneNumber: {required},
  //   },
  // },
  components: {
    TableForUsers
  },
  data: () =>  ({
    data: [],
    fields: [
      {text:'Пользователь', value: 'username' },
      {text:'Статус', value: 'status' },
      {text:'Номер', value: 'phoneNumber' },
      {text:'Дата', value: 'date' },
      {text:'Амин', value: 'adminLogin' },
      { text: 'Действия', value: 'actions', sortable: false },
    ],
    editItem: {
      username: '',
      password: '',
      phoneNumber: '',
    }
  }),
  created() {
    this.$store.dispatch('getUsers').then(r => {
      this.data = r
    })
  }
}
</script>

<style scoped>

</style>
