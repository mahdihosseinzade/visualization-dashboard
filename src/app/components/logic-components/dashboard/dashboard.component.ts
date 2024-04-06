import {Component, computed, OnInit, Signal} from '@angular/core';
import {MatGridListModule} from "@angular/material/grid-list";

import {MonthsChartComponent} from "../../ui-components/Molecules/months-chart/months-chart.component";
import {WeeksChartComponent} from "../../ui-components/Molecules/weeks-chart/weeks-chart.component";
import {HighChartComponent} from "../../ui-components/Molecules/high-chart/high-chart.component";
import {CoreService} from "../../../services/core-service/core.service";
import {MonthModel} from "../../../models/month-model/month-model";


@Component({
  selector: 'utr-dashboard',
  standalone: true,
  imports: [MatGridListModule, HighChartComponent, MonthsChartComponent, WeeksChartComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  months: Signal<MonthModel[]> = computed<MonthModel[]>(() => ([]));
  selectedMonth!: MonthModel;

  constructor(private coreService: CoreService) {
  }

  ngOnInit() {
    this.coreService.loadData();

    this.months = computed<MonthModel[]>(() => {
      if (this.coreService.data().months.length) {
        this.selectedMonth = this.coreService.data().months[0]
      }

      return this.coreService.data().months;
    })

  }

  handelChangeMonth(month: string): void {
    const findMonth = this.months().find(m => m.name === month);
    if (findMonth) {
      this.selectedMonth = findMonth;
    }
  }

  protected readonly window = window;
}
