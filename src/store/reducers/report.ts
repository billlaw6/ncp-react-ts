import moment from "moment";
import {
  CaseRecordI,
  CaseRecordSearchFormI,
  CaseRecordStatsT,
} from "../../constants/interface";
import * as types from "../action-types";
import {
  setCaseRecordListAction,
  setCaseRecordSearchAction,
  setCaseRecordStatsAction,
} from "../actions/report";


const defaultCaseRecordList: CaseRecordI[] = [];
const caseRecordListReducer = (
  state = defaultCaseRecordList,
  action: ReturnType<typeof setCaseRecordListAction>,
): CaseRecordI[] => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_CASE_RECORD_LIST:
      return action.payload;
    default: {
      return state;
    }
  }
};

// 默认取当天的数据
const dateFormat = "YYYY-MM-DD HH:mm:ss";
const defaultCaseRecordSearchForm: CaseRecordSearchFormI = {
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
const caseRecordSearchFormReducer = (
  state = defaultCaseRecordSearchForm,
  action: ReturnType<typeof setCaseRecordSearchAction>,
): CaseRecordSearchFormI => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_CASE_RECORD_SEARCH_FORM:
      return {
        ...defaultCaseRecordSearchForm,
        ...action.payload,
      };
    default: {
      return state;
    }
  }
};

const defaultCaseRecordStats: CaseRecordStatsT[] = [["", "", "", "", 0, 0]];
const caseRecordStatsReducer = (
  state = defaultCaseRecordStats,
  action: ReturnType<typeof setCaseRecordStatsAction>,
): CaseRecordStatsT[] => {
  if (!action) return state;
  switch (action.type) {
    // 全部CASE必须返回STATE类型的数据，以替换原来的STATE。actions文件中已经指定了payload的类型。
    case types.SET_CASE_RECORD_STATS:
      return action.payload;
    default: {
      return state;
    }
  }
};

export {
  caseRecordListReducer,
  caseRecordSearchFormReducer,
  caseRecordStatsReducer,
};