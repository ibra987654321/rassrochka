<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
    >
      <control-clients></control-clients>
    </v-col>
<!--    <v-col-->
<!--      cols="12"-->
<!--      md="8"-->
<!--    >-->
<!--      <dashboard-statistics-card></dashboard-statistics-card>-->
<!--    </v-col>-->

<!--    <v-col-->
<!--      cols="12"-->
<!--      sm="6"-->
<!--      md="5"-->
<!--    >-->
<!--      <dashboard-monthly-t-t></dashboard-monthly-t-t>-->
<!--    </v-col>-->

<!--    <v-col-->
<!--      cols="12"-->
<!--      md="4"-->
<!--      sm="6"-->
<!--    >-->
<!--      <dashboard-incidents-three-month></dashboard-incidents-three-month>-->
<!--    </v-col>-->

<!--    <v-col-->
<!--      cols="12"-->
<!--      md="3"-->
<!--      sm="2"-->
<!--    >-->
<!--      <dashboard-card-total-earning></dashboard-card-total-earning>-->
<!--    </v-col>-->
<!--    <v-col-->
<!--      cols="12"-->
<!--      sm="6"-->
<!--      md="8"-->
<!--    >-->
<!--      <dashboard-weekly-overview></dashboard-weekly-overview>-->
<!--    </v-col>-->

<!--    <v-col-->
<!--      cols="12"-->
<!--      md="4"-->
<!--    >-->
<!--      <v-row class="match-height">-->
<!--        <v-col-->
<!--          cols="12"-->
<!--          sm="6"-->
<!--        >-->
<!--          <statistics-card-vertical-->
<!--            :change="totalProfit.change"-->
<!--            :color="totalProfit.color"-->
<!--            :icon="totalProfit.icon"-->
<!--            :statistics="totalProfit.statistics"-->
<!--            :stat-title="totalProfit.statTitle"-->
<!--            :subtitle="totalProfit.subtitle"-->
<!--          ></statistics-card-vertical>-->
<!--        </v-col>-->
<!--        <v-col-->
<!--          cols="12"-->
<!--          sm="6"-->
<!--        >-->
<!--          <statistics-card-vertical-->
<!--            :change="totalSales.change"-->
<!--            :color="totalSales.color"-->
<!--            :icon="totalSales.icon"-->
<!--            :statistics="totalSales.statistics"-->
<!--            :stat-title="totalSales.statTitle"-->
<!--            :subtitle="totalSales.subtitle"-->
<!--          ></statistics-card-vertical>-->
<!--        </v-col>-->
<!--        <v-col-->
<!--          cols="12"-->
<!--          sm="6"-->
<!--        >-->
<!--          <statistics-card-vertical-->
<!--            :change="newProject.change"-->
<!--            :color="newProject.color"-->
<!--            :icon="newProject.icon"-->
<!--            :statistics="newProject.statistics"-->
<!--            :stat-title="newProject.statTitle"-->
<!--            :subtitle="newProject.subtitle"-->
<!--          ></statistics-card-vertical>-->
<!--        </v-col>-->

<!--        <v-col-->
<!--          cols="12"-->
<!--          sm="6"-->
<!--        >-->
<!--          <statistics-card-vertical-->
<!--            :change="salesQueries.change"-->
<!--            :color="salesQueries.color"-->
<!--            :icon="salesQueries.icon"-->
<!--            :statistics="salesQueries.statistics"-->
<!--            :stat-title="salesQueries.statTitle"-->
<!--            :subtitle="salesQueries.subtitle"-->
<!--          ></statistics-card-vertical>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-col>-->

<!--    <v-col-->
<!--      cols="12"-->
<!--      md="4"-->
<!--    >-->
<!--      <dashboard-card-sales-by-countries></dashboard-card-sales-by-countries>-->
<!--    </v-col>-->
<!--    <v-col-->
<!--      cols="12"-->
<!--      md="8"-->
<!--    >-->
<!--      <dashboard-card-deposit-and-withdraw></dashboard-card-deposit-and-withdraw>-->
<!--    </v-col>-->
  </v-row>
</template>

<script>
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'
import StatisticsCardVertical from '@/components/statistics-card/StatisticsCardVertical.vue'

// demos
import ControlClients from "@/views/dashboard/ControlClients";
import DashboardMonthlyTT from './DashboardMonthlyTT.vue'
import DashboardCongratulationJohn from './DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from './DashboardStatisticsCard.vue'
import DashboardCardTotalEarning from './DashboardCardTotalEarning.vue'
import DashboardCardDepositAndWithdraw from './DashboardCardDepositAndWithdraw.vue'
import DashboardCardSalesByCountries from './DashboardCardSalesByCountries.vue'
import DashboardWeeklyOverview from './DashboardWeeklyOverview.vue'
import DashboardIncidentsThreeMonth from "@/views/dashboard/DashboardIncidentsThreeMonth";

export default {
  components: {
    ControlClients,
    DashboardMonthlyTT,
    StatisticsCardVertical,
    DashboardCongratulationJohn,
    DashboardStatisticsCard,
    DashboardCardTotalEarning,
    DashboardCardDepositAndWithdraw,
    DashboardCardSalesByCountries,
    DashboardWeeklyOverview,
    DashboardIncidentsThreeMonth,
  },
  setup() {
    const totalProfit = {
      statTitle: 'Total Profit',
      icon: mdiPoll,
      color: 'success',
      subtitle: 'Weekly Project',
      statistics: '$25.6k',
      change: '+42%',
    }

    const totalSales = {
      statTitle: 'Refunds',
      icon: mdiCurrencyUsd,
      color: 'secondary',
      subtitle: 'Past Month',
      statistics: '$78',
      change: '-15%',
    }

    // vertical card options
    const newProject = {
      statTitle: 'New Project',
      icon: mdiLabelVariantOutline,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: '862',
      change: '-18%',
    }

    const salesQueries = {
      statTitle: 'Sales Quries',
      icon: mdiHelpCircleOutline,
      color: 'warning',
      subtitle: 'Last week',
      statistics: '15',
      change: '-18%',
    }

    return {
      totalProfit,
      totalSales,
      newProject,
      salesQueries,
    }
  },
}
</script>
