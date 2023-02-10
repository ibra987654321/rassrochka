<template>
  <div @mousemove="onMouseMove">
    <component :is="resolveLayout">
      <router-view></router-view>
      <TheSnackbars/>
      <DynamicModal/>
    </component>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'
import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'
import { getDarkTheme, removeToken, setDarkTheme } from '@/helpers/helpers'
import TheSnackbars from "@/components/TheSnackbars";
import DynamicModal from '@/components/modules/DynamicModal'

export default {
  components: {
    LayoutBlank,
    LayoutContent,
    TheSnackbars,
    DynamicModal
  },
  mounted() {
    const theme = getDarkTheme()
    if (theme) {
      if (theme === 'true') {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    }
  },
  setup() {
    const { route, router } = useRouter()
    let mouseWait = null
    function onMouseMove() {
      // eslint-disable-next-line no-use-before-define
      runTiming()
    }
    function runTiming() {
      // всегда очищаем предыдущий таймер
      // при вызове метода.
      clearTimeout(mouseWait)

      // запускаем новый отсчет.
      mouseWait = setTimeout(() => {
        hideControls()
      }, 900000)
    }
    function hideControls() {
      removeToken()
      router.push({ name: 'pages-login' })
    }

    const resolveLayout = computed(() => {
      // handles initial route
      if (route.value.name === null) return null

      if (route.value.meta.layout === 'blank') return 'layout-blank'

      return 'layout-content'
    })

    return {
      resolveLayout,
      onMouseMove,
    }
  },
}
</script>
<style>
.date_range .v-input__slot {
  margin-bottom: 0;
}
.date_range .v-text-field__details {
  display: none;
}
</style>
