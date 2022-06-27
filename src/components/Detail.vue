<template>
<div>
  <v-col
    sm="6"
    cols="12"
  >
    <v-card>
      <div class="d-flex flex-column-reverse flex-md-row">
        <div>
          <v-card-title>
            Профиль
          </v-card-title>
          <div class="d-flex">
            <v-card-text class="d-flex align-center flex-wrap body-1">
              <div class="d-flex flex-column">
                <h3>{{profile.fullName}}</h3>
                <h4><span class="text-sm">Номер</span> | {{profile.phone}}</h4>
                <h4><span class="text-sm">Адрес</span> | {{profile.factAddress}}</h4>
                <h4><span class="text-sm">Место работы</span> | {{profile.workAddress}}</h4>
              </div>
            </v-card-text>
            <v-divider :vertical="$vuetify.breakpoint.mdAndUp"></v-divider>
            <v-card-text>
              <div class="d-flex flex-column">
                <span class="text-sm"> ИНН | {{profile.passportInn}}</span>
                <span class="text-sm"> Серия | {{profile.passportSeries}}</span>
                <span class="text-sm"> Выдан | {{profile.passportDepartment}}</span>
                <span class="text-sm"> Дата выдачи | {{profile.passportDate}}</span>
              </div>
            </v-card-text>
            <v-card-text>
              <div class="d-flex flex-column">
                <span class="text-sm"> Дата регистрации профиля | {{profile.registrationDate}}</span>
                <span class="text-sm"> Продавец | {{profile.salesmanLogin}}</span>
                <span class="text-sm"> Количество кредита | {{item != '' ? credit.length : 0}}</span>
              </div>
            </v-card-text>
          </div>

        </div>
      </div>
    </v-card>
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

</div>
</template>

<script>
import Dialogs from "@/components/modules/Dialogs";
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
    rating: 5
  }),
  mounted() {
    this.canId = this.$route.params.id
    this.$store.dispatch('getInformation', this.canId).then(r => {
      this.credit = r.data
      this.profile = r.data[0].profileDb
      r.data.map( i => {
        this.$store.dispatch('getCreditInformation', i.id).then(s => {
         this.item.push(s.data)
        })
      })
    })



  },
}
</script>

<style scoped>

</style>
