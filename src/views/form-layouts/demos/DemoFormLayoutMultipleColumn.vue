<template>
  <v-form class="multi-col-validation">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="task"
          label="Задание"
          outlined
          dense
          placeholder="Задание"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="comments"
          label="Комментарии"
          outlined
          dense
          placeholder="Комментарии"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
        class="d-flex"
      >
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="createDate"
              label="Дата начало"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="createDate"
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="expirationDate"
              label="Дата завершение"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="expirationDate"
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="status"
          outlined
          dense
          multiple
          chips
          small-chips
          :items="['Сделать', 'В процессе', 'Выполнено', 'На удержании']"
          label="Статус"
        >
          <template v-slot:item="{ item, attrs, on }">
            <v-list-item
              v-bind="attrs"
              v-on="on"
            >
              <v-list-item-title
                :id="attrs['aria-labelledby']"
                v-text="item"
              ></v-list-item-title>
            </v-list-item>
          </template>
        </v-select>
      </v-col>

      <v-col cols="12">
        <v-checkbox
          v-model="myTask"
          label="myTask"
          class="mt-0"
          hide-details
        ></v-checkbox>
      </v-col>

      <v-col cols="12">
        <v-btn
          color="primary"
          @click="handleSubmit"
        >
          Submit
        </v-btn>
        <v-btn
          type="reset"
          outlined
          class="mx-2"
        >
          Reset
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { ref } from '@vue/composition-api'

const { decodeJWT } = require('@/use/auth')

export default {
  setup() {
    const token = decodeJWT().sub
    const menu1 = false
    const menu2 = false
    const task = ref('')
    const comments = ref('')
    const status = ref('')
    const userName = ref(token)
    const myTask = ref(false)
    const deleted = ref(false)
    const createDate = ref(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10))
    const expirationDate = ref(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10))

    function handleSubmit() {
      const formData = {
        task: task.value,
        comments: comments.value,
        createDate: new Date(createDate.value).toISOString(),
        expirationDate: new Date(expirationDate.value).toISOString(),
        status: status.value,
        userName: userName.value,
        myTask: myTask.value,
        deleted: deleted.value,
      }
      console.log(formData)
    }

    return {
      task,
      comments,
      createDate,
      expirationDate,
      status,
      userName,
      myTask,
      deleted,
      menu1,
      menu2,
      handleSubmit,
    }
  },
}
</script>
