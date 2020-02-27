import {
  ActionI,
  CaseRecordI,
  CaseRecordSearchFormI,
  CaseRecordStatsT,
} from "../../constants/interface";
import * as types from "../action-types";

//////////////////////////////////////////////////////////////////////////
// 用于在SAGA中触发请求
interface SearchFormI {
  keyword: string;
  start: string; // YYYY-mm-dd HH:MM:SS
  end: string; // YYYY-mm-dd HH:MM:SS
}

//////////////////////////////////////////////////////////////////////////
export type setCaseRecordSearchFormActionT = ActionI<string, CaseRecordSearchFormI>;
export interface SetCaseRecordSearchFormActionFuncI {
  (payload: CaseRecordSearchFormI): GetCaseRecordListActionT;
}
export const setCaseRecordSearchAction: SetCaseRecordSearchFormActionFuncI = payload => ({
  type: types.SET_CASE_RECORD_SEARCH_FORM,
  payload,
});

export type GetCaseRecordListActionT = ActionI<string, CaseRecordSearchFormI>;
export interface GetCaseRecordListActionFuncI {
  (payload: CaseRecordSearchFormI): GetCaseRecordListActionT;
}
export const getCaseRecordListAction: GetCaseRecordListActionFuncI = payload => ({
  type: types.GET_CASE_RECORD_LIST,
  payload,
});

// 用于saga监听，发起远程删除请求，更新本地数据
export type CheckCaseRecordListActionT = ActionI<string, string[]>;
export interface CheckCaseRecordListActionFuncI {
  (payload: string[]): CheckCaseRecordListActionT;
}
export const checkCaseRecordListAction: CheckCaseRecordListActionFuncI = payload => ({
  type: types.CHECK_CASE_RECORD_LIST,
  payload,
});

export type SetCaseRecordActionT = ActionI<string, CaseRecordI>;
export interface SetCaseRecordActionFuncI {
  (payload: CaseRecordI): SetCaseRecordActionT;
}
export const setCaseRecordAction: SetCaseRecordActionFuncI = payload => ({
  type: types.SET_CASE_RECORD,
  payload,
});

export type SetCaseRecordListActionT = ActionI<string, CaseRecordI[]>;
export interface SetCaseRecordListActionFuncI {
  (payload: CaseRecordI[]): SetCaseRecordListActionT;
}
export const setCaseRecordListAction: SetCaseRecordListActionFuncI = payload => ({
  type: types.SET_CASE_RECORD_LIST,
  payload,
});

export type SetCaseRecordStatsActionT = ActionI<string, CaseRecordStatsT[]>;
export interface SetCaseRecordStatsActionFuncI {
  (payload: CaseRecordStatsT[]): SetCaseRecordStatsActionT;
}
export const setCaseRecordStatsAction: SetCaseRecordStatsActionFuncI = payload => ({
  type: types.SET_CASE_RECORD_STATS,
  payload,
});