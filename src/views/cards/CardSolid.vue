<template>
  <v-row>
    <v-col
      v-for="data in solidCardData[0]"
      :key="data.icon"
      cols="12"
      md="6"
      lg="4"
    >
      <v-card
        :color="data.cardBg"
        dark
      >
        <v-card-title>
          <v-icon
            size="1.5rem"
            color="white"
            class="me-2"
          >
            {{ data.icon }}
          </v-icon>
          <span class="white--text">{{ data.title }}</span>
        </v-card-title>

        <v-card-text class="white--text">
          {{ data.text }}
        </v-card-text>

        <v-card-actions class="justify-space-between">
          <div>
            <v-avatar size="34">
              <v-img :src="require(`@/assets/images/avatars/${data.avatarImg}`)"></v-img>
            </v-avatar>
            <span class="white--text ms-2">{{ data.avatarName }}</span>
          </div>

          <div class="white--text">
            <v-icon
              class="me-1"
              color="white"
              size="1rem"
            >
              {{ icons.mdiHeart }}
            </v-icon>
            <span class="text-sm me-4">{{ data.likes }}</span>
            <v-icon
              class="me-1"
              color="white"
              size="1rem"
            >
              {{ icons.mdiShareVariant }}
            </v-icon>
            <span class="text-sm">{{ data.share }}</span>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiTwitter, mdiHeart, mdiShareVariant } from '@mdi/js'

export default {
  data: () => ({
    taskList: [],
    statusColor: {
      Сделать: 'primary',
      Процессе: 'success',
      Просрочено: 'error',
      Удержания: 'warning',
      Выполнено: 'info',
    },
    status: {
      Сделать: 'Сделать',
      Процессе: 'Процессе',
      Просрочено: 'Просрочено',
      Удержания: 'Удержания',
      Выполнено: 'Выполнено',
    },
    solidCardData: [],
    icons: {
      mdiTwitter,
      mdiHeart,
      mdiShareVariant,
    },
  }),
  async mounted() {
    this.taskList = await this.$store.dispatch('getInfo')

    // eslint-disable-next-line array-callback-return
    const cards = this.taskList.map(i => {
      const data = {
        cardBg: this.statusColor[this.status[i.status]],
        title: i.task,
        icon: mdiTwitter,
        text: i.comments,
        avatarImg: '1.png',
        avatarName: i.userName,
        likes: '1.2k',
        share: '80',
      }

      return data
    })
    this.solidCardData.push(cards)
    console.log(this.solidCardData)
  },

  // setup() {
  //   const solidCardData = [
  //     {
  //       cardBg: 'info',
  //       title: 'Twitter Card',
  //       icon: mdiTwitter,
  //       text: '"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."',
  //       avatarImg: '1.png',
  //       avatarName: 'Mary Vaughn',
  //       likes: '1.2k',
  //       share: '80',
  //     },
  //     {
  //       cardBg: 'primary',
  //       title: 'Facebook Card',
  //       icon: mdiFacebook,
  //       text: 'You’ve read about the importance of being courageous, rebellious and imaginative. These are all vital ingredients in an effective',
  //       avatarImg: '2.png',
  //       avatarName: 'Eugene Clarke',
  //       likes: '3.2k',
  //       share: '49',
  //     },
  //     {
  //       cardBg: 'success',
  //       title: 'Linkedin Card',
  //       icon: mdiLinkedin,
  //       text: 'With the Internet spreading like wildfire and reaching every part of our daily life, more and more traffic is directed.',
  //       avatarImg: '1.png',
  //       avatarName: 'Anne Burke1',
  //       likes: '1.2k',
  //       share: '80',
  //     },
  //   ]
  //
  //   return {
  //     solidCardData,
  //     icons: {
  //       mdiTwitter,
  //       mdiHeart,
  //       mdiShareVariant,
  //     },
  //   }
  // },
}
</script>
