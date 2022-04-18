<template>
  <v-card
    flat
    class="mt-5"
  >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <div class="px-3">
        <v-card-text class="pt-5">
          <v-row>
            <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <!-- task -->
              <v-text-field
                v-model="task"
                label="Задание"
                :prepend-inner-icon="icons.mdiClipboardPlayOutline"
                :rules="[v => !!v || 'Поле не должно быть пустым']"
                outlined
                dense
                placeholder="Задание"
                required
              ></v-text-field>
              <!-- coments -->
              <v-textarea
                v-model="comments"
                outlined
                :prepend-inner-icon="icons.mdiClipboardOutline"
                :rules="[v => !!v || 'Поле не должно быть пустым']"
                class="mt-6"
                name="input-7-4"
                label="Комментарии"
                placeholder="Комментарии"
              ></v-textarea>
              <div class="d-flex">
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
                      v-model="createDate"
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
                  class="mt-3"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="expirationDate"
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
                    v-model="expirationDate"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </div>

              <v-select
                v-model="status"
                class="mt-3"
                outlined
                dense
                :prepend-inner-icon="icons.mdiCheckOutline"
                :rules="[v => !!v || 'Поле не должно быть пустым']"
                :items="['IN_PROGRESS', 'Процессе', 'Выполнено', 'Удержания']"
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

              <v-checkbox
                v-model="myTask"
                class="mt-3"
                label="myTask"
                hide-details
              ></v-checkbox>
            </v-col>

            <v-col
              cols="12"
              sm="4"
              md="6"
              class="d-none d-sm-flex justify-center position-relative"
            >
              <v-img
                contain
                max-width="170"
                src="@/assets/images/3d-characters/pose-m-1.png"
                class="security-character"
              ></v-img>
            </v-col>
          </v-row>
        </v-card-text>
      </div>

      <!-- divider -->
      <v-divider></v-divider>

      <div class="pa-3">
        <!-- action buttons -->
        <v-card-text>
          <v-btn
            :disabled="dialog"
            :loading="dialog"
            class="white--text"
            color="primary"
            @click="handleSubmit"
          >
            Создать
          </v-btn>
          <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="300"
          >
            <v-card
              color="primary"
              dark
            >
              <v-card-text>
                Please stand by
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card-text>
      </div>
    </v-form>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiClipboardOutline, mdiClipboardPlayOutline, mdiCheckOutline } from '@mdi/js'
import { ref, watchEffect } from '@vue/composition-api'

const { decodeJWT } = require('@/use/auth')

export default {
  setup() {
    const valid = true
    const token = decodeJWT().sub
    const dialog = false
    const menu1 = false
    const menu2 = false
    const task = ref('')
    const id = 0
    const comments = ref('')
    const status = ref('')
    const userName = ref(token)
    const myTask = ref(false)
    const deleted = ref(false)
    const createDate = ref(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10))
    const expirationDate = ref(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10))

    async function handleSubmit() {
      console.log(status.value)
      if (!this.$refs.form.validate()) {
        this.$refs.form.validate()
      } else {
        try {
          this.dialog = true
          const formData = {
            task: task.value,
            id,
            comments: comments.value,
            createDate: new Date(createDate.value).toISOString(),
            expirationDate: new Date(expirationDate.value).toISOString(),
            status: status.value,
            userName: userName.value,
            myTask: myTask.value,
            deleted: deleted.value,
          }
          await this.$store.dispatch('postTask', formData)
          this.dialog = false
          this.task = ''
          this.comments = ''
        } catch (e) {
          console.log(e)
        }
      }
    }
    const validPost = ref(false)

    watchEffect(() => {
      if (!task.value) {
        validPost.value = true
      }
    })

    return {
      validPost,
      dialog,
      valid,
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
      icons: {
        mdiClipboardOutline,
        mdiClipboardPlayOutline,
        mdiCheckOutline,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}
.security-character {
  position: absolute;
  bottom: -0.5rem;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
