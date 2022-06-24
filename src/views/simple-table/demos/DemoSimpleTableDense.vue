<template>
  <v-data-table
    :headers="headers"
    :items="commands"
    class="elevation-1"
  >
    <template
      v-slot:top
      class="d-flex justify-center"
    >
      <div class="text-center ma-2">
        <v-snackbar v-model="snackbar.visible" :color="snackbar.color" :multi-line="snackbar.mode === 'multi-line'" :timeout="snackbar.timeout" :top="snackbar.position === 'top'">
          <v-layout align-center pr-4>
            <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
            <v-layout column>
              <div>
                <strong>{{ snackbar.title }}</strong>
              </div>
              <div>{{ snackbar.text }}</div>
            </v-layout>
          </v-layout>
          <v-btn v-if="snackbar.timeout === 0" icon @click="snackbar.visible = false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-snackbar>
      </div>
      <v-dialog
        v-model="dialog"
        max-width="800px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="ma-5"
            v-bind="attrs"
            v-on="on"
          >
            Новый приказ
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.articleName"
                    label="Приказ"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="editedItem.description"
                    label="Описание"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  >
                  <v-btn  color="success" dark small @click="$refs.refInputFile.click()">
                    Выбрать
                  </v-btn>
                  <input
                    ref="refInputFile"
                    type="file"
                    accept=".jpeg,.png,.jpg,GIF,.docx,"
                    :hidden="true"
                    @change="selectFile"
                  />
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
              @click="uploadCommand"
            >
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template #item.index="{ item }">
      {{ commands.indexOf(item) + 1 }}
    </template>
    <template v-slot:item.articleName="{ item }">
      <v-edit-dialog
        :return-value.sync="item.articleName"
        large
        @open="openItem(item)"
        @save="saveItem(item)"
      >
        {{ item.articleName }}
        <template v-slot:input>
          <v-text-field
            v-model="item.articleName"
            label="Edit"
            single-line
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    <template v-slot:item.description="{ item }">
      <v-edit-dialog
        :return-value.sync="item.description"
        large
        @open="openItem(item)"
        @save="saveItem(item)"
      >
        {{ item.description }}
        <template v-slot:input>
          <v-text-field
            v-model="item.description"
            label="Edit"
            single-line
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    <template #item.createDate="{ item }">
      {{ item.createDate.slice(0, 10) }}
    </template>
    <template v-slot:item.fileName="{ item }">
      <v-speed-dial
        v-model="fabs"
        :transition="transition"
        direction="left"
        dark
        small
        :key="item.id"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon v-if="fab">{{ icons.mdiClose }}</v-icon>
            <v-icon v-else>{{ icons.mdiFormatListBulletedSquare }}</v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="green"
          @click="$refs.refInputEl.click()"
        >
          <v-icon>{{ icons.mdiPencil }}</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo"
          v-if="item.fileName"
          @click="uploadFile(item.fileName)"
        >
          <v-icon>{{ icons.mdiDownload }}</v-icon>
        </v-btn>
      </v-speed-dial>
      <v-btn v-if="!item.fileName" color="success" dark small @click="$refs.refInputEl.click()">
        Выбрать
      </v-btn>
      <v-btn v-if="!item.fileName" color="success" dark small @click="uploadFile(null, item.id)">
        Загрузить
      </v-btn>
      <input
        ref="refInputEl"
        type="file"
        accept=".jpeg,.png,.jpg,GIF,.docx,"
        :hidden="true"
        @change="selectFile($event, item.id)"
      />
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        fab
        dark
        small
        color="indigo"
        @click="deleteCommand(item.fileName)"
      >
        <v-icon>{{ icons.mdiDelete }}</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {
  mdiAlertOutline,
  mdiCheckOutline,
  mdiFormatListBulletedSquare,
  mdiPencil,
  mdiDownload,
  mdiDelete,
  mdiClose
} from "@mdi/js";
const { decodeJWT } = require('@/use/auth')
export default {
  data: () => ({
    fab: false,
    transition: 'slide-x-reverse-transition',
    icons: {
      mdiFormatListBulletedSquare,
      mdiPencil,
      mdiDownload,
      mdiDelete,
      mdiClose
    },
    currentFile: undefined,
    dialog: false,
    progress: 0,
    commands: [],
    headers: [
      { value: 'index', text: '№' },
      {
        text: 'ПРИКАЗ',
        align: 'start',
        sortable: false,
        value: 'articleName',
      },
      { text: 'ОПИСАНИЕ', value: 'description',},
      { text: 'АВТОР', value: 'author',},
      { text: 'ДАТА НАЧАЛА', value: 'createDate' },
      { text: 'ФАЙЛ', value: 'fileName' },
      { text: 'ДЕЙСТВИЯ', value: 'actions'}
    ],
    editedItem: {
      articleName: '',
      author: decodeJWT().sub,
      createDate: new Date(Date.now()).toISOString(),
      deleteByName: '',
      deleteDate: '',
      description: '',
      fileName: [],
      id: 0
    },
    editedIndex: -1,
    snackbar: {
      icon: mdiAlertOutline,
      mode: "multi-line",
      position: "top",
      timeout: 2000,
      title: "Валидация",
      text: "Необходимо заполните все поля",
      visible: false
    },
  }),
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
  computed: {
  },
  async mounted() {
    const data = await this.$store.dispatch('getInfo')
    this.commands = data.filter(i => i.deleteByName == null)
  },
  methods: {
    fabs() {
      return this.fab
    },
    editItem() {
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },
    openItem(item) {
      this.editedItem = { ...item }
    },
    async saveItem(item) {
      this.editedItem = { ...item }
      await this.$store.dispatch('putFile', this.editedItem).then(r => {
        this.snackbar.visible = true;
        this.snackbar.icon = mdiCheckOutline
        this.snackbar.title = 'Успех'
        this.snackbar.text = 'Данные успешно изменены!'
      }).catch(e => console.log(e))

    },
    selectFile(file, id) {
      this.progress = 0;
      this.currentFile = file;
      if (id) {
        this.uploadFile(null, id )
      }
    },
    deleteCommand(fileName) {
      const idx = this.commands.indexOf(fileName)
      this.commands.splice(idx, 1)
      this.$store.dispatch('deleteFile', fileName)
    },
    async uploadCommand() {
      if (this.currentFile && this.editedItem.description && this.editedItem.description) {
        this.commands.push(this.editedItem)
        let formData = new FormData();
        formData.append("file", this.currentFile.target.files[0])
        formData.append("articleName", this.editedItem.articleName);
        formData.append("description", this.editedItem.description);
        await this.$store.dispatch('uploadCommand', formData).then(r => {
          this.snackbar.visible = true;
          this.snackbar.icon = mdiCheckOutline
          this.snackbar.title = 'Успех'
          this.snackbar.text = 'Данные успешно сохранены!'
          this.close()
        }).catch(e => console.log(e.message))
      } else {
        this.snackbar.visible = true;
      }

    },
    async uploadFile(file, id) {
      console.log(this.currentFile.target.files[0])
      if (file) {
         await this.$store.dispatch('downloadFile', file)
      }else {
        let formData = new FormData();
        formData.append("file", this.currentFile.target.files[0])
        formData.append("id", id);
         await this.$store.dispatch('uploadFile', formData)
      }
    }
  }
}
</script>
<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>
