import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import {Chart} from "highcharts";
import Drilldown from 'highcharts/modules/drilldown';
import {MonthModel} from "../../../../models/month-model/month-model";

Drilldown(Highcharts);

@Component({
  selector: 'utr-high-chart',
  template: `
      <div id="high-chart"></div>`,
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighChartComponent implements OnChanges {

  @Input() data: MonthModel[] = [];

  barChart!: Chart;

  ngOnChanges(): void {
    this.barChart = Highcharts.chart('high-chart', {
      chart: {
        type: 'bar',
      },
      accessibility: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Utravs Data',
        align: 'center',
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: 'Count',
        }
      },
      series: [
        {
          type: 'bar',
          name: 'month',
          colorByPoint: true,
          data: this.data.map(month => ({
            type: 'bar',
            name: month.name,
            y: month.weeks.reduce<number>((prev, current) => {
              return prev + current.count
            }, 0),
            drilldown: month.name
          }))
        }
      ],
      drilldown: {
        series: this.data.map(month => ({
          type: 'bar',
          name: month.name,
          id: month.name,
          data: month.weeks.map(week => [week.name, week.count])
        }))
      }
    })
  }

}
