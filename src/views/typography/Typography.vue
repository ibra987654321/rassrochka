<template>
  <v-row>
    <v-col
      cols="12"
      class="mb-6"
    >
      <typography-headlines></typography-headlines>
    </v-col>
    <v-col cols="12">
      <typography-texts></typography-texts>
    </v-col>
    <v-col cols="12">
      <v-card
        v-click-outside="onClickOutside"
        :color="active ? 'primary' : undefined"
        :dark="active"
        class="mx-auto"
        height="256"
        rounded="xl"
        width="256"
        @click="active = true"
      >
        <div class="text-h6 text-md-h4 fill-height d-flex align-center justify-center">
          {{ active ? 'Click Outside' : 'Click Me' }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TypographyHeadlines from './TypographyHeadlines.vue'
import TypographyTexts from './TypographyTexts.vue'

export default {
  components: {
    TypographyHeadlines,
    TypographyTexts,
  },
  data: () => ({
    active: false,
  }),

  methods: {
    onClickOutside() {
      this.active = false
    },
  },
}
</script>
