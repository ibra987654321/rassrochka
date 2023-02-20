<template>
  <v-card id="account-setting-card">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
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
            :is="'Form' + n"
            @next="nextStep(n)"
            @newcredit="newPerson"
          ></component>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>

// eslint-disable-next-line import/extensions
import Form1 from '@/views/pages/account-settings/Form1'
import Form2 from '@/views/pages/account-settings/Form2'
import Form3 from '@/views/pages/account-settings/Form3'
import Form4 from '@/views/pages/account-settings/Form4'
import Form5 from '@/views/pages/account-settings/Form5'

export default {
  components: {
    Form1,
    Form2,
    Form3,
    Form4,
    Form5,
  },
  data() {
    return {
      e1: 1,
      steps: 5,
      stepName: ['Профиль', 'Поручитель', 'Телефон', 'Дилер', 'Кредит'],
    }
  },

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    },
  },

  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
    },
    newPerson() {
      this.e1 = 1
      this.$store.state.profiles.doneCard = false
    },
  },
}
</script>
