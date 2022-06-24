<template>
  <v-data-table
    :headers="headers"
    :items="myTasks"
    class="elevation-1"
  >
    <template
      v-slot:top
      class="d-flex justify-center"
    >
      <v-dialog
        v-model="dialog"
        max-width="800px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-3"
            v-bind="attrs"
            v-on="on"
          >
            Новая задача
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.task"
                    label="Задача"
                    outlined
                    dense
                    :prepend-inner-icon="icons.mdiClipboardPlayOutline"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="editedItem.statusType"
                    outlined
                    dense
                    :prepend-inner-icon="icons.mdiCheckOutline"
                    :items="['DEFAULTER','EXPIRED', 'DONE', 'DELAY', 'WAIT']"
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
                <v-col
                  cols="12"
                  sm="12"
                >
                  <v-textarea
                    v-model="editedItem.comments"
                    label="Описание"
                    :prepend-inner-icon="icons.mdiClipboardOutline"
                    outlined
                    dense
                  ></v-textarea>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                >
                  <v-text-field
                    id="newTodo"
                    v-model="newTodo"
                    outlined
                    name="newTodo"
                    label="Добавить задачи в чек-лист"
                    @keyup.enter="addTodo(editedItem.id)"
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
                              @click="saveCheck(item.id)"
                            ></v-checkbox>
                          </td>
                          <td>
                            <v-edit-dialog
                              :return-value.sync="item.taskCheckList"
                              large
                              @save="saveCheck(item.id)"
                              @close="saveCheck(item.id)"
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
                          <td style="width: 30px">
                            <v-icon
                              small
                              class="mr-2"
                              @click="removeTodo(idx, item.id)"
                            >
                              {{ icons.mdiCloseOutline }}
                            </v-icon>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-data-table>
                </v-col>
                <v-col
                  cols="12"
                  sm="2"
                >
                  <v-checkbox
                    v-model="editedItem.myTask"
                    class="mt-3"
                    label="Личная задача"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  sm="5"
                >
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    class="mx-auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.createDate.slice(0, 10)"
                        label="Дата начало"
                        prepend-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.createDate"
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="5"
                >
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    class="mt-3"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.expirationDate.slice(0, 10)"
                        label="Дата завершение"
                        prepend-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.expirationDate"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              Отмена
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogDelete"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="text-h5">
            Вы действительно хотите удалить?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="closeDelete"
            >
              Отмена
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="deleteItemConfirm"
            >
              OK
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.task="{ item }">
      <v-edit-dialog
        :return-value.sync="item.task"
        large
        @open="openItem(item)"
        @save="save()"
      >
        {{ item.task }}
        <template v-slot:input>
          <v-text-field
            v-model="item.task"
            label="Edit"
            single-line
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.comments="{ item }">
      <v-edit-dialog
        :return-value.sync="item.comments"
        large
        @open="openItem(item)"
        @save="save()"
      >
        {{ item.comments }}
        <template v-slot:input>
          <v-text-field
            v-model="item.comments"
            label="Edit"
            single-line
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.createDate="{ item }">
      <v-edit-dialog
        :return-value.sync="item.createDate"
        large
        @open="openItem(item)"
        @save="save()"
      >
        {{ item.createDate }}
        <template v-slot:input>
          <v-date-picker
            v-model="item.createDate"
          ></v-date-picker>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.expirationDate="{ item }">
      <v-edit-dialog
        :return-value.sync="item.expirationDate"
        large
        @open="openItem(item)"
        @save="save()"
      >
        {{ item.expirationDate }}
        <template v-slot:input>
          <v-date-picker
            v-model="item.expirationDate"
          ></v-date-picker>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.statusType="{ item }">
      <v-edit-dialog
        :return-value.sync="item.statusType"
        large
        @open="openItem(item)"
        @save="save()"
      >
        {{ localSelect(item.statusType) }}
        <template v-slot:input>
          <v-select
            v-model="item.statusType"
            outlined
            dense
            :prepend-inner-icon="icons.mdiCheckOutline"
            :items="['Создано','Выполняется', 'Готово', 'Остановлено', 'Удалено', 'Истекло', 'Приостановлено']"
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
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.myTask="{ item }">
      <v-edit-dialog
        :return-value.sync="item.myTask"
        large
        @open="openItem(item)"
        @save="save()"
      >
        {{ item.myTask }}
        <template v-slot:input>
          <v-checkbox
            v-model="item.myTask"
            class="mt-3"
            label="myTask"
            hide-details
          ></v-checkbox>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        {{ icons.edit }}
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        {{ icons.deleted }}
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {
  mdiPen, mdiDelete, mdiCheckOutline, mdiClipboardOutline, mdiClipboardPlayOutline, mdiCloseOutline,
} from '@mdi/js'

