import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';

import {DataChartModel} from "../../../../models/data-chart-model/data-chart-model";
import {MonthModel} from "../../../../models/month-model/month-model";
import {ChartComponent} from "../../atoms/chart/chart.component";

@Component({
  selector: 'utr-weeks-chart',
  template: `
      <utr-chart [data]="dataChart" style="width: 100%"></utr-chart>`,
  standalone: true,
  imports: [ChartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeksChartComponent implements OnChanges{

  @Input() month!: MonthModel;

  dataChart: DataChartModel = {
    id:'week',
    labels: [],
    values: []
  };

  ngOnChanges() {
    if(!this.month){
      return;
    }

    this.dataChart = {
      id:'week',
      type: 'line',
      title: this.month.name,
      labels: this.month.weeks.map(week => week.name),
      values: this.month.weeks.map(week => week.count)
    }
  }
}
