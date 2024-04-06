import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import Chart, {ActiveElement} from 'chart.js/auto';

import {DataChartModel} from "../../../../models/data-chart-model/data-chart-model";

@Component({
  selector: 'utr-chart',
  standalone: true,
  imports: [],
  template: `
      <div class="chart"><canvas [id]="data.id"></canvas></div>`,
  styleUrl:"./chart.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnChanges {

  @Input() data!: DataChartModel;
  @Output() onClickBar: EventEmitter<string> = new EventEmitter<string>()

  chart!: Chart;

  ngOnChanges() {
    this.chart?.destroy();

    this.chart = new Chart(this.data.id, {
      type: this.data.type ?? "bar",
      data: {
        labels: this.data.labels,
        datasets: [
          {
            data: this.data.values
          }
        ]
      },
      options: {
        layout:{
          padding:20
        },
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: this.data.title ?? 'Utravs',
          },
          legend: {
            display: false,
          }
        },
        onClick: (_, elements: ActiveElement[], chart: Chart): void => {
          if (elements.length && chart.data.labels) {
            this.onClickBar.emit(chart.data.labels[elements[0].index] as string);
          }
        }
      }
    });
  }
}
