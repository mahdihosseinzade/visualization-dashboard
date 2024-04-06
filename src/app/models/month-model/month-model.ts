import {MonthNameEnum} from "../../enums/month-name-enum/month-name-enum";
import {WeekModel} from "../week-model/week-model";

export interface MonthModel {
  name: MonthNameEnum,
  weeks: [WeekModel, WeekModel, WeekModel, WeekModel]
}
