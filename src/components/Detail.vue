<template>
  <div>
    <v-row>
      <v-col
        md="6"
        sm="6"
        cols="12"
      >
        <v-card>
          <v-img
            class="white--text align-end"
            src="@/assets/images/pages/card-basic-person.png"
            height="150"
          />
          <v-card-text class="position-relative">
            <v-avatar
              size="60"
              color="white"
              class="avatar-center"
            >
              <v-img src="@/assets/images/avatars/1.png"></v-img>
            </v-avatar>
            <div class="d-flex flex-column  flex-wrap pt-8">
              <div class="me-2 mb-2 d-flex justify-space-between">
                <div>
                  <v-card-title class="pt-0 px-0 mb-3">
                    {{profile.fullName}}
                  </v-card-title>
                  <v-card-subtitle class="text-md pa-0 mb-3">
                    {{profile.phone}}
                  </v-card-subtitle>
                  <v-card-subtitle class="text-md pa-0 mb-3">
                    {{profile.phoneSecond}}
                  </v-card-subtitle>
                  <v-card-subtitle class="text-md pa-0 mb-3">
                    {{profile.factAddress}}
                  </v-card-subtitle>
                  <v-card-subtitle class="text-md pa-0 mb-3">
                    Дата регистрации | {{ new Date(profile.registrationDate).toLocaleString('ru', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',minute: 'numeric' }) }}
                  </v-card-subtitle>
                  <v-card-subtitle class="text-md pa-0">
                    Продавец | {{ profile.salesmanLogin }}
                  </v-card-subtitle>
                </div>
              </div>
              <div class="d-flex flex-column">
                <v-dialog
                  v-model="dialog"
                  width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary "
                      class="mb-3"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Удалить профиль
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Вы уверены что хотите удалить?
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        text
                        @click="deleteProfile(profile)"
                      >
                        Удалить
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <EditProfile :data="profile" @save="save($event)"/>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        sm="6"
        cols="12"
      >
        <v-row>
          <v-col
            cols="12"
          >
            <v-card class="d-flex align-center" v-for="i in item" :key="i.id">
              <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
                <div class="mx-auto">
                  <v-img
                    width="220"
                    height="100%"
                    src="../assets/images/pages/card-basic-mobile.png"
                  ></v-img>
                </div>
                <v-divider :vertical="$vuetify.breakpoint.mdAndUp"></v-divider>
                <div>
                  <v-card-title>
                    {{ i.deviceModel }}
                  </v-card-title>
                  <v-card-text>
                    <div class="d-flex flex-column">
                      <span class="text-sm"> Память | {{i.deviceMemory}}</span>
                      <span class="text-sm"> Imei | {{i.deviceImei}}</span>
                      <span class="text-sm"> Логин | {{i.cloudLogin}}</span>
                      <span class="text-sm"> Пароль | {{i.cloudPass}}</span>
                    </div>
                  </v-card-text>
                  <v-card-text class="text--primary text-base">
                    <span>Цена :</span> <span class="font-weight-bold">{{i.devicePrice}} сом</span>
                  </v-card-text>
                  <v-card-actions class="d-flex justify-space-between dense">
                    <Dialogs :data="i.monthCreditDb"/>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col
            cols="12"
          >
            <v-card class="d-flex align-center"  >
              <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
                <div class="w-100">
                  <v-card-title>
                    Статус клиента
                  </v-card-title>
                  <v-card-text >
                    <div class="d-flex flex-column w-100">
                      <v-select
                        v-model="statusType"
                        label="Статус"
                        :items="status"
                        outlined
                        dense
                        @change="generatorRu($event)"
                      >
                      </v-select>
                      <v-btn
                        color="primary"
                        x-small
                        @click="addStatus"
                        :loading="$store.state.loading"
                      >Сохранить</v-btn>
                    </div>
                  </v-card-text>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Dialogs from '@/components/modules/Dialogs'
// eslint-disable-next-line import/extensions
import EditProfile from '@/components/modules/EditProfile'
import { mdiHelpCircleOutline } from '@mdi/js'

export default {
  name: 'Detail',
  components: {
    Dialogs,
    EditProfile,
  },
  data:() => ({
    dialog: false,
    canId: '',
    profile: '',
    credit: '',
    item: [],
    rating: 5,
    icons: {
      mdiHelpCircleOutline,
    },
    blackList: {
      id: 0,
      statusType: '',
    },
    statusType: '',
    status: ['Оплатил', 'Аферист', 'Затягивает', 'Ожидание'],
    statusRu: [
      {
        Оплатил: 'DONE',
      },
      {
        Аферист: 'FRAUD',
      },
      {
        Затягивает: 'DELAY',
      },
    ],
    statusEn: [
      {
        DONE: 'Оплатил',
      },
      {
        FRAUD: 'Аферист',
      },
      {
        DELAY: 'Затягивает',
      },
      {
        WAIT: 'Ожидание',
      },
    ],
  }),
  mounted() {
    this.canId = this.$route.params.id
    this.$store.dispatch('getInformation', this.canId).then(r => {
      this.credit = r.data
      this.item = r.data
      this.profile = r.data[0].profileDb
    })
  },
  methods: {
    save(event) {
      this.profile = { ...event }
    },
    addStatus() {
      this.blackList.id = this.item[0].id
      this.$store.dispatch('creditBlackList', this.blackList)
    },
    generatorEn(value) {
      const localSelect = this.statusEn.filter(item => item[value]) // нахожу нужный элемент из массива
      const CurrentSelect = Object.values(localSelect[0]) // получаю только его значение
      // eslint-disable-next-line prefer-destructuring
      this.statusType = CurrentSelect[0]
    },
    generatorRu(value) {
      const localSelect = this.statusRu.filter(item => item[value]) // нахожу нужный элемент из массива
      const CurrentSelect = Object.values(localSelect[0]) // получаю только его значение
      // eslint-disable-next-line prefer-destructuring
      this.blackList.statusType = CurrentSelect[0]
    },
    deleteProfile(id) {
      this.$store.dispatch('deleteProfile', id)
        .then(() => {
          this.$router.push({ name: 'dashboard' })
          this.$store.commit('setSnackbars', 'Успешно удалено')
        })
        .catch(e => this.$store.commit('setSnackbars', `Ошибка${e.message}`))
    },
  },
}
</script>

<style scoped>
</style>