export default {
  components: {
  },
  data: () => ({
    newTodo: '',
    todos: [],
    dialog: false,
    dialogDelete: false,
    menu1: false,
    menu2: false,
    selectItems: [
      { Выполняется: 'IN_PROGRESS' },
      { Готово: 'DONE' },
      { Остановлено: 'STOPPED' },
      { Создано: 'CREATED' },
      { Удалено: 'DELETED' },
      { Истекло: 'EXPIRED' },
      { Приостановлено: 'HOLD' },
    ],
    icons: {
      edit: mdiPen,
      deleted: mdiDelete,
      mdiCheckOutline,
      mdiClipboardOutline,
      mdiClipboardPlayOutline,
      mdiCloseOutline,
    },
    headers: [
      {
        text: 'ЗАДАНИЕ',
        align: 'start',
        sortable: false,
        value: 'task',
      },
      { text: 'ОПИСАНИЕ', value: 'comments',},
      { text: 'ДАТА НАЧАЛА', value: 'createDate' },
      { text: 'ДАТА ЗАВЕРШЕНИЯ', value: 'expirationDate' },
      { text: 'СТАТУС', value: 'statusType' },
      { text: 'ЛИЧНАЯ ЗАДАЧА', value: 'myTask' },
      { text: 'ДЕЙСТВИЕ', value: 'actions', sortable: false },
    ],
    myTasks: [],
    editedIndex: -1,
    editedItem: {
      task: '',
      comments: '',
      createDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      expirationDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      statusType: 'status',
      myTask: false,
      id: 0,
      deleted: false,
    },
    defaultItem: {
      task: '',
      comments: '',
      createDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      expirationDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      statusType: '',
      myTask: false,
      deleted: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Добавить' : 'Изменить'
    },

  },
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      this.myTasks = await this.$store.dispatch('getPersonalTask').then(i => i)
      // eslint-disable-next-line no-param-reassign
      this.myTasks.map(i => {
        i.createDate = new Date(i.createDate).toISOString().slice(0, 10)
        i.expirationDate = new Date(i.expirationDate).toISOString().slice(0, 10)
      })
    },
    localSelect(select) {
      const isCyrillic = /[а-я]/i.test(select) // определение языка на кирилицу
      if (isCyrillic) {
        const localSelect = this.selectItems.filter((item) => item[select]) // нахожу нужный элемент из массива
        const isLatinSelect = Object.values(localSelect[0]) // получаю только его значение
        return isLatinSelect[0]
      } else {
        const localSelect = this.selectItems.filter(i => Object.values(i) == select) // нахожу нужный элемент из массива
        const isCyrillicSelect = Object.keys(localSelect[0]) // получаю только его ключ
        return isCyrillicSelect[0]
      }
    },

    async editItem(item) {
      this.editedIndex = this.myTasks.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
      const tasks = await this.$store.dispatch('getCheckListTask', this.editedItem.id)
      this.todos = tasks
    },

    deleteItem(item) {
      this.editedIndex = this.myTasks.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.myTasks.splice(this.editedIndex, 1)
      this.$store.dispatch('deleteTask', this.editedItem.id)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    openItem(item) {
      this.editedItem = item
      this.editedIndex = this.myTasks.indexOf(item)
    },

    save() {
      if (this.editedIndex > -1) {
        const editData = {
          comments: this.editedItem.comments,
          createDate: new Date(new Date(this.editedItem.createDate).setDate(new Date(this.editedItem.createDate).getDate() + 1)).toISOString(),
          deleted: this.editedItem.deleted,
          expirationDate: new Date(new Date(this.editedItem.expirationDate).setDate(new Date(this.editedItem.expirationDate).getDate() + 1)).toISOString(),
          id: this.editedItem.id,
          myTask: this.editedItem.myTask,
          status: this.localSelect(this.editedItem.statusType), // эта функция возвращает нужный select,
          task: this.editedItem.task,
        }
        this.$store.dispatch('putTask', editData)
        Object.assign(this.myTasks[this.editedIndex], this.editedItem)

        this.close()
      } else {
        try {
          const data = {
            comments: this.editedItem.comments,
            createDate: new Date(this.editedItem.createDate).toISOString(),
            deleted: this.editedItem.deleted,
            expirationDate: new Date(this.editedItem.expirationDate).toISOString(),
            id: 0,
            myTask: this.editedItem.myTask,
            status: this.editedItem.statusType,
            task: this.editedItem.task,
          }
          this.$store.dispatch('postTasks', data)
          this.myTasks.push(this.editedItem)
          this.close()
        } catch (e) {
          console.log(e)
        }
      }
    },
    saveCheck(id) {
      const editCheck = this.todos.find(i => i.id === id)
      this.$store.dispatch('putCheckList', editCheck)
    },
    addTodo(taskId) {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      const checkList = {
        id: 0,
        taskCheckList: this.newTodo,
        status: false,
        taskId,
      }

      this.todos.push(checkList)
      this.$store.dispatch('postTCheckList', checkList)
      this.newTodo = ''
    },

    removeTodo(index, taskId) {
      this.$store.dispatch('deleteCheckList', taskId)
      this.todos.splice(index, 1)
    },
  },
}
</script>
<style scoped>
.done {
  text-decoration: line-through;
}
</style>
