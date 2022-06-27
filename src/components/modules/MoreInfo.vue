<template>
    <v-card class="overflow-hidden mb-3">
      <v-row class="ma-0 h-full">
        <v-col
          cols="12"
          sm="12"
          md="12"
          lg="12"
          order="2"
          order-lg="1"
        >
          <v-card-title>Доп лицо</v-card-title>
          <v-card-text>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <div class="me-auto pe-4">
              <p class="d-flex align-center mb-6">
                <v-icon color="primary">
                  {{ icons.mdiAccountOutline }}
                </v-icon>
                <span class="ms-3">{{ $props.detailData.fullName }}</span>
              </p>
              <p class="d-flex align-center mb-0">
                <v-icon color="primary">
                  {{ icons.mdiLockOpenOutline }}
                </v-icon>
                <span class="ms-3">{{ $props.detailData.address }}</span>
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
                <v-icon color="primary">
                  {{ icons.mdiStarOutline }}
                </v-icon>
                <span class="ms-3">{{ $props.detailData.brotherType }}</span>
              </p>
              <p class="d-flex align-center mb-0">
                <v-icon color="primary">
                  {{ icons.mdiPhone }}
                </v-icon>
                <span class="ms-3">{{ $props.detailData.phoneNumber }}</span>
              </p>
            </div>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
</template>

<script>
import {mdiLockOpenOutline, mdiStarOutline, mdiTrendingUp,mdiAccountOutline, mdiPhone} from '@mdi/js'
export default {
  props: {
    detailData: []
  },
  name: "MoreInfo",
  data: () => ({
    icons: {
      mdiLockOpenOutline,
      mdiStarOutline,
      mdiTrendingUp,
      mdiAccountOutline,
      mdiPhone
    }
  }),

}
</script>

<style scoped>

</style>
