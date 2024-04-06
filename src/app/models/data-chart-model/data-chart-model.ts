import {ChartType} from "chart.js/auto";

export interface DataChartModel {
  id: string,
  type?: ChartType,
  title?: string,
  labels: string[],
  values: number[],
}
