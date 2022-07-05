<template>
  <v-card id="account-setting-card">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            editable
          >
           {{ stepName[n - 1] }}
          </v-stepper-step>

          <v-divider
            v-if="n !== steps"
            :key="n"
          ></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="n in steps"
          :key="`${n}-content`"
          :step="n"
        >
          <component
            @next="nextStep(n)"
            :is="'Form' + n"
            @newcredit="newPerson"
          ></component>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import { mdiAccountOutline, mdiCardAccountDetailsOutline, mdiInformationOutline } from '@mdi/js'

import Form1 from "@/views/pages/account-settings/Form1";
import Form2 from "@/views/pages/account-settings/Form2";
import Form3 from "@/views/pages/account-settings/Form3";
import Form4 from "@/views/pages/account-settings/Form4";
import Form5 from "@/views/pages/account-settings/Form5";

// demos
import AccountSettingsAccount from './AccountSettingsAccount.vue'

import AccountSettingsInfo from './AccountSettingsInfo.vue'
import {decodeJWT} from "@/use/auth";

export default {
  components: {
    AccountSettingsAccount,
    Form1,
    Form2,
    Form3,
    Form4,
    Form5,
    AccountSettingsInfo,
  },
  data () {
    return {
      e1: 1,
      steps: 5,
      stepName: ['Профиль', 'Поручитель', 'Телефон', 'Поставщик', 'Заемщик']
    }
  },

  watch: {
    steps (val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    },
  },

  methods: {
    nextStep (n) {
      if (n === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
    },
    prevStep (n) {
      if (n === 1) {
        this.e1 = 1
      } else {
        this.e1 = n - 1
      }
    },
    newPerson() {
      this.e1 = 1
      this.$store.state.profiles.doneCard = false
    }
  },
  setup() {
    // account settings data
    const accountSettingData = {
      account: {
        avatarImg: require('@/assets/images/avatars/1.png'),
        username: 'Бегалиев Аманат',
        name: '0702154875',
        email: 'Бишкек',
        role: '2154854222541',
        status: '2154854222541',
        company: 'Бишкек',
        company1: 'MKK 50-09',
      },
      information: {
        bio: 'The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scaLabel 😀, and lightning 😍 fast search and discovery experiences.',
        birthday: 'February 22, 1995',
        phone: '954-006-0844',
        website: 'https://themeselection.com/',
        country: 'USA',
        languages: ['English', 'Spanish'],
        gender: 'male',
      },
    }

    return {
      accountSettingData,
      icons: {
        mdiAccountOutline,
        mdiCardAccountDetailsOutline,
        mdiInformationOutline,
      },
    }
  },
}
</script>
