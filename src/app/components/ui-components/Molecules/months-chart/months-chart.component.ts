import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

import {DataChartModel} from "../../../../models/data-chart-model/data-chart-model";
import {MonthModel} from "../../../../models/month-model/month-model";
import {ChartComponent} from "../../atoms/chart/chart.component";

@Component({
  selector: 'utr-months-chart',
  template: `
      <utr-chart [data]="dataChart" (onClickBar)="onClickBar.emit($event)"
                 style="width: 100%;"></utr-chart>`,
  standalone: true,
  imports: [ChartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthsChartComponent implements OnChanges {

  @Input() months: MonthModel[] = [];
  @Output() onClickBar: EventEmitter<string> = new EventEmitter<string>();

  dataChart: DataChartModel = {
    id:'month',
    labels: [],
    values: []
  };

  ngOnChanges() {
    this.dataChart = {
      id:'month',
      labels: this.months.map(month => month.name),
      values: this.months.map(month => month.weeks
        .reduce((prev, curr) => prev + curr.count, 0))
    }
  }
}
