<template>
  <div>
    <v-text-field
      id="newTodo"
      v-model="newTodo"
      outlined
      name="newTodo"
      label="Type your checkList"
      @keyup.enter="addTodo"
    />
    <v-data-table
      :single-select="true"
      :items="todos"
      :hide-default-footer="true"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item,idx) in items"
            :key="idx"
          >
            <td style="width: 30px">
              <v-checkbox
                v-model="item.status"
                @click="save"
              ></v-checkbox>
            </td>
            <td>
              <v-edit-dialog
                :return-value.sync="item.taskCheckList"
                large
                @save="save"
                @cancel="cancel"
                @open="open"
                @close="save"
              >
                {{ item.taskCheckList }}
                <template v-slot:input>
                  <v-text-field
                    v-model="item.taskCheckList"
                    label="Edit"
                    single-line
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {
  mdiPen, mdiDelete, mdiCheckOutline, mdiClipboardOutline, mdiClipboardPlayOutline,
} from '@mdi/js'

export default {
  name: 'TheCheckListVue',
  props: ['taskId'],
  data: () => ({
    newTodo: '',
    todos: [],
    editCheckList: {
      id: 0,
      taskCheckList: '',
      status: false,
      taskId: 1,
    },
    icons: {
      edit: mdiPen,
      deleted: mdiDelete,
      mdiCheckOutline,
      mdiClipboardOutline,
      mdiClipboardPlayOutline,
    },
    headers: [
      {
        text: 'text',
        value: 'taskCheckList',
      },
    ],
  }),
  computed: {
    getALLCheck() {
      const tasks = this.$store.dispatch('getCheckListTask', this.$props.taskId)

      return tasks
    },
  },
  watch: {
    todos() {
      console.log('edit')
    },
  },
  mounted() {
    console.log(this.$props.taskId)
    this.getCheckList()
  },
  methods: {
    getCheckList() {
      // eslint-disable-next-line no-unused-expressions
      console.log(this.getALLCheck)
    },
    save() {
      console.log(this.todos)
    },
    cancel() {
    },
    open() {
    },
    close() {
      console.log(this.todos)
    },
    addTodo() {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }

      this.todos.push({
        id: Date.now(),
        taskCheckList: this.newTodo,
        status: false,
        taskId: this.$props.taskId,
      })
      this.newTodo = ''
    },

    removeTodo(index) {
      this.todos.splice(index, 1)
    },
  },
}
</script>

<style scoped>

</style>
