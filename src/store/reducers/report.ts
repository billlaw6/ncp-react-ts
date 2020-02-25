import moment from "moment";
import {
  DailyReportI,
  DailyReportSearchFormI,
  DailyReportStatsT,
} from "../../constants/interface";
import * as types from "../action-types";
import {
  setDailyReportListAction,
  setDailyReportSearchAction,
  setDailyReportStatsAction,
} from "../actions/report";


const defaultDailyReportList: DailyReportI[] = [];
const dailyReportListReducer = (
  state = defaultDailyReportList,
  action: ReturnType<typeof setDailyReportListAction>,
): DailyReportI[] => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_DAILY_REPORT_LIST:
      return action.payload;
    default: {
      return state;
    }
  }
};

// 默认取当天的数据
const dateFormat = "YYYY-MM-DD HH:mm:ss";
const defaultDailyReportSearchForm: DailyReportSearchFormI = {
  start: moment()
    .startOf("day")
    .locale("zh-cn")
    .format(dateFormat),
  end: moment()
    .endOf("day")
    .locale("zh-cn")
    .format(dateFormat),
  keyword: "",
};
const dailyReportSearchFormReducer = (
  state = defaultDailyReportSearchForm,
  action: ReturnType<typeof setDailyReportSearchAction>,
): DailyReportSearchFormI => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_DAILY_REPORT_SEARCH_FORM:
      return {
        ...defaultDailyReportSearchForm,
        ...action.payload,
      };
    default: {
      return state;
    }
  }
};

const defaultDailyReportStats: DailyReportStatsT[] = [["", "", "", "", 0, 0]];
const dailyReportStatsReducer = (
  state = defaultDailyReportStats,
  action: ReturnType<typeof setDailyReportStatsAction>,
): DailyReportStatsT[] => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_DAILY_REPORT_STATS:
      return action.payload;
    default: {
      return state;
    }
  }
};

export {
  dailyReportListReducer,
  dailyReportSearchFormReducer,
  dailyReportStatsReducer,
};