<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              Aza
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Добро пожаловать в AzaDash! 👋🏻
          </p>
          <p class="mb-2">
            Пожалуйста, войдите в свою учетную запись и начните приключение
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              :rules="[() => !!email || 'This field is required']"
              :error-messages="errorMessages"
              outlined
              :disabled="loading"
              label="Email"
              placeholder="john@example.com"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :rules="[
                () => !!password || 'This field is required',
                () => !!password && password.length <= 20 || 'Address must be less than 25 characters',
              ]"
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              required
              :disabled="loading"
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox>
              <!-- forgot link -->
              <a
                href="javascript:void(0)"
                class="mt-1"
              >
                Forgot Password?
              </a>
            </div>

            <v-btn
              block
              color="primary"
              class="mt-6"
              :loading="loading"
              @click="loader = 'loading'"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
    <div class="text-center">

      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import {
  mdiEyeOutline, mdiEyeOffOutline,
} from '@mdi/js'
// eslint-disable-next-line import/no-cycle
import { useAuth } from '@/use/auth'

export default {
  data: () => ({
    loader: null,
    loading: false,
    isPasswordVisible: false,
    email: '',
    password: '',
    errorMessages: '',
    icons: {
      mdiEyeOutline,
      mdiEyeOffOutline,
    },
    snackbar: false,
    text: 'My timeout is set to 2000.',
    timeout: 2000,
  }),
  watch: {
    async loader() {
      const l = this.loader
      this[l] = !this[l]
      // eslint-disable-next-line no-return-assign
      await this.submit()

      this.loader = null
    },
  },
  methods: {
    submit() {
      const formData = {
        email: this.email,
        password: this.password,
      }
      useAuth(formData).catch(e => console.log(e))
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';

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
