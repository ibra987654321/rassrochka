<template>
  <div>
    <v-row>
      <v-col
        md="4"
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
            <div class="d-flex justify-space-between flex-wrap pt-8">
              <div class="me-2 mb-2">
                <v-card-title class="pt-0 px-0">
                  {{profile.fullName}}
                </v-card-title>
                <v-card-subtitle class="text-md pa-0">
                  {{profile.phone}}
                </v-card-subtitle>
                <v-card-subtitle class="text-md pa-0">
                  {{profile.factAddress}}
                </v-card-subtitle>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        md="6"
        sm="6"
        cols="12"
      >
          <v-row class=" h-full">
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <v-card class="overflow-hidden">
              <v-card-title>Паспортные данные</v-card-title>
              <v-card-text>
                <v-divider></v-divider>
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <div class="me-auto pe-4">
                  <p class="d-flex align-center mb-6">
                    <span class="ms-3">ИНН | {{profile.passportInn}}</span>
                  </p>
                  <p class="d-flex align-center mb-0">
                    <span class="ms-3">Серия | {{profile.passportSeries}}</span>
                  </p>
                </div>

                <v-divider
                  v-if="$vuetify.breakpoint.smAndUp"
                  vertical
                  inset
                >
                </v-divider>

                <div class="ms-auto ps-4">
                  <p class="d-flex align-center mb-6">
                    <span class="ms-3">Выдан | {{profile.passportDepartment}}</span>
                  </p>
                  <p class="d-flex align-center mb-0">
                    <span class="ms-3">Дата выдачи | {{profile.passportDate}}</span>
                  </p>
                </div>
              </v-card-actions>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              md="12"
              sm="12"
              class="align-self-start"
            >
              <v-card color="text-left " class="d-flex">
                <v-row>
                  <v-col cols="12" order="2" order-lg="1" md="9"  sm="12">
                    <v-card-text class="pt-5">
                      <h6 class="text-sm font-weight-medium">
                        Дата регистрации профиля | {{new Date(profile.registrationDate).toLocaleString('ru', {year: 'numeric', month: 'long', day: 'numeric'})}} <br>
                        Продавец | {{profile.salesmanLogin}} <br>
                        Количество кредита | {{item != '' ? credit.length : 0}}
                      </h6>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12"  order="1" order-lg="2" md="3"  sm="12">
                    <v-card-text class="d-flex flex-column justify-center align-center pt-5">
                      <v-avatar
                        color="primary"
                        icon
                        size="50"
                      >
                        <v-icon
                          size="2rem"
                          color="white"
                        >
                          {{ icons.mdiHelpCircleOutline }}
                        </v-icon>
                      </v-avatar>
                    </v-card-text>
                  </v-col>
                </v-row>


              </v-card>
            </v-col>
          </v-row>
      </v-col>
      <v-col
        sm="6"
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
                {{ i[0].deviceDb.deviceModel }}
              </v-card-title>
              <v-card-text>
                <div class="d-flex flex-column">
                  <span class="text-sm"> Память | {{i[0].deviceDb.deviceMemory}}</span>
                  <span class="text-sm"> Imei | {{i[0].deviceDb.deviceImei}}</span>
                  <span class="text-sm"> Логин | {{i[0].deviceDb.cloudLogin}}</span>
                  <span class="text-sm"> Пароль | {{i[0].deviceDb.cloudPass}}</span>
                </div>
              </v-card-text>
              <v-card-text class="text--primary text-base">
                <span>Цена :</span> <span class="font-weight-bold">{{i[0].deviceDb.devicePrice}} сом</span>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between dense">
                <Dialogs :data="i[0].monthCreditDb"/>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col
        sm="4"
        cols="12"
      >
        <v-card class="d-flex align-center"  >
          <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
            <div class="w-100">
              <v-card-title>
                Черный список
              </v-card-title>
              <v-card-text >
                <div class="d-flex flex-column w-100">
                  <v-select
                    v-model="statusType"
                    label="Статус"
                    :items="status"
                    outlined
                    @change="generatorRu($event)"
                  >
                  </v-select>
                  <v-textarea
                    label="Комментарий"
                    v-model="blackList.comments"
                    outlined
                  >
                  </v-textarea>
                  <v-btn
                    color="primary"
                    @click="addStatus"
                    :loading="$store.state.loading"
                  >Отправить</v-btn>
                </div>
              </v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Dialogs from "@/components/modules/Dialogs";
import {mdiHelpCircleOutline} from "@mdi/js";

export default {
  name: "Detail",
  components: {
    Dialogs
  },
  data:() => ({
    canId: '',
    profile: '',
    credit: '',
    item: [],
    rating: 5,
    icons: {
      mdiHelpCircleOutline
    },
    blackList: {
      comments: "",
      id: 0,
      statusType: ''
    },
    statusType: '',
    status: ['Добросовестный', 'Подсудимый', 'Аферист', 'Затягивает', 'Ожидание'],
    statusRu: [
      {
        Добросовестный: 'DEFAULTER',
      },
      {
        Подсудимый: 'PRISONER',
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
        PRISONER: 'Подсудимый',
      },
      {
        DEFAULTER: 'Добросовестный',
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
      this.profile = r.data[0].profileDb
      // eslint-disable-next-line array-callback-return
      r.data.map(i => {
        this.$store.dispatch('getCreditInformation', i.id).then(s => {
          this.blackList.comments = s.data[0].comments
          this.generatorEn(s.data[0].statusType)
          this.blackList.id = s.data[0].id
          this.item.push(s.data)
        })
      })
    })
  },
  methods: {
    addStatus() {
      this.$store.dispatch('creditBlackList', this.blackList)
        .then(() => {
          this.blackList.comments = ''
        })
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
  },
}
</script>

<style scoped>
</style>
