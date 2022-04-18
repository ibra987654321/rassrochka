import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)

export function usePieChart(id, data) {
  const chart = am4core.create(id.value, am4charts.PieChart)

  chart.data = data.map(i => i)

  const pieSeries = chart.series.push(new am4charts.PieSeries())
  pieSeries.dataFields.value = 'litres'
  pieSeries.dataFields.category = 'country'
  chart.innerRadius = am4core.percent(40)

  pieSeries.labels.template.disabled = true
  pieSeries.ticks.template.disabled = true

  pieSeries.slices.template.tooltipText = ''

  chart.legend = new am4charts.Legend()
  chart.legend.position = 'right'
}

export function useLineChart(id, data) {
  const chart = am4core.create(id.value, am4charts.XYChart)
  chart.marginRight = 400
  chart.data = data.map(i => i)

  const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
  categoryAxis.dataFields.category = 'country'
  categoryAxis.title.text = 'Local country offices'
  categoryAxis.renderer.grid.template.location = 0
  categoryAxis.renderer.minGridDistance = 20

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
  valueAxis.title.text = 'Expenditure (M)'

  // Create series
  const series = chart.series.push(new am4charts.ColumnSeries())
  series.dataFields.valueY = 'litres'
  series.dataFields.categoryX = 'country'
  series.name = 'Research'
  series.tooltipText = '{name}: [bold]{valueY}[/]'
  series.stacked = true

  chart.cursor = new am4charts.XYCursor()
}
