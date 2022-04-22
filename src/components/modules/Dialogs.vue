<template>
  <div>

    <v-card>
      <!--      <v-card-title>-->
      <!--        <span class="text-h5">{{ formTitle }}</span>-->
      <!--      </v-card-title>-->

      <!--      <v-card-text>-->
      <!--        <v-container>-->
      <!--          <v-row>-->
      <!--            <v-col-->
      <!--              cols="12"-->
      <!--              sm="6"-->
      <!--            >-->
      <!--              <v-text-field-->
      <!--                v-model="editedItem.task"-->
      <!--                label="Задание"-->
      <!--                outlined-->
      <!--                dense-->
      <!--                :prepend-inner-icon="icons.mdiClipboardPlayOutline"-->
      <!--              ></v-text-field>-->
      <!--            </v-col>-->
      <!--            <v-col-->
      <!--              cols="12"-->
      <!--              sm="6"-->
      <!--            >-->
      <!--              <v-select-->
      <!--                v-model="editedItem.statusType"-->
      <!--                outlined-->
      <!--                dense-->
      <!--                :prepend-inner-icon="icons.mdiCheckOutline"-->
      <!--                :items="['CREATED','IN_PROGRESS', 'DONE', 'STOPPED', 'DELETED', 'EXPIRED', 'HOLD']"-->
      <!--                label="Статус"-->
      <!--              >-->
      <!--                <template v-slot:item="{ item, attrs, on }">-->
      <!--                  <v-list-item-->
      <!--                    v-bind="attrs"-->
      <!--                    v-on="on"-->
      <!--                  >-->
      <!--                    <v-list-item-title-->
      <!--                      :id="attrs['aria-labelledby']"-->
      <!--                      v-text="item"-->
      <!--                    ></v-list-item-title>-->
      <!--                  </v-list-item>-->
      <!--                </template>-->
      <!--              </v-select>-->
      <!--            </v-col>-->
      <!--            <v-col-->
      <!--              cols="12"-->
      <!--              sm="12"-->
      <!--            >-->
      <!--              <v-textarea-->
      <!--                v-model="editedItem.comments"-->
      <!--                label="Описание"-->
      <!--                :prepend-inner-icon="icons.mdiClipboardOutline"-->
      <!--                outlined-->
      <!--                dense-->
      <!--              ></v-textarea>-->
      <!--            </v-col>-->
      <!--            <v-col-->
      <!--              cols="12"-->
      <!--              sm="12"-->
      <!--            >-->
      <!--              <v-text-field-->
      <!--                id="newTodo"-->
      <!--                v-model="newTodo"-->
      <!--                outlined-->
      <!--                name="newTodo"-->
      <!--                label="Type your checkList"-->
      <!--                @keyup.enter="addTodo(editedItem.id)"-->
      <!--              />-->
      <!--              <v-data-table-->
      <!--                :single-select="true"-->
      <!--                :items="todos"-->
      <!--                :hide-default-footer="true"-->
      <!--                item-key="name"-->
      <!--                class="elevation-1"-->
      <!--              >-->
      <!--                <template v-slot:body="{ items }">-->
      <!--                  <tbody>-->
      <!--                  <tr-->
      <!--                    v-for="(item,idx) in items"-->
      <!--                    :key="idx"-->
      <!--                  >-->
      <!--                    <td style="width: 30px">-->
      <!--                      <v-checkbox-->
      <!--                        v-model="item.status"-->
      <!--                        @click="saveCheck(item.id)"-->
      <!--                      ></v-checkbox>-->
      <!--                    </td>-->
      <!--                    <td>-->
      <!--                      <v-edit-dialog-->
      <!--                        :return-value.sync="item.taskCheckList"-->
      <!--                        large-->
      <!--                        @save="saveCheck(item.id)"-->
      <!--                        @close="saveCheck(item.id)"-->
      <!--                      >-->
      <!--                        {{ item.taskCheckList }}-->
      <!--                        <template v-slot:input>-->
      <!--                          <v-text-field-->
      <!--                            v-model="item.taskCheckList"-->
      <!--                            label="Edit"-->
      <!--                            single-line-->
      <!--                          ></v-text-field>-->
      <!--                        </template>-->
      <!--                      </v-edit-dialog>-->
      <!--                    </td>-->
      <!--                    <td style="width: 30px">-->
      <!--                      <v-icon-->
      <!--                        small-->
      <!--                        class="mr-2"-->
      <!--                        @click="removeTodo(idx, item.id)"-->
      <!--                      >-->
      <!--                        {{ icons.mdiCloseOutline }}-->
      <!--                      </v-icon>-->
      <!--                    </td>-->
      <!--                  </tr>-->
      <!--                  </tbody>-->
      <!--                </template>-->
      <!--              </v-data-table>-->
      <!--            </v-col>-->
      <!--            <v-col-->
      <!--              cols="12"-->
      <!--              sm="2"-->
      <!--            >-->
      <!--              <v-checkbox-->
      <!--                v-model="editedItem.myTask"-->
      <!--                class="mt-3"-->
      <!--                label="myTask"-->
      <!--                hide-details-->
      <!--              ></v-checkbox>-->
      <!--            </v-col>-->
      <!--            <v-col-->
      <!--              cols="12"-->
      <!--              sm="5"-->
      <!--            >-->
      <!--              <v-menu-->
      <!--                v-model="menu1"-->
      <!--                :close-on-content-click="false"-->
      <!--                :nudge-right="40"-->
      <!--                transition="scale-transition"-->
      <!--                offset-y-->
      <!--                class="mx-auto"-->
      <!--              >-->
      <!--                <template v-slot:activator="{ on, attrs }">-->
      <!--                  <v-text-field-->
      <!--                    v-model="editedItem.createDate.slice(0, 10)"-->
      <!--                    label="Дата начало"-->
      <!--                    prepend-icon="mdi-calendar"-->
      <!--                    readonly-->
      <!--                    outlined-->
      <!--                    dense-->
      <!--                    v-bind="attrs"-->
      <!--                    v-on="on"-->
      <!--                  ></v-text-field>-->
      <!--                </template>-->
      <!--                <v-date-picker-->
      <!--                  v-model="editedItem.createDate"-->
      <!--                  @input="menu1 = false"-->
      <!--                ></v-date-picker>-->
      <!--              </v-menu>-->
      <!--            </v-col>-->
      <!--            <v-col-->
      <!--              cols="12"-->
      <!--              sm="5"-->
      <!--            >-->
      <!--              <v-menu-->
      <!--                v-model="menu2"-->
      <!--                :close-on-content-click="false"-->
      <!--                :nudge-right="40"-->
      <!--                transition="scale-transition"-->
      <!--                offset-y-->
      <!--                min-width="auto"-->
      <!--                class="mt-3"-->
      <!--              >-->
      <!--                <template v-slot:activator="{ on, attrs }">-->
      <!--                  <v-text-field-->
      <!--                    v-model="editedItem.expirationDate.slice(0, 10)"-->
      <!--                    label="Дата завершение"-->
      <!--                    prepend-icon="mdi-calendar"-->
      <!--                    readonly-->
      <!--                    outlined-->
      <!--                    dense-->
      <!--                    v-bind="attrs"-->
      <!--                    v-on="on"-->
      <!--                  ></v-text-field>-->
      <!--                </template>-->
      <!--                <v-date-picker-->
      <!--                  v-model="editedItem.expirationDate"-->
      <!--                  @input="menu2 = false"-->
      <!--                ></v-date-picker>-->
      <!--              </v-menu>-->
      <!--            </v-col>-->
      <!--          </v-row>-->
      <!--        </v-container>-->
      <!--      </v-card-text>-->

      <!--      <v-card-actions>-->
      <!--        <v-spacer></v-spacer>-->
      <!--        <v-btn-->
      <!--          color="blue darken-1"-->
      <!--          text-->
      <!--          @click="close"-->
      <!--        >-->
      <!--          Отмена-->
      <!--        </v-btn>-->
      <!--        <v-btn-->
      <!--          color="blue darken-1"-->
      <!--          text-->
      <!--          @click="save"-->
      <!--        >-->
      <!--          Сохранить-->
      <!--        </v-btn>-->
      <!--      </v-card-actions>-->
    </v-card>
  </div>

</template>

<script>
export default {
  name: "Dialogs",
  props: ['dialog'],
  data:() => ({
    // dialogs: this.$props.dialog,
  }),
  computed: {
    // dialogs() {
    //   return this.$props.dialog
    // }
  },
  watch: {
    dialog() {
      console.log(this.$props.dialog)
    }
  }
}
</script>

<style scoped>

</style>
